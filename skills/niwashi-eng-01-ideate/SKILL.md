---
name: niwashi-eng-01-ideate
description: "Generate and critically evaluate grounded improvement ideas for the current project. Use when asking what to improve, requesting idea generation, exploring surprising improvements, or wanting AI-generated project directions. Triggers on 'what should I improve', 'give me ideas', 'ideate', 'surprise me', 'what would you change'. Precedes brainstorming — ideate selects the best seeds, brainstorm defines them."
---

# 種選び (Tane Erabi) — Selecting the Finest Seeds

> *Before planting, the wise gardener surveys the entire seed collection — examining each possibility, testing viability, choosing only the seeds with the greatest potential for this particular soil.*

**Note: The current year is 2026.**

`niwashi-eng-01-ideate` precedes `niwashi-eng-02-brainstorm`.

- `niwashi-eng-01-ideate` answers: "What are the strongest ideas worth exploring?"
- `niwashi-eng-02-brainstorm` answers: "What exactly should one chosen idea mean?"
- `niwashi-eng-03-plan` answers: "How should it be built?"

This workflow produces a ranked ideation artifact in `docs/ideation/`. It does **not** produce requirements, plans, or code.

## Interaction Method

Use the platform's blocking question tool when available. Ask one question at a time. Prefer concise single-select choices when natural options exist.

## Focus Hint

<focus_hint> #$ARGUMENTS </focus_hint>

Interpret any provided argument as optional context: a concept, a path, a constraint, or a volume hint.

## Core Principles

1. **Ground before ideating** — Scan the actual codebase first. Do not generate abstract advice detached from the repository.
2. **Diverge before judging** — Generate the full idea set before evaluating any individual idea.
3. **Use adversarial filtering** — Quality comes from explicit rejection with reasons, not optimistic ranking.
4. **Preserve the artifact early** — Write the ideation document before presenting results.
5. **Route action into brainstorming** — Ideation identifies; brainstorming defines.

## Execution Flow

### Phase 0: Resume and Scope

#### 0.1 Check for Recent Ideation Work

Look in `docs/ideation/` for ideation documents created within the last 30 days. If relevant, ask whether to continue or start fresh.

#### 0.2 Interpret Focus and Volume

Infer: focus context, volume override, and issue-tracker intent from the argument.

Default volume: each sub-agent generates ~7-8 ideas (30-40 raw across agents, ~20-30 after dedupe), keep top 5-7 survivors. Honor clear overrides (`top 3`, `100 ideas`, `go deep`).

### Phase 1: Codebase Scan — 土壌調査 (Soil Survey)

Run agents in parallel (foreground):

1. **Quick context scan** — Discover project shape (language, framework, layout), notable patterns, pain points, leverage points.
2. **Learnings search** — Search `docs/solutions/` for institutional knowledge.
3. **Issue intelligence** (conditional) — If issue-tracker intent detected, analyze GitHub issues for theme clustering.

Consolidate into grounding summary with distinct sections: codebase context, past learnings, issue intelligence (when present).

### Phase 2: Divergent Ideation — 種まき (Seed Scattering)

1. Generate the full candidate list before critiquing any idea.
2. Each sub-agent targets ~7-8 ideas. With 4-6 agents → 30-40 raw → dedupe to 20-30.
3. Push past the safe obvious layer.
4. Ground every idea in Phase 1 scan.

**Ideation frames** (assign one per sub-agent as starting bias, not constraint):
- User or operator pain and friction
- Unmet need or missing capability
- Inversion, removal, or automation of a painful step
- Assumption-breaking or reframing
- Leverage and compounding effects
- Extreme cases, edge cases, or power-user pressure

Each sub-agent returns structured output: title, summary, why_it_matters, evidence, signals.

After deduping, synthesize cross-cutting combinations (3-5 additions max).

### Phase 3: Adversarial Filtering — 選別 (Sorting)

Two-layer critique:
1. Skeptical sub-agents attack the merged list from distinct angles
2. Orchestrator synthesizes critiques, applies rubric, scores survivors

For each rejected idea: one-line reason. Rejection criteria: too vague, not actionable, duplicates a stronger idea, not grounded in codebase, too expensive, already covered.

Survivor rubric weights: groundedness, expected value, novelty, pragmatism, leverage, implementation burden, overlap.

Target: 5-7 survivors. If too many, second stricter pass. If fewer than 5, report honestly.

### Phase 4: Present Survivors — 種の展示 (Seed Display)

Present surviving ideas with: title, description, rationale, downsides, confidence score, estimated complexity.

Include rejection summary. Allow brief follow-up questions before archiving.

### Phase 5: Write Ideation Artifact — 記録 (Recording)

Write to `docs/ideation/YYYY-MM-DD-<topic>-ideation.md` with:

```markdown
---
date: YYYY-MM-DD
topic: <kebab-case>
focus: <focus hint or "open-ended">
survivors: <count>
candidates_evaluated: <count>
---

# Ideation: <Topic Title>

## Grounding Summary
[Codebase context, learnings, issue intelligence]

## Surviving Ideas
### 1. [Title]
[Full structured details]

## Rejected Ideas
[One-line rejections]

## Session Log
[Key decisions, frame assignments, synthesis notes]
```

### Phase 6: Next Steps — 種の行き先 (Where Seeds Go)

Present options:
1. 🪴 **Brainstorm a selected idea** → `/niwashi-eng-02-brainstorm [idea]`
2. 🔄 **Refine ideation** — adjust focus or rerun
3. ⏹️ **End session** — ideation artifact is saved
