# S4: Visual Language — Stream Instructions

> You are executing the Visual Language stream. You have access to S1 (Technical Analysis)
> and S3 (Narrative Arc) outputs. Define the complete visual vocabulary for the narrative.

## Your Goal

Design a cohesive visual language — color, typography, motion, and interaction patterns — that serves the narrative arc and makes the technical concepts tangible. The output should be specific enough that a BUILD agent can implement it without design ambiguity.

**Design bar:** Think Apple product pages, Stripe's documentation, or Linear's landing page — not generic Bootstrap dashboards. The narrative should feel like a premium editorial experience, not a technical document with charts bolted on.

### 0. Visual Thesis (before anything else)

Answer this question first: **"What should this narrative feel like?"**

Write a 1-2 sentence visual thesis that captures the essence. Examples:
- "A calm scientific observatory where the user discovers patterns through exploration"
- "An energetic workshop where gears and levers teach optimization through play"
- "A meditative garden where complexity reveals itself gradually through scroll"

Every design decision below must serve this thesis. If a color, font, or motion doesn't align — cut it.

## Input

You receive:
- The complete `narrative-brief.md` content
- S1: Technical Analysis output (core mechanism, visual affordances, complexity ladder)
- S3: Narrative Arc output (sections, emotional arc, transitions)
- Any relevant pattern excerpts from `niwashi_docs/patterns/` (may be empty)

## Process

### 1. Color Palette

Define a palette with **semantic meaning**, not decoration. Every color choice should communicate something about the concept.

Design:
- **Primary:** The concept's main visual identity (1 color + light/dark variants)
- **Accent:** For interactive elements and highlights (1-2 colors)
- **Semantic colors:** Map concept-specific meanings to colors (e.g., "feasible region = green", "constraint violation = red")
- **Neutral scale:** Background, text, borders (4-5 values from near-white to near-black)

Specify colors as CSS custom properties with hex values:
```css
--color-primary: #3B82F6;
--color-primary-light: #DBEAFE;
--color-primary-dark: #1E40AF;
--color-accent: #F59E0B;
--color-semantic-positive: #10B981;
--color-semantic-negative: #EF4444;
```

**Constraint from S2:** If the audience expects a professional/corporate tone, avoid playful palettes. If the audience is learning-focused, warmth and friendliness matter more.

### 2. Typography Hierarchy

Define the type scale for the narrative. Prioritize readability and scanability:

- **Display / Hero:** Section titles, the thing that sets the mood
- **Heading:** Sub-sections within a section
- **Body:** Narrative copy — the workhorse
- **Label:** Annotations on visualizations, axis labels, tooltips
- **Code:** If the concept involves code snippets

For each level, specify: font family, size range, weight, and line-height.

**Font selection rules:**
- **2 fonts maximum.** One for display/headings, one for body. More is noise.
- **No generic defaults.** Never use Inter, Roboto, Open Sans, or `system-ui` as the primary font. These are invisible — they signal "I didn't think about typography."
- **Choose characterful fonts** from Google Fonts that match the visual thesis. Examples: Space Grotesk, DM Serif Display, Playfair Display, JetBrains Mono, Sora, Instrument Serif.
- The font IS the personality of the narrative. Pick fonts that someone would notice.

```css
/* EXAMPLE — replace with thesis-appropriate choices */
--font-display: 'Space Grotesk', sans-serif;
--font-body: 'DM Sans', sans-serif;
--font-code: 'JetBrains Mono', monospace;
--text-display: 2.5rem;
--text-heading: 1.5rem;
--text-body: 1.125rem;
--text-label: 0.875rem;
```

### 2.5 Background Treatment

Backgrounds create atmosphere and depth. A solid white or dark background is almost never the right choice for a narrative visualization — it signals "I didn't think about this."

For each section, define the background approach:

- **Base layer:** Solid color from the palette, or a gradient between palette values
- **Depth layer:** Subtle pattern, noise texture, or geometric shapes that add dimension without competing with content
- **Contextual effects:** Effects that match the narrative's domain (e.g., grid lines for optimization, organic shapes for biology, circuit patterns for computing)

**Rules:**
- **Cross-section variation is mandatory.** Not every section should use the same background approach. Vary between gradient directions, pattern densities, and color temperatures to create visual rhythm.
- **Hero sections need atmosphere.** The first section sets the tone — layer a gradient, add a subtle radial glow, or use a CSS pattern that anchors the visual identity.
- **Backgrounds serve the content.** If a section has a dense visualization, the background should recede. If a section is mostly typography, the background can be more expressive.

Specify as CSS:
```css
/* EXAMPLE — replace with thesis-appropriate choices */
--bg-hero: linear-gradient(135deg, var(--color-primary-dark) 0%, #0a0a0a 100%);
--bg-section-alt: radial-gradient(ellipse at 20% 50%, var(--color-primary-light) 0%, transparent 70%);
--bg-pattern: url("data:image/svg+xml,..."); /* or describe the pattern to generate */
```

### 3. Animation Vocabulary

Define the motion language for the narrative. Animations should clarify, not decorate.

For each transition type identified in S3, define:
- **Trigger:** What causes the animation? (Scroll position, user interaction, auto-play)
- **Duration:** How long? (Use ranges: fast 150-200ms for UI, medium 300-500ms for reveals, slow 800-1200ms for educational animations)
- **Easing:** What curve? (ease-out for entrances, ease-in-out for transforms, linear for continuous)
- **Purpose:** Why animate this? (Reveal data, show causality, guide attention, show progression)

```css
--duration-fast: 150ms;
--duration-medium: 400ms;
--duration-slow: 1000ms;
--easing-enter: cubic-bezier(0, 0, 0.2, 1);
--easing-transform: cubic-bezier(0.4, 0, 0.2, 1);
```

**Rule:** Every animation must serve comprehension. Ask "does removing this animation lose understanding?" If no, remove it.

### 4. Interaction Patterns

For each section in S3's narrative arc, define the interaction vocabulary. Map S1's visual affordances to concrete interactions:

For each interaction:
- **Section:** Which section uses this
- **Type:** Direct manipulation / slider / toggle / hover-reveal / scroll-driven / auto-play
- **Input:** What the user does (drag, click, scroll, hover)
- **Response:** What changes visually (position, color, opacity, data, annotation)
- **Feedback:** How the user knows their input was received (immediate visual change, tooltip, counter)
- **Fallback:** What happens on mobile/touch? What if JS is disabled?

Aim for typically 3 or more distinct interaction patterns across the narrative. Reuse patterns across sections where appropriate — consistency helps learning.

### 5. Layout Tokens

Define the spatial system:

```css
--space-xs: 0.25rem;
--space-sm: 0.5rem;
--space-md: 1rem;
--space-lg: 2rem;
--space-xl: 4rem;
--space-section: 6rem;    /* vertical gap between sections */
--max-width-content: 65ch; /* readable line length */
--max-width-viz: 800px;    /* visualization container */
```

### 6. Section-Specific Visual Notes

For each section in S3, add brief visual direction notes:
- What's the dominant visual element? (Visualization, illustration, text, animation)
- What mood should the visual treatment convey? (Match S3's emotional beat)
- Any specific visual references from the concept domain?

### 7. Asset Palette

Identify visual elements that **cannot be produced well with code alone** — illustrations, pixel art, complex icons, sprites, tilesets, photographs.

For each, provide:

| Element | Type | Suggested Source | Fallback | License |
|---------|------|-----------------|----------|----------|
| [what's needed] | [SVG/PNG/sprite/tileset/icon] | [where to find it] | [code-only alternative] | [license to check] |

**Decision criteria:** If it requires artistic skill the agent doesn't have (drawing, illustration, pixel art), list it. If it can be done well with CSS, SVG shapes, Tailwind utilities, or shadcn/ui components — omit it.

**Common sources:** Google Fonts, Lucide/Heroicons (icons), Undraw/Storyset (illustrations), itch.io (game assets/tilesets), Unsplash (photos), custom skills.

If no external assets are needed, write: `No external assets required — all visuals achievable with CSS/SVG/Tailwind.`

## Output Format

Return your visual language as structured markdown with these exact headings:

```markdown
## Visual Language

### Color Palette
[CSS custom properties with hex values and semantic descriptions]

### Typography
[CSS custom properties with font families, sizes, weights]

### Background Treatment
[CSS custom properties/patterns for hero, alternating sections, and contextual effects]

### Animation Vocabulary
[Named animation patterns with triggers, durations, and purposes]

### Interaction Patterns
For each interaction:
- **Section [N]: [Name]**
  - Type: [interaction type]
  - Input: [what user does]
  - Response: [what changes]
  - Feedback: [how user knows]
  - Fallback: [mobile/degraded behavior]

### Layout Tokens
[CSS custom properties for spacing and sizing]

### Section Visual Notes
For each section:
- **Section [N]:** [dominant visual + mood + reference notes]

### Asset Palette
| Element | Type | Suggested Source | Fallback | License |
|---------|------|-----------------|----------|----------|
| [element] | [type] | [source] | [fallback] | [license] |

(or: "No external assets required")
```

## Quality Criteria

Your output is strong when:
- Every color has a reason (not "it looks nice")
- Typography supports scanability at every level
- Animations serve comprehension — none are purely decorative
- Interaction patterns are concrete enough to implement without design review
- Typically 3+ distinct interaction patterns are defined
- CSS custom properties are specified so BUILD can use them directly
- The visual language feels cohesive — all pieces work together
- S2's audience expectations are respected (professional vs. playful vs. educational)

## If Patterns Were Provided

Check whether the pattern's visual language is reusable:
- Same concept domain? → Consider reusing the color semantic mapping (e.g., "green = feasible" across optimization narratives)
- Pattern notes what visual approaches worked? → Build on them
- Pattern notes what didn't work? → Explicitly avoid those choices
- Note reuse: "Adapting color semantics from [pattern-name]; new interaction patterns for this concept's affordances"
