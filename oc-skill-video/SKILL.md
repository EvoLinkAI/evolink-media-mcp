---
name: evolink-video
description: AI video generation — Sora, Kling, Veo 3, Seedance, Hailuo, WAN, Grok. Text-to-video, image-to-video, video editing. 37 models, one API key.
version: 1.0.0
metadata:
  openclaw:
    requires:
      env:
        - EVOLINK_API_KEY
    primaryEnv: EVOLINK_API_KEY
    emoji: 🎬
    homepage: https://evolink.ai
---

# Evolink Video — AI Video Generation

Generate AI videos with 37 models including Sora, Kling, Veo 3, Seedance, Hailuo, WAN, and Grok. Text-to-video, image-to-video, first-last-frame, video editing, and audio generation — all through one API.

> This is the video-focused view of [evolink-media](https://clawhub.ai/EvoLinkAI/evolink-media). Install the full skill for image and music generation too.

## Setup

Get your API key at [evolink.ai](https://evolink.ai) and set `EVOLINK_API_KEY`.

## MCP Tools

| Tool | Purpose |
|------|---------|
| `generate_video` | Create AI videos from text or images |
| `check_task` | Poll generation progress and get result URLs |
| `list_models` | Browse available video models |
| `estimate_cost` | Check model pricing |

## Video Models (37)

### Top Picks

| Model | Best for | Features |
|-------|----------|----------|
| `seedance-1.5-pro` *(default)* | Image-to-video, first-last-frame | i2v, 4–12s, 1080p, audio |
| `sora-2-preview` | Cinematic preview | t2v, i2v, 1080p |
| `kling-o3-text-to-video` | Text-to-video, 1080p | t2v, 3–15s |
| `veo-3.1-generate-preview` | Google video preview | t2v, 1080p |
| `MiniMax-Hailuo-2.3` | High-quality video | t2v, 1080p |
| `wan2.6-text-to-video` | Alibaba latest t2v | t2v |
| `sora-2` [BETA] | Cinematic, prompt adherence | t2v, i2v, 1080p |
| `veo3.1-pro` [BETA] | Top quality + audio | t2v, 1080p, audio |

### All Stable Models (26)

`seedance-1.5-pro`, `seedance-2.0`, `doubao-seedance-1.0-pro-fast`, `sora-2-preview`, `kling-o3-text-to-video`, `kling-o3-image-to-video`, `kling-o3-reference-to-video`, `kling-o3-video-edit`, `kling-v3-text-to-video`, `kling-v3-image-to-video`, `kling-o1-image-to-video`, `kling-o1-video-edit`, `kling-o1-video-edit-fast`, `kling-custom-element`, `veo-3.1-generate-preview`, `veo-3.1-fast-generate-preview`, `MiniMax-Hailuo-2.3`, `MiniMax-Hailuo-2.3-Fast`, `MiniMax-Hailuo-02`, `wan2.5-t2v-preview`, `wan2.5-i2v-preview`, `wan2.5-text-to-video`, `wan2.5-image-to-video`, `wan2.6-text-to-video`, `wan2.6-image-to-video`, `wan2.6-reference-video`

### All Beta Models (11)

`sora-2`, `sora-2-pro`, `sora-2-beta-max`, `sora-character`, `veo3.1-pro`, `veo3.1-fast`, `veo3.1-fast-extend`, `veo3`, `veo3-fast`, `grok-imagine-text-to-video`, `grok-imagine-image-to-video`

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `prompt` | string | — | Video description (required) |
| `model` | enum | `seedance-1.5-pro` | Model to use |
| `duration` | integer | model default | Duration in seconds |
| `aspect_ratio` | enum | `16:9` | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `21:9` |
| `quality` | enum | model default | `480p` / `720p` / `1080p` / `4k` |
| `image_urls` | string[] | — | Reference images for i2v |
| `generate_audio` | boolean | model default | Auto-generate audio (seedance-1.5-pro, veo3.1-pro) |

## Workflow

1. Call `generate_video` → get `task_id`
2. Poll `check_task` every 10–15s until `completed`
3. Download result URLs (expire in 24h)
