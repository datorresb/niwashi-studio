---
name: niwashi-smoke-test
description: >
  E2E browser smoke test for a completed narrative visualization. Uses agent-browser
  CLI to verify all sections render, have no console errors, and interactions work.
  Run after REVIEW approves the narrative, or standalone with /niwashi-smoke-test.
---

# niwashi-smoke-test — E2E Browser Verification

> Post-review quality gate: verify the narrative works in a real browser.

## Prerequisites

1. `sections-checklist.json` exists with `review_approved: true`
2. The React project builds successfully (`npm run build` exits 0)
3. `agent-browser` is installed (`which agent-browser` or `npx agent-browser --version`)

If `agent-browser` is not installed:
```bash
npm i -g agent-browser && agent-browser install
```

If installation fails, log to progress.md and skip the smoke test.

## Procedure

### Step 1: Detect Dev Server

Check for a running dev server in this priority order:

| Priority | Check | URL |
|----------|-------|-----|
| 1 | `lsof -i :5173` | `http://localhost:5173` |
| 2 | `lsof -i :3000` | `http://localhost:3000` |
| 3 | `lsof -i :4173` | `http://localhost:4173` (Vite preview) |

If no server is running:
```bash
cd <project_path> && npm run dev &
sleep 3  # Wait for Vite to start
```

Record the base URL.

### Step 2: Map Sections to Routes

Read `sections-checklist.json` to get the section list. For a single-page
narrative (most niwashi projects), all sections are at the base URL — they
stack vertically.

```
Route: <base_url>           → All sections (scroll through)
Route: <base_url>#section-N → Individual section anchors (if defined)
```

### Step 3: Run Smoke Tests

For each section, verify:

```bash
# 1. Open the page
agent-browser open <base_url>

# 2. Wait for load
agent-browser wait --load networkidle

# 3. Snapshot — verify content rendered
agent-browser snapshot -i

# 4. Check for console errors
agent-browser console --level error

# 5. Screenshot as evidence
agent-browser screenshot --path smoke-test-section-N.png
```

**Per-section checks:**

| Check | Pass criteria | Failure severity |
|-------|---------------|-----------------|
| Section renders | Snapshot shows section heading + content | 🔴 |
| No console errors | `agent-browser console --level error` returns empty | 🔴 |
| No 404 resources | No network failures in console | 🟡 |
| Interactive elements present | Snapshot shows buttons/sliders/controls per wireframe | 🟡 |
| Screenshot captured | File exists and is > 0 bytes | 🔵 |

**Scroll to each section:**
```bash
# Scroll to section N (approximate — sections stack vertically)
agent-browser evaluate "window.scrollTo(0, document.querySelector('[data-section=\"N\"]')?.offsetTop || N * window.innerHeight)"
agent-browser wait --timeout 1000
agent-browser snapshot -i
agent-browser screenshot --path smoke-test-section-N.png
```

### Step 4: Interaction Spot-Check

For sections with interactions (per wireframe), verify the primary interaction:

```bash
# Example: click a button and verify response
agent-browser snapshot -i          # Find the interactive element ref
agent-browser click @eN            # Click it
agent-browser wait --timeout 500   # Wait for response
agent-browser snapshot -i          # Verify DOM changed
```

Only test the **primary** interaction per section — this is a smoke test,
not a comprehensive QA pass.

### Step 5: Summary

Produce a results table:

```markdown
## Smoke Test Results

| Section | Renders | Console | Interaction | Screenshot |
|---------|---------|---------|-------------|------------|
| 1 — Hero | ✅ | ✅ | ✅ (stagger animation) | smoke-test-section-1.png |
| 2 — Mechanism | ✅ | ✅ | ✅ (slider works) | smoke-test-section-2.png |
| 3 — Deep Dive | ✅ | 🟡 (1 warning) | ✅ | smoke-test-section-3.png |
| 4 — Summary | ✅ | ✅ | N/A (static) | smoke-test-section-4.png |

**Result: PASS** (0 🔴, 1 🟡, 0 🔵)
```

### Failure Handling

If any 🔴 findings:

Present to user with options:
1. **Fix** — return to BUILD to fix the issue, then re-run smoke test
2. **Skip** — log the issue and proceed to HARVEST anyway
3. **Abort** — stop the pipeline, user investigates manually

Log the decision and outcome to `progress.md`.
