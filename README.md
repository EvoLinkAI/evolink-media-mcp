# EvoLink Media MCP

**Generate AI videos, images & music with one API key.**

One unified MCP server, 10+ top AI models — Sora, Kling, Veo, Seedance, Suno, GPT-4o, and more. Works with Claude Desktop, Claude Code, Cursor, Windsurf, and any MCP-compatible client.

## Install

### Claude Code (Plugin)

```bash
claude plugin install evolink-media@claude-plugin-directory
```

### Claude Desktop / Any MCP Client

```json
{
  "mcpServers": {
    "evolink-media": {
      "command": "npx",
      "args": ["-y", "evolink-media@latest"],
      "env": {
        "EVOLINK_API_KEY": "your-key-here"
      }
    }
  }
}
```

### Cursor

Go to **Settings → MCP** and add:
- Command: `npx -y evolink-media@latest`
- Environment: `EVOLINK_API_KEY=your-key-here`

### Windsurf

Add to `~/.codeium/windsurf/mcp_config.json`:
```json
{
  "mcpServers": {
    "evolink-media": {
      "command": "npx",
      "args": ["-y", "evolink-media@latest"],
      "env": {
        "EVOLINK_API_KEY": "your-key-here"
      }
    }
  }
}
```

## Get Your API Key

1. Sign up at [evolink.ai](https://evolink.ai)
2. Go to [Dashboard → API Keys](https://evolink.ai/dashboard/keys)
3. Create a new key and set it as `EVOLINK_API_KEY`

## Tools

| Tool | Description | Sync/Async |
|------|-------------|------------|
| `generate_image` | Generate AI images | Sync (returns result) |
| `generate_video` | Generate AI videos | Async (returns task_id) |
| `generate_music` | Generate AI music | Async (returns task_id) |
| `list_models` | Browse available models | Sync |
| `estimate_cost` | Get cost estimate | Sync |
| `check_task` | Poll async task progress | Sync |

## Supported Models

### Video Generation
| Model | Quality | Speed | Cost |
|-------|---------|-------|------|
| seedance-2-0 | ★★★★ | Fast | $0.12/s |
| sora-2 | ★★★★★ | Medium | $0.25/s |
| kling-o3 | ★★★ | Fast | $0.08/s |
| veo-3-1-pro | ★★★★★ | Slow | $0.40/s |

### Image Generation
| Model | Quality | Speed | Cost |
|-------|---------|-------|------|
| z-image-turbo | ★★★ | Ultra-fast | $0.01 |
| nano-banana-pro | ★★★★ | Fast | $0.02 |
| seedream-4-5 | ★★★★ | Medium | $0.03 |
| qwen-image-edit | ★★★★ | Medium | $0.03 |
| gpt-4o-image | ★★★★★ | Medium | $0.05 |

### Music Generation
| Model | Quality | Cost |
|-------|---------|------|
| suno-v4 | ★★★ | $0.05 |
| suno-v4.5 | ★★★★ | $0.08 |
| suno-v5 | ★★★★★ | $0.12 |

## Two Editions

| | `evolink-media` | `evolink-media-beta` |
|---|---|---|
| npm | [![npm](https://img.shields.io/npm/v/evolink-media)](https://www.npmjs.com/package/evolink-media) | [![npm](https://img.shields.io/npm/v/evolink-media-beta)](https://www.npmjs.com/package/evolink-media-beta) |
| API Endpoint | api.evolink.ai | beta-api.evolink.ai |
| Pricing | Standard | Lower |
| SLA | 99.9% | Best-effort |
| Best for | Production | Experimentation |

## Development

```bash
git clone https://github.com/EvoLinkAI/evolink-media-mcp.git
cd evolink-media-mcp
npm install
npm run build
```

Test locally:
```bash
EVOLINK_API_KEY=your-key node packages/evolink-media/dist/index.js
```

Inspect with MCP Inspector:
```bash
npx @modelcontextprotocol/inspector node packages/evolink-media/dist/index.js
```

## License

MIT — [EvoLink AI](https://evolink.ai)
