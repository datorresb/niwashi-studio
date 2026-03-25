---
name: niwashi-slfg
description: >
  Autonomous orchestrator that chains all 6 niwashi phases with parallel BUILD,
  automatic BUILD↔REVIEW correction loops, and post-review smoke testing.
  Use when you want to run the full narrative creation pipeline with minimal
  human intervention. Invoke with: /niwashi-slfg <concept> [--cycles N]
---

# niwashi-slfg — Autonomous Narrative Pipeline

> *庭の流れ (Niwa no Nagare) — The garden flows from seed to harvest.*

Run the complete niwashi-studio pipeline autonomously: DISCOVER through HARVEST,
with parallel BUILD, auto-correction loops, and smoke testing.

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `concept` | required | The concept to explain (passed to DISCOVER) |
| `--cycles N` | 3 | Max BUILD↔REVIEW loop iterations before escalating to user |
| `--audience` | (asked in DISCOVER) | Target audience (optional, skips DISCOVER question) |

## Budget Limits

| Limit | Value | When hit |
|-------|-------|----------|
| Max turns per phase | 50 | Checkpoint to progress.md, suggest new conversation |
| Max total tokens | 500K per phase | Enter conservation mode at 400K |
| Max BUILD↔REVIEW cycles | `--cycles` (default 3) | Escalate to user |

## Pipeline

```
┌──────────────────────────────────────────────────┐
│  Sequential (human checkpoints)                   │
│                                                   │
│  DISCOVER ──→ RESEARCH ──→ WIREFRAME             │
│  (skill 01)   (skill 02)   (skill 03)            │
│                                                   │
│  User approves wireframes                         │
└──────────────────┬───────────────────────────────┘
                   │
┌──────────────────▼───────────────────────────────┐
│  Swarm BUILD (parallel sections)                  │
│                                                   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐            │
│  │Section 1│ │Section 2│ │Section N│  (parallel)  │
│  │(calibr.)│ │(calibr.)│ │(auto)   │             │
│  └────┬────┘ └────┬────┘ └────┬────┘            │
│       └──────┬─────┘──────────┘                  │
│              │ all passes: true                   │
└──────────────┼───────────────────────────────────┘
               │
┌──────────────▼───────────────────────────────────┐
│  Auto-loop: BUILD ↔ REVIEW                        │
│                                                   │
│  cycle = 0                                        │
│  while cycle < max_cycles:                        │
│    run REVIEW (skill 05, --cycles max_cycles)     │
│    if review_approved: break                      │
│    fix 🔴 findings in BUILD                       │
│    cycle++                                        │
│                                                   │
│  if not approved after max_cycles:                │
│    → escalate to user                             │
└──────────────┬───────────────────────────────────┘
               │ review_approved: true
┌──────────────▼───────────────────────────────────┐
│  Post-review: SMOKE TEST                          │
│  (skill: niwashi-smoke-test, if available)        │
│                                                   │
│  → Launch dev server                              │
│  → Navigate all sections                          │
│  → Screenshot + verify no errors                  │
│  → If fails: return to BUILD fix loop             │
│  → If niwashi-smoke-test not installed: skip      │
└──────────────┬───────────────────────────────────┘
               │
┌──────────────▼───────────────────────────────────┐
│  HARVEST (skill 06) → DONE                        │
│                                                   │
│  Extract patterns to niwashi_docs/patterns/       │
│  Commit and log                                   │
└──────────────────────────────────────────────────┘
```

## Procedure

### Step 0: Read State

Check artifact state in `niwashi_docs/` to determine where to resume.
Follow the same routing logic as the `@niwashi` orchestrator.

**Backlog integration:** If Backlog MCP is available (try `task_list` — if it works, Backlog is on):
- Create an epic task: `"SLFG: <narrative-name>"` with label `slfg`
- For each phase below, create/update a sub-task with the phase label
- If Backlog is unavailable, skip silently — progress.md handles everything

| State | Resume at |
|-------|-----------|
| Nothing | Step 1 (DISCOVER) |
| `narrative-brief.md` only | Step 2 (RESEARCH) |
| `narrative-spec.md`, no wireframes | Step 3 (WIREFRAME) |
| Wireframes exist, no checklist | Step 4 (BUILD) |
| Checklist exists, some `passes: false` | Step 4 (BUILD continue) |
| All `passes: true`, `review_approved: false` | Step 5 (REVIEW loop) |
| `review_approved: true` | Step 6 (SMOKE TEST) or Step 7 (HARVEST) |
| Pattern doc exists | DONE |

### Step 1: DISCOVER

Read and execute `skills/narrative/niwashi-01-discover/SKILL.md`.

Pass the `concept` parameter. If `--audience` was provided, include it.
Wait for the user to approve the narrative brief.

### Step 2: RESEARCH

Read and execute `skills/narrative/niwashi-02-research/SKILL.md`.

Run the 4 parallel research streams. Produce `narrative-spec.md`.

### Step 3: WIREFRAME

Read and execute `skills/narrative/niwashi-03-wireframe/SKILL.md`.

Generate ASCII wireframes for all sections. **Wait for user approval.**
This is the last mandatory human checkpoint before autonomous execution.

### Step 4: BUILD (Swarm)

Read and execute `skills/narrative/niwashi-04-build/SKILL.md`.

**Parallel execution for sections 3+:**

After sections 1-2 are calibrated and approved by the user, dispatch
remaining sections as parallel subagents:

```
For each section S where calibration_required: false:
  Subagent: "Implement section {S.id}: {S.title}
    Read skills/narrative/niwashi-04-build/SKILL.md §3 (Per-Section Build Loop)
    Implement section {S.id} only
    Verify fresh (build + console + render)
    Update sections-checklist.json for this section
    Commit: feat(section-{S.id}): {S.title}"
```

Wait for all subagents to complete. Verify no conflicts in
`sections-checklist.json`. Run one final `npm run build`.

### Step 5: REVIEW Loop

```
cycle = 0
max_cycles = --cycles parameter (default 3)

while cycle < max_cycles:
  Read and execute skills/narrative/niwashi-05-review/SKILL.md --cycles {max_cycles}
  
  Read sections-checklist.json
  if review_approved == true:
    Log "REVIEW approved after {cycle + 1} cycle(s)" to progress.md
    break
  
  # 🔴 findings exist — fix in BUILD
  cycle++
  Log "REVIEW cycle {cycle}/{max_cycles}: fixing 🔴 findings" to progress.md
  Fix each 🔴 finding in the relevant section
  Re-verify: npm run build

if review_approved == false:
  Log "REVIEW: max cycles ({max_cycles}) reached with unresolved findings"
  Present findings to user
  STOP — user decides next steps
```

### Step 6: SMOKE TEST

If `skills/narrative/niwashi-smoke-test/SKILL.md` exists:
  Read and execute it.
  If smoke test fails → return to BUILD to fix, then re-run smoke test.

If skill is not installed:
  Log "Smoke test skipped — niwashi-smoke-test not installed" to progress.md.
  Proceed to HARVEST.

### Step 7: HARVEST

Read and execute `skills/narrative/niwashi-06-harvest/SKILL.md`.

Extract patterns, commit, and log.

### Step 8: DONE

```markdown
## SLFG Pipeline Complete

Narrative: <name>
Phases completed: DISCOVER → RESEARCH → WIREFRAME → BUILD → REVIEW → HARVEST
BUILD↔REVIEW cycles: <N>
Pattern extracted: niwashi_docs/patterns/<concept-type>.md
```

Output: `DONE`
