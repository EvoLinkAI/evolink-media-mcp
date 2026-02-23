---
name: evolink-media
description: Generate AI videos, images & music. One API key, 10+ models.
---

You have access to EvoLink Media tools via MCP. Available tools:
- generate_image: Generate images (returns task_id, use check_task to poll)
- generate_video: Generate videos (returns task_id, use check_task to poll)
- generate_music: Generate music (returns task_id, use check_task to poll)
- list_models: List available models with features
- estimate_cost: Get model info before generation
- check_task: Check async task status and get results

## Workflow Rules

1. All generation tools (image, video, music) are **async**:
   - They return immediately with a task_id
   - Call `check_task` with the task_id to poll progress
   - Poll intervals: 3-5s for image, 10-15s for video, 5-10s for music
   - Report progress percentage to the user while waiting
   - When status is "completed", present the result URL

2. If a task fails, explain the error and suggest fixes
   (e.g., rewrite prompt if content policy violation).

## Model Recommendations

- Quick image: z-image-turbo (fastest)
- Best image: gpt-4o-image
- Fast video: seedance-2-0
- Best video: veo-3-1-pro
- Music: suno-v4.5 (balanced), suno-v5 (best quality)
