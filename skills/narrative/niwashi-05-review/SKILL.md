---
name: niwashi-05-review
description: "Review a completed narrative visualization across content and implementation quality. Use /niwashi-05-review after all sections pass BUILD, or when @niwashi routes here because sections-checklist.json shows all passes: true. Runs 2 passes covering 7 quality angles, loops 🔴 findings back through BUILD, then hands off to the human for final walkthrough."
---

# /niwashi-05-review — Quality Review

> *間 (Ma) — The pause where quality is found.*

You are the REVIEW phase of the niwashi-studio workflow. All sections have been built and individually verified. Your job is to evaluate the narrative **as a whole** — content correctness, implementation quality, and cross-section coherence — before handing it to the human for final approval.

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `--cycles N` | 3 | Maximum number of BUILD↔REVIEW loop iterations before escalating to the user. Each cycle = one full pass (Pass 1 or Pass 2) that finds 🔴 → sends to BUILD → re-runs the pass. |

Track the current cycle count in `progress.md` after each pass:

```markdown
REVIEW cycle: [N] of [max]
```

When `--cycles` limit is reached and 🔴 findings remain:
1. Log all unresolved 🔴 findings to `progress.md`
2. Present findings to the user for manual resolution
3. Do NOT continue looping — the user decides next steps

## Prerequisites

Before starting, confirm:

1. `sections-checklist.json` exists and **every** section has `"passes": true`
2. `review_approved` is `false` (if `true`, this narrative is already reviewed — route to HARVEST)
3. `narrative-spec.md` is available (you need the source material for content review)
4. The React project directory exists at the path in `sections-checklist.json → project_path`

If any prerequisite fails, stop and tell the user what's missing.

## Read State

```
Read from niwashi_docs/<narrative>/:
  narrative-spec.md             → source of truth for content
  sections-checklist.json       → section list, project_path, review_approved
  progress.md                   → last 20 lines for recent context

Read from project directory:
  package.json                  → confirm project exists
  src/                          → component files to review
```

Append to `progress.md`:

```markdown
## Session YYYY-MM-DD HH:MM
Phase: REVIEW
Starting: Pass 1 — Content review
```

---

## Overview: 2 Passes, 7 Angles

| Pass | Angles | Requires |
|------|--------|----------|
| **Pass 1 — Content** | Technical accuracy, Narrative flow, Clarity | Read-only — no build needed |
| **Pass 2 — Implementation + Coherence** | Automated checks, Performance, Accessibility, Interaction QA, Visual coherence | Build + browser |

Passes run **sequentially**. Pass 1 must complete clean (no 🔴) before Pass 2 begins.

After both passes, the **human walks through** the narrative start to finish for final approval.

### Severity Levels

Every finding gets exactly one severity:

| Severity | Meaning | Action |
|----------|---------|--------|
| 🔴 **Blocks** | Factual error, broken feature, accessibility failure, build error | Must fix before continuing. Return to BUILD, fix, re-run this pass. |
| 🟡 **Should fix** | Awkward phrasing, minor UX friction, non-critical performance issue | Fix after all passes complete (before human review). |
| 🔵 **Nice-to-have** | Polish, optional enhancement, stylistic preference | Log for future iteration. Do not block. |

---

## Pass 1 — Content Review

**No build needed.** This pass reads the rendered text content against `narrative-spec.md`.

Read the full checklist from `references/review-content.md`, then evaluate each section of the narrative against all three content angles.

### Angle 1: Technical Accuracy

Compare every technical claim in the rendered narrative against `narrative-spec.md` (Stream 1 — Technical deep-dive). Flag:

- Simplifications that cross the line into **incorrectness**
- Missing caveats that the audience needs to make correct decisions
- Formulas, numbers, or terminology that don't match the source

### Angle 2: Narrative Flow

Evaluate the arc from section 1 through the final section. Flag:

- Sections that assume knowledge not yet introduced
- Missing or abrupt transitions between sections
- "Aha moment" that arrives too early (no tension) or too late (audience lost)
- Pacing problems — sections that rush or drag

### Angle 3: Clarity

Read each section as if you are the target audience (defined in the narrative brief). Flag:

- Jargon used without explanation
- Explanations that require domain expertise the audience doesn't have
- Sentences over 25 words that could be split
- Passive voice hiding important actors

### Pass 1 Output

Produce a findings table:

```markdown
### Pass 1 — Content Findings

| # | Section | Angle | Severity | Finding | Suggested fix |
|---|---------|-------|----------|---------|---------------|
| 1 | Hero | Accuracy | 🔴 | "Gradient descent always converges" — false for non-convex | Add "for convex functions" qualifier |
| 2 | Mechanism | Clarity | 🟡 | "Hessian matrix" used without definition | Add tooltip or inline explanation |
| 3 | Summary | Flow | 🔵 | Could echo the opening metaphor for closure | Consider callback to intro |
```

### Pass 1 Gate

- **Any 🔴 findings?** → Return to BUILD to fix them. After fixes, re-run Pass 1 from the start (not just the fixed items — re-check everything, since fixes can introduce new issues).
- **No 🔴 findings?** → Proceed to Pass 2. 🟡 findings are queued for fix before human review.

Update `progress.md`:

```markdown
Pass 1 complete: [N] 🔴 / [N] 🟡 / [N] 🔵
[If 🔴: Returning to BUILD for fixes]
[If clean: Proceeding to Pass 2]
```

---

## Pass 2 — Implementation + Coherence Review

**Requires build + browser.** This pass checks the running application.

Read the full checklist from `references/review-implementation.md`, then evaluate.

### Step 1: Start the Application

```bash
cd <project_path>
npm run build
```

If the build fails, that's a 🔴 finding — stop and return to BUILD.

If build succeeds, ensure the dev server is running:

```bash
# Check if already running
lsof -i :5173 || npm run dev &
```

### Angle 4: Automated Checks

Run these checks and record results:

```bash
# Build check
npm run build 2>&1

# Console errors (if browser automation available)
# Otherwise: manually open browser, check DevTools console

# All sections render (scroll through, confirm no blank/broken sections)
```

Flag:
- Build warnings or errors
- Console errors or warnings at runtime
- Sections that fail to render or show error boundaries
- Missing assets (images, fonts, icons returning 404)

### Angle 5: Performance

Consult `skills/react-best-practices/SKILL.md` for the full rule set. Focus on:

- **Bundle size**: Check `npm run build` output for chunk sizes. Flag chunks > 250KB.
- **Animation performance**: Verify animations run at 60fps. Flag layout-triggering animations (width/height changes instead of transform/opacity).
- **Load time**: First meaningful paint under 2 seconds on simulated 3G.
- **Unnecessary re-renders**: Check for missing `memo`, `useMemo`, or `useCallback` on expensive computations.
- **Image optimization**: Images should be appropriately sized, lazy-loaded below the fold.

### Angle 6: Accessibility

Consult `skills/web-design-guidelines/SKILL.md` for the Web Interface Guidelines. Focus on:

- **Color contrast**: WCAG AA minimum (4.5:1 for text, 3:1 for large text/UI components)
- **Keyboard navigation**: Tab through the entire narrative. Every interactive element must be reachable and operable with keyboard alone.
- **Screen reader**: Semantic HTML (`<section>`, `<article>`, `<nav>`), alt text on images, aria-labels on interactive elements.
- **Responsive**: Test at 375px (mobile), 768px (tablet), 1440px (desktop). No horizontal scroll, no overlapping elements, no truncated text.
- **Reduced motion**: `prefers-reduced-motion` media query respected. Animations should degrade gracefully.

### Angle 7: Interaction QA

Test every interactive element in the narrative:

- **Hover states**: Tooltips appear/dismiss correctly, hover effects are consistent.
- **Click/tap targets**: Minimum 44x44px touch targets. No dead zones.
- **Animations and transitions**: Play/pause controls work. Scroll-triggered animations fire at the right scroll position.
- **Edge cases**:
  - Rapid resize between breakpoints
  - Mobile viewport with touch events
  - Rapid repeated clicks on interactive elements
  - Browser back/forward navigation
  - Scroll position restoration on refresh

### Visual Coherence (Cross-Section)

This is not a separate angle — it's evaluated as part of Pass 2 after reviewing individual sections:

- **Color palette**: Consistent use of the visual language defined in the spec. No off-palette colors.
- **Typography**: Same font stack, consistent heading hierarchy, paragraph sizing across all sections.
- **Spacing and rhythm**: Consistent section padding, element margins, vertical rhythm.
- **Transitions between sections**: Smooth, consistent animation style (duration, easing) when scrolling between sections.
- **Motif consistency**: If the narrative uses a recurring visual motif (e.g., a gradient metaphor), verify it appears consistently and evolves intentionally.
- **Dark/light mode**: If supported, verify all sections look correct in both modes.

### Pass 2 Output

Produce a findings table identical in format to Pass 1:

```markdown
### Pass 2 — Implementation + Coherence Findings

| # | Section | Angle | Severity | Finding | Suggested fix |
|---|---------|-------|----------|---------|---------------|
| 1 | All | Automated | 🔴 | Build fails: TS error in Section3.tsx:42 | Fix type mismatch |
| 2 | Mechanism | Performance | 🟡 | D3 animation drops to 30fps on resize | Debounce resize handler |
| 3 | All | Visual | 🟡 | Section 4 uses 16px body, others use 18px | Standardize to 18px |
| 4 | Hero | A11y | 🔴 | Hero animation has no reduced-motion fallback | Add prefers-reduced-motion query |
| 5 | Summary | Interaction | 🔵 | Final CTA could have hover animation | Optional polish |
```

### Pass 2 Gate

- **Any 🔴 findings?** → Return to BUILD to fix them. After fixes, re-run Pass 2 from the start.
- **No 🔴 findings?** → Proceed to fix 🟡 findings, then move to Human Review.

Update `progress.md`:

```markdown
Pass 2 complete: [N] 🔴 / [N] 🟡 / [N] 🔵
[If 🔴: Returning to BUILD for fixes]
[If clean: Fixing 🟡 items, then Human Review]
```

---

## Fix 🟡 Findings

After both passes are clean of 🔴 findings, address all 🟡 findings before human review:

1. Group 🟡 findings by section
2. Fix each group in BUILD
3. No need to re-run full passes — just verify each fix doesn't break the build (`npm run build`)
4. Update progress.md with fixes applied

---

## Human Review (Final)

Present the narrative to the human for a complete walkthrough.

### Prompt the Human

```
All automated review passes are complete. No blocking issues remain.

Please walk through the narrative from start to finish:
1. Open the app in your browser (localhost:5173)
2. Scroll through every section
3. Interact with every interactive element
4. Note anything that feels off — content, pacing, visuals, interactions

When you're satisfied, say "approved" and I'll mark this narrative as review-complete.
If something needs fixing, describe what and I'll route it back to BUILD.
```

Use `vscode_askQuestions` to collect the human's verdict:

- **Approved** → proceed to set `review_approved: true`
- **Needs changes** → collect feedback, return to BUILD with specific fix instructions, then re-enter REVIEW (re-run the relevant pass based on what changed)

### On Approval

Update `sections-checklist.json`:

```json
{
  "review_approved": true
}
```

Read the current file, set `review_approved` to `true`, and write it back. This is the routing signal that tells `@niwashi` to proceed to HARVEST.

Commit:

```bash
git add niwashi_docs/<narrative>/sections-checklist.json
git commit -m "review: narrative approved"
```

Update `progress.md`:

```markdown
Human review: APPROVED
review_approved set to true in sections-checklist.json
Ready for HARVEST phase
```

---

## Summary: Review Flow

```
START
  │
  ▼
Pass 1: Content (read-only)
  │ Technical accuracy → Narrative flow → Clarity
  │
  ├── 🔴 found? → BUILD fix → re-run Pass 1
  │
  ▼ (clean)
Pass 2: Implementation + Coherence (build + browser)
  │ Automated checks → Performance → Accessibility → Interaction QA → Visual coherence
  │
  ├── 🔴 found? → BUILD fix → re-run Pass 2
  │
  ▼ (clean)
Fix 🟡 findings
  │
  ▼
Human walkthrough
  │
  ├── Needs changes? → BUILD fix → re-enter REVIEW
  │
  ▼ (approved)
Set review_approved: true → DONE (ready for HARVEST)
```

---

## Reference Files

| File | Contents |
|------|----------|
| `references/review-content.md` | Detailed checklists for Pass 1: technical accuracy, narrative flow, clarity |
| `references/review-implementation.md` | Detailed checklists for Pass 2: automated checks, performance, accessibility, interaction QA, visual coherence |
| `skills/react-best-practices/SKILL.md` | Performance rules referenced by Angle 5 |
| `skills/web-design-guidelines/SKILL.md` | Accessibility guidelines referenced by Angle 6 |
