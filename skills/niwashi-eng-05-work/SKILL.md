---
name: niwashi-eng-05-work
description: "Execute work plans efficiently while maintaining quality and finishing features. Use when implementing a plan, building a feature, coding from a spec, or executing any structured work document. Triggers on 'build this', 'implement this', 'start work', 'execute the plan', 'code this', or any request to turn a plan into working code. Focuses on shipping complete features."
---

# 植栽 (Shokusai) — Planting with Intention

> *The master gardener places each plant with care — reading the soil, following the blueprint, adapting to what the earth reveals. Every placement is deliberate, every root given room to grow.*

Execute a work plan systematically. The focus is on **shipping complete features** by understanding requirements quickly, following existing patterns, and maintaining quality throughout.

## Input Document

<input_document> #$ARGUMENTS </input_document>

## Phase 1: Quick Start — 準備 (Preparation)

### 1. Read Plan and Clarify

- Read the work document completely
- Treat the plan as a decision artifact, not an execution script
- Check for `Implementation Units`, `Execution note`, `Deferred to Implementation`, `Scope Boundaries`
- If the user explicitly asks for TDD or test-first, honor that even without an `Execution note`
- If anything is unclear, ask clarifying questions now
- Get user approval to proceed

### 2. Setup Environment

Check current branch:
```bash
current_branch=$(git branch --show-current)
default_branch=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's@^refs/remotes/origin/@@')
if [ -z "$default_branch" ]; then
  default_branch=$(git rev-parse --verify origin/main >/dev/null 2>&1 && echo "main" || echo "master")
fi
```

**If on feature branch:** Ask: "Continue on `[current_branch]`, or create new?"
**If on default branch:** Offer: (A) new branch, (B) worktree, (C) continue on default (requires explicit permission).

### 3. Create Todo List

Break the plan into actionable tasks:
- Derive from implementation units, dependencies, files, test targets
- Carry execution notes forward
- Include dependencies between tasks
- Prioritize based on execution order

### 4. Choose Execution Strategy

| Strategy | When to use |
|----------|-------------|
| **Inline** | 1-2 small tasks, or tasks needing user interaction |
| **Serial subagents** | 3+ tasks with dependencies |
| **Parallel subagents** | 3+ independent tasks touching non-overlapping files |
| **Swarm mode** | 10+ tasks with complex coordination |

## Phase 2: Execute — 植え付け (Planting)

### Task Execution Loop

```
while (tasks remain):
  - Mark task as in-progress
  - Read referenced files from the plan
  - Look for similar patterns in codebase
  - Implement following existing conventions
  - Write tests for new functionality
  - Run System-Wide Test Check
  - Run tests after changes
  - Mark task as completed
  - Evaluate for incremental commit
```

Honor execution notes: test-first units get failing test before implementation. Characterization-first units capture existing behavior before changes.

### System-Wide Test Check — 根回り確認 (Root Check)

Before marking a task done:

| Question | Action |
|----------|--------|
| **What fires when this runs?** Callbacks, middleware, observers | Read actual code for callbacks, hooks — trace two levels out |
| **Do tests exercise the real chain?** | Write at least one integration test with real objects |
| **Can failure leave orphaned state?** | Trace failure path, test cleanup or idempotent retry |
| **What other interfaces expose this?** | Grep for method in related classes, add parity if needed |
| **Do error strategies align?** | List error classes at each layer, verify rescue matches |

**Skip when:** Leaf-node changes with no callbacks, no state, no parallel interfaces.

### Incremental Commits — 段階的な刻み (Progressive Marks)

| Commit when... | Don't commit when... |
|----------------|---------------------|
| Logical unit complete | Small part of larger unit |
| Tests pass + meaningful progress | Tests failing |
| About to switch contexts | Purely scaffolding |
| About to attempt risky changes | Message would be "WIP" |

```bash
git add <files related to this unit>
git commit -m "feat(scope): description of this unit"
```

### Follow Existing Patterns

- Read referenced files from the plan first
- Match naming conventions exactly
- Reuse existing components
- Follow AGENTS.md coding standards

### Test Continuously

- Run tests after each significant change
- Fix failures immediately
- Add tests for new functionality
- Unit tests prove logic in isolation. Integration tests prove layers work together.

### Simplify as You Go

After 2-3 related units, review for: duplicated patterns, shared helpers, code reuse opportunities.

## Phase 3: Quality Check — 品質確認 (Quality Check)

1. Run full test suite
2. Run linting
3. Consider reviewer agents for complex/risky changes
4. Final validation: all tasks done, tests pass, linting passes, requirements satisfied, deferred questions resolved
5. **Prepare Operational Validation Plan** — Add `## Post-Deploy Monitoring & Validation` to PR (REQUIRED)

## Phase 4: Ship It — 納品 (Delivery)

1. **Create commit** with conventional format and attribution
2. **Capture screenshots** for any UI changes (use agent-browser)
3. **Create PR** with summary, testing notes, monitoring section
4. **Update plan status** to `completed`
5. **Notify user** with summary and next steps

## Key Principles

- **Start fast, execute faster** — clarify once, then build
- **The plan is your guide** — follow it, don't reinvent
- **Test as you go** — continuous, not at the end
- **Quality is built in** — follow patterns, write tests, run linting
- **Ship complete features** — don't leave things 80% done

## Swarm Mode

For 10+ tasks needing inter-agent communication:
1. Create team with specialized roles (implementer, tester, reviewer)
2. Parse implementation units into tasks with dependencies
3. Spawn teammates; assign specific tasks to each
4. Lead monitors, reassigns, spawns as phases unblock
5. Cleanup when complete
