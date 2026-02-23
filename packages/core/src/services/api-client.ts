import { type ServerConfig, getApiKey } from '../config.js';
import { formatApiError } from './error-handler.js';

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
  error?: { message: string };
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

export async function apiRequest(
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
    throw new Error(formatApiError(response.status, data));
  }

  return data as TaskResponse;
}

export async function queryTask(
  config: ServerConfig,
  taskId: string,
): Promise<TaskResponse> {
  return apiRequest(config, { method: 'GET', path: `/v1/tasks/${taskId}` });
}
