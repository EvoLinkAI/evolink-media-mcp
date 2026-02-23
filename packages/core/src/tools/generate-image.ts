import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ServerConfig } from '../config.js';
import { apiRequest } from '../services/api-client.js';
import { formatTaskResult } from './check-task.js';

const IMAGE_MODELS = [
  'nano-banana-pro',
  'z-image-turbo',
  'seedream-4-5',
  'qwen-image-edit',
  'gpt-4o-image',
] as const;

const POLL_INTERVAL = 3000;
const MAX_POLL_TIME = 60000;

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const schema = {
  prompt: z.string().max(2000).describe('Image description prompt (max 2000 chars)'),
  model: z.enum(IMAGE_MODELS).default('nano-banana-pro')
    .describe('Image generation model'),
  aspect_ratio: z.enum(['1:1', '16:9', '9:16', '4:3', '3:4']).optional()
    .describe('Image aspect ratio'),
  resolution: z.enum(['1K', '2K', '4K']).optional()
    .describe('Output resolution'),
  image_urls: z.array(z.string().url()).max(5).optional()
    .describe('Reference image URLs (max 5, each under 10MB)'),
};

export function registerGenerateImage(server: McpServer, config: ServerConfig): void {
  server.tool(
    'generate_image',
    'Generate AI images. Returns result directly (fast, <30s). Supports text-to-image and image editing.',
    schema,
    async (params) => {
      const task = await apiRequest(config, {
        method: 'POST',
        path: '/v1/images/generations',
        body: params as Record<string, unknown>,
      });

      // Images are fast — poll internally until complete
      const startTime = Date.now();
      let result = task;

      while (
        result.status !== 'completed' &&
        result.status !== 'failed' &&
        Date.now() - startTime < MAX_POLL_TIME
      ) {
        await sleep(POLL_INTERVAL);
        const { queryTask } = await import('../services/api-client.js');
        result = await queryTask(config, task.id);
      }

      if (result.status === 'failed') {
        return {
          content: [{ type: 'text' as const, text: `Image generation failed: ${result.error?.message ?? 'Unknown error'}` }],
          isError: true,
        };
      }

      if (result.status !== 'completed') {
        return {
          content: [{
            type: 'text' as const,
            text: `Image generation timed out. Task ID: ${task.id}\nUse check_task to check progress.`,
          }],
        };
      }

      return { content: [{ type: 'text' as const, text: formatTaskResult(result) }] };
    },
  );
}
