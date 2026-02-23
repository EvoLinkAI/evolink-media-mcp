import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { findModel } from '../data/models.js';

const schema = {
  model: z.string().describe('Model name to check info for'),
};

export function registerEstimateCost(server: McpServer): void {
  server.tool(
    'estimate_cost',
    'Get model info before generation. For detailed pricing, visit https://evolink.ai/pricing',
    schema,
    async (params) => {
      const model = findModel(params.model);
      if (!model) {
        return {
          content: [{
            type: 'text' as const,
            text: `Model "${params.model}" not found. Use list_models to see available models.`,
          }],
          isError: true,
        };
      }

      return {
        content: [{
          type: 'text' as const,
          text: [
            `Model: ${model.name}`,
            `Category: ${model.category}`,
            `Description: ${model.description}`,
            `Features: ${model.features.join(', ')}`,
            ``,
            `For pricing details, visit https://evolink.ai/pricing`,
          ].join('\n'),
        }],
      };
    },
  );
}
