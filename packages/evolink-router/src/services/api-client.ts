import type { RouterConfig } from '../config.js';
import { getApiKey } from '../config.js';
import { findModel } from '../data/text-models.js';
import { getAdapter, type ChatRequest, type ChatResponse } from './api-adapters.js';
import { formatApiError } from './error-handler.js';

// --- Error class ---

export class ApiHttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiHttpError';
  }
}

// --- Retry logic ---

const RETRYABLE_STATUS_CODES = new Set([429, 502, 503]);

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function isRetryable(error: unknown): boolean {
  if (error instanceof ApiHttpError) return RETRYABLE_STATUS_CODES.has(error.status);
  if (error instanceof TypeError) return true; // network errors
  return false;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  retries: number,
  baseDelayMs: number,
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < retries && isRetryable(error)) {
        await sleep(baseDelayMs * (attempt + 1));
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}

// --- Core chat request (no retry) ---

async function rawChatRequest(
  config: RouterConfig,
  req: ChatRequest,
): Promise<ChatResponse> {
  const model = findModel(req.model);
  if (!model) {
    throw new Error(`Unknown model: "${req.model}". Use list_text_models to see available models.`);
  }

  const adapter = getAdapter(model.apiFormat);
  const { path, body } = adapter.buildRequest(req);
  const url = `${config.baseUrl}${path}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getApiKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json() as unknown;

  if (!response.ok) {
    throw new ApiHttpError(response.status, formatApiError(response.status, data));
  }

  return adapter.parseResponse(data);
}

// --- Public API ---

/** Send a chat request with automatic format adaptation and retry. */
export async function chatRequest(
  config: RouterConfig,
  req: ChatRequest,
): Promise<ChatResponse> {
  return withRetry(() => rawChatRequest(config, req), 1, 2000);
}
