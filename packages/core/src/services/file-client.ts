import { getApiKey } from '../config.js';
import { ApiHttpError, withRetry } from './api-client.js';

const FILES_API_BASE_URL = 'https://files-api.evolink.ai';

// --- Types ---

export interface FileUploadData {
  file_id: string;
  file_name: string;
  original_name: string;
  file_size: number;
  mime_type: string;
  upload_path: string;
  file_url: string;
  download_url: string;
  upload_time: string;
  expires_at: string;
}

export interface FileListData {
  total: number;
  files: Array<{
    file_id: string;
    file_name: string;
    file_size: number;
    upload_time: string;
  }>;
}

export interface FileQuotaData {
  user_group: string;
  used_files: number;
  max_files: number;
  remain_files: number;
}

interface FileApiResponse<T = unknown> {
  success: boolean;
  code: number;
  msg: string;
  data?: T;
}

// --- Helpers ---

function authHeaders(): Record<string, string> {
  return { 'Authorization': `Bearer ${getApiKey()}` };
}

function formatFileError(status: number, data: unknown): string {
  const body = data as Record<string, unknown>;
  if (body?.msg && typeof body.msg === 'string') {
    return `File API error (${body.code ?? status}): ${body.msg}`;
  }
  return `File API HTTP ${status}`;
}

async function parseResponse<T>(response: Response): Promise<FileApiResponse<T>> {
  const data = await response.json() as unknown;

  if (!response.ok) {
    throw new ApiHttpError(response.status, formatFileError(response.status, data));
  }

  const body = data as FileApiResponse<T>;
  if (body.success === false) {
    throw new ApiHttpError(body.code, formatFileError(body.code, data));
  }

  return body;
}

// --- Upload: Base64 ---

async function rawBase64Upload(
  base64Data: string,
  uploadPath?: string,
  fileName?: string,
): Promise<FileApiResponse<FileUploadData>> {
  const url = `${FILES_API_BASE_URL}/api/v1/files/upload/base64`;
  const body: Record<string, string> = { base64_data: base64Data };
  if (uploadPath) body.upload_path = uploadPath;
  if (fileName) body.file_name = fileName;

  const response = await fetch(url, {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return parseResponse<FileUploadData>(response);
}

export async function fileBase64Upload(
  base64Data: string,
  uploadPath?: string,
  fileName?: string,
): Promise<FileApiResponse<FileUploadData>> {
  return withRetry(() => rawBase64Upload(base64Data, uploadPath, fileName), 1, 2000);
}

// --- Upload: Stream (multipart/form-data) ---

async function rawStreamUpload(
  fileData: Uint8Array,
  mime: string,
  originalName: string,
  uploadPath?: string,
  fileName?: string,
): Promise<FileApiResponse<FileUploadData>> {
  const url = `${FILES_API_BASE_URL}/api/v1/files/upload/stream`;
  const blob = new Blob([fileData], { type: mime });
  const formData = new FormData();
  formData.append('file', blob, originalName);
  if (uploadPath) formData.append('uploadPath', uploadPath);
  if (fileName) formData.append('fileName', fileName);

  const response = await fetch(url, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  });

  return parseResponse<FileUploadData>(response);
}

export async function fileStreamUpload(
  fileData: Uint8Array,
  mime: string,
  originalName: string,
  uploadPath?: string,
  fileName?: string,
): Promise<FileApiResponse<FileUploadData>> {
  return withRetry(() => rawStreamUpload(fileData, mime, originalName, uploadPath, fileName), 1, 2000);
}

// --- Upload: URL ---

async function rawUrlUpload(
  fileUrl: string,
  uploadPath?: string,
  fileName?: string,
): Promise<FileApiResponse<FileUploadData>> {
  const url = `${FILES_API_BASE_URL}/api/v1/files/upload/url`;
  const body: Record<string, string> = { file_url: fileUrl };
  if (uploadPath) body.upload_path = uploadPath;
  if (fileName) body.file_name = fileName;

  const response = await fetch(url, {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return parseResponse<FileUploadData>(response);
}

export async function fileUrlUpload(
  fileUrl: string,
  uploadPath?: string,
  fileName?: string,
): Promise<FileApiResponse<FileUploadData>> {
  return withRetry(() => rawUrlUpload(fileUrl, uploadPath, fileName), 1, 2000);
}

// --- Delete ---

async function rawFileDelete(fileId: string): Promise<FileApiResponse> {
  const url = `${FILES_API_BASE_URL}/api/v1/files/${fileId}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: authHeaders(),
  });

  return parseResponse(response);
}

export async function fileDelete(fileId: string): Promise<FileApiResponse> {
  return withRetry(() => rawFileDelete(fileId), 1, 2000);
}

// --- List ---

async function rawFileList(page: number, pageSize: number): Promise<FileApiResponse<FileListData>> {
  const url = `${FILES_API_BASE_URL}/api/v1/files/list?page=${page}&pageSize=${pageSize}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: authHeaders(),
  });

  return parseResponse<FileListData>(response);
}

export async function fileList(page = 1, pageSize = 20): Promise<FileApiResponse<FileListData>> {
  return withRetry(() => rawFileList(page, pageSize), 1, 2000);
}

// --- Quota ---

async function rawFileQuota(): Promise<FileApiResponse<FileQuotaData>> {
  const url = `${FILES_API_BASE_URL}/api/v1/files/quota`;
  const response = await fetch(url, {
    method: 'GET',
    headers: authHeaders(),
  });

  return parseResponse<FileQuotaData>(response);
}

export async function fileQuota(): Promise<FileApiResponse<FileQuotaData>> {
  return withRetry(() => rawFileQuota(), 1, 2000);
}
