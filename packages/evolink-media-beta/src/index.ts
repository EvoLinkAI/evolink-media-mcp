#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createServer, createConfig, getApiKey } from '../../core/src/server.js';

async function main(): Promise<void> {
  getApiKey(); // validate API key early

  const config = createConfig('beta');
  const server = createServer(config);
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('EvoLink Media MCP Server (beta) started');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
