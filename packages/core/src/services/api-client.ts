import { type ServerConfig, getApiKey } from '../config.js';
import { formatApiError } from './error-handler.js';

// --- Types ---

interface RequestOptions {
  method: 'GET' | 'POST';
  path: string;
  body?: Record<string, unknown>;
}

export interface TaskResponse {
  created: number;
  id: string;
  model: string;
  object: string;
  progress: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  type: string;
  results?: string[];
  result_data?: ResultDataItem[];
  task_info?: {
    can_cancel?: boolean;
    estimated_time?: number;
    video_duration?: number;
  };
  usage?: {
    billing_rule: string;
    credits_reserved: number;
    user_group: string;
  };
  error?: {
    code?: string;
    message?: string;
    type?: string;
  };
}

export interface ResultDataItem {
  result_id?: string;
  duration?: number;
  tags?: string;
  title?: string;
  image_url?: string;
  audio_url?: string;
  stream_audio_url?: string;
  video_url?: string;
}

// --- Error class for HTTP-level failures ---

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
  if (error instanceof TypeError) return true; // network errors (DNS, timeout, etc.)
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

// --- Core request (no retry) ---

async function rawRequest(
  config: ServerConfig,
  options: RequestOptions,
): Promise<TaskResponse> {
  const url = `${config.baseUrl}${options.path}`;
  const headers: Record<string, string> = {
    'Authorization': `Bearer ${getApiKey()}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    method: options.method,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json() as unknown;

  if (!response.ok) {
    throw new ApiHttpError(response.status, formatApiError(response.status, data));
  }

  return data as TaskResponse;
}

// --- Public API ---

/** Submit a generation task (POST). Retries once on 429/502/503 or network failures. */
export async function apiRequest(
  config: ServerConfig,
  options: RequestOptions,
): Promise<TaskResponse> {
  return withRetry(() => rawRequest(config, options), 1, 2000);
}

/** Query task status (GET). Retries up to 3 times for robust polling. */
export async function queryTask(
  config: ServerConfig,
  taskId: string,
): Promise<TaskResponse> {
  return withRetry(
    () => rawRequest(config, { method: 'GET', path: `/v1/tasks/${taskId}` }),
    3,
    1500,
  );
}

export function formatUsageInfo(usage?: TaskResponse['usage']): string {
  if (!usage?.credits_reserved) return '';
  return `Estimated cost: ${usage.credits_reserved} credits (${usage.billing_rule ?? 'standard'})`;
}

