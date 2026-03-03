import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { RouterConfig } from '../config.js';
import { chatRequest } from '../services/api-client.js';
import { CASCADE_CHAIN, findModel } from '../data/text-models.js';

type Confidence = 'high' | 'medium' | 'low';

const CONFIDENCE_SUFFIX = `

IMPORTANT: At the very end of your response, on a new line, output exactly one of these confidence tags (nothing else on that line):
[CONFIDENCE:high] — if you are very confident your answer is complete and correct
[CONFIDENCE:medium] — if you are somewhat confident but a stronger model might do better
[CONFIDENCE:low] — if you are unsure or the task exceeds your capability`;

function parseConfidence(text: string): { content: string; confidence: Confidence } {
  const match = text.match(/\[CONFIDENCE:(high|medium|low)\]\s*$/);
  const confidence = (match?.[1] as Confidence) ?? 'medium';
  const content = match ? text.slice(0, match.index).trimEnd() : text;
  return { content, confidence };
}

export function registerCascade(server: McpServer, config: RouterConfig): void {
  const schema = {
    prompt: z.string().max(100000).describe('The prompt / task to complete'),
    system_prompt: z.string().max(10000).optional()
      .describe('Optional system prompt for all models in the chain'),
    max_tokens: z.number().int().min(1).max(128000).optional()
      .describe('Maximum tokens per response (default: 4096)'),
  };

  server.tool(
    'cascade',
    'Smart cascade: tries Haiku first, escalates to Sonnet then Opus if confidence is low. Saves cost on simple tasks while ensuring quality on complex ones.',
    schema,
    async (params) => {
      const augmentedPrompt = params.prompt + CONFIDENCE_SUFFIX;
      const chain = [...CASCADE_CHAIN];
      const attempts: string[] = [];

      for (let i = 0; i < chain.length; i++) {
        const modelName = chain[i];
        const model = findModel(modelName);
        const isLast = i === chain.length - 1;

        try {
          const response = await chatRequest(config, {
            model: modelName,
            prompt: isLast ? params.prompt : augmentedPrompt,
            systemPrompt: params.system_prompt,
            maxTokens: params.max_tokens,
          });

          if (isLast) {
            attempts.push(`${model?.description ?? modelName}: final (flagship)`);
            const lines = [
              response.content,
              '',
              '---',
              `Cascade result: resolved at ${modelName} (Tier ${model?.tier ?? '?'})`,
              `Chain: ${attempts.join(' → ')}`,
            ];
            if (response.usage) {
              lines.push(`Tokens: ${response.usage.inputTokens} in / ${response.usage.outputTokens} out`);
            }
            return { content: [{ type: 'text' as const, text: lines.join('\n') }] };
          }

          const { content, confidence } = parseConfidence(response.content);

          if (confidence === 'high') {
            attempts.push(`${modelName}: ${confidence} ✓`);
            const lines = [
              content,
              '',
              '---',
              `Cascade result: resolved at ${modelName} (Tier ${model?.tier ?? '?'})`,
              `Confidence: ${confidence}`,
              `Chain: ${attempts.join(' → ')}`,
            ];
            if (response.usage) {
              lines.push(`Tokens: ${response.usage.inputTokens} in / ${response.usage.outputTokens} out`);
            }
            return { content: [{ type: 'text' as const, text: lines.join('\n') }] };
          }

          attempts.push(`${modelName}: ${confidence} → escalate`);
        } catch (error) {
          attempts.push(`${modelName}: error → escalate`);
        }
      }

      // Should never reach here, but safety fallback
      return {
        content: [{
          type: 'text' as const,
          text: `Cascade failed at all levels. Attempted: ${attempts.join(' → ')}`,
        }],
      };
    },
  );
}
