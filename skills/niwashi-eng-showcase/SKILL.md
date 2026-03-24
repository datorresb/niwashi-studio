---
name: niwashi-eng-showcase
description: "Record a video walkthrough of a feature and add it to the PR description — offer a guided garden tour. Use when a PR needs a visual demo, when recording feature walkthroughs, creating PR videos, or showing what changed visually. Triggers on 'record video', 'demo this', 'create walkthrough', 'feature video', 'showcase', 'garden tour'."
---

# 庭見 (Niwami) — Guided Garden Tour

> *After the garden is complete, the master gardener leads visitors through each carefully designed space, explaining the intention behind every element.*

Record browser interactions demonstrating a feature, stitch screenshots into an MP4 video, upload natively to GitHub, and embed in the PR description.

## Prerequisites

- Local development server running
- `agent-browser` CLI installed
- `ffmpeg` installed (for video conversion)
- `gh` CLI authenticated
- Git repository on a feature branch

## Procedure

### Step 1: Parse Arguments & Resolve PR

Parse the input:
- First argument: PR number, "current", or path to existing `.mp4` file (upload-only resume)
- Second argument: Base URL (defaults to `http://localhost:3000`)

**Upload-only resume:** If first arg ends in `.mp4` and file exists, skip to Step 6.

If no PR exists for current branch, ask:
1. Create a draft PR now and continue
2. Record video only — save locally
3. Cancel

### Step 2: Verify Required Tools

```bash
command -v ffmpeg && command -v agent-browser && command -v gh
```

Fail early if any tool is missing.

### Step 3: Gather Feature Context

Get PR files and map to demonstrable routes.

### Step 4: Plan Video Flow

Create a shot list:
1. Opening — show the page before changes
2. Navigation — walk through affected routes
3. Feature demo — demonstrate the new behavior
4. Edge cases — show error handling
5. Success — final state

Present to user for confirmation.

### Step 5: Record Walkthrough

Generate unique RUN_ID. For each shot:
```bash
agent-browser open [url]
agent-browser snapshot -i
agent-browser screenshot [RUN_DIR]/screenshots/[NN]-[description].png
```

### Step 6: Create Video

```bash
ffmpeg -framerate 0.5 -pattern_type glob -i "[RUN_DIR]/screenshots/*.png" \
  -c:v libx264 -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
  [RUN_DIR]/videos/feature-demo.mp4
```

### Step 7: Upload to GitHub

Authenticate and upload video via GitHub browser interface using `agent-browser`. Extract the `user-attachments/assets/` URL.

### Step 8: Update PR Description

Append `## Demo` section with video URL to PR description.

### Step 9: Cleanup

Ask before removing scratch directory. If upload failed, preserve video and report local path.
