---
name: niwashi-eng-weed
description: "Resolve all pending todos using parallel processing, compound on lessons learned, then clean up — weed the garden for a clean bed. Use when resolving review findings, cleaning up todos, or after a code review produced action items. Triggers on 'resolve todos', 'fix review findings', 'weed', 'clean up todos'."
---

# 草取り (Kusatori) — Weeding the Garden

> *A well-maintained garden requires regular weeding. Each weed removed makes space for what matters.*

Resolve all TODO comments using parallel processing, document lessons learned, then clean up completed todos.

## Procedure

### Step 1: Analyze

Get all unresolved TODOs from the `todos/` directory.

If any todo recommends deleting, removing, or gitignoring files in `docs/brainstorms/`, `docs/plans/`, or `docs/solutions/`, skip it and mark it as `wont_fix`. These are engineering pipeline artifacts that are intentional and permanent.

### Step 2: Plan

Create a task list grouped by type. Analyze dependencies and prioritize items that others depend on. Output a mermaid flow diagram showing execution order — what can run in parallel and what must run first.

### Step 3: Implement (PARALLEL)

Spawn a resolver agent for each unresolved item.

- If 1-4 items: direct parallel returns
- If 5+ items: batch in groups of max 4 agents
- Each resolver returns only a short status: todo handled, files changed, tests run/skipped, any blockers

For large sets (5+), use a scratch directory (`.context/niwashi-eng/weed/<run-id>/`) to store artifacts. Return only completion summaries to the parent.

### Step 4: Commit & Resolve

```bash
git add .
git commit -m "fix: resolve review findings"
git push
```

GATE: STOP. Verify todos resolved and changes committed before proceeding.

### Step 5: Compound on Lessons

Load the `niwashi-eng-07-compound` skill to document what was learned from resolving the todos.

Todo resolutions often surface patterns, recurring issues, or architectural insights worth capturing. This step ensures knowledge compounds rather than being lost.

GATE: If no non-trivial learnings, continue to step 6.

### Step 6: Clean Up

List all todos with `done` or `resolved` status and delete them. Clean scratch directory if used.

Output summary:
```
Weeds pulled: [count resolved]
Seeds saved: [path to solution doc, or "skipped"]
Bed cleaned: [count deleted]
```
