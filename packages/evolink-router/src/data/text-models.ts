export type Tier = 1 | 2 | 3;
export type ApiFormat = 'anthropic' | 'openai' | 'gemini';

export interface TextModel {
  name: string;
  provider: string;
  apiFormat: ApiFormat;
  tier: Tier;
  description: string;
  bestFor: string;
}

export const TEXT_MODELS: TextModel[] = [
  // === Tier 1 — Lightweight ($) ===
  { name: 'claude-haiku-4-5-20251001', provider: 'Anthropic', apiFormat: 'anthropic', tier: 1, description: 'Claude Haiku 4.5 — fastest Claude model', bestFor: 'Quick Q&A, classification, extraction, triage' },
  { name: 'gemini-2.5-flash', provider: 'Google', apiFormat: 'gemini', tier: 1, description: 'Gemini 2.5 Flash — fast multimodal reasoning', bestFor: 'Multimodal understanding, fast reasoning' },
  { name: 'gemini-2.5-flash-lite', provider: 'Google', apiFormat: 'gemini', tier: 1, description: 'Gemini 2.5 Flash Lite — ultra-lightweight', bestFor: 'Ultra-lightweight tasks, lowest latency' },
  { name: 'doubao-seed-2.0-mini', provider: 'ByteDance', apiFormat: 'openai', tier: 1, description: 'Doubao Seed 2.0 Mini — Chinese lightweight', bestFor: 'Chinese lightweight tasks' },
  { name: 'doubao-seed-2.0-lite', provider: 'ByteDance', apiFormat: 'openai', tier: 1, description: 'Doubao Seed 2.0 Lite — Chinese balanced lightweight', bestFor: 'Chinese balanced lightweight tasks' },

  // === Tier 2 — Balanced ($$) ===
  { name: 'claude-sonnet-4-6', provider: 'Anthropic', apiFormat: 'anthropic', tier: 2, description: 'Claude Sonnet 4.6 — best coding & tool use', bestFor: 'Coding, tool use, content creation' },
  { name: 'claude-sonnet-4-5-20250929', provider: 'Anthropic', apiFormat: 'anthropic', tier: 2, description: 'Claude Sonnet 4.5 — previous-gen fallback', bestFor: 'General tasks (fallback)' },
  { name: 'gpt-5.1', provider: 'OpenAI', apiFormat: 'openai', tier: 2, description: 'GPT-5.1 — strong general capability', bestFor: 'General chat, instruction following' },
  { name: 'gpt-5.1-chat', provider: 'OpenAI', apiFormat: 'openai', tier: 2, description: 'GPT-5.1 Chat — conversational variant', bestFor: 'Conversational tasks' },
  { name: 'gemini-2.5-pro', provider: 'Google', apiFormat: 'gemini', tier: 2, description: 'Gemini 2.5 Pro — long context, multimodal', bestFor: 'Long context, multimodal analysis' },
  { name: 'gemini-3-flash-preview', provider: 'Google', apiFormat: 'gemini', tier: 2, description: 'Gemini 3 Flash Preview — next-gen fast', bestFor: 'Fast next-gen tasks' },
  { name: 'deepseek-chat', provider: 'DeepSeek', apiFormat: 'openai', tier: 2, description: 'DeepSeek Chat — cost-effective Chinese dialogue', bestFor: 'Chinese dialogue, cost-effective' },
  { name: 'doubao-seed-2.0-pro', provider: 'ByteDance', apiFormat: 'openai', tier: 2, description: 'Doubao Seed 2.0 Pro — Chinese content creation', bestFor: 'Chinese content creation' },
  { name: 'doubao-seed-2.0-code', provider: 'ByteDance', apiFormat: 'openai', tier: 2, description: 'Doubao Seed 2.0 Code — code generation', bestFor: 'Code generation (Chinese ecosystem)' },
  { name: 'kimi-k2-thinking-turbo', provider: 'Moonshot', apiFormat: 'openai', tier: 2, description: 'Kimi K2 Thinking Turbo — long-document understanding', bestFor: 'Chinese long-document understanding' },

  // === Tier 3 — Flagship ($$$) ===
  { name: 'claude-opus-4-6', provider: 'Anthropic', apiFormat: 'anthropic', tier: 3, description: 'Claude Opus 4.6 — deepest reasoning', bestFor: 'Deep reasoning, high-stakes decisions' },
  { name: 'claude-opus-4-5-20251101', provider: 'Anthropic', apiFormat: 'anthropic', tier: 3, description: 'Claude Opus 4.5 — previous-gen fallback', bestFor: 'Deep reasoning (fallback)' },
  { name: 'gpt-5.2', provider: 'OpenAI', apiFormat: 'openai', tier: 3, description: 'GPT-5.2 — strongest general capability', bestFor: 'Complex general tasks' },
  { name: 'gpt-5.1-thinking', provider: 'OpenAI', apiFormat: 'openai', tier: 3, description: 'GPT-5.1 Thinking — chain-of-thought reasoning', bestFor: 'Complex chain-of-thought reasoning' },
  { name: 'gemini-3.1-pro-preview', provider: 'Google', apiFormat: 'gemini', tier: 3, description: 'Gemini 3.1 Pro Preview — latest multimodal reasoning', bestFor: 'Latest multimodal reasoning' },
  { name: 'gemini-3-pro-preview', provider: 'Google', apiFormat: 'gemini', tier: 3, description: 'Gemini 3 Pro Preview — next-gen pro', bestFor: 'Next-gen pro tasks' },
  { name: 'deepseek-reasoner', provider: 'DeepSeek', apiFormat: 'openai', tier: 3, description: 'DeepSeek Reasoner — math/logic specialist', bestFor: 'Math/logic reasoning' },
  { name: 'kimi-k2-thinking', provider: 'Moonshot', apiFormat: 'openai', tier: 3, description: 'Kimi K2 Thinking — deep Chinese reasoning', bestFor: 'Deep Chinese reasoning' },
];

/** Default cascade chain: Haiku → Sonnet → Opus */
export const CASCADE_CHAIN = [
  'claude-haiku-4-5-20251001',
  'claude-sonnet-4-6',
  'claude-opus-4-6',
] as const;

// --- Query helpers ---

export function getModelsByTier(tier?: Tier): TextModel[] {
  if (!tier) return TEXT_MODELS;
  return TEXT_MODELS.filter(m => m.tier === tier);
}

export function getModelNames(): [string, ...string[]] {
  const names = TEXT_MODELS.map(m => m.name);
  return names as [string, ...string[]];
}

export function findModel(name: string): TextModel | undefined {
  return TEXT_MODELS.find(m => m.name === name);
}
