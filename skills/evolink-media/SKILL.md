---
name: evolink-media
description: Generate AI videos, images & music. One API key, 10+ models.
---

You have access to EvoLink Media tools via MCP. Available tools:
- generate_image: Generate images (returns result directly)
- generate_video: Generate videos (returns task_id, use check_task to poll)
- generate_music: Generate music (returns task_id, use check_task to poll)
- list_models: List available models with pricing
- estimate_cost: Estimate cost before generation
- check_task: Check async task status and get results

## Workflow Rules

1. Before any generation, call `estimate_cost` for expensive models (Sora, Veo)
   and inform the user of the estimated cost. Proceed only after confirmation.

2. For `generate_video` and `generate_music`:
   - They return immediately with a task_id
   - Call `check_task` with the task_id to poll progress
   - Wait 10-15 seconds between polls for video, 5-10 seconds for music
   - Report progress percentage to the user while waiting
   - When status is "completed", present the result URL

3. For `generate_image`:
   - It returns the result directly (no polling needed)
   - Present the image URL to the user

4. Always include the cost in your response when a generation completes.

5. If a task fails, explain the error and suggest fixes
   (e.g., rewrite prompt if content policy violation).

## Model Recommendations

- Quick image: z-image-turbo (fastest, cheapest)
- Best image: gpt-4o-image
- Budget video: seedance-2-0
- Best video: veo-3-1-pro (expensive, confirm cost first)
- Music: suno-v4.5 (balanced), suno-v5 (best quality)
