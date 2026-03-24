---
name: niwashi-eng-06-review
description: "Perform exhaustive code reviews using multi-agent analysis, ultra-thinking, and deep local inspection. Use when reviewing PRs, checking code quality, validating implementations, or running comprehensive code audits. Triggers on 'review this', 'review PR', 'check this code', 'code review', 'audit the changes'. Prune for perfection."
---

# 剪定 (Sentei) — Pruning for Perfection

> *The art of pruning is knowing exactly what to cut. Not every branch deserves to stay — the master gardener removes what weakens the whole, leaving only what strengthens the shape.*

Perform exhaustive code reviews using multi-agent analysis, ultra-thinking, and deep inspection.

## Review Target

<review_target> #$ARGUMENTS </review_target>

## Protected Artifacts

NEVER flag for deletion or removal:
- `docs/brainstorms/*-requirements.md`
- `docs/plans/*.md`
- `docs/solutions/*.md`

These are engineering pipeline artifacts, intentional and permanent.

## Procedure

### Step 1: Setup — 準備 (Preparation)

1. Determine review type: PR number, GitHub URL, branch name, or current branch
2. Check current git branch
3. If already on target branch → proceed
4. If different branch → offer worktree for isolated review
5. Fetch PR metadata: `gh pr view --json title,body,files,headRefName`
6. Ensure you're on the branch being reviewed

### Step 2: Choose Execution Mode

**If `--serial` flag OR long session:** Run agents one at a time.
**Default (parallel):** Run all simultaneously.
**Auto-detect:** If 6+ agents, switch to serial automatically.

### Step 3: Launch Review Agents (Parallel)

Run configured review agents. Always include:
- **Agent-native review** — verify new features are agent-accessible
- **Learnings search** — search `docs/solutions/` for past issues related to this PR

**Conditional agents (if applicable):**

If PR contains database migrations or schema changes:
- Schema drift detector
- Data migration expert
- Deployment verification agent

### Step 4: Ultra-Thinking Deep Dive — 深考 (Deep Thought)

#### Phase 1: Stakeholder Perspectives

For each stakeholder, think deeply:

| Stakeholder | Key Questions |
|-------------|--------------|
| **Developer** | Easy to understand? Intuitive APIs? Debuggable? Testable? |
| **Operations** | Safe to deploy? Observable? Troubleshootable? |
| **End User** | Intuitive? Helpful errors? Performant? Problem solved? |
| **Security** | Attack surface? Compliance? Data protection? Audit trail? |
| **Business** | ROI? Legal risks? Time-to-market? Total cost? |

#### Phase 2: Scenario Exploration

- [ ] Happy path: normal operation
- [ ] Invalid inputs: null, empty, malformed
- [ ] Boundary conditions: min/max, empty collections
- [ ] Concurrent access: race conditions, deadlocks
- [ ] Scale: 10x, 100x, 1000x normal
- [ ] Network: timeouts, partial failures
- [ ] Resources: memory, disk, connections
- [ ] Security: injection, overflow, DoS
- [ ] Data corruption: partial writes, inconsistency
- [ ] Cascading failures: downstream issues

### Step 5: Multi-Angle Review

- **Technical excellence** — code craftsmanship, best practices, documentation quality
- **Business value** — feature completeness, user impact, cost-benefit
- **Risk management** — security, operational, compliance, technical debt
- **Code simplicity** — can we simplify? YAGNI violations?

### Step 6: Findings Synthesis & Todo Creation — 剪定リスト (Pruning List)

**ALL findings stored as todo files immediately.**

1. Collect findings from all agents
2. Discard findings recommending deletion of protected artifacts
3. Categorize by type: security, performance, architecture, quality
4. Assign severity: 🔴 P1 (blocks merge), 🟡 P2 (should fix), 🔵 P3 (nice-to-have)
5. Remove duplicates
6. Estimate effort per finding (Small/Medium/Large)
7. Create todo files in parallel

### Step 7: Output Summary — 剪定報告 (Pruning Report)

Present comprehensive findings organized by severity with actionable recommendations.

Optionally offer:
- 水やり **Run browser tests** → `/niwashi-eng-test`
- 草取り **Resolve findings** → `/niwashi-eng-weed`
