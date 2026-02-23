import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ServerConfig } from '../config.js';
import { queryTask, type TaskResponse } from '../services/api-client.js';

const schema = {
  task_id: z.string().describe('Task ID returned by generate_video or generate_music'),
};

export function formatTaskResult(task: TaskResponse): string {
  const lines: string[] = [
    `Task ID: ${task.id}`,
    `Model: ${task.model}`,
    `Status: ${task.status}`,
    `Progress: ${task.progress}%`,
  ];

  if (task.status === 'completed') {
    if (task.results?.length) {
      lines.push('', 'Results:');
      task.results.forEach((url, i) => {
        lines.push(`  [${i + 1}] ${url}`);
      });
    }

    if (task.result_data?.length) {
      lines.push('', 'Result details:');
      for (const item of task.result_data) {
        if (item.video_url) lines.push(`  Video: ${item.video_url}`);
        if (item.image_url) lines.push(`  Image: ${item.image_url}`);
        if (item.audio_url) lines.push(`  Audio: ${item.audio_url}`);
        if (item.title) lines.push(`  Title: ${item.title}`);
        if (item.duration) lines.push(`  Duration: ${item.duration}s`);
      }
    }

    if (task.usage) {
      lines.push(``, `Cost: ${task.usage.credits_reserved} credits`);
    }

    lines.push('', 'Note: Download URLs expire in 24 hours. Save results promptly.');
  }

  if (task.status === 'failed') {
    lines.push(``, `Error: ${task.error?.message ?? 'Unknown error'}`);
  }

  if (task.status === 'pending' || task.status === 'processing') {
    const eta = task.task_info?.estimated_time;
    if (eta) lines.push(`Estimated time remaining: ~${eta}s`);
    lines.push('', 'Task is still in progress. Call check_task again to get updates.');
  }

  return lines.join('\n');
}

export function registerCheckTask(server: McpServer, config: ServerConfig): void {
  server.tool(
    'check_task',
    'Check status and get results of an async task (video/music generation). Returns progress, status, and result URLs.',
    schema,
    async (params) => {
      const task = await queryTask(config, params.task_id);
      return { content: [{ type: 'text' as const, text: formatTaskResult(task) }] };
    },
  );
}
