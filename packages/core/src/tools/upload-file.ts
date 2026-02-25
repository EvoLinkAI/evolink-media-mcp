import { readFileSync } from 'node:fs';
import { basename, extname } from 'node:path';
import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { fileStreamUpload, fileBase64Upload, fileUrlUpload } from '../services/file-client.js';

// Image: only 4 specific MIME types accepted by the API
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);

// Audio & Video: API accepts audio/* and video/* wildcards
const MIME_MAP: Record<string, string> = {
  // Image (strict — only these 4 types)
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.gif': 'image/gif', '.webp': 'image/webp',
  // Audio (common formats, API accepts all audio/*)
  '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.flac': 'audio/flac',
  '.aac': 'audio/aac', '.ogg': 'audio/ogg', '.m4a': 'audio/mp4',
  '.wma': 'audio/x-ms-wma', '.opus': 'audio/opus', '.amr': 'audio/amr',
  // Video (common formats, API accepts all video/*)
  '.mp4': 'video/mp4', '.mov': 'video/quicktime', '.avi': 'video/x-msvideo',
  '.mkv': 'video/x-matroska', '.webm': 'video/webm', '.flv': 'video/x-flv',
  '.wmv': 'video/x-ms-wmv', '.ts': 'video/mp2t', '.m4v': 'video/mp4',
  '.3gp': 'video/3gpp',
};

function getMimeType(ext: string): string | null {
  return MIME_MAP[ext] ?? null;
}

const schema = {
  file_path: z.string().optional()
    .describe('Absolute path to a local file. Supports images (JPEG/PNG/GIF/WebP), all audio formats, and all video formats. Provide exactly one of file_path, base64_data, or file_url.'),
  base64_data: z.string().optional()
    .describe('Base64-encoded file data. Supports raw base64 or Data URL format (data:image/png;base64,...). Provide exactly one of file_path, base64_data, or file_url.'),
  file_url: z.string().optional()
    .describe('URL of a file to upload to Evolink cloud. The server downloads and stores it. Provide exactly one of file_path, base64_data, or file_url.'),
  upload_path: z.string().optional()
    .describe('Optional server-side subdirectory for organizing uploads'),
  file_name: z.string().optional()
    .describe('Optional custom file name for the uploaded file'),
};

export function registerUploadFile(server: McpServer): void {
  server.tool(
    'upload_file',
    'Upload a file (image/audio/video) to Evolink cloud storage and get a public URL. Three input modes: local file path, base64 data, or URL. Use for i2i, i2v, or audio-driven digital-human workflows. Max 100MB. Files expire after 72h. Quota: 100 files (default) / 500 (VIP) — use delete_file to free quota.',
    schema,
    async (params) => {
      const { file_path, base64_data, file_url, upload_path, file_name } = params;

      // Validate: exactly one source
      const sources = [file_path, base64_data, file_url].filter(Boolean);
      if (sources.length === 0) {
        return {
          content: [{ type: 'text' as const, text: 'Error: Provide one of file_path, base64_data, or file_url.' }],
          isError: true,
        };
      }
      if (sources.length > 1) {
        return {
          content: [{ type: 'text' as const, text: 'Error: Provide only one of file_path, base64_data, or file_url.' }],
          isError: true,
        };
      }

      let result;

      if (file_path) {
        // Local file → stream upload (efficient, no base64 overhead)
        const ext = extname(file_path).toLowerCase();
        const mime = getMimeType(ext);
        if (!mime) {
          return {
            content: [{ type: 'text' as const, text: `Error: Unrecognized file format "${ext}". Supported: Images (JPEG/PNG/GIF/WebP), Audio (all common formats), Video (all common formats).` }],
            isError: true,
          };
        }
        if (mime.startsWith('image/') && !IMAGE_EXTENSIONS.has(ext)) {
          return {
            content: [{ type: 'text' as const, text: `Error: Unsupported image format "${ext}". Only JPEG, PNG, GIF, and WebP are accepted.` }],
            isError: true,
          };
        }

        const fileBuffer = readFileSync(file_path);
        result = await fileStreamUpload(fileBuffer, mime, basename(file_path), upload_path, file_name);
      } else if (base64_data) {
        // Base64 data → base64 upload
        result = await fileBase64Upload(base64_data, upload_path, file_name);
      } else {
        // URL → URL upload (server downloads directly)
        result = await fileUrlUpload(file_url!, upload_path, file_name);
      }

      const d = result.data!;
      const lines = [
        'File uploaded successfully.',
        '',
        `File URL: ${d.file_url}`,
        `Download URL: ${d.download_url}`,
        `File ID: ${d.file_id}`,
        `File Name: ${d.original_name}`,
        `Size: ${(d.file_size / 1024).toFixed(1)} KB`,
        `Type: ${d.mime_type}`,
        `Expires: ${d.expires_at}`,
        '',
        'Use the File URL as input for generation tools (image_urls, audio input, etc.).',
        'Note: Files expire after 72 hours. Use delete_file to free quota when no longer needed.',
      ];

      return {
        content: [{ type: 'text' as const, text: lines.join('\n') }],
      };
    },
  );
}
