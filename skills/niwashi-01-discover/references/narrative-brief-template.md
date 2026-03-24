# Narrative Brief Template

Use this template to produce `niwashi_docs/<narrative>/narrative-brief.md`.

Every field must be filled. If something genuinely doesn't apply, write "N/A" with a one-line reason.

---

```markdown
# Narrative Brief: <Title>

> One-sentence summary of the concept and why it matters to the target audience.

## Concept

### What It Is
<!-- 2-4 sentences. Plain-language explanation of the concept. No jargon unless the audience expects it. -->

### Why It Matters
<!-- 1-3 sentences. Why should the audience care? What decision, action, or understanding does this enable? -->

### Key Mechanism
<!-- The single most important thing to understand. The "engine" of the concept. This becomes the foundation for the aha-moment. -->

## Audience

### Who They Are
<!-- Specific role or profile. "Senior backend engineers with no ML background" not "engineers". -->

### What They Already Know
<!-- What can you assume? What vocabulary is safe? What concepts are prerequisites? -->

### What They Don't Know (Yet)
<!-- What gap does this narrative fill? What misconceptions might they have? -->

### What Success Looks Like
<!-- After reading, they can ___. Be concrete. "Evaluate whether MILP is appropriate for their optimization problem" not "understand MILP". -->

## Aha-Moment Target

<!-- The ONE thing the reader should understand or feel by the end. This is the North Star for the entire narrative. Write it as a reader's internal realization, e.g., "Oh — the optimizer doesn't try every combination, it prunes intelligently based on bounds." -->

## Scope

### Depth
<!-- How deep does the explanation go? Intuition → working understanding → implementation detail. Pick one and justify briefly. -->

### Breadth
<!-- How many concepts are covered? Single concept → concept in context → full system. Pick one and justify briefly. -->

### Boundaries
<!-- What is explicitly OUT of scope? Name 1-3 things the narrative will NOT cover, even if related. This prevents scope creep downstream. -->

## Quality Constraints

### Must Be Accurate
<!-- Specific things that must be technically correct. Formulas, thresholds, behavioral descriptions, etc. -->

### May Be Simplified
<!-- Things that can be hand-waved or approximated for clarity. -->

### Aesthetic Direction
<!-- One or two words for the feel: playful, serious, minimal, rich, technical, approachable, etc. -->

### Target Length
<!-- Approximate reading time or section count. "5-7 minute read" or "4-6 sections" or "N/A — let the concept dictate." -->

## Input References

<!-- What source material was used or referenced during discovery. These tell downstream phases where to find source truth. -->

| Source | Type | Location | Notes |
|--------|------|----------|-------|
| <!-- description --> | <!-- repo / docs / notebook / concept / conversation --> | <!-- file path, URL, or "verbal" --> | <!-- what it contributes --> |
```

---

## Usage Notes

- **Concept section** gives RESEARCH its starting point for the technical deep-dive stream.
- **Audience section** drives the audience profiling stream and vocabulary constraints.
- **Aha-moment** is the single most important element — everything downstream serves it.
- **Scope** prevents the RESEARCH phase from going too broad or too deep.
- **Quality constraints** tell BUILD what must be exact and what can be approximate.
- **Input references** tell RESEARCH where to look for authoritative source material.

## Naming Convention

The narrative brief file is always:
```
niwashi_docs/<narrative-name>/narrative-brief.md
```

Where `<narrative-name>` is the kebab-case name chosen during DISCOVER (e.g., `gradient-descent`, `milp-optimizer`, `attention-mechanism`).
