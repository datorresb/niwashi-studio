---
name: niwashi-06-harvest
description: "Extract reusable patterns from a completed narrative visualization. Use niwashi-06-harvest after a narrative passes review, when wrapping up a narrative project, when the user says 'harvest', 'extract patterns', 'what did we learn', 'save what worked', 'document patterns', or when sections-checklist.json shows review_approved: true. This skill reads the full build history and produces a pattern document that future RESEARCH phases can actually use."
---

# niwashi-06-harvest — Pattern Extraction

> *実り (Minori) — Gather fruit, save seeds for next season.*

## Purpose

You are closing the loop. After a narrative passes REVIEW, you read everything that happened — the spec, the rework history, the git log — and distill it into a pattern document. This pattern doc lives in `niwashi_docs/patterns/` where future RESEARCH phases will find it and adapt it instead of starting from scratch.

A pattern doc is only valuable if it is **specific enough to reuse**. "Nice animations" is useless. "Scroll-triggered fade with 200ms ease-in on section transitions" is useful. You will self-check against the quality guide and revise until the pattern meets the bar.

## Prerequisites

Before starting, verify:

1. **`sections-checklist.json`** exists and has `review_approved: true`
2. **`narrative-spec.md`** exists (your primary source)
3. **Git history** is available for the narrative's build commits

If any prerequisite is missing, tell the user what's needed and stop.

## Inputs

Read these artifacts in order:

### 1. narrative-spec.md

The full specification: concept, audience, narrative arc, visual language, wireframes.

```
Read: niwashi_docs/<narrative>/narrative-spec.md
Extract:
  - Concept type (e.g., optimization-algorithm, neural-network)
  - Audience definition
  - Narrative arc: section titles, ordering, "aha moment" placement
  - Visual language: color palette, typography, key motifs
  - Interaction designs from wireframes
```

### 2. sections-checklist.json (rework history)

The build state tracker reveals which sections needed rework and how many iterations they took.

```
Read: niwashi_docs/<narrative>/sections-checklist.json
Extract:
  - Which sections passed on first attempt (these patterns are strongest)
  - Which sections needed rework (these go in "What Didn't Work")
  - Number of rework cycles per section
  - Any calibration notes from early sections
```

### 3. Git log

The commit history shows what actually changed during BUILD.

```
Run: git log --oneline --all -- . | head -40
Also: git log --stat --all -- "src/components/" | head -80   (if React app exists)
Extract:
  - Major refactors or approach changes
  - Components that were rewritten vs stable from first commit
  - Any reverted commits (strong signal of what didn't work)
```

### 4. progress.md (optional)

If `niwashi_docs/<narrative>/progress.md` exists, scan it for session notes about difficulties, pivots, or decisions made during the workflow.

## Output

Produce one file:

```
niwashi_docs/patterns/<concept-type>.md
```

Where `<concept-type>` is derived from the narrative's concept (e.g., `optimization-algorithm.md`, `data-pipeline.md`, `neural-network.md`). Use kebab-case.

If a pattern file for this concept type already exists (from a prior narrative on the same topic), **merge** — add a new dated section rather than overwriting.

## Process

### Step 1: Gather Sources

Read all inputs listed above. Do this in parallel where possible:

- Read `narrative-spec.md`
- Read `sections-checklist.json`
- Run git log commands
- Read `progress.md` if it exists

### Step 2: Analyze Patterns

For each category below, extract **specific, concrete** patterns:

**Narrative Arc:**
- What section ordering worked? Why that order?
- Where was the "aha moment" placed? (e.g., "Section 3 of 5 — after setup but before deep complexity")
- What narrative device carried the explanation? (e.g., "progressive disclosure via tabbed panels")

**Interaction Patterns:**
- What interactions kept users engaged? Be specific about the mechanism.
- Good: "Draggable node graph where repositioning triggers force-directed layout recalculation — users explored topology for 2+ minutes"
- Bad: "Interactive diagram was engaging"

**Visual Approaches:**
- Color palette with actual values or descriptive tokens (e.g., "warm→cool gradient: amber-500 to sky-600 for cost→optimal")
- Typography choices and why (e.g., "monospace for code snippets inline with prose, 14px/1.6 for readability")
- Key visual motif (e.g., "circuit-board grid background at 5% opacity to reinforce 'systems' theme")
- Layout patterns (e.g., "sticky left panel for controls, scrollable right panel for narrative")

**What Didn't Work:**
- Cross-reference `sections-checklist.json` for sections that needed rework
- Check git log for reverted or heavily modified components
- Be honest and specific: "3D force graph was too heavy — 400ms frame time on mobile. Replaced with 2D with depth cues via drop shadows"

**Reuse Recommendations:**
- When should a future narrative reuse this pattern?
- When should it deviate? (e.g., "This arc works for algorithm explanations but not data pipeline narratives where the flow is inherently linear")

### Step 3: Write Pattern Document

Use the template from `references/pattern-template.md`. Fill every section with the specific patterns extracted in Step 2.

```
Create: niwashi_docs/patterns/<concept-type>.md
```

Write the YAML frontmatter first:
- `concept_type`: kebab-case concept identifier
- `date`: today's date (YYYY-MM-DD)
- `narrative`: name of the completed narrative (matches the `niwashi_docs/<narrative>/` directory name)

Then write each section. Every bullet point must pass the specificity test:

> **Can another agent reading this pattern reproduce the approach without guessing?**
>
> If the answer is no, the pattern is too vague.

### Step 4: Quality Self-Check

After writing the pattern doc, read `skills/niwashi-06-harvest/references/pattern-quality-guide.md` and evaluate your output against its criteria.

**Check each section:**

| Section | Specific enough? | Example of passing | Example of failing |
|---------|-----------------|--------------------|--------------------|
| Narrative Arc | Names sections, positions aha moment | "Aha at section 3/5, after constraint setup" | "Good flow" |
| Interactions | Names the mechanism + observed effect | "Slider for λ parameter, range 0-1, step 0.01" | "Interactive controls" |
| Visual Approaches | Reproducible values | "bg-slate-950, text-slate-50, accent amber-500" | "Dark theme" |
| What Didn't Work | Names the problem + what replaced it | "Pie chart → horizontal bar (better for comparison)" | "Had to fix some things" |
| Reuse Recs | States when to use AND when not to | "For ≤7 variables; beyond that, use matrix view" | "Reuse when appropriate" |

**If any section fails:** Revise that section with more specific content. Check again.

**Maximum 2 revision cycles.** If a section is still vague after 2 revisions (typically because the source material itself lacks detail), add a callout:

```markdown
> ⚠️ **Needs enrichment:** This section lacks specificity because [reason].
> A human should review and add concrete details from their experience with this narrative.
```

### Step 5: Confirm & Log

After the pattern doc passes the quality check:

1. **Commit** the pattern file:
   ```
   git add niwashi_docs/patterns/<concept-type>.md
   git commit -m "harvest(<concept-type>): extract patterns from <narrative>"
   ```

2. **Log to progress.md:**
   ```markdown
   ## Session YYYY-MM-DD HH:MM
   Phase: HARVEST
   Action: Extracted patterns to niwashi_docs/patterns/<concept-type>.md
   Quality: [all sections passed / N sections flagged for enrichment]
   ```

3. **Tell the user:**
   - What patterns were extracted
   - Whether any sections need human enrichment
   - That the loop is closed — next time RESEARCH runs, it will find these patterns

## Handling Edge Cases

### Pattern file already exists

If `niwashi_docs/patterns/<concept-type>.md` already exists from a prior narrative:

1. Read the existing file
2. Add a new dated section at the bottom: `## From: <narrative> (YYYY-MM-DD)`
3. Merge — don't duplicate patterns that already exist, add new ones
4. Update `Reuse Recommendations` if the new narrative revealed different conditions

### Minimal rework history

If `sections-checklist.json` shows all sections passed on the first attempt:

- "What Didn't Work" can be brief but should still note tradeoffs considered
- Check git log for any commits that suggest exploratory changes even if the checklist was clean

### No git history

If the narrative was built without git commits (edge case):

- Skip git-based analysis
- Rely on `sections-checklist.json` and `progress.md`
- Note in the pattern doc that git history was unavailable

## What You Do NOT Do

- **Do not modify** `narrative-spec.md`, `sections-checklist.json`, or any BUILD artifacts
- **Do not start a new narrative** — that's DISCOVER's job
- **Do not evaluate subjective quality** — REVIEW already did that. You document what happened, not whether it was good enough
- **Do not reference source methodologies** — patterns stand on their own
- **Do not write implementation code** — patterns describe approaches, not components

## The Loop Closes Here

This is the last phase. The pattern doc you produce feeds back into the workflow:

```
HARVEST produces → niwashi_docs/patterns/<concept-type>.md
RESEARCH reads   → niwashi_docs/patterns/ (Step 1: check for prior art)
```

When a future narrative covers a similar concept, RESEARCH will find your pattern doc and adapt it — skipping rediscovery of what already works. The quality of that shortcut depends entirely on how specific your patterns are.

Write patterns you'd want to find if you were starting the next narrative.
