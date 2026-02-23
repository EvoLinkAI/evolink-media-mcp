export interface ServerConfig {
  channel: 'official' | 'beta';
  baseUrl: string;
}

const BASE_URLS = {
  official: 'https://api.evolink.ai',
  beta: 'https://beta-api.evolink.ai',
} as const;

export function createConfig(channel: 'official' | 'beta'): ServerConfig {
  return {
    channel,
    baseUrl: BASE_URLS[channel],
  };
}

export function getApiKey(): string {
  const key = process.env.EVOLINK_API_KEY ?? '';
  if (!key) {
    throw new Error(
      'EVOLINK_API_KEY environment variable is required. ' +
      'Get your API key at https://evolink.ai/dashboard/keys'
    );
  }
  return key;
}
