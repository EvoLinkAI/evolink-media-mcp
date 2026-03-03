import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { TEXT_MODELS, getModelsByTier, type Tier } from '../data/text-models.js';

const TIER_LABELS: Record<Tier, string> = {
  1: 'Tier 1 — Lightweight ($)',
  2: 'Tier 2 — Balanced ($$)',
  3: 'Tier 3 — Flagship ($$$)',
};

export function registerListTextModels(server: McpServer): void {
  const schema = {
    tier: z.number().int().min(1).max(3).optional()
      .describe('Filter by tier: 1 (lightweight), 2 (balanced), 3 (flagship). Omit for all.'),
  };

  server.tool(
    'list_text_models',
    'List available text models grouped by tier. Use this to discover models before calling delegate or cascade.',
    schema,
    async (params) => {
      const tier = params.tier as Tier | undefined;
      const tiers: Tier[] = tier ? [tier] : [1, 2, 3];
      const sections: string[] = [];

      for (const t of tiers) {
        const models = getModelsByTier(t);
        if (models.length === 0) continue;

        const header = TIER_LABELS[t];
        const rows = models.map(m =>
          `  ${m.name} (${m.provider}) — ${m.bestFor}`
        );
        sections.push(`${header}\n${rows.join('\n')}`);
      }

      const total = tier ? getModelsByTier(tier).length : TEXT_MODELS.length;
      sections.push(`\nTotal: ${total} models${tier ? ` in Tier ${tier}` : ''}`);

      return {
        content: [{ type: 'text' as const, text: sections.join('\n\n') }],
      };
    },
  );
}
