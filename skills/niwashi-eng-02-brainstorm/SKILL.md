---
name: niwashi-eng-02-brainstorm
description: "Explore requirements and approaches through collaborative dialogue before writing a right-sized requirements document. Use for feature ideas, problem framing, when the user says 'let's brainstorm' or 'let's explore', or when they present a vague or ambitious request. Also triggers on 'what should we build', 'help me think through X', or uncertainty about scope and direction. Precedes planning."
---

# 土づくり (Tsuchi-zukuri) — Preparing the Soil

> *Before planting, the soil must be prepared. Through patient dialogue, we turn over the earth, mix in nutrients, and create the conditions where the right seeds can take root.*

**Note: The current year is 2026.**

Brainstorming answers **WHAT** to build through collaborative dialogue. It precedes `/niwashi-eng-03-plan`, which answers **HOW** to build it.

The durable output is a **requirements document** — strong enough that planning does not need to invent product behavior, scope boundaries, or success criteria.

This skill does not implement code. It explores, clarifies, and documents decisions for later planning.

## Core Principles

1. **Assess scope first** — Match ceremony to the size and ambiguity of the work.
2. **Be a thinking partner** — Suggest alternatives, challenge assumptions, explore what-ifs.
3. **Resolve product decisions here** — User-facing behavior, scope boundaries, and success criteria belong in this workflow.
4. **Keep implementation out** — No libraries, schemas, endpoints, or code-level design unless the brainstorm is inherently technical.
5. **Right-size the artifact** — Simple work gets a compact doc. Larger work gets a fuller document.
6. **Apply YAGNI to carrying cost** — Prefer simplest approach with meaningful value.

## Interaction Rules

1. **Ask one question at a time** — Do not batch several unrelated questions.
2. **Prefer single-select multiple choice** — Use when choosing one direction.
3. **Use multi-select rarely** — Only for compatible sets (goals, constraints, criteria).
4. **Use the platform's question tool** when available.

## Feature Description

<feature_description> #$ARGUMENTS </feature_description>

**If empty, ask:** "What would you like to explore?"

## Execution Flow

### Phase 0: Resume, Assess, and Route

#### 0.1 Resume Existing Work

If matching `*-requirements.md` in `docs/brainstorms/` exists (recent, same topic):
- Read it, confirm with user: "Found existing requirements for [topic]. Continue or start fresh?"
- If resuming, update existing file instead of creating duplicate.

#### 0.2 Assess Whether Brainstorming Is Needed

**Clear requirements indicators:** specific acceptance criteria, referenced patterns, described exact behavior, constrained scope.

**If requirements are already clear:** Keep it brief. Confirm understanding and present next-step options. Skip to Phase 3 or handoff.

#### 0.3 Assess Scope

Classify: **Lightweight**, **Standard**, or **Deep**.

### Phase 1: Understand the Idea — 土を知る (Know the Soil)

#### 1.1 Existing Context Scan

**Lightweight** — Quick topic search, check if similar exists. Move on.

**Standard/Deep** — Two passes:
- *Constraint Check* — Check AGENTS.md for workflow/product constraints.
- *Topic Scan* — Search for relevant terms, read most relevant existing artifact.

#### 1.2 Product Pressure Test

**Lightweight:**
- Is this solving the real user problem?
- Are we duplicating something existing?
- Is there a better framing with zero extra cost?

**Standard:**
- Is this the right problem, or a proxy for a more important one?
- What outcome actually matters?
- What happens if we do nothing?
- What's the single highest-leverage move right now?

**Deep** — Standard plus:
- What durable capability should this create in 6-12 months?
- Does this move toward that, or is it only a local patch?

#### 1.3 Collaborative Dialogue — 対話 (Dialogue)

- Ask questions **one at a time**
- Prefer multiple choice with natural options
- Start broad (problem, users, value) then narrow (constraints, exclusions, edge cases)
- Resolve product decisions here; leave implementation for planning
- Bring ideas, alternatives, and challenges

**Exit condition:** Continue until idea is clear OR user explicitly says "proceed."

### Phase 2: Explore Approaches — 方法を探る (Explore Methods)

If multiple directions remain, propose **2-3 concrete approaches** with:
- Brief description (2-3 sentences)
- Pros and cons
- Key risks or unknowns
- When it's best suited

Lead with your recommendation and explain why.

### Phase 3: Capture Requirements — 要件を記す (Record Requirements)

Write or update a requirements document when durable decisions were produced.

**Required content:**
- Problem frame
- Concrete requirements with stable IDs (R1, R2, etc.)
- Scope boundaries
- Success criteria

**Include when useful:** Key decisions and rationale, dependencies, outstanding questions, alternatives considered.

**File path:** `docs/brainstorms/YYYY-MM-DD-<kebab-case-topic>-requirements.md`

```markdown
---
date: YYYY-MM-DD
topic: <kebab-case-topic>
---

# <Topic Title>

## Problem Frame
[Who is affected, what is changing, and why]

## Requirements
- R1. [Concrete behavior or requirement]
- R2. [Concrete behavior or requirement]

## Success Criteria
- [How we know this solved the right problem]

## Scope Boundaries
- [Deliberate non-goal or exclusion]

## Key Decisions
- [Decision]: [Rationale]

## Outstanding Questions
### Resolve Before Planning
- [Blocking question]

### Deferred to Implementation
- [Non-blocking question]
```

### Phase 4: Handoff — 次の一手 (Next Move)

Present options:
1. 📐 **Proceed to planning** → `/niwashi-eng-03-plan`
2. 🌿 **Proceed directly to work** (if scope is trivial)
3. 🔄 **Review & refine** the requirements doc
4. ⏹️ **Pause** — requirements doc is saved
