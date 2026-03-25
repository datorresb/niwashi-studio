# Review Pass 1 — Content Checklists

Use these checklists to evaluate the narrative content **without running the application**. Read the rendered text against `narrative-spec.md` and the `narrative-brief.md` audience definition.

For every checklist item, record: ✅ pass, or a finding with severity (🔴 / 🟡 / 🔵).

---

## Angle 1: Technical Accuracy

Compare each section's content against the Technical Deep-Dive (Stream 1) in `narrative-spec.md`.

### Per-Section Checklist

For each section in the narrative:

- [ ] **Core claims match source** — Every technical statement can be traced to the spec's Stream 1 content. No invented facts.
- [ ] **Simplifications stay correct** — Where complexity was reduced for the audience, the simplified version is still technically true. A domain expert would nod, not wince.
- [ ] **No missing caveats** — Conditions, limitations, and edge cases that affect the audience's understanding or decisions are present. (e.g., "works for convex functions" not "always works")
- [ ] **Terminology is consistent** — The same concept uses the same term throughout. No synonym drift (e.g., "loss" in one section, "cost" in another, "error" in a third — pick one and define it).
- [ ] **Formulas and numbers are correct** — Any equations, statistics, thresholds, or numeric examples match the source. Units are present and correct.
- [ ] **Analogies don't mislead** — Metaphors and analogies illuminate the concept without implying properties the real system doesn't have.
- [ ] **Causal claims are accurate** — "X causes Y" statements reflect actual causation, not just correlation or co-occurrence.
- [ ] **Scope is honest** — The narrative doesn't claim broader applicability than the underlying technique supports.

### Cross-Section Checklist

- [ ] **No contradictions between sections** — Later sections don't contradict earlier ones (even subtly).
- [ ] **Progressive depth is accurate** — As the narrative deepens, the added detail doesn't retroactively invalidate the simpler earlier explanation.
- [ ] **Interactive elements teach correctly** — If a slider, animation, or visualization demonstrates a concept, the behavior it shows is technically accurate (e.g., a gradient descent animation actually shows convergence, not random movement).

---

## Angle 2: Narrative Flow

Evaluate the arc of the complete narrative, section by section.

### Structure Checklist

- [ ] **Opening creates context** — The first section establishes what the narrative is about and why the audience should care, without assuming prior knowledge beyond the defined audience level.
- [ ] **Each section has a clear purpose** — Every section teaches exactly one concept or makes one point. No section tries to do two things at once.
- [ ] **Dependency chain is respected** — No section uses a concept that hasn't been introduced in a prior section.
- [ ] **Transitions connect sections** — Each section ends by motivating why the next section matters. No jarring topic jumps.
- [ ] **The "aha moment" is well-placed** — The key insight arrives after enough buildup to create tension but before the audience has lost patience. Check the spec's narrative arc for intended placement.

### Pacing Checklist

- [ ] **No section drags** — Each section delivers its point without unnecessary repetition or excessive detail for the audience level.
- [ ] **No section rushes** — Critical concepts get enough space. The audience isn't expected to make a cognitive leap without support.
- [ ] **Interaction-to-content ratio is balanced** — Sections alternate between reading/absorbing and doing/exploring. No long stretches of pure text or pure interaction.
- [ ] **Complexity ramp is smooth** — Difficulty increases gradually. No sudden spikes where one section is dramatically harder than the previous.
- [ ] **Closure is satisfying** — The final section completes the arc. The audience can articulate what they learned and why it matters to them.

### Engagement Checklist

- [ ] **Curiosity hooks are present** — Questions or provocations that make the reader want to continue to the next section.
- [ ] **Concrete before abstract** — Examples and visuals precede formal definitions (show, then name).
- [ ] **Audience connection is maintained** — The narrative periodically connects back to why this matters for the defined audience (e.g., "As a VP, this means...").

---

## Angle 3: Clarity

Read each section through the lens of the target audience defined in `narrative-brief.md`.

### Language Checklist

- [ ] **No unexplained jargon** — Every technical term is either (a) defined on first use, (b) explained via tooltip/interaction, or (c) within the stated audience's expected vocabulary.
- [ ] **Acronyms are expanded on first use** — Standard format: "Mixed Integer Linear Programming (MILP)" on first occurrence, "MILP" thereafter.
- [ ] **Sentence length is manageable** — Flag sentences over 25 words. Split or simplify. (Technical accuracy should not require run-on sentences.)
- [ ] **Active voice for key actions** — "The optimizer finds the minimum" not "The minimum is found by the optimizer." (Passive is acceptable for context-setting or de-emphasis.)
- [ ] **One idea per paragraph** — Paragraphs that cover multiple ideas should be split.

### Explanation Quality Checklist

- [ ] **Abstractions are grounded** — Every abstract concept has at least one concrete example, visual, or interaction that demonstrates it.
- [ ] **Definitions precede usage** — Terms are defined before they appear in explanations or interactions.
- [ ] **Cause and effect is explicit** — When explaining "why," the narrative explicitly states the causal chain rather than expecting the audience to infer it.
- [ ] **Comparison anchors are familiar** — When comparing (e.g., "10x faster"), the baseline is something the audience understands.
- [ ] **Numbers have context** — Raw numbers are accompanied by what they mean ("250ms — fast enough that it feels instant" not just "250ms").

### Formatting Checklist

- [ ] **Headers signal content** — Section and subsection headings tell the reader what they'll learn, not just label a topic.
- [ ] **Visual hierarchy guides reading** — The most important information is visually prominent. Supporting detail is secondary.
- [ ] **Interactive elements are discoverable** — The audience understands they can interact (visual affordances, labels, or brief instructions).
- [ ] **Nothing is "obvious"** — The narrative never says "obviously," "simply," "just," or "of course." These words signal that an explanation is missing.
