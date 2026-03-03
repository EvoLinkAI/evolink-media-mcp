export interface RouterConfig {
  baseUrl: string;
}

const BASE_URL = 'https://direct.evolink.ai';

export function createConfig(): RouterConfig {
  return { baseUrl: BASE_URL };
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
