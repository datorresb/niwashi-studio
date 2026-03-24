# Review Pass 2 — Implementation + Coherence Checklists

Use these checklists to evaluate the running application. **Requires a successful build and browser access.**

For every checklist item, record: ✅ pass, or a finding with severity (🔴 / 🟡 / 🔵).

---

## Angle 4: Automated Checks

Run these before any manual review. A build failure is an automatic 🔴.

### Build Checklist

- [ ] **`npm run build` succeeds** — Zero errors. Capture full output.
- [ ] **No TypeScript/ESLint errors** — Build output shows no type errors, lint warnings treated as errors, or unresolved imports.
- [ ] **No build warnings** — Flag any deprecation warnings, unused variable warnings, or peer dependency conflicts. (🟡 unless they indicate a real problem.)

### Runtime Checklist

- [ ] **No console errors** — Open browser DevTools → Console. Zero `Error` or `Warning` messages at startup.
- [ ] **No console errors during interaction** — Scroll through narrative, interact with every element, resize window. Zero console errors throughout.
- [ ] **All sections render** — Scroll from top to bottom. Every section defined in `sections-checklist.json` is visible and contains content (no blank divs, no error boundaries, no "Loading..." stuck states).
- [ ] **No 404s in Network tab** — Open DevTools → Network. No failed requests for images, fonts, scripts, or API calls.
- [ ] **No React hydration mismatches** — If SSR is used, no hydration warnings in console.

---

## Angle 5: Performance

Reference `skills/react-best-practices/SKILL.md` for the complete rule set. These checks focus on what matters for a narrative visualization.

### Bundle Checklist

- [ ] **Total bundle under 500KB gzipped** — Check `npm run build` output. For a narrative viz, larger bundles indicate unnecessary dependencies.
- [ ] **No single chunk over 250KB** — Large chunks delay initial render. Code-split if needed.
- [ ] **No duplicate dependencies** — Check for multiple versions of the same library in the bundle (e.g., two copies of D3 or React).
- [ ] **Tree-shaking is effective** — Only imported modules appear in the bundle. No full-library imports when only one function is used (e.g., `import { scaleLinear } from 'd3-scale'` not `import * as d3 from 'd3'`).

### Runtime Performance Checklist

- [ ] **Animations run at 60fps** — Open DevTools → Performance. Record while scrolling through animated sections. Frame times should stay under 16.7ms. Flag any frame drops.
- [ ] **No layout thrashing** — Animations use `transform` and `opacity` only (GPU-composited properties). No animations on `width`, `height`, `top`, `left`, `margin`, or `padding`.
- [ ] **Scroll performance is smooth** — No jank while scrolling through the narrative, especially at section transitions and scroll-triggered animations.
- [ ] **Resize doesn't cause lag** — Resize the browser window rapidly between breakpoints. No visible lag, frozen frames, or layout recalculations that block the main thread.
- [ ] **No unnecessary re-renders** — Use React DevTools Profiler. Components should not re-render on scroll unless their content is scroll-dependent. Memoization used for expensive computations.

### Loading Checklist

- [ ] **First meaningful paint under 2 seconds** — On simulated Fast 3G (DevTools → Network throttling). The hero section should be visible within 2s.
- [ ] **Images are optimized** — Appropriate formats (WebP/AVIF where supported), sized for display (not 4000px images in 800px containers), lazy-loaded below the fold.
- [ ] **Fonts don't block render** — `font-display: swap` or similar strategy. Text should be visible immediately, even before custom fonts load.

---

## Angle 6: Accessibility

Reference `skills/web-design-guidelines/SKILL.md` for the Web Interface Guidelines. These checks ensure the narrative is usable by everyone.

### Color and Contrast Checklist

- [ ] **Text contrast meets WCAG AA** — 4.5:1 ratio for normal text, 3:1 for large text (18px+ or 14px+ bold). Test with a contrast checker tool.
- [ ] **UI component contrast meets WCAG AA** — 3:1 ratio for interactive element borders, icons, and focus indicators against their background.
- [ ] **Information not conveyed by color alone** — Charts, highlighted text, and status indicators use shape, pattern, or label in addition to color.
- [ ] **Contrast maintained in all states** — Hover, focus, active, and disabled states all meet contrast requirements.

### Keyboard Navigation Checklist

- [ ] **Full keyboard traversal** — Tab through the entire narrative from top to bottom. Every interactive element (buttons, sliders, controls, links) receives focus.
- [ ] **Logical tab order** — Focus moves in reading order (top-to-bottom, left-to-right). No focus traps. No focus jumping to unexpected locations.
- [ ] **Focus indicator is visible** — Every focused element has a clearly visible focus ring or outline. Never `outline: none` without a replacement.
- [ ] **Interactive elements are operable via keyboard** — Buttons respond to Enter/Space. Sliders respond to arrow keys. Custom interactions have keyboard equivalents.
- [ ] **No keyboard traps** — User can always Tab or Escape out of any interactive element or modal.

### Semantic HTML Checklist

- [ ] **Proper heading hierarchy** — `h1` → `h2` → `h3` in order. No skipped levels. One `h1` per page (the narrative title).
- [ ] **Landmark elements used** — `<main>`, `<section>`, `<article>`, `<nav>` where appropriate. Screen readers use these for navigation.
- [ ] **Images have alt text** — Decorative images: `alt=""`. Informative images: descriptive alt text. Charts/visualizations: text summary or `aria-describedby`.
- [ ] **Interactive elements have labels** — `aria-label` or visible label for every button, slider, toggle, and custom control.
- [ ] **Live regions for dynamic content** — If content updates without page reload (e.g., slider changes a visualization), use `aria-live` to announce changes.

### Responsive Checklist

- [ ] **375px (mobile)** — All content is readable. No horizontal scroll. No overlapping elements. Touch targets are at least 44x44px.
- [ ] **768px (tablet)** — Layout adapts appropriately. Interactions work with touch. No content hidden or inaccessible.
- [ ] **1440px (desktop)** — Full experience. No overly stretched layouts. Content width is comfortable for reading (max 70-80 characters per line for body text).
- [ ] **Intermediate breakpoints** — Resize slowly between each breakpoint. No layout breaking at unexpected widths.

### Motion and Preference Checklist

- [ ] **`prefers-reduced-motion` is respected** — When enabled: animations are replaced with instant state changes or gentle fades. No parallax, no auto-playing animations.
- [ ] **`prefers-color-scheme` is respected** — If the narrative supports dark mode, verify it activates with the system preference.
- [ ] **No autoplay content** — Audio and video (if any) require user action to start. Animations that loop should have a pause control.

---

## Angle 7: Interaction QA

Manually test every interactive element. Automate where possible, but manual testing is required for UX quality.

### Interaction Inventory

Before testing, create an inventory of all interactive elements across all sections:

- [ ] **List every interactive element** — Buttons, sliders, toggles, hover effects, scroll-triggered animations, drag targets, input fields, expandable sections, tooltips, modals.
- [ ] **Map expected behavior** — For each element, document what should happen on interaction (from the wireframe or implementation).

### Functional Testing Checklist

For each interactive element:

- [ ] **Primary action works** — Click/tap produces the expected result.
- [ ] **Visual feedback is immediate** — User sees a state change within 100ms of interaction.
- [ ] **Hover states are correct** — Tooltips appear, highlights activate, cursor changes as expected. (Desktop only.)
- [ ] **Touch equivalent exists** — Every hover-dependent interaction has a tap/press equivalent for mobile.
- [ ] **State resets correctly** — After interaction, the element can return to its default state (e.g., slider can reset, toggle can untoggle).

### Edge Case Testing Checklist

- [ ] **Rapid repeated clicks** — Double-clicking or rapid-clicking interactive elements doesn't cause errors, duplicate actions, or broken states.
- [ ] **Rapid resize** — Resizing the browser window quickly between breakpoints doesn't break interactive element positioning or behavior.
- [ ] **Scroll during animation** — Scrolling while a scroll-triggered animation is playing doesn't cause glitches or stuck states.
- [ ] **Mobile touch events** — Long press, pinch-to-zoom, and swipe don't interfere with custom interactions.
- [ ] **Browser navigation** — Back/forward button behavior is graceful (no errors, reasonable state).
- [ ] **Refresh mid-narrative** — Refreshing the page at any scroll position doesn't cause errors. Scroll position restoration is acceptable (not required).

---

## Visual Coherence (Cross-Section)

Evaluate the complete narrative as a unified visual experience. This is not about individual section quality — it's about consistency across the whole.

### Color Checklist

- [ ] **Palette consistency** — All sections use colors from the visual language defined in `narrative-spec.md` (Stream 4). No off-palette colors.
- [ ] **Semantic color usage** — Colors carry consistent meaning (e.g., if blue means "optimal" in one section, it means "optimal" everywhere).
- [ ] **Background consistency** — Section backgrounds follow a coherent pattern (alternating, gradient, or uniform — but intentional, not random).

### Typography Checklist

- [ ] **Font stack is consistent** — Same font families across all sections. No section loading a different font.
- [ ] **Heading sizes are consistent** — Same heading level uses the same size across all sections.
- [ ] **Body text is consistent** — Same font size, line height, and paragraph spacing in all sections.
- [ ] **Code/technical text styling is consistent** — If the narrative includes code snippets or formulas, the styling matches across sections.

### Spacing and Rhythm Checklist

- [ ] **Section padding is consistent** — All sections have the same vertical padding (or an intentional variation pattern).
- [ ] **Element margins follow a scale** — Spacing between elements uses a consistent scale (e.g., 8px base: 8, 16, 24, 32, 48).
- [ ] **Vertical rhythm is maintained** — Text baselines and element alignment create a consistent visual rhythm.

### Transition and Motion Checklist

- [ ] **Animation duration is consistent** — Similar interactions use similar durations (e.g., all hover transitions use 200ms, all scroll reveals use 400ms).
- [ ] **Easing functions match** — Same easing curve for similar animation types across sections.
- [ ] **Section transitions are smooth** — Scrolling between sections feels unified, not like moving between different apps.

### Motif and Theme Checklist

- [ ] **Recurring motif is present** — If the spec defines a visual motif (e.g., gradient flowing through sections), verify it appears consistently.
- [ ] **Motif evolves intentionally** — If the motif changes across sections (e.g., simple → complex), the evolution matches the narrative arc.
- [ ] **No orphaned styles** — No section contains visual elements (borders, shadows, decorations) that appear nowhere else and have no narrative purpose.
