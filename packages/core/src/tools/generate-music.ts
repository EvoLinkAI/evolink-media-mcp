import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ServerConfig } from '../config.js';
import { apiRequest } from '../services/api-client.js';

const MUSIC_MODELS = [
  'suno-v4',
  'suno-v4.5',
  'suno-v5',
] as const;

const schema = {
  prompt: z.string().max(3000).describe('Music description or lyrics (max 3000 chars)'),
  model: z.enum(MUSIC_MODELS).default('suno-v4.5')
    .describe('Music generation model'),
  instrumental: z.boolean().default(false)
    .describe('Generate instrumental only (no vocals)'),
  duration: z.number().int().min(30).max(240).optional()
    .describe('Music duration in seconds (30-240)'),
};

export function registerGenerateMusic(server: McpServer, config: ServerConfig): void {
  server.tool(
    'generate_music',
    'Generate AI music with Suno models. Returns task_id immediately (music takes 1-2min). Use check_task to poll.',
    schema,
    async (params) => {
      const task = await apiRequest(config, {
        method: 'POST',
        path: '/v1/audios/generations',
        body: params as Record<string, unknown>,
      });

      return {
        content: [{
          type: 'text' as const,
          text: [
            `Music generation task submitted.`,
            `Task ID: ${task.id}`,
            `Status: pending`,
            `Estimated time: ~${task.task_info?.estimated_time ?? 90}s`,
            ``,
            `Use check_task with task_id "${task.id}" to poll progress.`,
            `Recommended polling interval: 5-10 seconds.`,
          ].join('\n'),
        }],
      };
    },
  );
}
