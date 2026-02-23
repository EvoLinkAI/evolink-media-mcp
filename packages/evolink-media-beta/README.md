# evolink-media-beta

> AI media generation via the EvoLink Beta channel — same models, best-effort SLA.

**EvoLink Media Beta** is the beta-channel version of the [evolink-media](https://www.npmjs.com/package/evolink-media) MCP server. It connects to EvoLink's beta API endpoint.

## Quick Start

```bash
npx evolink-media-beta
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
      "args": ["-y", "evolink-media-beta@latest"],
      "env": {
        "EVOLINK_API_KEY": "your-key-here"
      }
    }
  }
}
```

## Beta vs Official

| | Official (`evolink-media`) | Beta (`evolink-media-beta`) |
|---|---|---|
| Models | Same | Same |
| SLA | 99.9% uptime | Best-effort |
| Speed | Priority queue | Standard queue |

Choose **Beta** for experimentation. Choose **Official** for production workloads requiring reliability guarantees.

## Available Tools

Same 6 tools as the official version: `generate_image`, `generate_video`, `generate_music`, `list_models`, `estimate_cost`, `check_task`.

## License

MIT
