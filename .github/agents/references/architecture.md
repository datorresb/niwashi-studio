# niwashi-studio — Architecture & Workflow Reference

> *庭師 (niwashi) — the gardener who cultivates understanding.*
>
> This document is the single source of truth for the niwashi-studio workflow.
> The `@niwashi` orchestrator agent reads this file to understand the full flow.
> Human developers read it to understand how the system works.

## The 6-Phase Workflow

```
DISCOVER → RESEARCH → WIREFRAME → BUILD → REVIEW → HARVEST → (next narrative)
   │           │           │          │        │         │
   │           │           │          │        │         └── Seeds feed RESEARCH
   │           │           │          │        └── 3 passes, 7 angles
   │           │           │          └── Calibrate 1-2, then autonomous
   │           │           │
   │           │           └── Cheap ASCII iterations before expensive code
   │           │
   │           └── 4 parallel streams + cross-check + pattern consultation
   │
   └── Socratic dialogue, 1 question at a time
```

## Full Workflow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        @niwashi orchestrator                                    │
│                                                                                 │
│  Reads artifact state in niwashi_docs/ → routes to the right phase              │
│  Self-bootstraps on first run (creates dirs + copilot-instructions.md)          │
│  Logs every session to progress.md                                              │
└────────┬────────────────────────────────────────────────────────────────────────┘
         │
         │  What exists on disk?
         │
         ▼
┌─ /niwashi-01-discover ─────────────────────────────────────────────────────────────┐
│  *観察 (Kansatsu) — Observe deeply before acting*                               │
│                                                                                 │
│  ┌─────────────┐     ┌─────────────┐     ┌──────────────────┐                   │
│  │ Detect input │────►│  Socratic   │────►│ narrative-brief  │                   │
│  │ type (repo,  │     │  dialogue   │     │ .md              │                   │
│  │ concept,     │     │  (1 Q at    │     │                  │                   │
│  │ docs, nb)    │     │   a time)   │     │ concept+audience │                   │
│  └─────────────┘     └─────────────┘     │ +goals+scope     │                   │
│                                           └──────────┬───────┘                   │
└──────────────────────────────────────────────────────┼──────────────────────────┘
                                                       │
                                                       ▼
┌─ /niwashi-02-research ─────────────────────────────────────────────────────────────┐
│  *石組 (Ishigumi) — Place the stones that define everything*                    │
│                                                                                 │
│  ┌──────────────────────┐                                                       │
│  │ Check patterns/      │  ◄── Loop closes here (from HARVEST)                  │
│  │ Prior art exists?    │                                                       │
│  │ Adapt, don't restart │                                                       │
│  └──────────┬───────────┘                                                       │
│             │                                                                   │
│  ┌──── Phase A (no deps) ──────────────────────────┐                            │
│  │  S1: Technical deep-dive    S2: Audience profile │                            │
│  └──────────────────┬──────────────────────────────┘                            │
│                     │                                                           │
│  ┌──── Phase B (needs A) ──────────────────────────┐                            │
│  │  S3: Narrative arc (needs S1)                    │                            │
│  │  S4: Visual language (needs S1+S3)               │                            │
│  └──────────────────┬──────────────────────────────┘                            │
│                     │                                                           │
│  ┌──── Cross-stream consistency check ─────────────┐                            │
│  │  S4 reflects S1? S3 addresses S2? Vocab aligned? │                            │
│  └──────────────────┬──────────────────────────────┘                            │
│                     │                                                           │
│             ┌───────▼───────┐                                                   │
│             │narrative-spec │                                                   │
│             │.md (synthesis)│                                                   │
│             └───────┬───────┘                                                   │
└─────────────────────┼──────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─ /niwashi-03-wireframe ────────────────────────────────────────────────────────────┐
│  *枯山水 (Karesansui) — Represent the complex with the simple*                  │
│                                                                                 │
│  For each section in narrative arc:                                              │
│  ┌─────────────────────────────────────────────────────┐                         │
│  │ ┌─ HEADER ──────────────────────────────────────┐   │                         │
│  │ │ ┌─ INTERACTIVE: [description of interaction] ─┐│   │                         │
│  │ │ └────────────────────────────────────────────┘│   │                         │
│  │ │ COPY: [content summary]                       │   │                         │
│  │ │ TRANSITION: [how it connects to next]         │   │                         │
│  │ └──────────────────────────────────────────────┘   │                         │
│  └─────────────────────────────────────────────────────┘                         │
│                                                                                 │
│  User approves? ──── No ──► revise (cheap iteration)                            │
│        │ Yes                                                                    │
│        ▼                                                                        │
│  Wireframes added to narrative-spec.md under ## Wireframes                      │
└─────────────────┼───────────────────────────────────────────────────────────────┘
                  │
                  ▼
┌─ /niwashi-04-build ────────────────────────────────────────────────────────────────┐
│  *手入れ (Teire) — Cultivate with patience, prune the excess*                   │
│                                                                                 │
│  First entry? → init-artifact.sh (React+Vite+Tailwind+shadcn/ui)               │
│                 Create sections-checklist.json (all passes: false)               │
│                 Start dev server (npm run dev)                                   │
│                                                                                 │
│  Per section loop:                                                              │
│  ┌──────────────────────────────────────────────────────────────────────────┐    │
│  │  Read wireframe + visual language from spec                              │    │
│  │       │                                                                  │    │
│  │       ▼                                                                  │    │
│  │  Implement React component                                               │    │
│  │       │                                                                  │    │
│  │       ▼                                                                  │    │
│  │  VERIFY FRESH: build + console + render check                            │    │
│  │       │                                                                  │    │
│  │  ┌────▼────────────────┐                                                 │    │
│  │  │calibration_required?│                                                 │    │
│  │  └────┬───────┬────────┘                                                 │    │
│  │   Yes │       │ No (sections 3+)                                         │    │
│  │       ▼       ▼                                                          │    │
│  │  Human     Autonomous                                                    │    │
│  │  approves? (follows calibrated exemplar)                                 │    │
│  │       │       │                                                          │    │
│  │       └───┬───┘                                                          │    │
│  │           ▼                                                              │    │
│  │  passes: true → commit "feat(section-N): title"                          │    │
│  │           │                                                              │    │
│  │      More sections? ── Yes ──► next section                              │    │
│  └───────────┼──────────────────────────────────────────────────────────────┘    │
│              │ No — all passes: true                                             │
└──────────────┼──────────────────────────────────────────────────────────────────┘
               │
               ▼
┌─ /niwashi-05-review ───────────────────────────────────────────────────────────────┐
│  *間 (Ma) — The pause where quality is found*                                   │
│                                                                                 │
│  PASS 1 — Content (no build needed):                                            │
│    ✓ Technical accuracy    ✓ Narrative flow    ✓ Clarity                         │
│    🔴 findings? → fix in BUILD → re-run Pass 1                                  │
│                                                                                 │
│  PASS 2 — Implementation + Coherence (build + browser):                         │
│    ✓ Automated checks      ✓ Performance (react-best-practices)                 │
│    ✓ Accessibility (web-design-guidelines)   ✓ Interaction QA                   │
│    ✓ Visual coherence across all sections                                       │
│    🔴 findings? → fix in BUILD → re-run Pass 2                                  │
│                                                                                 │
│  FINAL — Human walks through start to finish                                    │
│         → sets review_approved: true in checklist                                    │
└──────────────┼──────────────────────────────────────────────────────────────────┘
               │ approved
               ▼
┌─ /niwashi-06-harvest ──────────────────────────────────────────────────────────────┐
│  *実り (Minori) — Gather fruit, save seeds for next season*                     │
│                                                                                 │
│  Read: spec + checklist (rework history) + git log                              │
│       │                                                                         │
│       ▼                                                                         │
│  niwashi_docs/patterns/<concept-type>.md                                        │
│    • Narrative arc that worked                                                  │
│    • Interaction patterns that worked                                           │
│    • Visual approaches (specific, not vague)                                    │
│    • What didn't work / revisions needed                                        │
│    • Reuse recommendations                                                      │
│       │                                                                         │
│       └── Seeds for next narrative (RESEARCH reads patterns/)                   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Artifact State → Phase Routing

The `@niwashi` orchestrator first selects the active narrative, then routes:

```
Step 1: Narrative selection
─────────────────────────────────────────────── ─────────────
No subdirs in niwashi_docs/ (except patterns/)  Start DISCOVER (creates new subdir)
One narrative subdir exists                     Use it as active
Multiple narrative subdirs exist                Ask which to work on (or start new)

Step 2: Phase routing (within active narrative)
─────────────────────────────────────────────── ─────────────
Nothing in the narrative subdir                 DISCOVER
narrative-brief.md only                         RESEARCH
narrative-spec.md (no ## Wireframes section)    WIREFRAME
## Wireframes exists, no checklist              BUILD (init)
checklist exists, some passes: false            BUILD (continue)
checklist all passes: true, review_approved: false  REVIEW
review_approved: true in checklist                  HARVEST
pattern doc exists, cycle complete              Suggest new narrative
```

## Invocation Paths

Users have two ways to interact:

| Path | How | When to use |
|------|-----|-------------|
| `@niwashi` | Natural language | "explain gradient descent to VPs" → agent detects state, routes automatically |
| `/niwashi-NN-*` | Slash command | `/niwashi-04-build` to jump directly to a specific phase |

## Artifact Locations

Each narrative gets its own subdirectory. `patterns/` is shared across narratives.

```
niwashi_docs/
├── gradient-descent/               # Narrative 1
│   ├── narrative-brief.md          # DISCOVER output
│   ├── narrative-spec.md           # RESEARCH output (+ WIREFRAME wireframes + Asset Palette)
│   ├── sections-checklist.json     # BUILD state tracking
│   └── progress.md                 # Free-form session log
│
├── milp-optimizer/                 # Narrative 2
│   ├── narrative-brief.md
│   └── ...
│
└── patterns/                       # Shared — grows across all narratives
    ├── optimization-algorithm.md   # HARVEST output
    └── ...
```

The per-narrative React project lives OUTSIDE `niwashi_docs/` (e.g., `./gradient-descent-app/`).

## Design Principles

The workflow is built on 5 core principles:

1. **Artifact-driven routing** — the agent determines where it is by what files exist on disk, not by memory. State lives in files, not in context.
2. **Mandatory incrementality** — one section at a time, one phase at a time. Never try to do everything at once.
3. **Keep/discard with reversibility** — each section passes or fails independently. Failed sections get reworked, not patched. Git commits per section enable clean rollback.
4. **Budget discipline** — no phase should exceed 50 agent turns or 500K tokens. If a phase is approaching these limits, checkpoint progress and suggest the user start a fresh conversation.
5. **Rate-aware execution** — never fire more than 3 tool calls of the same type in sequence without pausing to verify the previous results. BUILD must verify each section before starting the next. Example: before re-running `npm run build` after a failure, check if the error was structural (needs a code change) or transient (retry may help). Do not retry structural errors without a code change.

## Japanese Garden Principles

Each phase carries a subtle philosophical reference:

| Phase | Principle | Meaning | Why it fits |
|-------|-----------|---------|-------------|
| DISCOVER | 観察 (Kansatsu) | Observe deeply before acting | Don't jump to building — understand first |
| RESEARCH | 石組 (Ishigumi) | Place the stones first | Research streams are the foundation stones |
| WIREFRAME | 枯山水 (Karesansui) | Dry garden — represent water with sand | ASCII represents interactivity with text |
| BUILD | 手入れ (Teire) | Patient cultivation and pruning | Section by section, nothing superfluous |
| REVIEW | 間 (Ma) | The pause, the space between | Quality lives in the pause before "done" |
| HARVEST | 実り (Minori) | Gather fruit, save seeds | Document what worked for next season |

## SLFG — Autonomous Pipeline

The SLFG (Sequential-Loop-Fork-Gather) pipeline runs all 6 phases with minimal human intervention. Use `/niwashi-slfg` to invoke it.

```
Sequential:  DISCOVER ──→ RESEARCH ──→ WIREFRAME  (human approves wireframes)
Swarm:       BUILD sections 3+ in parallel
Auto-loop:   BUILD ↔ REVIEW (max --cycles, default 3)
Post-review: SMOKE TEST (agent-browser, optional)
Final:       HARVEST → DONE
```

| Parameter | Default | Description |
|-----------|---------|-------------|
| `--cycles N` | 3 | Max BUILD↔REVIEW loop iterations |
| `--audience` | (asked) | Skip DISCOVER audience question |

The SLFG orchestrator reads artifact state to resume from any phase. It calls the same 6 skills as `@niwashi` — no duplicate logic.

## Backlog.md Integration (Recommended)

When [Backlog.md MCP](https://github.com/backlog-md/backlog-md) is installed, `@niwashi` creates structured tasks alongside the artifact state:

**Dual-write model:**
- `progress.md` — always written (append-only session log). Source of truth.
- Backlog tasks — written when MCP is available (structured status tracking). Fire-and-forget.

**Detection:** The orchestrator tries a Backlog MCP tool call at session start. If it succeeds → dual-write mode. If it fails → progress.md only.

**Auto-task creation:**
- New narrative → epic task
- Each phase → sub-task with phase label
- Phase complete → sub-task marked Done

**Labels:** `discover`, `research`, `wireframe`, `build`, `review`, `harvest`, `smoke-test`, `slfg`

**This is purely supplementary.** The canonical state machine uses `sections-checklist.json` for phase routing. Backlog adds searchable task history and cross-narrative visibility.

## External Skills (in `skills/external/`)

> **Last updated:** 2026-03-25. These skills are snapshots — check the source repos for newer versions.

| Skill | Source | License | Purpose |
|-------|--------|---------|--------|
| `web-artifacts-builder` | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder) | See LICENSE.txt | React+Vite+Tailwind+shadcn/ui scaffolding + HTML bundling |
| `react-best-practices` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices) | MIT | 64 performance rules for React |
| `composition-patterns` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/main/skills/composition-patterns) | MIT | Component architecture patterns |
| `web-design-guidelines` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines) | MIT | UI review against Web Interface Guidelines |
| `skill-creator` | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/skill-creator) | See LICENSE.txt | Create, test, and optimize new skills on-the-fly |

To update, re-download from the source repos and replace the corresponding `skills/external/` directory.

## Skill Index

`skills/skills-index.json` is an auto-generated LLM-optimized index of all skills. Regenerate after adding or removing skills:

```bash
node skills/rebuild-registry.js
```
