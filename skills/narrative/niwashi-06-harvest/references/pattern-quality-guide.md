# Pattern Quality Guide

This guide defines the specificity bar for pattern documents produced by niwashi-06-harvest. Use it as a self-check after writing a pattern doc.

## The Core Test

> **Can another agent reading this pattern reproduce the approach for a similar concept without guessing?**

If any bullet point requires the reader to invent details, it fails.

## Section-by-Section Criteria

### Narrative Arc That Worked

**Passing patterns name sections, order, and the aha moment's position and trigger.**

| Specific (pass) | Vague (fail) |
|-----------------|--------------|
| "5 sections: Intuition → Parameters → Live Exploration → Edge Cases → Synthesis. Aha at section 3 when user drags the learning rate slider past 0.5 and watches divergence in real time." | "Good structure with a clear progression." |
| "Opened with a broken example (why naive sorting fails on 10k items) before introducing the algorithm — failure-first framing created motivation." | "Started with motivation then explained the concept." |
| "Section 4 was a 'what if' sandbox — users changed inputs and predicted outputs before seeing results. Prediction → reveal loop drove engagement." | "Interactive section in the middle worked well." |

**Red flags:** "clear flow", "logical progression", "well-structured", "engaging narrative" — these say nothing actionable.

### Interaction Patterns That Worked

**Passing patterns name the mechanism, its parameters, and the observed effect.**

| Specific (pass) | Vague (fail) |
|-----------------|--------------|
| "Slider controlling constraint boundary (range: 0–100, step: 1, mapped to feasible region opacity 0.1–1.0) — users explored the tradeoff space for 3+ minutes per session." | "Slider was interactive and engaging." |
| "Drag-to-reorder list that triggers live re-computation of optimal path — Hamiltonian path visualization updates in <100ms, making cause-effect immediate." | "Drag and drop interaction." |
| "Tooltip on hover showing exact values (formatted to 2 decimal places, positioned 8px above cursor, 150ms delay to avoid flicker) — reduced questions about 'what does this point mean' to zero." | "Tooltips helped with understanding." |
| "Step-through with play/pause/step buttons + speed slider (0.5x to 4x, default 1x). Auto-pause at key moments (iteration 1, convergence point). Better than continuous autoplay — users examined intermediate states." | "Animation controls." |

**Red flags:** "interactive elements", "engaging controls", "nice animations", "responsive interactions" — mechanism-free descriptions are useless.

### Visual Approaches

**Passing patterns include reproducible values: colors, sizes, fonts, spacing.**

| Specific (pass) | Vague (fail) |
|-----------------|--------------|
| "Dark theme: bg-slate-950, text-slate-100, accent amber-500. Data gradient: amber-500 → sky-600 (8 stops, linear interpolation) mapping cost (high) → optimal (low)." | "Dark theme with nice colors." |
| "Inter 16px/1.6 body, JetBrains Mono 14px for inline code. Headings: Inter semibold, tracking-tight, scale 1.25rem/1.5rem/2rem for h3/h2/h1." | "Clean typography." |
| "Scroll-triggered fade-up: translateY(20px) → translateY(0), opacity 0 → 1, 200ms ease-in, IntersectionObserver threshold 0.1. Staggered 50ms per child element." | "Smooth scroll animations." |
| "Sticky left sidebar (w-80, bg-slate-900/95 backdrop-blur) with parameter controls. Main content scrollable, max-w-3xl centered, sections separated by 6rem." | "Sidebar layout." |
| "4px left border in teal-500 on active code blocks to draw focus without overwhelming." | "Highlighted code sections." |

**Red flags:** "modern design", "clean layout", "nice colors", "good spacing", "polished look" — these are opinions, not patterns.

### What Didn't Work / Revisions Needed

**Passing entries name what was tried, what replaced it, and why — with measurable or observable reasoning.**

| Specific (pass) | Vague (fail) |
|-----------------|--------------|
| "Pie chart for portfolio allocation → horizontal stacked bar. Pie was ambiguous for similar-sized slices (25% vs 27% indistinguishable). Bar made comparison instant." | "Changed the chart type." |
| "3D scatter plot (Three.js) → 2D with size encoding for third dimension. 3D had 400ms frame time on M1 MacBook, drag rotation was disorienting, and depth perception was unreliable without stereo." | "3D was too complex." |
| "Auto-playing animation → user-controlled step-through. Users missed key transitions at 1x speed, and faster speeds made the sequence illegible. Manual stepping let users linger on confusing steps." | "Changed animation to be interactive." |
| "Accordion for section navigation → continuous scroll with sticky headers. Accordion hid content — users didn't know what they hadn't seen. Scroll preserved context and let users scan ahead." | "Accordion didn't work well." |

**Red flags:** "fixed some issues", "improved the design", "iterated on the approach" — describe what changed, not that it changed.

### Reuse Recommendations

**Passing recommendations state specific conditions for reuse and deviation.**

| Specific (pass) | Vague (fail) |
|-----------------|--------------|
| "Reuse for optimization algorithms with ≤5 tunable parameters and a 2D-visualizable objective function. Deviate for high-dimensional problems (>5 params) — use parallel coordinates or matrix view instead." | "Reuse when appropriate." |
| "The failure-first opening (show the broken version) works for algorithms where the naive approach has an obvious failure mode. Skip it for concepts where the baseline is 'nothing exists yet' (e.g., generative models)." | "Consider reusing the introduction pattern." |
| "Parameter slider pattern works when the parameter has continuous, bounded values with observable effects within 100ms. Don't use for discrete choices (use radio/toggle) or parameters where the effect requires a full re-computation >500ms (use a 'run' button instead)." | "Sliders work for most parameters." |

**Red flags:** "good for similar concepts", "adapt as needed", "use your judgment" — these are non-advice.

## Quality Checklist

After writing a pattern doc, verify each section against this checklist:

- [ ] **Narrative Arc:** Every section is named. Aha moment has a position and trigger.
- [ ] **Interactions:** Every pattern names the mechanism (slider, drag, hover, etc.) and at least one parameter (range, delay, threshold).
- [ ] **Visuals:** At least one color value (token or hex), one typography spec, and one spacing/layout measurement.
- [ ] **Didn't Work:** At least one entry with "tried X → replaced with Y because Z" structure.
- [ ] **Reuse:** At least one "reuse when" and one "deviate when" with concrete conditions.

**Scoring:**
- All 5 pass → pattern doc is complete
- 3–4 pass → revise the failing sections (you have 2 revision cycles)
- ≤2 pass → likely insufficient source material. Flag to user:

```markdown
> ⚠️ **Needs enrichment:** This pattern doc lacks specificity in [sections].
> The source material (spec, checklist, git log) didn't contain enough detail
> to write reproducible patterns. A human should review and add concrete
> details from their experience building this narrative.
```

## Anti-Patterns in Pattern Writing

Avoid these common failure modes:

1. **The Mirror** — Restating the spec without analysis. A pattern doc should synthesize, not copy.
2. **The Compliment** — "The design was elegant and effective." Praise is not a pattern.
3. **The Hedge** — "Consider using a similar approach." Commit to specific conditions.
4. **The Abstraction Ladder** — Going up when you should go down. "Data visualization" is less useful than "scatter plot with size encoding, d3-scale chromatic viridis, 4px radius, 0.7 opacity."
5. **The Kitchen Sink** — Listing every decision without prioritizing what matters. Focus on patterns that would actually change behavior in a future narrative.
