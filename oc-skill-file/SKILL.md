---
name: evolink-file
description: Upload local files (images, audio, video) to Evolink cloud storage for use with AI generation. Get public URLs for image-to-image, image-to-video, and digital-human workflows.
version: 1.0.0
metadata:
  openclaw:
    requires:
      env:
        - EVOLINK_API_KEY
    primaryEnv: EVOLINK_API_KEY
    emoji: 📁
    homepage: https://evolink.ai
---

# Evolink File — File Upload to Cloud

Upload local files (images, audio, video) to Evolink cloud storage and get public URLs. Use these URLs as input for image-to-image (`generate_image`), image-to-video (`generate_video`), or audio-driven digital-human generation.

> This is the file-upload view of [evolink-media](https://clawhub.ai/EvoLinkAI/evolink-media). Install the full skill for video, image, and music generation.

## Setup

Get your API key at [evolink.ai](https://evolink.ai) and set `EVOLINK_API_KEY`.

## MCP Tools

| Tool | Purpose |
|------|---------|
| `upload_file` | Upload a local file and get a public URL |
| `delete_file` | Delete an uploaded file to free quota |
| `list_files` | List uploaded files and check storage quota |

## Supported Formats

- **Images:** JPEG, PNG, GIF, WebP (only these 4 types)
- **Audio:** All formats (`audio/*`) — MP3, WAV, FLAC, AAC, OGG, M4A, etc.
- **Video:** All formats (`video/*`) — MP4, MOV, AVI, MKV, WebM, FLV, etc.

One file per request, max **100MB**. Uploaded files expire after **72 hours**. Quota: 100 files (default) / 500 (VIP).

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file_path` | string | One of three | Absolute path to a local file (stream upload) |
| `base64_data` | string | One of three | Base64-encoded file data (raw or Data URL format) |
| `file_url` | string | One of three | URL of a remote file (server downloads directly) |
| `upload_path` | string | No | Server-side subdirectory |
| `file_name` | string | No | Custom file name |

## Workflow

1. Call `upload_file` with `file_path`, `base64_data`, or `file_url`
2. Get back `file_url` and `download_url` immediately (synchronous)
3. Use `file_url` as input for generation tools (`image_urls`, audio input, etc.)
4. When quota is full, use `list_files` to check and `delete_file` to free space

## Examples

```
User: "I want to turn this photo into a video"
→ upload_file(file_path: "/path/to/photo.jpg")
→ generate_video(prompt: "animate this photo", image_urls: ["<returned file_url>"])
→ check_task(task_id: "<task_id>")
```

```
User: "Use this audio to drive a digital human"
→ upload_file(file_path: "/path/to/speech.mp3")
→ Use the returned file_url as audio input for digital-human generation
```
