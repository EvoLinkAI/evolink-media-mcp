# @evolinkai/evolink-media-beta

> AI media generation via the EvoLink Beta channel — same 60+ models, best-effort SLA.

**EvoLink Media Beta** is the beta-channel version of [@evolinkai/evolink-media](https://www.npmjs.com/package/@evolinkai/evolink-media). It connects to EvoLink's beta API endpoint.

## Quick Start

```bash
npx @evolinkai/evolink-media-beta
```

Set your API key:
```bash
export EVOLINK_API_KEY="your-key-here"
```

Get your API key at [evolink.ai/dashboard/keys](https://evolink.ai/dashboard/keys).

## MCP Configuration

```json
{
  "mcpServers": {
    "evolink-media-beta": {
      "command": "npx",
      "args": ["-y", "@evolinkai/evolink-media-beta@latest"],
      "env": {
        "EVOLINK_API_KEY": "your-key-here"
      }
    }
  }
}
```

## Beta vs Official

| | Official (`@evolinkai/evolink-media`) | Beta (`@evolinkai/evolink-media-beta`) |
|---|---|---|
| Models | 60+ (same) | 60+ (same) |
| SLA | 99.9% uptime | Best-effort |
| Speed | Priority queue | Standard queue |

Choose **Beta** for experimentation. Choose **Official** for production workloads.

## Available Tools

Same 6 tools as the official version: `generate_image`, `generate_video`, `generate_music`, `list_models`, `estimate_cost`, `check_task`.

## License

MIT — [EvoLink AI](https://evolink.ai)
