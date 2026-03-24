# niwashi-studio

> *庭師 (niwashi) — the gardener who cultivates understanding.*

An agentic workflow that transforms technical concepts into polished, interactive web narratives. Give it a concept, an algorithm, a codebase — and it guides you through a structured 6-phase loop to produce a premium React app that makes the complex feel intuitive.

Built for GitHub Copilot. Works with any AI coding agent that supports skills and prompt files.

## Quick Install

Paste this in your Copilot chat (or any AI coding agent):

```
Fetch and follow the instructions from https://raw.githubusercontent.com/datorresb/niwashi-studio/main/INSTALL.md
```

That's it. The agent clones the repo, copies the files into your project, and you're ready to go.

Then say:

```
@niwashi I want to explain [your concept] to [your audience]
```

## The Workflow

```
                    ┌──────────────────────────────────┐
                    │         OUTER LOOP                │
                    │   HARVEST seeds → next RESEARCH   │
                    │                                   │
   DISCOVER → RESEARCH → WIREFRAME → BUILD → REVIEW → HARVEST
                          ↻ revisions  ↻ sections ↻ fix→rebuild
                          max 10       max 5/sec  2 passes
```

| Phase | What happens | Output |
|-------|-------------|--------|
| 🌱 **DISCOVER** | Socratic dialogue to understand the concept, audience, and goals | `narrative-brief.md` |
| 🪨 **RESEARCH** | 4 parallel streams: technical analysis, audience profiling, narrative arc, visual language | `narrative-spec.md` |
| 🏜️ **WIREFRAME** | ASCII prototypes — cheap iterations before expensive code | Wireframes in spec |
| 🌿 **BUILD** | Section-by-section React/Vite with human calibration, then autonomous | Working app |
| ⏸️ **REVIEW** | 2-pass quality review (content + implementation) with fix loops | Approved narrative |
| 🍂 **HARVEST** | Extract reusable patterns for the next narrative | `patterns/*.md` |

Each phase produces a specific artifact. The next phase reads that artifact. State lives in files, not in memory — so you can pick up where you left off in a new conversation.

At the end of each phase, handoff buttons appear so you can flow to the next step with one click.

### The Loops

The workflow isn't just a straight line — it has 4 feedback loops at different scales:

| # | Loop | Where | Max iterations | Why |
|---|------|-------|----------------|-----|
| 1 | **Wireframe revision** | Within WIREFRAME | 10 cycles | Cheap ASCII iterations before writing expensive code |
| 2 | **Section build** | Within BUILD | 5 rework cycles per section | Each section is implemented → verified → approved independently. First 1-2 with human calibration, rest autonomous |
| 3 | **Review fix** | REVIEW → BUILD → REVIEW | 2 passes (content + implementation) | Findings send you back to BUILD to fix, then re-review |
| 4 | **Harvest → Research** | HARVEST → next RESEARCH | 1 per narrative | Pattern docs extracted from one narrative seed the research phase of the next — the system learns from itself |

## Quickstart

Talk to the orchestrator:

```
@niwashi I want to explain gradient descent to business stakeholders
```

Or use a slash command to jump to a specific phase:

```
/niwashi-01-discover
/niwashi-02-research
/niwashi-03-wireframe
/niwashi-04-build
/niwashi-05-review
/niwashi-06-harvest
```

The agent reads what artifacts exist and routes to the right phase automatically.

## How It Works

State lives in files, not in memory — so you can pick up where you left off in a new conversation. See [architecture.md](.github/agents/references/architecture.md) for the full workflow diagram, routing table, and artifact locations.

---

## Track 2: Garden Engineering

niwashi-studio also includes a **complete software engineering pipeline** mapped to the garden philosophy. Use `@niwashi-engineer` to plan, build, review, and ship features.

```
@niwashi-engineer plan a user authentication system
```

Or use slash commands:

```
/niwashi-eng-01-ideate      # 種選び — Select seeds
/niwashi-eng-02-brainstorm  # 土づくり — Prepare soil
/niwashi-eng-03-plan        # 庭図 — Draw blueprint
/niwashi-eng-04-deepen      # 深掘り — Strengthen roots
/niwashi-eng-05-work        # 植栽 — Plant with intention
/niwashi-eng-06-review      # 剪定 — Prune for perfection
/niwashi-eng-07-compound    # 堆肥 — Compost knowledge
```

### The Engineering Workflow

```
Track 1: 庭園物語 (Garden Story)       @niwashi
  DISCOVER → RESEARCH → WIREFRAME → BUILD → REVIEW → HARVEST

Track 2: 造園術 (Garden Engineering)    @niwashi-engineer
  IDEATE → BRAINSTORM → PLAN → [DEEPEN] → WORK → REVIEW → COMPOUND
```

| Phase | 日本語 | What happens | Output |
|-------|--------|-------------|--------|
| 🌱 IDEATE | 種選び | Generate and filter improvement ideas | `docs/ideation/*.md` |
| 🪴 BRAINSTORM | 土づくり | Explore requirements through dialogue | `docs/brainstorms/*-requirements.md` |
| 📐 PLAN | 庭図 | Structured plan with implementation units | `docs/plans/*-plan.md` |
| 🌳 DEEPEN | 深掘り | Enhance plan with parallel research | Enhanced plan file |
| 🌿 WORK | 植栽 | Execute plan with tests and commits | PR with code changes |
| ✂️ REVIEW | 剪定 | Multi-agent code review | Todo files with findings |
| 🍂 COMPOUND | 堆肥 | Document lessons learned | `docs/solutions/*.md` |

### Full Pipeline (LFG / SLFG)

For end-to-end delivery, use the meta-orchestrators:

```
/niwashi-eng-lfg    # 造園 — Sequential pipeline: plan → work → review → ship
/niwashi-eng-slfg   # 嵐の造園 — Swarm mode: parallel agents for maximum throughput
```

---

## Architecture

See [`.github/agents/references/architecture.md`](.github/agents/references/architecture.md) for the full workflow diagram, routing table, design principles, and external skill references.

## The Garden Metaphor

Each phase draws from the philosophy of Japanese garden design — every element intentional, nothing superfluous.

### Track 1: Garden Story Principles

| | Principle | Meaning |
|---|-----------|---------|
| 🌱 | 観察 *Kansatsu* | Observe deeply before acting |
| 🪨 | 石組 *Ishigumi* | Place the foundation stones first |
| 🏜️ | 枯山水 *Karesansui* | Represent the complex with the simple |
| 🌿 | 手入れ *Teire* | Cultivate with patience, prune the excess |
| ⏸️ | 間 *Ma* | The pause where quality is found |
| 🍂 | 実り *Minori* | Gather fruit, save seeds for next season |

### Track 2: Garden Engineering Principles

| | Principle | Meaning |
|---|-----------|---------|
| 🌱 | 種選び *Tane Erabi* | Select the finest seeds before committing |
| 🪴 | 土づくり *Tsuchi-zukuri* | Prepare the soil through dialogue |
| 📐 | 庭図 *Niwazu* | Map every path before the first stone |
| 🌳 | 深掘り *Fukabori* | Deep holes make strong roots |
| 🌿 | 植栽 *Shokusai* | Place each plant with intention |
| ✂️ | 剪定 *Sentei* | Remove what weakens, keep what strengthens |
| 🍂 | 堆肥 *Taihi* | All returns to the soil as compost |

## External Skills

This project includes skills from the open source community:

| Skill | Source | Purpose |
|-------|--------|---------|
| `web-artifacts-builder` | [anthropics/skills](https://github.com/anthropics/skills) | React scaffolding + bundling |
| `react-best-practices` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | Performance optimization |
| `composition-patterns` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | Component architecture |
| `web-design-guidelines` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | UI quality review |

> Last updated: 2026-03-23. Check source repos for newer versions.

## Roadmap

| Phase | Status | Description |
|-------|--------|-------------|
| **v0 — Agent-assisted install** | ✅ Current | Tell your agent to fetch and install from GitHub |
| **v1 — Install script** | Planned | `curl -sL .../install.sh \| bash` — no agent needed |
| **v2 — npx CLI** | Planned | `npx niwashi-studio init` — npm package with config options |
| **v3 — Plugin marketplace** | Planned | `/plugin install niwashi-studio` — native Copilot/Cursor plugin |

## License

MIT
