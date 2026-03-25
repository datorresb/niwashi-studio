---
title: "feat: Anti-convergence design reinforcement for BUILD phase"
type: feat
status: active
date: 2026-03-24
origin: https://claude.com/blog/improving-frontend-design-through-skills
---

# Anti-Convergence Design Reinforcement for BUILD Phase

## Overview

During BUILD (phase 4), the agent implements React sections from a visual language spec created in RESEARCH (phase 2). These may run in separate conversations with fresh context. The visual language spec is excellent — but the problem identified by Anthropic's blog on frontend design is that **models converge to generic patterns during code generation**, even when they have good specs.

Niwashi already avoids the worst of this (Inter/Roboto bans, semantic color requirements), but three dimensions have no explicit guidance and one dimension lacks BUILD-time reinforcement.

## Problem Statement

**Distributional convergence** means the agent will tend toward safe, generic implementations unless actively nudged. This manifests as:

1. **Flat backgrounds** — solid white/dark with no atmosphere (niwashi has zero background guidance)
2. **Uniform section layouts** — every section looks structurally identical
3. **Missing page-load choreography** — no staggered reveal, everything appears at once
4. **Spec drift** — the visual language is defined in RESEARCH but by BUILD time, the agent has so much implementation context that design intent gets diluted

## Proposed Solution: Three Changes

### Change 1: Expand RESEARCH Stream 4 (stream-visual.md)

Add a new **§2.5 Background Treatment** section between Typography and Animation Vocabulary. This ensures the visual language spec *defines* backgrounds as a first-class design dimension alongside color, typography, and animation.

Rationale: Background treatment is a design specification task — it belongs in the visual language, not as a BUILD-time afterthought.

### Change 2: New BUILD reference — `references/design-reinforcement.md`

A compact (~400 token) file loaded by BUILD before each section. This is NOT a duplicate of the visual language — it's a psychological nudge that:

- Reminds the agent it tends to converge and must resist
- Specifies backgrounds, staggered reveals, and cross-section variation as check-dimensions
- References the spec's visual language as the source of truth (read it, don't invent)

Rationale: The Anthropic blog shows that even ~400 tokens of anti-convergence framing dramatically improves quality. This is cheap context that activates at the right moment.

### Change 3: Wire it into BUILD SKILL.md §3.2

Add one bullet to the existing design quality principles referencing the new file, and add it to the §3.1 Read Inputs step.

## What We're NOT Doing

- Not duplicating the visual language in BUILD — the reinforcement file points TO the spec
- Not expanding beyond Anthropic's proven patterns — typography, color, motion, backgrounds, variation
- Not adding a theme system — niwashi narratives each have their own visual language, themes are already handled per-narrative
- Not touching WIREFRAME, REVIEW, or HARVEST — this is strictly BUILD + RESEARCH

## Acceptance Criteria

- [ ] `stream-visual.md` has a §2.5 Background Treatment section
- [ ] `references/design-reinforcement.md` exists and is ≤500 tokens
- [ ] `SKILL.md` §3.1 lists the new reference as an input
- [ ] `SKILL.md` §3.2 references the new file in design quality principles
- [ ] No existing behavior is broken — all existing guidance preserved
- [ ] The reinforcement does NOT duplicate content from stream-visual.md

## Files to Touch

| File | Change |
|------|--------|
| `skills/niwashi-02-research/references/stream-visual.md` | Add §2.5 Background Treatment after Typography |
| `skills/niwashi-04-build/references/design-reinforcement.md` | **New file** — compact anti-convergence nudge |
| `skills/niwashi-04-build/SKILL.md` | Wire new reference into §3.1 and §3.2 |

## Risk Assessment

**Low risk.** All changes are additive. No existing behavior removed. The new reference is small (~400 tokens) and won't bloat context. The stream-visual.md addition follows the exact pattern of existing sections.
