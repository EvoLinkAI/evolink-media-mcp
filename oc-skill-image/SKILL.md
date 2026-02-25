---
name: evolink-image
description: AI image generation & editing — GPT Image, GPT-4o, Seedream, Qwen, WAN, Gemini. Text-to-image, image-to-image, inpainting. 19 models, one API key.
version: 1.1.0
metadata:
  openclaw:
    requires:
      env:
        - EVOLINK_API_KEY
    primaryEnv: EVOLINK_API_KEY
    emoji: 🖼️
    homepage: https://evolink.ai
---

# Evolink Image — AI Image Generation & Editing

Generate and edit AI images with 19 models including GPT Image 1.5, GPT-4o Image, Seedream, Qwen, WAN, and Gemini. Text-to-image, image-to-image, instruction-based editing, and inpainting — all through one API.

> This is the image-focused view of [evolink-media](https://clawhub.ai/EvoLinkAI/evolink-media). Install the full skill for video and music generation too.

## Setup

Get your API key at [evolink.ai](https://evolink.ai) and set `EVOLINK_API_KEY`.

## MCP Tools

| Tool | Purpose |
|------|---------|
| `generate_image` | Create or edit AI images |
| `upload_file` | Upload local images for editing or reference workflows |
| `delete_file` | Remove uploaded files to free quota |
| `list_files` | View uploaded files and check storage quota |
| `check_task` | Poll generation progress and get result URLs |
| `list_models` | Browse available image models |
| `estimate_cost` | Check model pricing |

## Image Models (19)

### Top Picks

| Model | Best for | Speed |
|-------|----------|-------|
| `gpt-image-1.5` *(default)* | Latest OpenAI generation | Medium |
| `z-image-turbo` | Quick iterations | Ultra-fast |
| `doubao-seedream-4.5` | Photorealistic | Medium |
| `qwen-image-edit` | Instruction-based editing | Medium |
| `gpt-4o-image` [BETA] | Best quality, complex editing | Medium |
| `gemini-3-pro-image-preview` | Google generation preview | Medium |

### All Stable Models (15)

`gpt-image-1.5`, `gpt-image-1`, `gemini-3-pro-image-preview`, `z-image-turbo`, `doubao-seedream-4.5`, `doubao-seedream-4.0`, `doubao-seedream-3.0-t2i`, `doubao-seededit-4.0-i2i`, `doubao-seededit-3.0-i2i`, `qwen-image-edit`, `qwen-image-edit-plus`, `wan2.5-t2i-preview`, `wan2.5-i2i-preview`, `wan2.5-text-to-image`, `wan2.5-image-to-image`

### All Beta Models (4)

`gpt-image-1.5-lite`, `gpt-4o-image`, `gemini-2.5-flash-image`, `nano-banana-2-lite`

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `prompt` | string | — | Image description (required) |
| `model` | enum | `gpt-image-1.5` | Model to use |
| `size` | string | model default | **GPT models:** `1024x1024`, `1024x1536`, `1536x1024`. **Others:** `1:1`, `16:9`, `9:16`, etc. |
| `n` | integer 1–4 | 1 | Number of images |
| `image_urls` | string[] | — | Reference images for editing (max 14) |
| `mask_url` | string | — | PNG mask for inpainting (gpt-4o-image only) |

## File Upload

For image-to-image editing or reference-based generation, upload local files first:

1. Call `upload_file` with `file_path`, `base64_data`, or `file_url` → get `file_url` (synchronous)
2. Use that `file_url` as `image_urls` or `mask_url` input for `generate_image`

**Supported:** Images (JPEG/PNG/GIF/WebP only). Max **100MB**. Files expire after **72 hours**. Quota: 100 files (default) / 500 (VIP).

## Workflow

1. Upload reference/mask images if needed (via `upload_file`)
2. Call `generate_image` → get `task_id`
3. Poll `check_task` every 3–5s until `completed`
4. Download result URLs (expire in 24h)
