import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { findModel } from '../data/models.js';

const schema = {
  model: z.string().describe('Model name to estimate cost for'),
  duration: z.number().optional()
    .describe('Duration in seconds (for video/music models)'),
  quality: z.string().optional()
    .describe('Quality setting (e.g., 720p, 1080p)'),
};

const QUALITY_MULTIPLIERS: Record<string, number> = {
  '480p': 0.5,
  '720p': 1.0,
  '1080p': 1.5,
  '4K': 3.0,
  '2K': 2.0,
  '1K': 1.0,
};

export function registerEstimateCost(server: McpServer): void {
  server.tool(
    'estimate_cost',
    'Estimate cost before generation. Helps users understand pricing and make informed decisions.',
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

      let estimatedCost = model.pricing.cost;
      const breakdown: string[] = [`Base cost: $${model.pricing.cost}/${model.pricing.unit}`];

      if (model.pricing.unit === 'per_second' && params.duration) {
        estimatedCost = model.pricing.cost * params.duration;
        breakdown.push(`Duration: ${params.duration}s`);
      }

      if (params.quality) {
        const multiplier = QUALITY_MULTIPLIERS[params.quality] ?? 1.0;
        estimatedCost *= multiplier;
        if (multiplier !== 1.0) {
          breakdown.push(`Quality multiplier (${params.quality}): x${multiplier}`);
        }
      }

      return {
        content: [{
          type: 'text' as const,
          text: [
            `Cost estimate for ${model.name}:`,
            ``,
            `Estimated cost: $${estimatedCost.toFixed(4)}`,
            `Unit: ${model.pricing.unit}`,
            ``,
            `Breakdown:`,
            ...breakdown.map(b => `  - ${b}`),
            ``,
            `Note: Actual cost may vary slightly based on output complexity.`,
          ].join('\n'),
        }],
      };
    },
  );
}
