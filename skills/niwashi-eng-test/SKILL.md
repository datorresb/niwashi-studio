---
name: niwashi-eng-test
description: "Run browser tests on pages affected by current PR or branch — water the garden to check it thrives. Use when testing UI changes, verifying visual output, checking browser rendering, or running end-to-end tests on affected routes. Triggers on 'test browser', 'check the UI', 'verify pages', 'run e2e tests', or any browser testing request."
---

# 水やり (Mizuyari) — Watering the Garden

> *A careful gardener waters methodically, checking each plant responds well to the nourishment.*

Run end-to-end browser tests on pages affected by a PR or branch changes using the `agent-browser` CLI.

## Use `agent-browser` Only For Browser Automation

This workflow uses the `agent-browser` CLI exclusively. Do not use any alternative browser automation system, browser MCP integration, or built-in browser-control tool.

## Prerequisites

- Local development server running (e.g., `npm run dev`, `bin/dev`)
- `agent-browser` CLI installed
- Git repository with changes to test

## Procedure

### Step 1: Verify Installation

```bash
command -v agent-browser >/dev/null 2>&1 && echo "Ready" || (echo "Installing..." && npm install -g agent-browser && agent-browser install)
```

If installation fails, inform the user and stop.

### Step 2: Ask Browser Mode

Ask the user whether to run headed or headless:

1. **Headed (watch)** — Opens visible browser window
2. **Headless (faster)** — Runs in background

Use `--headed` flag when user selects option 1.

### Step 3: Determine Test Scope

**If PR number provided:**
```bash
gh pr view [number] --json files -q '.files[].path'
```

**If 'current' or empty:**
```bash
git diff --name-only main...HEAD
```

### Step 4: Map Files to Routes

| File Pattern | Route(s) |
|-------------|----------|
| `app/views/users/*` | `/users`, `/users/:id` |
| `app/controllers/*_controller.rb` | Corresponding resource routes |
| `src/app/*` (Next.js) | Corresponding routes |
| `src/components/*` | Pages using those components |
| `app/assets/stylesheets/*` | Visual regression on key pages |

Build a list of URLs to test based on the mapping.

### Step 5: Detect Dev Server Port

Priority: explicit arg → AGENTS.md → package.json → .env → default 3000

### Step 6: Verify Server Running

```bash
agent-browser open http://localhost:${PORT}
```

If not running, report and stop.

### Step 7: Test Each Page

For each route:
1. Navigate to the page
2. Take a snapshot of interactive elements
3. Verify key elements (title, content, no errors)
4. Test interactions where applicable
5. Take screenshot evidence

### Step 8: Human Verification Gates

Pause for user interaction on: OAuth flows, email verification, payment processing, SMS verification, external API callbacks.

### Step 9: Handle Failures

For each failure, ask:
1. **Fix now** — fix and retry
2. **Create todo** — log for later
3. **Skip** — continue testing

### Step 10: Output Summary

| Route | Status | Console Errors | Notes |
|-------|--------|---------------|-------|
| /path | ✅/❌ | count | description |

Report: total tested, passed, failed, skipped, todos created.
