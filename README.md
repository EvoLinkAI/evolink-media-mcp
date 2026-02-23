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

| Tool | Description | Returns |
|------|-------------|---------|
| `generate_image` | Generate AI images | task_id (async) |
| `generate_video` | Generate AI videos | task_id (async) |
| `generate_music` | Generate AI music | task_id (async) |
| `list_models` | Browse available models | model list |
| `estimate_cost` | Get model info | model info |
| `check_task` | Poll task progress & get results | status / result URLs |

## Supported Models

### Video Generation
| Model | Quality | Speed |
|-------|---------|-------|
| seedance-2-0 | ★★★★ | Fast |
| sora-2 | ★★★★★ | Medium |
| kling-o3 | ★★★ | Fast |
| veo-3-1-pro | ★★★★★ | Slow |

### Image Generation
| Model | Quality | Speed |
|-------|---------|-------|
| z-image-turbo | ★★★ | Ultra-fast |
| nano-banana-pro | ★★★★ | Fast |
| seedream-4-5 | ★★★★ | Medium |
| qwen-image-edit | ★★★★ | Medium |
| gpt-4o-image | ★★★★★ | Medium |

### Music Generation
| Model | Quality |
|-------|---------|
| suno-v4 | ★★★ |
| suno-v4.5 | ★★★★ |
| suno-v5 | ★★★★★ |

For pricing details, visit [evolink.ai/pricing](https://evolink.ai/pricing).

## Two Editions

| | `evolink-media` | `evolink-media-beta` |
|---|---|---|
| npm | [![npm](https://img.shields.io/npm/v/evolink-media)](https://www.npmjs.com/package/evolink-media) | [![npm](https://img.shields.io/npm/v/evolink-media-beta)](https://www.npmjs.com/package/evolink-media-beta) |
| API Endpoint | api.evolink.ai | beta-api.evolink.ai |
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
