# Pattern Document Template

Use this template when creating `niwashi_docs/patterns/<concept-type>.md`.

Every field in the YAML frontmatter is required. Every section must contain at least one specific, concrete bullet point — no placeholders or generic statements.

---

````markdown
---
concept_type: <kebab-case-concept-identifier>
date: <YYYY-MM-DD>
narrative: <name-of-completed-narrative>
---

# Pattern: <Concept Type> Narratives

## Narrative Arc That Worked

Document the section structure and ordering that produced a coherent explanation.

- **Section count:** <N sections>
- **Ordering rationale:** <why this order — e.g., "concrete example first, then abstraction, then interactive exploration">
- **Section 1 — <title>:** <what it covered, why it worked as the opener>
- **Section 2 — <title>:** <what it covered, how it built on section 1>
- ... (one entry per section)
- **"Aha moment" placement:** <which section, what triggered it, why that position worked — e.g., "Section 3 of 5: after the user manually adjusted parameters and saw the cost function respond in real time">

## Interaction Patterns That Worked

List each interaction with its mechanism, context, and observed effect.

- **<Interaction name>:** <mechanism> — <why it worked>
  - Example: "Parameter slider for learning rate (range 0.001–1.0, log scale, step 0.001) — users could see gradient descent converge/diverge in real time, creating intuitive understanding of the stability tradeoff"
- **<Interaction name>:** <mechanism> — <why it worked>
  - Example: "Step-through animation with play/pause/step controls and speed slider (0.5x–4x) — better than autoplay because users paused to inspect intermediate states"

## Visual Approaches

Document the visual system with reproducible specifics.

- **Color palette:**
  - Primary: <token or hex — e.g., "slate-950 (#020617) background, slate-50 (#f8fafc) text">
  - Accent: <token or hex — e.g., "amber-500 (#f59e0b) for active/highlight states">
  - Data encoding: <how color maps to data — e.g., "warm→cool gradient (amber-500 to sky-600) for cost→optimal">
- **Typography:**
  - Body: <font, size, line-height — e.g., "Inter 16px/1.6, slate-200">
  - Code: <font, size — e.g., "JetBrains Mono 14px/1.5, inline within prose">
  - Headings: <style — e.g., "Inter 600 weight, tracking-tight, scale 1.25/1.5/2rem">
- **Key motif:** <the recurring visual element — e.g., "subtle grid-dot pattern at 3% opacity reinforcing 'data points' theme">
- **Layout pattern:** <overall page structure — e.g., "sticky sidebar with parameter controls, scrollable main panel, sections separated by 4rem with fade-in on scroll-enter">
- **Transitions:** <how elements enter/change — e.g., "scroll-triggered fade-up with 200ms ease-in, staggered 50ms per element within a section">

## What Didn't Work / Revisions Needed

Document approaches that were tried and abandoned or significantly reworked. Include what replaced them.

- **<What was tried>** → **<what replaced it>** — <why>
  - Example: "3D force-directed graph (Three.js) → 2D node layout with drop-shadow depth cues — 3D had 400ms frame time on mobile, dragging was imprecise, and the extra dimension didn't add explanatory value for this concept"
- **<What was tried>** → **<what replaced it>** — <why>
  - Example: "Accordion sections for progressive disclosure → scroll-driven flow with sticky headers — accordion forced users to choose what to read; scroll let them see everything in order"

## Reuse Recommendations

Specify when to reuse this pattern and when to deviate.

- **Reuse when:** <conditions — e.g., "explaining iterative optimization algorithms with ≤5 tunable parameters and a visualizable objective function">
- **Deviate when:** <conditions — e.g., "the concept is inherently sequential (like a data pipeline) — replace the exploration-first arc with a left-to-right flow diagram">
- **Key adaptation points:** <what a future narrative should customize — e.g., "swap the parameter slider ranges and labels; keep the scroll-driven reveal structure">
- **Avoid:** <specific antipatterns learned — e.g., "don't use 3D visualizations unless depth is semantically meaningful to the concept">
````

---

## When merging with an existing pattern file

If `niwashi_docs/patterns/<concept-type>.md` already exists, do NOT overwrite. Instead:

1. Read the existing file
2. Append a new section at the bottom:

```markdown
---

## From: <narrative-name> (YYYY-MM-DD)

### Additional Arc Insights
- ...

### Additional Interaction Patterns
- ...

### Additional Visual Approaches
- ...

### Additional Revisions / Lessons
- ...

### Updated Reuse Recommendations
- ...
```

3. If the new narrative contradicts an earlier recommendation, note the contradiction explicitly:

```markdown
> **Update from <narrative>:** Earlier recommendation to "<old advice>" was revised.
> <new advice> — because <reason>.
```
