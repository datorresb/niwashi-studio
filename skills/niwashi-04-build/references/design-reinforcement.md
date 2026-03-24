# Design Reinforcement — Anti-Convergence Nudge

> Load this before implementing each section. It costs ~400 tokens and prevents
> the most common failure mode: converging toward generic "AI-generated" aesthetics.

## The Problem You Must Resist

You tend toward distributional convergence — safe, generic implementations that
look like every other AI-generated UI. Solid white backgrounds, uniform section
layouts, everything appearing at once, the same structural patterns repeated
across sections.

**Before writing any component code, re-read the visual language section of
`narrative-spec.md` — especially Color Palette, Typography, Background Treatment,
and Animation Vocabulary.** The spec already defines all of these. Your job is to
implement them faithfully — not to invent a safer version.

## Check These Dimensions

For every section, verify you are NOT defaulting to:

1. **Flat backgrounds** — Use the spec's background treatment. Layer gradients,
   add subtle texture, create atmosphere. A solid `bg-white` or `bg-gray-950`
   with nothing else is almost always wrong.

2. **Uniform layouts** — Each section should feel structurally distinct. Vary
   content width, visual weight, whitespace rhythm, and element positioning
   across sections. The wireframe already defines this — follow it.

3. **No entrance choreography** — Implement staggered reveals on page load and
   scroll entry. One well-orchestrated sequence of `animation-delay` values
   creates more delight than scattered micro-interactions. Use CSS animations
   or Framer Motion, not JS timeouts.

4. **Same font treatment everywhere** — The spec defines a type hierarchy. Use
   the display font boldly in heroes, the body font for prose, and vary weight
   extremes (100/200 vs 800/900) — not just 400 vs 600.

5. **Color timidity** — Commit to the spec's palette. Dominant colors with sharp
   accents outperform evenly-distributed pastels. Use primary colors at full
   strength somewhere — don't dilute everything to 20% opacity.

## The Variation Rule

After implementing section N, glance back at sections 1 through N-1. If the new
section feels structurally identical to any of them — same layout grid, same
background approach, same animation style — revisit the wireframe and find what
makes this section unique. Differentiate it.
