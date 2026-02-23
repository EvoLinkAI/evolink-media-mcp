# evolink-media-beta

> Cost-effective AI media generation — same models, lower prices via the EvoLink Beta channel.

**EvoLink Media Beta** is the cost-optimized version of the [evolink-media](https://www.npmjs.com/package/evolink-media) MCP server. It connects to EvoLink's beta API endpoint which offers lower pricing for the same AI models.

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
| Pricing | Standard | Lower |
| SLA | 99.9% uptime | Best-effort |
| Speed | Priority queue | Standard queue |

Choose **Beta** if you want the best price. Choose **Official** for production workloads requiring reliability guarantees.

## Available Tools

Same 6 tools as the official version: `generate_image`, `generate_video`, `generate_music`, `list_models`, `estimate_cost`, `check_task`.

## License

MIT
