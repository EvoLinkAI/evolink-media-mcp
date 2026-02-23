export interface ModelInfo {
  name: string;
  category: 'image' | 'video' | 'music' | 'digital-human';
  description: string;
  pricing: { unit: string; cost: number };
  features: string[];
}

export const MODELS: ModelInfo[] = [
  // === Video Models ===
  {
    name: 'seedance-2-0',
    category: 'video',
    description: 'ByteDance Seedance 2.0 — high-quality video generation with excellent motion',
    pricing: { unit: 'per_second', cost: 0.12 },
    features: ['text-to-video', 'image-to-video', '5-10s', '720p/1080p'],
  },
  {
    name: 'sora-2',
    category: 'video',
    description: 'OpenAI Sora 2 — cinematic video generation with strong prompt following',
    pricing: { unit: 'per_second', cost: 0.25 },
    features: ['text-to-video', 'image-to-video', '5-15s', '1080p'],
  },
  {
    name: 'kling-o3-text-to-video',
    category: 'video',
    description: 'Kuaishou Kling O3 — fast, cost-effective video generation',
    pricing: { unit: 'per_second', cost: 0.08 },
    features: ['text-to-video', '5-10s', '720p/1080p'],
  },
  {
    name: 'veo-3-1-pro',
    category: 'video',
    description: 'Google Veo 3.1 Pro — top-tier quality, best for cinematic content',
    pricing: { unit: 'per_second', cost: 0.40 },
    features: ['text-to-video', '5-8s', '1080p', 'audio-generation'],
  },

  // === Image Models ===
  {
    name: 'nano-banana-pro',
    category: 'image',
    description: 'Nano Banana Pro — versatile image generation with great quality-cost ratio',
    pricing: { unit: 'per_call', cost: 0.02 },
    features: ['text-to-image', '1K-4K', 'fast'],
  },
  {
    name: 'z-image-turbo',
    category: 'image',
    description: 'Z-Image Turbo — fastest image generation, ideal for rapid iterations',
    pricing: { unit: 'per_call', cost: 0.01 },
    features: ['text-to-image', '1K', 'ultra-fast'],
  },
  {
    name: 'seedream-4-5',
    category: 'image',
    description: 'ByteDance Seedream 4.5 — photorealistic image generation',
    pricing: { unit: 'per_call', cost: 0.03 },
    features: ['text-to-image', '1K-2K', 'photorealistic'],
  },
  {
    name: 'qwen-image-edit',
    category: 'image',
    description: 'Qwen Image Edit — instruction-based image editing',
    pricing: { unit: 'per_call', cost: 0.03 },
    features: ['image-editing', 'instruction-based', '1K-2K'],
  },
  {
    name: 'gpt-4o-image',
    category: 'image',
    description: 'GPT-4o Image — highest quality, best prompt understanding',
    pricing: { unit: 'per_call', cost: 0.05 },
    features: ['text-to-image', 'image-editing', '1K-2K', 'best-quality'],
  },

  // === Music Models ===
  {
    name: 'suno-v4',
    category: 'music',
    description: 'Suno v4 — balanced music generation with good quality',
    pricing: { unit: 'per_call', cost: 0.05 },
    features: ['text-to-music', 'vocals', 'instrumental', '30-120s'],
  },
  {
    name: 'suno-v4.5',
    category: 'music',
    description: 'Suno v4.5 — improved quality and style control',
    pricing: { unit: 'per_call', cost: 0.08 },
    features: ['text-to-music', 'vocals', 'instrumental', '30-240s', 'style-control'],
  },
  {
    name: 'suno-v5',
    category: 'music',
    description: 'Suno v5 — latest and best music quality, studio-grade output',
    pricing: { unit: 'per_call', cost: 0.12 },
    features: ['text-to-music', 'vocals', 'instrumental', '30-240s', 'studio-quality'],
  },

  // === Digital Human ===
  {
    name: 'omnihuman-1.5',
    category: 'digital-human',
    description: 'OmniHuman 1.5 — audio-driven digital human video generation',
    pricing: { unit: 'per_second', cost: 0.15 },
    features: ['audio-driven', 'lip-sync', 'portrait-animation'],
  },
];

export function getModelsByCategory(category?: string): ModelInfo[] {
  if (!category || category === 'all') return MODELS;
  return MODELS.filter(m => m.category === category);
}

export function findModel(name: string): ModelInfo | undefined {
  return MODELS.find(m => m.name === name);
}
