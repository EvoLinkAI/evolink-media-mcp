# evolink-media

> Generate AI videos, images & music with one API key. 10+ top models including Sora, Kling, Veo, Seedance, Suno, and more.

**EvoLink Media** is an MCP (Model Context Protocol) server that gives AI assistants like Claude the ability to generate multimedia content through a unified API.

## Quick Start

```bash
npx evolink-media
```

Set your API key:
```bash
export EVOLINK_API_KEY="your-key-here"
```

Get your API key at [evolink.ai/dashboard/keys](https://evolink.ai/dashboard/keys).

## MCP Configuration

### Claude Desktop / Claude Code

Add to your MCP settings:

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

## Available Tools

| Tool | Description |
|------|-------------|
| `generate_image` | Generate AI images (returns result directly) |
| `generate_video` | Generate AI videos (returns task_id for async polling) |
| `generate_music` | Generate AI music (returns task_id for async polling) |
| `list_models` | List available models with pricing |
| `estimate_cost` | Estimate generation cost |
| `check_task` | Check async task status and results |

## Supported Models

### Video
- **seedance-2-0** — ByteDance, excellent motion quality
- **sora-2** — OpenAI, cinematic generation
- **kling-o3** — Kuaishou, fast and cost-effective
- **veo-3-1-pro** — Google, top-tier cinematic quality

### Image
- **gpt-4o-image** — Best quality and prompt understanding
- **nano-banana-pro** — Great quality-cost ratio
- **z-image-turbo** — Ultra-fast generation
- **seedream-4-5** — Photorealistic
- **qwen-image-edit** — Instruction-based editing

### Music
- **suno-v5** — Studio-grade quality
- **suno-v4.5** — Balanced quality and speed
- **suno-v4** — Fast and affordable

## License

MIT
