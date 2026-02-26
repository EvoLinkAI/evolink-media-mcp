export type ModelCategory = 'image' | 'video' | 'music' | 'digital-human';

export interface ModelInfo {
  name: string;
  category: ModelCategory;
  isBeta: boolean;
  description: string;
  features: string[];
}

// Helper to reduce boilerplate
function v(name: string, beta: boolean, desc: string, feat: string[]): ModelInfo {
  return { name, category: 'video', isBeta: beta, description: desc, features: feat };
}
function img(name: string, beta: boolean, desc: string, feat: string[]): ModelInfo {
  return { name, category: 'image', isBeta: beta, description: desc, features: feat };
}
function mus(name: string, beta: boolean, desc: string, feat: string[]): ModelInfo {
  return { name, category: 'music', isBeta: beta, description: desc, features: feat };
}

export const MODELS: ModelInfo[] = [
  // =============================================
  // VIDEO (36)
  // =============================================
  // -- Stable --
  v('seedance-1.5-pro', false, 'ByteDance Seedance 1.5 Pro — i2v, first-last-frame, auto audio', ['text-to-video', 'image-to-video', 'first-last-frame', '4-12s', '1080p', 'audio-generation']),
  v('seedance-2.0', false, 'ByteDance Seedance 2.0 — next-gen motion quality (placeholder, API pending)', ['text-to-video', 'image-to-video', 'placeholder']),
  v('doubao-seedance-1.0-pro-fast', false, 'ByteDance Seedance 1.0 Pro Fast — fast video generation', ['text-to-video', 'fast']),
  v('sora-2-preview', false, 'OpenAI Sora 2 Preview — cinematic video preview', ['text-to-video', 'image-to-video', '1080p']),
  v('kling-o3-text-to-video', false, 'Kuaishou Kling O3 — text-to-video', ['text-to-video', '3-15s', '1080p']),
  v('kling-o3-image-to-video', false, 'Kuaishou Kling O3 — image-to-video', ['image-to-video', '1080p']),
  v('kling-o3-reference-to-video', false, 'Kuaishou Kling O3 — reference-guided video', ['reference-to-video', '1080p']),
  v('kling-o3-video-edit', false, 'Kuaishou Kling O3 — video editing', ['video-edit', '1080p']),
  v('kling-v3-text-to-video', false, 'Kuaishou Kling V3 — text-to-video', ['text-to-video', '1080p']),
  v('kling-v3-image-to-video', false, 'Kuaishou Kling V3 — image-to-video', ['image-to-video', '1080p']),
  v('kling-o1-image-to-video', false, 'Kuaishou Kling O1 — image-to-video', ['image-to-video']),
  v('kling-o1-video-edit', false, 'Kuaishou Kling O1 — video editing', ['video-edit']),
  v('kling-o1-video-edit-fast', false, 'Kuaishou Kling O1 — fast video editing', ['video-edit', 'fast']),
  v('kling-custom-element', false, 'Kuaishou Kling — custom element video', ['custom-element']),
  v('veo-3.1-generate-preview', false, 'Google Veo 3.1 — generation preview', ['text-to-video', '1080p']),
  v('veo-3.1-fast-generate-preview', false, 'Google Veo 3.1 — fast generation preview', ['text-to-video', 'fast', '1080p']),
  v('MiniMax-Hailuo-2.3', false, 'MiniMax Hailuo 2.3 — high-quality video generation', ['text-to-video', '1080p']),
  v('MiniMax-Hailuo-2.3-Fast', false, 'MiniMax Hailuo 2.3 Fast — fast video generation', ['text-to-video', 'fast', '1080p']),
  v('MiniMax-Hailuo-02', false, 'MiniMax Hailuo 02 — video generation', ['text-to-video']),
  v('wan2.5-t2v-preview', false, 'Alibaba WAN 2.5 — text-to-video preview', ['text-to-video']),
  v('wan2.5-i2v-preview', false, 'Alibaba WAN 2.5 — image-to-video preview', ['image-to-video']),
  v('wan2.5-text-to-video', false, 'Alibaba WAN 2.5 — text-to-video', ['text-to-video']),
  v('wan2.5-image-to-video', false, 'Alibaba WAN 2.5 — image-to-video', ['image-to-video']),
  v('wan2.6-text-to-video', false, 'Alibaba WAN 2.6 — text-to-video', ['text-to-video']),
  v('wan2.6-image-to-video', false, 'Alibaba WAN 2.6 — image-to-video', ['image-to-video']),
  v('wan2.6-reference-video', false, 'Alibaba WAN 2.6 — reference-guided video', ['reference-to-video']),
  // -- Beta --
  v('sora-2', true, 'OpenAI Sora 2 — cinematic video generation', ['text-to-video', 'image-to-video', '1080p']),
  v('sora-2-pro', true, 'OpenAI Sora 2 Pro — premium cinematic quality', ['text-to-video', 'image-to-video', '1080p', 'premium']),
  v('sora-2-beta-max', true, 'OpenAI Sora 2 Beta Max — maximum quality', ['text-to-video', '1080p', 'max-quality']),
  v('sora-character', true, 'OpenAI Sora Character — character-consistent video', ['text-to-video', 'character-consistency']),
  v('veo3.1-pro', true, 'Google Veo 3.1 Pro — top-tier cinematic + audio', ['text-to-video', '1080p', 'audio-generation']),
  v('veo3.1-fast', true, 'Google Veo 3.1 Fast — fast high-quality video', ['text-to-video', 'fast', '1080p']),
  v('veo3.1-fast-extend', true, 'Google Veo 3.1 Fast Extend — extended video generation', ['text-to-video', 'fast', 'extend']),
  v('veo3', true, 'Google Veo 3 — cinematic video generation', ['text-to-video', '1080p']),
  v('veo3-fast', true, 'Google Veo 3 Fast — fast video generation', ['text-to-video', 'fast']),
  v('grok-imagine-text-to-video', true, 'xAI Grok Imagine — text-to-video', ['text-to-video']),
  v('grok-imagine-image-to-video', true, 'xAI Grok Imagine — image-to-video', ['image-to-video']),

  // =============================================
  // IMAGE (20)
  // =============================================
  // -- Stable --
  img('gpt-image-1.5', false, 'OpenAI GPT Image 1.5 — latest image generation', ['text-to-image', 'image-editing']),
  img('gpt-image-1', false, 'OpenAI GPT Image 1 — high-quality generation', ['text-to-image', 'image-editing']),
  img('gemini-3.1-flash-image-preview', false, 'Nano Banana 2 — Google Gemini 3.1 Flash image generation', ['text-to-image', 'image-editing', 'fast']),
  img('gemini-3-pro-image-preview', false, 'Google Gemini 3 Pro — image generation preview', ['text-to-image']),
  img('z-image-turbo', false, 'Z-Image Turbo — fastest generation, ideal for iterations', ['text-to-image', 'ultra-fast']),
  img('doubao-seedream-4.5', false, 'ByteDance Seedream 4.5 — photorealistic generation', ['text-to-image', 'photorealistic']),
  img('doubao-seedream-4.0', false, 'ByteDance Seedream 4.0 — high-quality generation', ['text-to-image']),
  img('doubao-seedream-3.0-t2i', false, 'ByteDance Seedream 3.0 — text-to-image', ['text-to-image']),
  img('doubao-seededit-4.0-i2i', false, 'ByteDance Seededit 4.0 — image-to-image editing', ['image-editing']),
  img('doubao-seededit-3.0-i2i', false, 'ByteDance Seededit 3.0 — image-to-image editing', ['image-editing']),
  img('qwen-image-edit', false, 'Alibaba Qwen — instruction-based image editing', ['image-editing', 'instruction-based']),
  img('qwen-image-edit-plus', false, 'Alibaba Qwen Plus — advanced image editing', ['image-editing', 'instruction-based']),
  img('wan2.5-t2i-preview', false, 'Alibaba WAN 2.5 — text-to-image preview', ['text-to-image']),
  img('wan2.5-i2i-preview', false, 'Alibaba WAN 2.5 — image-to-image preview', ['image-editing']),
  img('wan2.5-text-to-image', false, 'Alibaba WAN 2.5 — text-to-image', ['text-to-image']),
  img('wan2.5-image-to-image', false, 'Alibaba WAN 2.5 — image-to-image', ['image-editing']),
  // -- Beta --
  img('gpt-image-1.5-lite', true, 'OpenAI GPT Image 1.5 Lite — fast lightweight generation', ['text-to-image', 'fast']),
  img('gpt-4o-image', true, 'OpenAI GPT-4o Image — best prompt understanding + editing', ['text-to-image', 'image-editing', 'best-quality']),
  img('gemini-2.5-flash-image', true, 'Google Gemini 2.5 Flash — fast image generation', ['text-to-image', 'fast']),
  img('nano-banana-2-lite', true, 'Nano Banana 2 Lite — versatile general-purpose generation', ['text-to-image', 'fast']),

  // =============================================
  // MUSIC (5, all beta)
  // =============================================
  mus('suno-v4', true, 'Suno v4 — balanced music generation', ['text-to-music', 'vocals', 'instrumental', '30-120s']),
  mus('suno-v4.5', true, 'Suno v4.5 — improved quality and style control', ['text-to-music', 'vocals', 'instrumental', '30-240s', 'style-control']),
  mus('suno-v4.5plus', true, 'Suno v4.5 Plus — extended music features', ['text-to-music', 'vocals', 'instrumental', '30-240s']),
  mus('suno-v4.5all', true, 'Suno v4.5 All — full v4.5 feature set', ['text-to-music', 'vocals', 'instrumental', '30-240s']),
  mus('suno-v5', true, 'Suno v5 — studio-grade, best quality', ['text-to-music', 'vocals', 'instrumental', '30-240s', 'studio-quality']),

  // =============================================
  // DIGITAL HUMAN (1)
  // =============================================
  { name: 'omnihuman-1.5', category: 'digital-human', isBeta: false,
    description: 'OmniHuman 1.5 — audio-driven digital human video generation',
    features: ['audio-driven', 'lip-sync', 'portrait-animation'] },
];

// --- Query helpers ---

/** Get models filtered by category. */
export function getModelsByCategory(category?: string): ModelInfo[] {
  if (!category || category === 'all') return MODELS;
  return MODELS.filter(m => m.category === category);
}

/** Get all model name strings for a category (for building Zod enum schemas). */
export function getModelNames(category: ModelCategory): [string, ...string[]] {
  const names = MODELS.filter(m => m.category === category).map(m => m.name);
  if (names.length === 0) {
    throw new Error(`No ${category} models found`);
  }
  return names as [string, ...string[]];
}

export function findModel(name: string): ModelInfo | undefined {
  return MODELS.find(m => m.name === name);
}
