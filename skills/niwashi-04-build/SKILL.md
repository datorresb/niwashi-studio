---
name: niwashi-04-build
description: >
  Incrementally build each narrative section as a React component with
  calibration-then-autonomous execution. Scaffolds the project, tracks state in
  sections-checklist.json, verifies fresh after every section, and commits
  atomically. Use when the narrative-spec has approved wireframes and you are
  ready to turn ASCII into working code.
---

*手入れ (Teire) — Cultivate with patience, prune the excess.*

# niwashi-04-build — Phase 4: BUILD

Build each section of the narrative as an isolated React component, one at a
time, verifying each before moving on. Sections 1–2 require human calibration;
sections 3+ proceed autonomously using the approved exemplars as reference.

---

## 0. Pre-flight: Determine Entry Point

Before doing anything, determine where you are:

```
Has sections-checklist.json been created?
├── NO  → Go to §1 (First Entry)
└── YES → Go to §2 (Re-entry)
```

---

## 1. First Entry — Project Initialization

### 1.1 Scaffold the React Project

Run from the **niwashi-studio root**:

```bash
bash skills/web-artifacts-builder/scripts/init-artifact.sh <narrative-name>
```

This creates a React + TypeScript + Vite + Tailwind CSS + shadcn/ui project with
40+ components pre-installed. The project directory will be `./<narrative-name>/`.

### 1.2 Create `sections-checklist.json`

Read the `## Sections` list from `niwashi_docs/<narrative>/narrative-spec.md`.
Create `niwashi_docs/<narrative>/sections-checklist.json` following the schema at
`skills/niwashi-04-build/references/sections-checklist-schema.json`.

Rules:
- `project_path` → relative path to the scaffold directory (e.g. `./<narrative-name>`)
- Sections 1–2: `calibration_required: true`
- Sections 3+: `calibration_required: false`
- All sections start with `passes: false`, `verified_at: null`, `commit: null`
- `review_approved` starts as `false`

### 1.3 Start the Dev Server

```bash
cd <project_path>
npm run dev &
```

Vite HMR keeps the server running. One server for the entire build — do NOT
restart between sections.

### 1.4 Log Initialization

Append to `niwashi_docs/<narrative>/progress.md`:

```markdown
## BUILD — Initialization
- Date: <ISO date>
- Project scaffolded at: <project_path>
- Sections: <count> (calibration: 1–2, autonomous: 3+)
- Dev server started on :5173
```

Proceed to **§3 (Per-Section Loop)**.

---

## 2. Re-entry Protocol

When resuming a BUILD session:

### 2.1 Verify Project Exists

Read `project_path` from `niwashi_docs/<narrative>/sections-checklist.json`.
Confirm the directory exists on disk.

```bash
[ -d "<project_path>" ] && echo "OK" || echo "MISSING — re-run §1"
```

### 2.2 Verify Dev Server

```bash
lsof -i :5173 | grep LISTEN
```

If nothing is listening, restart:

```bash
cd <project_path> && npm run dev &
```

### 2.3 Read Progress

Read `niwashi_docs/<narrative>/progress.md` for context on what was completed, any
notes from previous sessions, and the last section that passed.

### 2.4 Resume

Read `sections-checklist.json`. Find the first section where `passes: false`.
Continue from **§3** for that section.

---

## 3. Per-Section Build Loop

Process sections **in order**. Never skip ahead.

### 3.1 Read Inputs

For the current section, gather:

1. **Wireframe** — from `narrative-spec.md` under `## Wireframes`, find the
   matching section block (HEADER, INTERACTIVE, COPY, TRANSITION)
2. **Visual language** — from `narrative-spec.md` under the visual language /
   design system section (palette, typography, background treatment, motifs)
3. **Design reinforcement** — read `skills/niwashi-04-build/references/design-reinforcement.md`
   before writing any component code. This is a compact anti-convergence nudge.
4. **Calibration exemplar** (sections 3+ only) — review the approved section 1
   and 2 components to understand the established quality bar

### 3.1b Asset Readiness Check

Before implementing, scan for asset requirements:

1. Check this section's wireframe for `[ASSET: ...]` tags
2. Check the `### Asset Palette` in `narrative-spec.md` for entries matching this section
3. For each required asset:
   - **Available on disk** (in project `public/` or `src/assets/`)? → Use it
   - **Available via an installed skill** (e.g., `tiny-pixel-design`)? → Invoke the skill
   - **Not available?** → Ask the user via `vscode_askQuestions`:
     "Section {id} needs: [{asset description}]. Options:
      (1) I'll provide the asset — pause BUILD for this section
      (2) Use the fallback approach from Asset Palette
      (3) Proceed with a placeholder and create a TODO"

**Do NOT attempt to code complex visuals from scratch.** If it needs artistic skill (pixel art, illustrations, sprites, complex icons), use pre-made assets or the fallback.

If no `[ASSET:]` tags and no Asset Palette entries → skip this step.

### 3.2 Implement the Section

Create a React component for this section. Follow these skill references during
implementation:

- **`skills/react-best-practices/SKILL.md`** — performance patterns, rendering
  optimization, proper hook usage
- **`skills/composition-patterns/SKILL.md`** — component architecture, compound
  patterns, composition over props
- **`skills/web-design-guidelines/SKILL.md`** — accessibility, responsive design,
  Web Interface Guidelines compliance

**Design quality principles (non-negotiable):**

- **The hero section is a poster, not a document.** If section 1 looks like a README, it's wrong. Big type, bold imagery, minimal text.
- **Use the fonts from the spec's visual language** — never fall back to Inter, Roboto, or system-ui unless the spec explicitly chose them.
- **White space is a feature.** Generous padding, breathing room between elements. Cramped layouts signal low quality.
- **Interactions must feel intentional.** Smooth easing, purposeful motion. No janky transitions or placeholder animations.
- **Color serves meaning.** Every color use should trace back to the visual language's semantic palette.
- **Know your limits.** The agent cannot draw. If a section needs pixel art, illustrations, or custom graphics — use pre-made assets, invoke a specialized skill, or ask the user. Never generate complex art with SVG `<rect>` elements or CSS box-shadow pixel grids. The result will be ugly.
- **Resist convergence.** Re-read `references/design-reinforcement.md` if you catch yourself defaulting to flat backgrounds, uniform layouts, or timid color use. Each section should feel structurally distinct.

Implementation guidelines:

1. **One component file per section** — e.g. `src/sections/Section1Hero.tsx`
2. **Import and render in App.tsx** — sections stack vertically in narrative order
3. **Interactive elements** — implement exactly what the wireframe describes.
   No more, no less.
4. **Transitions** — implement the TRANSITION note from the wireframe to connect
   to the next section visually
5. **Tailwind for styling** — use the design tokens from the visual language.
   Use shadcn/ui components where they fit naturally.
6. **No placeholder content** — every heading, paragraph, and data point must
   reflect the narrative-spec content

### 3.3 Verify Fresh

After implementation, run the full verification protocol. See
`skills/niwashi-04-build/references/verification-protocol.md` for exact commands.

Summary of checks:
1. **Build succeeds** — `npm run build` exits 0 with no errors
2. **No console errors** — dev server terminal has no errors or warnings that
   indicate broken code
3. **Component renders** — the section is visible and interactive in the browser

> **Critical:** verification must be done fresh for every section. Do not rely on
> a previous verification — code changes can break earlier sections.

If verification fails:
- Fix the issue
- Re-run verification from step 1
- Do NOT proceed until all 3 checks pass

### 3.4 Approval Gate

**If `calibration_required: true` (sections 1–2):**

Present the section to the human:

> Section {id}: "{title}" is implemented and verified.
> Please review in the browser at http://localhost:5173 and confirm:
> 1. Does the content match the wireframe intent?
> 2. Is the visual quality acceptable?
> 3. Do the interactions work as specified?
>
> Approve to continue, or describe what needs to change.

Wait for explicit human approval. If changes requested, return to §3.2.

**If `calibration_required: false` (sections 3+):**

Proceed autonomously. The calibrated sections 1–2 set the quality bar. Match
their patterns for:
- Component structure and composition
- Visual density and spacing
- Interaction fidelity
- Transition quality

### 3.5 Record Pass

Update `sections-checklist.json` for the current section:

```json
{
  "passes": true,
  "verified_at": "<ISO 8601 timestamp>",
  "commit": "<short SHA after commit>"
}
```

### 3.6 Commit

```bash
git add .
git commit -m "feat(section-<id>): <title>"
```

Use the section id and title from the checklist. Keep the message concise.

### 3.7 Log Progress

Append to `niwashi_docs/<narrative>/progress.md`:

```markdown
### Section <id>: <title>
- Status: PASSED
- Calibration: <required|autonomous>
- Verified at: <timestamp>
- Commit: <sha>
- Notes: <any observations, difficulties, or decisions made>
```

### 3.8 Next Section

Check if more sections remain with `passes: false`:
- **Yes** → return to §3.1 for the next section
- **No** → all sections built. Proceed to **§4**.

---

## 4. Build Complete

When all sections have `passes: true`:

1. Run one final full build verification:
   ```bash
   cd <project_path> && npm run build
   ```

2. Confirm all sections render correctly in sequence

3. Log completion to `niwashi_docs/<narrative>/progress.md`:
   ```markdown
   ## BUILD — Complete
   - Date: <ISO date>
   - All <count> sections built and verified
   - Ready for REVIEW phase
   ```

4. Inform the user:
   > All sections are built and verified. The narrative is ready for
   > `/niwashi-05-review` (REVIEW phase — content + implementation passes).

Do **not** set `review_approved` — that is the REVIEW phase's responsibility.

---

## 5. Decision Reference

Quick lookup for common decision points:

| Situation | Action |
|-----------|--------|
| No `sections-checklist.json` | First entry → §1 |
| Checklist exists, some `passes: false` | Re-entry → §2 then §3 |
| All `passes: true`, `review_approved: false` | Build complete → §4, route to REVIEW |
| Dev server not running | `cd <project_path> && npm run dev &` |
| Build fails after a section change | Fix → re-verify → do not proceed |
| Human rejects calibration section | Return to §3.2, re-implement |
| Section 3+ quality drifts from exemplar | Stop, compare with sections 1–2, adjust |
| Earlier section breaks after later change | Fix earlier section first, re-verify all |

---

## 6. File Locations Summary

```
niwashi_docs/<narrative>/
├── narrative-brief.md          # From DISCOVER (read-only)
├── narrative-spec.md           # From RESEARCH+WIREFRAME (read-only)
├── sections-checklist.json     # BUILD state — this skill writes it
└── progress.md                 # Session log — append only

./<narrative-name>/             # React project (project_path)
├── src/
│   ├── App.tsx                 # Main app — imports all sections
│   └── sections/
│       ├── Section1Hero.tsx
│       ├── Section2Problem.tsx
│       └── ...
├── package.json
└── ...

skills/niwashi-04-build/
├── SKILL.md                    # This file
└── references/
    ├── verification-protocol.md
    └── sections-checklist-schema.json
```

---

## 7. What This Skill Does NOT Do

- **Does not create narrative content** — content comes from narrative-spec.md
- **Does not design wireframes** — wireframes come from the WIREFRAME phase
- **Does not run review passes** — that is the REVIEW skill's job
- **Does not set `review_approved`** — only REVIEW does that
- **Does not harvest patterns** — that is the HARVEST skill's job
- **Does not bundle to HTML** — use `web-artifacts-builder`'s bundle script separately if needed
