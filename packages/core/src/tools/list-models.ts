import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getModelsByCategory } from '../data/models.js';

const schema = {
  category: z.enum(['video', 'image', 'music', 'all']).default('all')
    .describe('Filter models by category'),
};

export function registerListModels(server: McpServer): void {
  server.tool(
    'list_models',
    'List available AI models with features. Use to help users choose the right model.',
    schema,
    async (params) => {
      const models = getModelsByCategory(params.category);

      const lines = models.map(m => [
        `**${m.name}** [${m.category}]`,
        `  ${m.description}`,
        `  Features: ${m.features.join(', ')}`,
      ].join('\n'));

      return {
        content: [{
          type: 'text' as const,
          text: `Available models (${models.length}):\n\n${lines.join('\n\n')}\n\nFor pricing details, visit https://evolink.ai/pricing`,
        }],
      };
    },
  );
}
