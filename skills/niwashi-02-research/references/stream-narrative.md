# S3: Narrative Arc — Stream Instructions

> You are executing the Narrative Arc stream. You have access to S1 (Technical Analysis)
> and S2 (Audience Profile) outputs. Design the section-by-section structure of the narrative.

## Your Goal

Design a section-by-section narrative arc that takes the audience from where they are (S2's knowledge floor) to where they need to be (the brief's goals), using the technical building blocks from S1.

## Input

You receive:
- The complete `narrative-brief.md` content
- S1: Technical Analysis output (core mechanism, aha-moment, complexity ladder, visual affordances)
- S2: Audience Profile output (persona, vocabulary map, attention model, risk factors)
- Any relevant pattern excerpts from `niwashi_docs/patterns/` (may be empty)

## Process

### 1. Plot the Knowledge Journey

Map the path from S2's knowledge floor to the narrative's goal:

```
[What they know] → [Bridge concept 1] → [Bridge concept 2] → [Core mechanism] → [Aha-moment] → [Implications]
```

Each arrow is roughly one section. The journey should feel inevitable — each step should make the next one feel natural.

Use S1's complexity ladder to calibrate the depth at each step. The narrative typically progresses through levels 1-3 of the ladder.

### 2. Design Each Section

For each section in the arc, define:

- **Title:** A reader-facing title (use safe vocabulary from S2, not jargon)
- **Purpose:** What does the reader understand after this section that they didn't before?
- **Content summary:** 2-3 sentences describing what this section covers
- **Emotional beat:** What should the reader feel? (Curious, surprised, empowered, amused)
- **Key concept:** Which concept from S1 is introduced or advanced here?
- **Interaction hint:** What could the reader DO in this section? (From S1's visual affordances)
- **Vocabulary budget:** Any new terms introduced here (from S2's "needs introduction" list)
- **Transition:** How does this section connect to the next? (Scroll trigger, question posed, contrast revealed)

### 3. Pace Check Against Attention Model

Validate the arc against S2's attention model:

- **Patience threshold:** Is the first interesting/interactive thing early enough? If the audience has low patience, the first interaction should be in section 1 or 2.
- **Concept density:** Are you introducing too many new terms in any single section? Check against S2's vocabulary budget.
- **Proof cadence:** Does the proof type (demo, data, outcome) appear where the audience expects it?
- **Length estimate:** Given the concept complexity, is the section count appropriate? A simple concept with a low-patience audience might need 3-4 sections. A complex concept for a learning audience might support 6-8.

### 4. Emotional Arc Design

Layer an emotional arc over the logical structure:

```
Hook (curiosity/surprise) → Build (growing understanding) → Climax (aha-moment) → Resolution (empowerment)
```

Map each section to a position on this arc. Not every section needs to be dramatic — some are steady building blocks. But the overall shape should have a clear peak.

The aha-moment from S1 should land at or near the climax. Don't bury it in the middle of a section — give it space.

### 5. Transition Design

For each section-to-section transition, define the mechanism:

- **Scroll-triggered:** Content reveals as the reader scrolls (default for narrative flow)
- **Question bridge:** Section ends with a question that the next section answers
- **Contrast reveal:** Section shows "before" and the next shows "after" or "better"
- **zoom-in / zoom-out:** Move between levels of detail
- **Callback:** Reference something from an earlier section in a new light

Every transition should feel motivated, not arbitrary. The reader should think "I want to know what's next" at every boundary.

## Output Format

Return your arc as structured markdown with these exact headings:

```markdown
## Narrative Structure

### Knowledge Journey
[Brief description of the path from audience knowledge floor to narrative goal]

### Sections

#### Section 1: [Title]
- **Purpose:** [what the reader learns]
- **Content:** [2-3 sentence summary]
- **Emotional beat:** [feeling]
- **Key concept:** [from S1]
- **Interaction hint:** [what the reader does]
- **New vocabulary:** [terms introduced, if any]
- **Transition to next:** [mechanism + description]

#### Section 2: [Title]
...

[Repeat for each section]

### Pacing Notes
- First interaction: Section [N]
- Aha-moment lands: Section [N]
- Concept density: [any sections flagged as heavy]
- Estimated reading time: [rough, for pacing context]

### Emotional Arc
[Brief description of the emotional shape: where the peaks and valleys are]
```

## Quality Criteria

Your output is strong when:
- The knowledge journey has no gaps — each step is reachable from the previous one
- Every section has a clear purpose (not "more about the topic")
- The aha-moment has dedicated space and isn't buried
- Transitions make the reader want to continue
- S2's risk factors are visibly mitigated (e.g., no jargon dumping, no condescension)
- Sections typically number 3 or more, with defined progression logic

## If Patterns Were Provided

Check whether the pattern's narrative arc structure applies:
- Same concept type? → Consider reusing the section progression (hook → mechanism → implication), but rewrite content for the new concept
- Pattern notes what didn't work? → Avoid those patterns explicitly
- Note adaptations: "Adapting [pattern-name] arc structure; replacing section 3 approach because [reason]"
