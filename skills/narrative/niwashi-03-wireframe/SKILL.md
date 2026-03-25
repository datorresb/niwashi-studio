---
name: niwashi-03-wireframe
description: "Generates ASCII wireframes for every section in a narrative spec. Use /niwashi-03-wireframe whenever you need to turn a narrative structure into spatial layouts before writing code — sketching zones, interactions, and transitions in cheap text before committing to expensive React. Even a single section benefits from wireframing first."
---

# /niwashi-03-wireframe — ASCII Wireframe Generation

> *枯山水 (Karesansui) — Represent the complex with the simple.*

This skill reads the narrative structure from `narrative-spec.md` and produces ASCII wireframes for every section. Wireframes are iterated with the user until approved, then appended to the spec.

**Why wireframe in ASCII?** Changing text is free. Changing React components is expensive. Every minute spent here saves ten in BUILD.

---

## Prerequisites

Before starting, confirm these exist in `niwashi_docs/<narrative>/`:

| File | Required content |
|------|-----------------|
| `narrative-spec.md` | Must contain `## Narrative Structure` with numbered sections |

If `narrative-spec.md` is missing or has no `## Narrative Structure`, stop and tell the user to run `/niwashi-02-research` first.

---

## Inputs

Read these from `narrative-spec.md`:

1. **`## Narrative Structure`** — The ordered list of sections (titles, purpose, content summary)
2. **`## Visual Language`** (if present) — Color palette, typography, motifs, interaction style
3. **`## Audience Profile`** (if present) — Who the narrative is for (affects complexity of interaction descriptions)

Also read:
- `references/wireframe-vocabulary.md` (this skill's reference) — for the box-drawing notation and zone conventions

---

## Procedure

### Step 1: Extract Sections

Parse `## Narrative Structure` from `narrative-spec.md`. Build a list:

```
Section 1: <title> — <purpose>
Section 2: <title> — <purpose>
...
Section N: <title> — <purpose>
```

Count the sections. Tell the user: "I found N sections in the narrative structure. I'll wireframe each one."

### Step 2: Generate Wireframes

For **each** section, produce one ASCII wireframe using the zone vocabulary from `references/wireframe-vocabulary.md`.

Every wireframe MUST include these four zones:

| Zone | Purpose | Required content |
|------|---------|-----------------|
| **HEADER** | Section title as the user will see it | A human-readable headline (not the internal section name) |
| **INTERACTIVE** | The visualization or interaction | What the user does + what changes on screen |
| **COPY** | Supporting text | 1-sentence summary of what the copy will explain |
| **TRANSITION** | Connection to next section | How the user moves forward (scroll, click, animation) |
**Zone exceptions:** If a section genuinely doesn't need a zone (e.g., a hero section with no copy, or a closing section with no transition), mark the zone as `[N/A — <reason>]` instead of omitting it. This keeps the structure scannable while allowing design flexibility.

**Asset tagging:** If any INTERACTIVE zone requires visuals beyond what CSS/SVG/Tailwind can produce well (illustrations, pixel art, complex icons, sprites), add an `[ASSET: type, description, style]` tag inside the zone. See `references/wireframe-vocabulary.md` § Asset Annotations. These tags feed the Asset Palette in RESEARCH and the pre-implementation check in BUILD.

**Wireframe format:**

```
## Section N: <Title>

┌─────────────────────────────────────────────────────────┐
│  HEADER: "<User-facing headline>"                       │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │  INTERACTIVE: <What the visualization shows>     │    │
│  │  · <What the user does>                          │    │
│  │  · <What changes on screen in response>          │    │
│  │  · <Key insight the interaction reveals>         │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  COPY: <1-sentence summary of supporting text>          │
│                                                         │
│  TRANSITION → <How it connects to the next section>     │
└─────────────────────────────────────────────────────────┘
```

**Rules for interaction descriptions:**
- Be specific: "User drags a slider to adjust the learning rate" not "User interacts with parameters"
- Describe cause and effect: "Slider changes → loss curve redraws in real-time"
- Name the insight: "Reveals that small changes in learning rate produce dramatic differences in convergence"
- If a section has no interaction (e.g., a hero or closing), mark: `INTERACTIVE: [static]` and describe the visual instead

**Rules for transitions:**
- Name the mechanism: scroll-triggered, click-to-advance, animation-on-complete
- Describe the visual: fade, slide-up, parallax, morph
- Explain the narrative bridge: what connects this section's idea to the next

### Step 3: Present All Wireframes

Present every wireframe to the user in one message, in section order. After all wireframes, ask:

```
All N wireframes above. Review each one:
- Are the interactions right for your audience?
- Do the transitions create a natural flow?
- Is anything missing or out of order?

Which sections need changes? (List numbers, or say "all approved")
```

### Step 4: Iterate

This step repeats until the user approves all wireframes.

**On user feedback:**

1. Parse which sections the user wants changed
2. For each section needing changes:
   - Read the user's feedback for that section
   - Revise the wireframe, keeping unchanged zones stable
   - Show only the revised wireframe (not the full set)
3. After showing revisions, ask again:

```
Revised wireframes above. Any more changes, or are all sections approved?
```

**Iteration rules:**
- Do NOT re-show wireframes the user already approved (unless they ask)
- Do NOT combine feedback for different sections — address each section's feedback individually
- Do NOT push back on feedback — the user knows their audience. Adjust the wireframe.
- If the user suggests adding or removing a section, do it. Update the section numbering.
- If the user suggests splitting one section into two (or merging two into one), handle it and re-present the affected wireframes

**Maximum 10 rework cycles.** Wireframes are cheap, but stalling is not. If after 10 cycles the user is still not satisfied:
1. Log the current state and unresolved feedback to `progress.md`
2. Present the best-effort wireframes to the user
3. Suggest: "Consider re-running RESEARCH to refine the narrative-spec before continuing wireframing."
4. Wait for user to decide: continue (resets counter), switch to RESEARCH, or approve as-is

### Step 5: Append to Spec

**Exit condition: The user says the wireframes are approved.**

Only proceed when the user explicitly approves. Phrases that count as approval:
- "approved" / "all approved" / "looks good" / "ship it" / "done" / "LGTM"
- "yes" (in response to "are all sections approved?")

Phrases that do NOT count — ask for clarification:
- "mostly good" / "almost" / "one more thing" / "let me think"

**On approval:**

1. Open `narrative-spec.md`
2. If a `## Wireframes` section already exists, replace its contents entirely
3. If no `## Wireframes` section exists, append it after the last existing section

Write all approved wireframes under `## Wireframes`:

```markdown
## Wireframes

> Approved YYYY-MM-DD. These wireframes define the spatial layout and interaction
> contract for each section. The BUILD phase implements these as React components.

### Section 1: <Title>

┌─────────────────────────────────────────────────────────┐
│  ...                                                    │
└─────────────────────────────────────────────────────────┘

### Section 2: <Title>

┌─────────────────────────────────────────────────────────┐
│  ...                                                    │
└─────────────────────────────────────────────────────────┘

...
```

4. Confirm to the user: "Wireframes appended to narrative-spec.md under ## Wireframes."

---

## Wireframe Quality Checklist

Before presenting wireframes, verify each one passes:

- [ ] Has all four zones (HEADER, INTERACTIVE, COPY, TRANSITION)
- [ ] INTERACTIVE describes what the user does AND what changes on screen
- [ ] INTERACTIVE names the insight the interaction reveals (unless `[static]`)
- [ ] TRANSITION names both the mechanism (scroll, click) and the narrative bridge
- [ ] HEADER uses a user-facing headline, not an internal section label
- [ ] Box-drawing characters are consistent (see `references/wireframe-vocabulary.md`)

---

## Handling Edge Cases

**Section with multiple interactions:**
Nest sub-zones inside INTERACTIVE:

```
│  ┌─────────────────────────────────────────────────┐    │
│  │  INTERACTIVE: <Overall visualization>            │    │
│  │                                                  │    │
│  │  ┌── CONTROL-A ──────────────────────────────┐   │    │
│  │  │  · <First interaction>                     │   │    │
│  │  └───────────────────────────────────────────┘   │    │
│  │                                                  │    │
│  │  ┌── CONTROL-B ──────────────────────────────┐   │    │
│  │  │  · <Second interaction>                    │   │    │
│  │  └───────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
```

**Section with side-by-side layout:**
Use column notation:

```
│  ┌── LEFT ──────────────┐  ┌── RIGHT ─────────────┐    │
│  │  INTERACTIVE: ...     │  │  COPY: ...            │    │
│  └──────────────────────┘  └──────────────────────┘    │
```

**Hero / intro section (no interaction):**

```
│  ┌─────────────────────────────────────────────────┐    │
│  │  INTERACTIVE: [static]                           │    │
│  │  · <Describe the hero visual / animation>        │    │
│  └─────────────────────────────────────────────────┘    │
```

**Closing / CTA section:**

```
│  COPY: <Closing summary>                               │
│  TRANSITION → [end] or TRANSITION → <link/CTA>         │
```

---

## What This Skill Does NOT Do

- Does not write code. That's BUILD.
- Does not choose technologies. That's already decided (React + Vite + Tailwind + shadcn/ui).
- Does not design visual style. Visual language comes from RESEARCH's `narrative-spec.md`.
- Does not validate technical accuracy. That's REVIEW.

---

## Summary

```
READ narrative-spec.md ## Narrative Structure
  │
  ▼
FOR EACH section → generate ASCII wireframe with 4 zones
  │
  ▼
PRESENT all wireframes to user
  │
  ▼
ITERATE on feedback (revise → re-present → ask again)
  │                          ▲
  │    User requests changes │
  └──────────────────────────┘
  │
  │  User approves all
  ▼
APPEND wireframes to narrative-spec.md under ## Wireframes
  │
  ▼
DONE — exit to orchestrator
```
