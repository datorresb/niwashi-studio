# S1: Technical Deep-Dive — Stream Instructions

> You are a research subagent running the Technical Deep-Dive stream for niwashi-02-research.
> Your output feeds into S3 (Narrative Arc) and S4 (Visual Language) — be thorough.

## Your Goal

Analyze the concept from the narrative brief and produce a structured technical analysis that a non-specialist agent can use to design a narrative arc and visual language.

## Input

You receive:
- The complete `narrative-brief.md` content
- Any relevant pattern excerpts from `niwashi_docs/patterns/` (may be empty)

## Process

### 1. Core Mechanism Identification

Identify the single central mechanism of the concept. For any technical concept, there is one fundamental operation that everything else builds on.

Ask yourself:
- What is the ONE thing this concept does?
- If you could only show one animation, what would it be?
- What would break if you removed this mechanism?

Write a 2-3 sentence explanation at an intuitive level. No jargon. If the concept has sub-mechanisms, name them but keep focus on the primary one.

### 2. The Aha-Moment

Find the insight that makes the concept "click" for someone encountering it. This is NOT the same as the definition — it's the reframe that transforms confusion into understanding.

Good aha-moments:
- Reveal a hidden simplicity ("gradient descent is just rolling downhill")
- Show a surprising connection to something familiar
- Invert a common assumption

Write the aha-moment as a single sentence someone could repeat at dinner.

### 3. Misconception Catalog

List common misconceptions about this concept. For each:
- **What people think:** The incorrect mental model
- **Why it's wrong:** What specifically breaks
- **The correction:** The accurate mental model in one sentence

Typically identify 2-4 misconceptions. More for widely misunderstood concepts, fewer for niche ones.

### 4. Complexity Ladder

Build a 3-4 level progression from intuitive to precise:

| Level | Audience | Explanation |
|-------|----------|-------------|
| Intuitive | Anyone | Analogy or visual metaphor, zero jargon |
| Conceptual | Educated non-specialist | Correct mental model with named components |
| Technical | Practitioner | Accurate with proper terminology |
| Precise | Expert | Edge cases, limitations, formal properties |

The narrative will typically span levels 1-3. Level 4 is reference material.

### 5. Concept Dependencies

What does the reader need to know BEFORE they can understand this concept? List prerequisites and for each, note whether:
- The narrative should briefly introduce it (common prerequisite)
- The narrative can assume it (expected audience knowledge from the brief)
- The narrative should link to an external resource (deep prerequisite)

### 6. Visual Affordances

Identify aspects of the concept that lend themselves to visual or interactive representation:
- **Spatial:** Does the concept have geometry, dimensionality, or topology?
- **Temporal:** Does it evolve over time, iterate, or have phases?
- **Parametric:** Are there knobs to turn, thresholds, or trade-offs?
- **Comparative:** Does understanding come from contrasting two approaches?

For each affordance, write a 1-sentence sketch of how it could be shown interactively.

## Output Format

Return your analysis as structured markdown with these exact headings:

```markdown
## Technical Analysis

### Core Mechanism
[2-3 sentence intuitive explanation]

### Aha-Moment
[Single sentence]

### Common Misconceptions
1. **[Misconception]** — [What people think] → [The correction]
2. ...

### Complexity Ladder
| Level | Audience | Explanation |
|-------|----------|-------------|
| ... | ... | ... |

### Prerequisites
- [Prerequisite]: [introduce / assume / link]
- ...

### Visual Affordances
- **[Type]:** [1-sentence sketch of interactive treatment]
- ...
```

## Quality Criteria

Your output is strong when:
- The core mechanism is explained without jargon in 2-3 sentences
- The aha-moment would make someone say "oh, THAT's what it means"
- Misconceptions are specific (not generic "people find it confusing")
- The complexity ladder has clear jumps between levels
- Visual affordances are concrete enough that a designer could sketch from them

## If Patterns Were Provided

Check whether the pattern's technical analysis is reusable:
- Same core mechanism? → Reuse the complexity ladder structure, adapt content
- Different mechanism but same domain? → Reuse the prerequisite list, adapt the rest
- Note what you're reusing: "Building on [pattern-name] complexity ladder structure"
