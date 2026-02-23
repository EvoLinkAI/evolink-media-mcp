import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ServerConfig } from '../config.js';
import { apiRequest } from '../services/api-client.js';

const VIDEO_MODELS = [
  'seedance-2-0',
  'sora-2',
  'kling-o3-text-to-video',
  'veo-3-1-pro',
] as const;

const schema = {
  prompt: z.string().max(5000).describe('Video description prompt (max 5000 chars)'),
  model: z.enum(VIDEO_MODELS).default('seedance-2-0')
    .describe('Video generation model'),
  duration: z.number().int().min(4).max(15).optional()
    .describe('Video duration in seconds (4-15)'),
  quality: z.enum(['480p', '720p', '1080p']).optional()
    .describe('Output video quality'),
  image_url: z.string().url().optional()
    .describe('Reference image URL for image-to-video generation'),
  generate_audio: z.boolean().default(false)
    .describe('Whether to generate audio/sound effects'),
};

export function registerGenerateVideo(server: McpServer, config: ServerConfig): void {
  server.tool(
    'generate_video',
    'Generate AI videos. Returns task_id immediately (video takes 3-5min). Use check_task to poll progress.',
    schema,
    async (params) => {
      const { image_url, generate_audio, ...rest } = params;
      const body: Record<string, unknown> = { ...rest };

      if (image_url) {
        body.image_urls = [image_url];
      }
      if (generate_audio) {
        body.sound = true;
      }

      const task = await apiRequest(config, {
        method: 'POST',
        path: '/v1/videos/generations',
        body,
      });

      const estimatedTime = task.task_info?.estimated_time ?? 180;
      const estimatedCost = task.usage?.credits_reserved ?? null;

      return {
        content: [{
          type: 'text' as const,
          text: [
            `Video generation task submitted.`,
            `Task ID: ${task.id}`,
            `Status: pending`,
            `Estimated time: ~${estimatedTime}s`,
            estimatedCost !== null ? `Estimated cost: ${estimatedCost} credits` : null,
            ``,
            `Use check_task with task_id "${task.id}" to poll progress.`,
            `Recommended polling interval: 10-15 seconds.`,
          ].filter(Boolean).join('\n'),
        }],
      };
    },
  );
}
