---
name: niwashi-eng-03-plan
description: "Transform feature descriptions into well-structured project plans following conventions and best practices. Use when planning a feature, creating a technical plan, preparing implementation work, or when moving from brainstorm to execution. Triggers on 'plan this', 'create a plan', 'how should we build this', or any request to structure work before implementing. The most common entry point for the engineering workflow."
---

# 庭図 (Niwazu) — Drawing the Garden Blueprint

> *Before the first stone is placed, the master gardener draws a precise blueprint — mapping every path, every planting bed, every water feature. The blueprint is where intention becomes structure.*

**Note: The current year is 2026.**

Transform feature descriptions, bug reports, or improvement ideas into well-structured plan files that follow project conventions and best practices.

## Feature Description

<feature_description> #$ARGUMENTS </feature_description>

**If empty, ask:** "What would you like to plan?"

Do not proceed until you have a clear feature description.

### Step 0: Idea Refinement — 構想 (Conception)

**Check for requirements document first:**

```bash
ls -la docs/brainstorms/*-requirements.md 2>/dev/null | head -10
```

**If a relevant requirements document exists** (topic matches, created within 14 days):
1. Read it thoroughly
2. Announce: "Found source document from [date]: [topic]. Using as foundation."
3. Extract ALL: key decisions, chosen approach, problem framing, constraints, success criteria, scope boundaries
4. **Skip idea refinement** — the source already answered WHAT to build
5. Reference decisions with `(see origin: <source-path>)`
6. **If `Resolve Before Planning` has items, STOP.** Tell the user planning is blocked.

**If no requirements document found:**

Refine through collaborative dialogue:
- Ask questions one at a time
- Prefer multiple choice when natural options exist
- Focus on: purpose, constraints, success criteria
- Continue until clear OR user says "proceed"

**Gather signals for research decision:**
- User's familiarity with codebase
- User's intent (speed vs thoroughness)
- Topic risk level
- Uncertainty level

## Main Tasks

### Step 1: Local Research (Parallel) — 現地調査 (Site Survey)

Run these agents **in parallel**:

- **Repo research** — technology stack, architectural patterns, implementation patterns
- **Learnings search** — documented solutions in `docs/solutions/` that might apply

### Step 1.5: Research Decision — 調査判断 (Survey Judgment)

Based on signals from Step 0 and findings from Step 1:

- **High-risk topics → always research.** Security, payments, external APIs, data privacy.
- **Strong local context → skip external research.** Good patterns exist, user knows what they want.
- **Uncertainty or unfamiliar territory → research.**

Announce the decision and proceed.

### Step 1.5b: External Research (Conditional)

Run in parallel if Step 1.5 indicates value:
- **Best practices researcher** — industry patterns and standards
- **Framework docs researcher** — official documentation and constraints

### Step 1.6: Consolidate Research — 調査統合 (Survey Consolidation)

Document: relevant file paths, institutional learnings, external docs (if gathered), related issues or PRs, AGENTS.md conventions.

### Step 2: Issue Planning & Structure — 設計構成 (Design Structure)

**Title & Categorization:**
- Draft clear, searchable title (e.g., `feat: Add user authentication`)
- Determine type: enhancement, bug, refactor
- Convert to filename: `YYYY-MM-DD-NNN-<type>-<kebab-case>-plan.md`
  - Scan `docs/plans/` for files matching today's date
  - Find highest sequence number, increment by 1, zero-pad to 3 digits

**Content Planning:**
- Choose detail level based on complexity
- List all necessary sections
- Gather supporting materials

### Step 3: SpecFlow Analysis — 流れの検証 (Flow Verification)

Validate and refine the specification:
- User flow completeness and gap identification
- Edge case discovery
- Requirements validation

### Step 4: Choose Detail Level — 詳細度 (Detail Level)

#### 📄 MINIMAL (Quick Plan)
Best for: simple bugs, small improvements, clear features.
Includes: problem statement, basic acceptance criteria, essential context.

#### 📋 STANDARD (Most Features)
Best for: most features, complex bugs, team collaboration.
Adds: background, technical considerations, system-wide impact, success metrics, dependencies.

#### 📚 COMPREHENSIVE (Major Changes)
Best for: major features, architectural changes, complex integrations.
Adds: implementation phases, alternative approaches, resource requirements, risk analysis.

### Step 5: Write Plan File — 図面作成 (Blueprint Creation)

**MANDATORY: Write plan to disk before presenting options.**

Create `docs/plans/YYYY-MM-DD-NNN-<type>-<name>-plan.md`:

```markdown
---
title: [Plan Title]
type: [feat|fix|refactor]
status: active
date: YYYY-MM-DD
origin: docs/brainstorms/...  # if originated from requirements doc
---

# [Plan Title]

## Overview
[Comprehensive description]

## Problem Statement
[Why this matters]

## Proposed Solution
[High-level approach]

## Implementation Units

### Unit 1: [Title]
- **Goal:** [What this achieves]
- **Files:** [Files to create/modify]
- **Approach:** [How to implement]
- **Patterns to follow:** [Reference files]
- **Test scenarios:** [What to test]
- **Verification:** [How to confirm done]
- **Execution note:** [test-first, characterization-first, or pragmatic]

## Acceptance Criteria
- [ ] Requirement 1
- [ ] Requirement 2

## Sources & References
- Origin: [link if applicable]
- Related: [file references, PRs, docs]
```

### Step 6: Post-Generation Options — 次の一手 (Next Move)

1. 🌳 **Deepen plan** → `/niwashi-eng-04-deepen`
2. 🌿 **Start work** → `/niwashi-eng-05-work`
3. 🔄 **Review & refine** plan
4. ⏹️ **Pause** — plan is saved

## Key Rules

- **NEVER CODE** — research and structure only
- **Write plan BEFORE presenting options** — disk write is prerequisite
- **Origin doc is primary input** — if requirements doc exists, reference decisions with origin links
- **System-wide impact analysis** — trace callbacks, error propagation, state risks, API parity
