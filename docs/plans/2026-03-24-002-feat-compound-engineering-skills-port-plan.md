---
title: "feat: Port Compound Engineering skills to niwashi-studio"
type: feat
status: completed
date: 2026-03-24
scope: Deep
---

# Port Compound Engineering Skills to niwashi-studio

## Problem Statement

niwashi-studio has a polished 6-phase workflow for creating interactive technical narratives (DISCOVER → HARVEST), but lacks equivalent general-purpose software engineering workflow skills. The Compound Engineering (CE) pipeline from `Inno-Perso-GenAI-MMM` — brainstorm, plan, work, review, compound — is proven and powerful. Users want both workflows available in niwashi-studio, mapped to the garden metaphor philosophy, so the repo becomes a complete agentic toolkit.

## Core Insight

Both systems share identical architectural DNA:
1. **Artifact-driven state machine** — files on disk = state, no agent memory needed
2. **Phase-based workflow** — clear phases with specific inputs/outputs
3. **Orchestrator pattern** — one master agent routes to phase skills
4. **Progressive loops** — inner loops (rework) and outer loops (compound)
5. **Parallel subagent dispatch** — research streams, review angles, work execution

The CE pipeline maps naturally onto the niwashi garden metaphor as a second workflow track.

## Proposed Solution

### Two Workflow Tracks

```
Track 1: 庭園物語 (Garden Story) — Interactive Narratives
  DISCOVER → RESEARCH → WIREFRAME → BUILD → REVIEW → HARVEST

Track 2: 造園術 (Garden Engineering) — Software Engineering
  IDEATE → BRAINSTORM → PLAN → [DEEPEN] → WORK → REVIEW → COMPOUND
```

### Phase Mapping

| # | CE Phase | niwashi-eng Phase | 日本語 | Garden Metaphor |
|---|----------|-------------------|--------|-----------------|
| 01 | ce:ideate | niwashi-eng-01-ideate | 種選び (Tane Erabi) | Selecting the finest seeds |
| 02 | ce:brainstorm | niwashi-eng-02-brainstorm | 土づくり (Tsuchi-zukuri) | Preparing the soil |
| 03 | ce:plan | niwashi-eng-03-plan | 庭図 (Niwazu) | Drawing the garden blueprint |
| 04 | deepen-plan | niwashi-eng-04-deepen | 深掘り (Fukabori) | Digging deeper into the earth |
| 05 | ce:work | niwashi-eng-05-work | 植栽 (Shokusai) | Planting with intention |
| 06 | ce:review | niwashi-eng-06-review | 剪定 (Sentei) | Pruning for perfection |
| 07 | ce:compound | niwashi-eng-07-compound | 堆肥 (Taihi) | Composting — returning nutrients |

### Helper Skills (Unnumbered)

| CE Skill | niwashi-eng Equivalent | 日本語 | Metaphor |
|----------|----------------------|--------|----------|
| test-browser | niwashi-eng-test | 水やり (Mizuyari) | Watering — checking garden thrives |
| feature-video | niwashi-eng-showcase | 庭見 (Niwami) | Guided garden tour |
| resolve-todo-parallel | niwashi-eng-weed | 草取り (Kusatori) | Weeding the garden |

### Meta-Orchestrators

| CE Skill | niwashi-eng Equivalent | 日本語 | Description |
|----------|----------------------|--------|-------------|
| lfg | niwashi-eng-lfg | 造園 (Zouen) | Sequential landscaping |
| slfg | niwashi-eng-slfg | 嵐の造園 (Arashi no Zouen) | Storm landscaping (swarm mode) |

### Orchestrator Agent

`@niwashi-engineer` — mirrors `@niwashi` pattern with:
- Artifact-driven routing through CE-equivalent phases
- Handoff buttons between phases
- Progress logging
- Budget limits and rework limits

## Artifact Locations

```
docs/
├── brainstorms/     ← niwashi-eng-02-brainstorm output
├── plans/           ← niwashi-eng-03-plan output (already exists)
├── solutions/       ← niwashi-eng-07-compound output
└── ideation/        ← niwashi-eng-01-ideate output
```

## Key Design Decisions

1. **Prefix `niwashi-eng-`** not `niwashi-ce-` — "eng" (engineering) is domain-descriptive; "ce" is an implementation reference that would confuse users unfamiliar with Compound Engineering
2. **Numbered phases** — parallels niwashi narrative convention (niwashi-01 through niwashi-06)
3. **Faithful CE logic** — each skill preserves the CE workflow logic (parallel subagents, gates, conditional steps) while wrapping it in garden metaphor language
4. **Shared utility skills** — engineering skills reference existing niwashi-studio skills (react-best-practices, web-design-guidelines, etc.) where applicable
5. **Separate orchestrator** — `@niwashi-engineer` vs `@niwashi` keeps the two tracks cleanly separated

## Implementation Units

### Unit 1: Orchestrator Agent
- **Files:** `.github/agents/niwashi-engineer.agent.md`
- **Approach:** Mirror niwashi.agent.md pattern with engineering phases, handoffs, and routing table
- **Verification:** Agent file parses correctly, handoffs reference correct skills

### Unit 2: Slash Commands (Prompt Files)
- **Files:** `.github/prompts/niwashi-eng-*.prompt.md` (12 files)
- **Approach:** Each prompt follows the pattern: YAML frontmatter + skill file reference + `$input`
- **Verification:** All prompts reference existing skill files

### Unit 3: Core Phase Skills (7 skills)
- **Files:** `skills/niwashi-eng-{01..07}-*/SKILL.md` + reference files
- **Approach:** Port CE skill logic, adapt language to garden metaphor, use niwashi conventions (progressive disclosure, reference files)
- **Verification:** Each skill has valid YAML frontmatter, references exist, workflow logic matches CE source

### Unit 4: Helper Skills (3 skills)
- **Files:** `skills/niwashi-eng-{test,showcase,weed}/SKILL.md`
- **Approach:** Lightweight wrappers with niwashi theming
- **Verification:** Valid frontmatter, referenced tools noted

### Unit 5: Meta-Orchestrator Skills (2 skills)
- **Files:** `skills/niwashi-eng-{lfg,slfg}/SKILL.md`
- **Approach:** Direct mapping of lfg/slfg step sequences using niwashi-eng- skill names
- **Verification:** Step references point to correct niwashi-eng- skills

### Unit 6: Architecture & Documentation
- **Files:** `.github/agents/references/architecture.md`, `.github/copilot-instructions.md`, `README.md`, `INSTALL.md`
- **Approach:** Add Track 2 documentation alongside existing Track 1, update install instructions
- **Verification:** Architecture doc covers both tracks, README shows both workflows

## Acceptance Criteria

- [ ] `@niwashi-engineer` agent routes correctly through engineering phases
- [ ] All 12 slash commands (`/niwashi-eng-*`) invoke their corresponding skills
- [ ] Each phase skill preserves CE workflow logic (parallel subagents, gates, conditional steps)
- [ ] Garden metaphor language used consistently across all skills
- [ ] Architecture.md documents both workflow tracks
- [ ] README shows dual-track usage
- [ ] Existing narrative workflow (`@niwashi`) continues to work unmodified
