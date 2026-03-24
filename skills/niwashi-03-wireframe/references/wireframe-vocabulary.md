# Wireframe Vocabulary Reference

Box-drawing characters, zone naming conventions, and interaction notation for niwashi-03-wireframe ASCII wireframes.

---

## Box-Drawing Characters

Use these Unicode box-drawing characters consistently. Do NOT mix with ASCII dashes/pipes.

### Section Container (outer box)

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Content goes here                                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

| Character | Name | Usage |
|-----------|------|-------|
| `┌` | Top-left corner | Start of section container |
| `┐` | Top-right corner | End of top border |
| `└` | Bottom-left corner | Start of bottom border |
| `┘` | Bottom-right corner | End of section container |
| `│` | Vertical bar | Left and right borders |
| `─` | Horizontal bar | Top and bottom borders |

### Nested Zone (inner box)

```
│  ┌─────────────────────────────────────────────────┐    │
│  │  Zone content                                    │    │
│  └─────────────────────────────────────────────────┘    │
```

Nested zones use the same characters, indented 2-3 spaces inside the parent container. Always leave 4 spaces between the inner box right edge and the outer box right edge.

### Sub-Zones (named regions inside a zone)

```
│  │  ┌── CONTROL-A ──────────────────────────────┐   │    │
│  │  │  · Description                             │   │    │
│  │  └───────────────────────────────────────────┘   │    │
```

Sub-zone labels appear inline with the top border: `┌── LABEL ──────┐`

### Column Layout

```
│  ┌── LEFT ──────────────┐  ┌── RIGHT ─────────────┐    │
│  │  Content              │  │  Content              │    │
│  └──────────────────────┘  └──────────────────────┘    │
```

Columns are placed side-by-side with 2 spaces between them. Each column uses named labels.

---

## Zone Names

Every wireframe must contain these four primary zones:

| Zone | Label in wireframe | Description |
|------|-------------------|-------------|
| Header | `HEADER:` | The section's user-facing headline. Appears at the top of the section container. |
| Interactive | `INTERACTIVE:` | The visualization or interaction area. Contains what the user sees and does. |
| Copy | `COPY:` | Supporting explanatory text. Summarizes what the prose will cover. |
| Transition | `TRANSITION →` | How the user moves to the next section. Uses arrow notation. |

### Zone Placement Rules

1. **HEADER** always comes first, directly inside the section container
2. **INTERACTIVE** is enclosed in its own nested box
3. **COPY** appears as a text line (no box), below the interactive zone
4. **TRANSITION** appears last, using arrow (→) notation

### Optional Sub-Zones

| Sub-Zone | When to use | Label format |
|----------|-------------|--------------|
| `CONTROL-A`, `CONTROL-B`, ... | Multiple interaction controls in one interactive zone | `┌── CONTROL-A ──┐` |
| `LEFT`, `RIGHT` | Side-by-side column layout | `┌── LEFT ──┐  ┌── RIGHT ──┐` |
| `[static]` | Section has no user interaction | `INTERACTIVE: [static]` |
| `[end]` | Final section with no next section | `TRANSITION → [end]` |

---

## Interaction Notation

Inside the `INTERACTIVE` zone, use bullet notation with the middle-dot character (`·`) to describe interactions.

### Structure

Each interaction description follows a three-part pattern:

```
│  │  INTERACTIVE: <What the visualization shows>     │    │
│  │  · <What the user does>                          │    │
│  │  · <What changes on screen>                      │    │
│  │  · <Key insight revealed>                        │    │
```

| Line | Purpose | Example |
|------|---------|---------|
| Label line | Names the visualization | `INTERACTIVE: Loss landscape heatmap` |
| User action (`·`) | What the user physically does | `· User drags slider to adjust learning rate` |
| System response (`·`) | What changes visually | `· Loss curve redraws in real-time` |
| Insight (`·`) | What the user learns | `· Reveals sensitivity of convergence to learning rate` |

### Interaction Types

Use these phrases to describe the type of interaction:

| Type | Notation | Example |
|------|----------|---------|
| Drag/slide | `· User drags <element> to <effect>` | `· User drags slider to adjust constraint bound` |
| Click/tap | `· User clicks <element> to <effect>` | `· User clicks node to expand subtree` |
| Hover | `· User hovers over <element> to see <detail>` | `· User hovers over bar to see exact value` |
| Scroll-triggered | `· On scroll: <animation>` | `· On scroll: data points stream in progressively` |
| Toggle | `· User toggles <option> between <states>` | `· User toggles view between 2D and 3D` |
| Input | `· User enters <value> to <effect>` | `· User enters a number to seed the simulation` |
| Play/pause | `· User controls <animation> with play/pause` | `· User controls optimization steps with play/pause` |
| Comparison | `· User selects <A or B> to compare <property>` | `· User selects algorithm A or B to compare runtime` |

### Static Sections

For sections with no interaction (hero, closing, narrative-only):

```
│  │  INTERACTIVE: [static]                           │    │
│  │  · <Describe the visual or animation>            │    │
```

---

## Transition Notation

Transitions use the arrow `→` after the `TRANSITION` keyword.

### Format

```
│  TRANSITION → <mechanism>: <visual> — <narrative bridge>│
```

| Part | Description | Example |
|------|-------------|---------|
| Mechanism | How the user advances | `scroll`, `click-to-advance`, `auto-after-3s` |
| Visual | What the transition looks like | `fade`, `slide-up`, `parallax`, `morph`, `dissolve` |
| Narrative bridge | What connects this idea to the next | `"from individual points to the full distribution"` |

### Examples

```
TRANSITION → scroll: fade — "from the problem to the first attempt at a solution"
TRANSITION → scroll: slide-up — "zooming out from one tree to the full forest"
TRANSITION → click-to-advance: morph — "same data, different perspective"
TRANSITION → auto-after-3s: dissolve — "the answer reveals itself"
TRANSITION → [end]
```

### Special Transitions

| Notation | Meaning |
|----------|---------|
| `TRANSITION → [end]` | Final section, no next section |
| `TRANSITION → <URL or CTA>` | Closing section with external link or call-to-action |

---

## Complete Example

```
## Section 3: How the Optimizer Explores the Space

┌─────────────────────────────────────────────────────────┐
│  HEADER: "Searching for the Best Solution"              │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │  INTERACTIVE: Parameter space as 2D heatmap      │    │
│  │  · User drags a point to move through the space  │    │
│  │  · Feasible region boundary highlights in green   │    │
│  │  · Objective value updates as a live counter      │    │
│  │  · Reveals that many feasible points are far      │    │
│  │    from optimal                                   │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  COPY: Explains the difference between feasible and     │
│  optimal, and why brute-force search doesn't scale.     │
│                                                         │
│  TRANSITION → scroll: parallax — "from manual search    │
│  to the algorithm that automates it"                    │
└─────────────────────────────────────────────────────────┘
```

## Multi-Control Example

```
## Section 5: Tuning the Parameters

┌─────────────────────────────────────────────────────────┐
│  HEADER: "Finding the Sweet Spot"                       │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │  INTERACTIVE: Live simulation dashboard          │    │
│  │                                                  │    │
│  │  ┌── CONTROL-A ──────────────────────────────┐   │    │
│  │  │  · User drags learning rate slider (0–1)   │   │    │
│  │  │  · Loss curve redraws with new trajectory  │   │    │
│  │  └───────────────────────────────────────────┘   │    │
│  │                                                  │    │
│  │  ┌── CONTROL-B ──────────────────────────────┐   │    │
│  │  │  · User toggles momentum on/off            │   │    │
│  │  │  · Convergence path changes smoothness     │   │    │
│  │  └───────────────────────────────────────────┘   │    │
│  │                                                  │    │
│  │  · Reveals that momentum prevents oscillation    │    │
│  │    but hides overshooting at high learning rates │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  COPY: Introduces hyperparameter tradeoffs — why        │
│  there's no single "right" setting.                     │
│                                                         │
│  TRANSITION → scroll: slide-up — "from manual tuning    │
│  to automated search"                                   │
└─────────────────────────────────────────────────────────┘
```

---

## Asset Annotations

When an INTERACTIVE zone requires visuals that **cannot be produced well with code alone** (pixel art, illustrations, complex icons, sprites, photographs), tag the asset requirement inline:

### Format

```
[ASSET: <type>, <description>, <style>]
```

### Examples

```
│  │  INTERACTIVE: Garden scene with animated character   │    │
│  │  [ASSET: tileset, garden environment, pixel art 16x16]    │
│  │  [ASSET: sprite, gardener character, pixel art 32x32]     │
│  │  · User clicks to plant seeds in different zones     │    │
│  │  · Garden grows with scroll progress                 │    │
```

```
│  │  INTERACTIVE: [static]                               │    │
│  │  [ASSET: illustration, hero banner, watercolor style] │    │
│  │  · Full-width visual sets the mood                   │    │
```

### When to tag

- **Tag:** pixel art, illustrations, sprites, tilesets, photographs, custom icons, complex backgrounds
- **Don't tag:** CSS gradients, SVG geometric shapes, Tailwind utilities, shadcn/ui components, text/typography effects

Asset tags carry forward to RESEARCH (Asset Palette) and BUILD (§3.1b Asset Readiness Check).

## Side-by-Side Layout Example

```
## Section 4: Before and After

┌─────────────────────────────────────────────────────────┐
│  HEADER: "The Difference One Algorithm Makes"           │
│                                                         │
│  ┌── LEFT ──────────────────┐  ┌── RIGHT ────────────┐  │
│  │  INTERACTIVE: Brute-force │  │  INTERACTIVE: Smart  │  │
│  │  · Points tested: 10,000  │  │  · Points tested: 47 │  │
│  │  · Time: 8.2s             │  │  · Time: 0.03s       │  │
│  └──────────────────────────┘  └─────────────────────┘  │
│                                                         │
│  · User clicks "Run" to start both simultaneously       │
│  · Reveals: same answer, wildly different cost           │
│                                                         │
│  COPY: Efficiency is not about finding a better answer   │
│  — it's about finding the same answer faster.            │
│                                                         │
│  TRANSITION → scroll: fade — "now, how does it work      │
│  under the hood?"                                        │
└─────────────────────────────────────────────────────────┘
```
