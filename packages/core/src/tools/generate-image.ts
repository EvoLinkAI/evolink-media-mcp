import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ServerConfig } from '../config.js';
import { apiRequest, formatUsageInfo } from '../services/api-client.js';
import { getModelNames } from '../data/models.js';

export function registerGenerateImage(server: McpServer, config: ServerConfig): void {
  const modelNames = getModelNames('image');

  const schema = {
    prompt: z.string().max(2000).describe('Image description prompt (max 2000 chars)'),
    model: z.enum(modelNames).default(modelNames[0])
      .describe('Image generation model'),
    size: z.string().optional()
      .describe('Image size. Ratio format: 1:1, 16:9, 9:16, 2:3, 3:2, 4:3, 3:4, 4:5, 5:4, 21:9. Pixel format (gpt-4o-image): 1024x1024, 1024x1536, 1536x1024'),
    n: z.number().int().min(1).max(4).optional()
      .describe('Number of images to generate (1-4, model dependent)'),
    image_urls: z.array(z.string().url()).max(14).optional()
      .describe('Reference image URLs for image-to-image or editing'),
    mask_url: z.string().url().optional()
      .describe('Mask image URL (PNG) for partial editing (gpt-4o-image)'),
  };

  server.tool(
    'generate_image',
    'Generate AI images. Returns task_id immediately. Use check_task to poll progress and get result.',
    schema,
    async (params) => {
      const task = await apiRequest(config, {
        method: 'POST',
        path: '/v1/images/generations',
        body: params as Record<string, unknown>,
      });

      const estimatedTime = task.task_info?.estimated_time ?? 30;
      const usageInfo = formatUsageInfo(task.usage);

      const lines = [
        `Image generation task submitted.`,
        `Task ID: ${task.id}`,
        `Status: pending`,
        `Estimated time: ~${estimatedTime}s`,
      ];
      if (usageInfo) lines.push(usageInfo);
      lines.push('', `Use check_task with task_id "${task.id}" to poll progress.`);
      lines.push(`Recommended polling interval: 3-5 seconds.`);

      return {
        content: [{ type: 'text' as const, text: lines.join('\n') }],
      };
    },
  );
}
