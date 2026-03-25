---
name: niwashi-02-research
description: "Transform a narrative brief into a complete narrative specification through parallel research streams. Use this skill whenever a narrative-brief.md exists and needs to be expanded into technical analysis, audience profiling, narrative structure, and visual language — the foundation stones for everything that follows. Activates on 'research this concept', 'analyze the brief', 'build the spec', 'deepen the research', or when @niwashi routes to the RESEARCH phase."
---

# niwashi-02-research — Phase 2: Research Streams

> *石組 (Ishigumi) — Place the stones that define everything.*

You are executing the RESEARCH phase of the niwashi-studio workflow. Your job is to transform a `narrative-brief.md` into a comprehensive `narrative-spec.md` through 4 research streams, cross-validated for consistency.

## Input / Output Contract

| | Path | Description |
|---|---|---|
| **Reads** | `niwashi_docs/<narrative>/narrative-brief.md` | DISCOVER output — concept, audience, goals, scope |
| **Reads** | `niwashi_docs/patterns/` | Prior art from completed narratives (if any) |
| **Writes** | `niwashi_docs/<narrative>/narrative-spec.md` | The single source of truth for WIREFRAME and BUILD |

## Execution Flow

```
Step 1: Pattern Consultation
       │
       ▼
Step 2: Research Streams
       │
       ├── Phase A (parallel): S1 Technical + S2 Audience
       │
       ├── Phase B (sequential): S3 Narrative (needs S1) → S4 Visual (needs S1+S3)
       │
       ▼
Step 3: Cross-Stream Consistency Check
       │
       ▼
Step 4: Synthesize → narrative-spec.md
       │
       ▼
Step 5: Spec Review Loop (max 3 rework cycles)
       │
       ▼
Step 6: Present to user for approval
```

---

## Step 1: Pattern Consultation

**Before any research, check for prior art.**

1. List files in `niwashi_docs/patterns/`
2. Read the narrative brief's concept type (e.g., "optimization algorithm", "neural network architecture")
3. If a pattern file matches the concept type (or a related type):
   - Read the pattern file completely
   - Extract: proven narrative arcs, interaction patterns that worked, visual approaches, things that didn't work
   - Use these as **starting defaults** — adapt them to the current concept, don't copy blindly
   - Note in your stream outputs where you're building on prior patterns vs. creating fresh
4. If no patterns exist, proceed with fresh research. This is expected for early narratives.

**Key principle: Adapt, don't restart from zero.** Patterns are seeds from prior narratives — they save time and compound quality. But every concept has its own needs, so always tailor.

---

## Step 2: Research Streams

Read the narrative brief thoroughly. Then execute 4 research streams in two phases.

### Phase A — No Dependencies (run in parallel)

Dispatch S1 and S2 as parallel subagents:

**S1: Technical Deep-Dive** — Read [references/stream-technical.md](references/stream-technical.md) and execute its instructions against the narrative brief and any relevant patterns. Save the output as your S1 results.

**S2: Audience Profile** — Read [references/stream-audience.md](references/stream-audience.md) and execute its instructions against the narrative brief. Save the output as your S2 results.

These two streams have no dependencies on each other. Run them in parallel if your platform supports it, or sequentially if not.

Wait for both to complete before proceeding to Phase B.

### Phase B — Has Dependencies (sequential)

**S3: Narrative Arc** — needs S1 output.

Read [references/stream-narrative.md](references/stream-narrative.md) and execute it yourself (not as subagent) so you can directly reference S1's technical analysis. Pass S2 output as additional context.

**S4: Visual Language** — needs S1 + S3 output.

Read [references/stream-visual.md](references/stream-visual.md) and execute it yourself. You need both the technical concepts from S1 and the section structure from S3.

**Design quality reference:** Before writing visual language, also read `skills/web-design-guidelines/SKILL.md` for Web Interface Guidelines and consult the `frontend-design` skill principles if available. Key rules to internalize:
- **Treat the first viewport as a poster, not a document** — the hero section must be visually striking, not a wall of text
- **2 fonts maximum.** Choose characterful fonts — avoid Inter, Roboto, system-ui defaults. The font IS the personality.
- **Visual thesis first** — define "what should this feel like?" before specifying colors and tokens
- **2-3 intentional motions, not ornamental** — every animation must serve comprehension

---

## Step 3: Cross-Stream Consistency Check

After all 4 streams complete, run these 4 validations before writing the spec:

### Validation 1: Visual ↔ Technical Alignment
Does the visual language (S4) have concrete representations for every core concept identified in S1?
- Each mechanism in S1's technical analysis should map to a visual or interaction pattern in S4.
- Flag any technical concept that has no visual treatment.

### Validation 2: Narrative ↔ Audience Fit
Does the narrative arc (S3) respect the audience constraints from S2?
- Check: Does the entry point match the audience's existing knowledge level?
- Check: Does the vocabulary stay within S2's vocabulary constraints?
- Check: Does the progression build on what the audience already knows?

### Validation 3: Interaction ↔ Structure Alignment
Do the interaction patterns in S4 align with the sections defined in S3?
- Each section in S3 should have at least one corresponding interaction described in S4.
- Flag sections with no interaction — they may be passive scroll-only (fine if intentional).

### Validation 4: Vocabulary Consistency
Are there conflicts between S1's technical terms and S2's audience vocabulary?
- Identify jargon in S1 that S2 flagged as unfamiliar to the audience.
- Ensure S3 introduces these terms progressively — not all at once.
- S4's labels and annotations should use audience-friendly language.

**If any validation fails:** Fix the inconsistency in the relevant stream output before proceeding. This may mean revising a section of S3 to better address S2's constraints, or adding a visual pattern to S4 for an uncovered concept.

---

## Step 4: Synthesize into narrative-spec.md

Read the template at [references/narrative-spec-template.md](references/narrative-spec-template.md).

Combine all 4 stream outputs into a single `narrative-spec.md` following the template structure. Write it to `niwashi_docs/<narrative>/narrative-spec.md`.

The spec must be **self-contained** — a reader (or agent) should understand the full plan by reading only this file. Don't reference the brief for critical details; carry forward what matters.

---

## Step 5: Spec Review Loop

After writing `narrative-spec.md`, dispatch a reviewer subagent with the spec content and these criteria:

1. Does each stream section meet its quality gate? (see Quality Gates below)
2. Do the 4 cross-stream consistency checks pass?
3. Is the spec actionable enough that WIREFRAME can produce wireframes without guessing?
4. Does every section in the narrative arc have: a clear purpose, defined content, and at least a suggested interaction?

The reviewer should return a structured verdict — pass or fail with specific issues.

**If the reviewer finds issues:**
1. Fix them in the spec
2. Re-dispatch the reviewer (max 3 total rework cycles — as defined in the orchestrator's Budget Limits)
3. If issues persist after 3 iterations, log unresolved items to `progress.md` and present the best-effort spec to the user for approval

**If the reviewer returns clean:** Present the spec to the user.

---

## Step 6: User Approval

Present the completed spec to the user with a summary:

> Here's the narrative specification for **[concept name]**.
>
> - **Technical core:** [1-line summary of the aha-moment]
> - **Audience:** [persona] with [knowledge level]
> - **Structure:** [N] sections — [brief arc description]
> - **Visual approach:** [1-line summary of the visual language]
>
> Review the full spec at `niwashi_docs/<narrative>/narrative-spec.md`.
> Does this capture the right foundation? Any sections to revise?

Wait for user approval before proceeding to WIREFRAME.

**HARD GATE:** Do not suggest moving to WIREFRAME until the user explicitly approves the spec.

---

## Quality Gates

Use these as typical targets — adjust based on concept complexity. A simple concept may need fewer elements; a complex one may need more.

### S1: Technical Deep-Dive
- Typically 1 core mechanism identified and explained
- Typically 1 "aha-moment" — the insight that makes the concept click
- Typically 2+ common misconceptions identified and addressed
- A complexity ladder from intuitive to precise

### S2: Audience Profile
- Typically 1 audience persona with knowledge level mapped
- Vocabulary constraints defined (what terms they know vs. don't)
- Attention model — what keeps this audience engaged

### S3: Narrative Arc
- Typically 3+ sections with defined progression logic
- Each section has a clear purpose and emotional beat
- Transitions between sections are explicit

### S4: Visual Language
- Color palette defined (with semantic meaning, not arbitrary)
- Typography hierarchy specified
- Typically 3+ interaction patterns described
- CSS custom properties sketched for key tokens

---

## Progress Logging

At the start of this phase, append to `niwashi_docs/<narrative>/progress.md`:

```markdown
## Session YYYY-MM-DD HH:MM — RESEARCH
Starting: Pattern consultation + 4 research streams
Patterns found: [list or "none"]
```

At the end, append:

```markdown
Completed: narrative-spec.md written
Quality: [summary of review loop results]
Cross-stream checks: [pass/fail summary]
```

---

## Edge Cases

### Brief is too thin
If the narrative brief lacks sufficient detail for research (e.g., no audience defined, concept is vague):
- Do NOT guess. Return to the user: "The brief doesn't have enough detail for [specific gap]. Can we revisit DISCOVER to fill this in?"
- Suggest re-running `/niwashi-01-discover` with targeted questions.

### Patterns conflict with brief
If a prior pattern suggests an approach that contradicts the current brief's goals:
- Prefer the brief — it reflects the user's current intent.
- Note the divergence in the spec: "Prior patterns for [type] used [approach], but this narrative uses [alternative] because [reason from brief]."

### Concept is too broad
If S1 reveals the concept spans multiple independent mechanisms:
- Flag it: "This concept covers [N] distinct mechanisms. Consider splitting into separate narratives."
- If the user wants a single narrative, define a clear scope boundary and note what's excluded.

---

## Reference Files

For detailed instructions per stream, read:
- [references/stream-technical.md](references/stream-technical.md) — S1
- [references/stream-audience.md](references/stream-audience.md) — S2
- [references/stream-narrative.md](references/stream-narrative.md) — S3
- [references/stream-visual.md](references/stream-visual.md) — S4
- [references/narrative-spec-template.md](references/narrative-spec-template.md) — synthesis template
