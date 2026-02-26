---
name: evolink-music
description: AI music generation with Suno v4, v4.5, v5. Text-to-music, custom lyrics, instrumental, vocal control. 5 models, one API key.
version: 1.1.0
metadata:
  openclaw:
    requires:
      env:
        - EVOLINK_API_KEY
    primaryEnv: EVOLINK_API_KEY
    emoji: 🎵
    homepage: https://evolink.ai
---

# Evolink Music — AI Music Generation

Generate AI music and songs with Suno v4, v4.5, and v5. Simple mode (describe and generate) or custom mode (write lyrics, control style, tempo, vocals). Instrumental or with vocals — all through one API.

> This is the music-focused view of [evolink-media](https://clawhub.ai/EvoLinkAI/evolink-media). Install the full skill for video and image generation too.

## Setup

Get your API key at [evolink.ai](https://evolink.ai) and set `EVOLINK_API_KEY`.

### Bridge MCP Server (recommended)

For the full tool experience, bridge the MCP server `@evolinkai/evolink-media` ([npm](https://www.npmjs.com/package/@evolinkai/evolink-media)):

**Via mcporter:**
```bash
mcporter call --stdio "npx -y @evolinkai/evolink-media@latest" list_models
```

**Or add to mcporter config:**
```json
{
  "evolink-media": {
    "transport": "stdio",
    "command": "npx",
    "args": ["-y", "@evolinkai/evolink-media@latest"],
    "env": { "EVOLINK_API_KEY": "your-key-here" }
  }
}
```

**Direct install** (Claude Code): `claude mcp add evolink-media -e EVOLINK_API_KEY=your-key -- npx -y @evolinkai/evolink-media@latest`

## MCP Tools

| Tool | Purpose |
|------|---------|
| `generate_music` | Create AI music or songs |
| `upload_file` | Upload audio files for reference or continuation workflows |
| `delete_file` | Remove uploaded files to free quota |
| `list_files` | View uploaded files and check storage quota |
| `check_task` | Poll generation progress and get result URLs |
| `list_models` | Browse available music models |
| `estimate_cost` | Check model pricing |

## Music Models (5, all BETA)

| Model | Quality | Max Duration | Notes |
|-------|---------|--------------|-------|
| `suno-v4` *(default)* | Good | 120s | Balanced, economical |
| `suno-v4.5` | Better | 240s | Style control |
| `suno-v4.5plus` | Better | 240s | Extended features |
| `suno-v4.5all` | Better | 240s | All v4.5 features |
| `suno-v5` | Best | 240s | Studio-grade output |

## Two Modes

### Simple Mode (`custom_mode: false`)
Describe what you want — AI writes lyrics and picks style automatically.

### Custom Mode (`custom_mode: true`)
You control everything: lyrics with `[Verse]`/`[Chorus]`/`[Bridge]` tags, style, title, vocal gender.

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `prompt` | string | — | Description or lyrics (required) |
| `custom_mode` | boolean | — | Simple vs custom mode (**required**) |
| `instrumental` | boolean | — | Instrumental or with vocals (**required**) |
| `model` | enum | `suno-v4` | Model to use |
| `duration` | integer | model decides | Target length in seconds (30–240s) |
| `style` | string | — | Genre/mood/tempo tags (custom mode) |
| `title` | string | — | Song title (custom mode, max 80 chars) |
| `negative_tags` | string | — | Styles to exclude |
| `vocal_gender` | enum | — | `m` or `f` (custom mode) |

## File Upload

Upload audio files for music continuation or remix workflows:

1. Call `upload_file` with `file_path`, `base64_data`, or `file_url` → get `file_url` (synchronous)

**Supported:** Audio (MP3, WAV, FLAC, AAC, OGG, M4A, etc.). Max **100MB**. Files expire after **72 hours**. Quota: 100 files (default) / 500 (VIP).

## Workflow

1. Set `custom_mode` + `instrumental` (both required, no defaults)
2. Call `generate_music` → get `task_id`
3. Poll `check_task` every 5–10s until `completed`
4. Download result URLs (expire in 24h)

## Without MCP Server — Direct File Hosting

When MCP tools are not available, you can still upload audio files to Evolink's hosting via `curl`:

```bash
# Upload local file
curl -X POST https://files-api.evolink.ai/api/v1/files/upload/stream \
  -H "Authorization: Bearer $EVOLINK_API_KEY" \
  -F "file=@/path/to/audio.mp3"

# Upload from URL
curl -X POST https://files-api.evolink.ai/api/v1/files/upload/url \
  -H "Authorization: Bearer $EVOLINK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"file_url": "https://example.com/track.mp3"}'
```

Response returns `file_url` (public link, expires in 72h). Supported: Audio (MP3, WAV, FLAC, AAC, OGG, M4A, etc.). Max **100MB**.

> For full music generation, bridge the MCP server `@evolinkai/evolink-media` — see Setup above.
