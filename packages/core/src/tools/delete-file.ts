import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { fileDelete } from '../services/file-client.js';

const schema = {
  file_id: z.string().describe('The file ID to delete (e.g., file_abc123456). Use list_files to find file IDs.'),
};

export function registerDeleteFile(server: McpServer): void {
  server.tool(
    'delete_file',
    'Delete an uploaded file from Evolink cloud storage to free quota. Each user has a file quota (100 default / 500 VIP). Use list_files to see uploaded files and their IDs.',
    schema,
    async (params) => {
      await fileDelete(params.file_id);

      return {
        content: [{ type: 'text' as const, text: `File ${params.file_id} deleted successfully. Quota slot freed.` }],
      };
    },
  );
}
