---
date: 2026-03-24
topic: niwashi-studio-consolidation
---

# niwashi-studio Consolidation: Categorization + Indexing + Backlog

## Problem Frame

niwashi-studio has accumulated work across 4 unpushed feature branches, 1 unpushed main commit, and an open PR — all from parallel agent sessions colliding on the same repo. The flat `skills/` directory mixes project skills with external vendored skills with no index. Backlog.md integration exists as a draft but isn't wired into the workflow.

## Requirements

- R1. Push SLFG + smoke test commit (B1) to origin/main
- R2. Close PR #1 and delete all 4 feature branches (local + remote)
- R3. Mark TASK-48 through TASK-53 as Done in Backlog
- R4. Reorganize `skills/` into `narrative/` and `external/` subdirectories (no `engineering/`)
- R5. Create `rebuild-registry.js` (Node.js, no external deps) that auto-generates `skills-index.json`
- R6. Update all internal path references (~50 lines across ~15 files) to use categorized paths
- R7. Add Backlog.md as recommended integration: `AGENTS.md` + `backlog/config.yml` copied on install
- R8. Implement dual-write: every skill phase writes to progress.md (always) AND Backlog (if available)
- R9. SLFG orchestrator auto-creates epic + updates tasks per phase when Backlog available
- R10. Labels in backlog config: discover, research, wireframe, build, review, harvest, smoke-test, slfg

## Success Criteria

- `skills/narrative/` contains all 8 niwashi skills (01-06 + slfg + smoke-test)
- `skills/external/` contains all 5 vendored skills
- `node skills/rebuild-registry.js` generates valid `skills-index.json` with 0 warnings
- `grep -rn "skills/niwashi-0" --include="*.md" | grep -v narrative/ | grep -v docs/plans/` returns 0 results
- Backlog auto-creates tasks when MCP available, falls back to progress.md when not
- No feature branches remain (local or remote)
- PR #1 closed

## Scope Boundaries

- No `engineering/` category — no niwashi-eng-* skills
- No VERSION file — rebuild-registry handles versioning in the index
- No verify-install.sh — rebuild-registry validates frontmatter
- No manifest.json — replaced by skills-index.json
- Existing @niwashi narrative workflow (DISCOVER→HARVEST) unchanged
- docs/plans/ references are historical — do NOT update them

## Key Decisions

- Categorization by ownership: `narrative/` = ours, `external/` = vendored
- progress.md and Backlog coexist: diario (append-only) vs tablero (structured)
- Dual-write is atomic: same step updates both, never out of sync
- Backlog task creation is automatic: narrative = epic, phase = task
- Fallback: if Backlog MCP unavailable → only progress.md. Never fails.

## Outstanding Questions

### Deferred to Planning
- [Affects R8][Technical] Exact detection mechanism for "is Backlog MCP available?" in each skill
- [Affects R6][Needs research] Which files beyond prompts/agents/architecture have path refs to update?
