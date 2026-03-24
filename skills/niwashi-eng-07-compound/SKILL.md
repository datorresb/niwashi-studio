---
name: niwashi-eng-07-compound
description: "Document a recently solved problem to compound your team's knowledge — compost knowledge back into the soil. Use when capturing lessons learned, documenting solutions, recording what worked, or creating reusable knowledge from a fix. Triggers on 'document this', 'compound', 'what did we learn', 'capture this solution', or after resolving a non-trivial problem."
---

# 堆肥 (Taihi) — Composting Knowledge

> *In a garden, nothing is wasted. Fallen leaves, pruned branches, spent flowers — all return to the soil as compost, enriching future growth. Each problem solved nourishes the next season's garden.*

Coordinate parallel sub-agents to document a recently solved problem. Creates structured documentation in `docs/solutions/` with YAML frontmatter for searchability and future reference.

**Why "compound"?** Each documented solution compounds your team's knowledge. The first time costs research. Document it, and the next occurrence takes minutes.

## Usage

```
/niwashi-eng-07-compound                # Document the most recent fix
/niwashi-eng-07-compound [context]      # Provide additional context
```

## Execution Strategy

**Full mode by default.** Only use compact-safe mode if explicitly requested.

### Full Mode

**CRITICAL: Only ONE file gets written — the final documentation.** Phase 1 sub-agents return TEXT DATA to the orchestrator. They must NOT create any files.

#### Phase 0.5: Memory Scan — 記憶の検索 (Memory Search)

Check auto memory directory for notes relevant to the problem being documented. If relevant entries found, pass as supplementary context to Phase 1 agents.

#### Phase 1: Parallel Research — 並行調査 (Parallel Survey)

Launch these agents **IN PARALLEL**:

1. **Context Analyzer** — Extract problem type, component, symptoms from conversation. Return YAML frontmatter skeleton.
2. **Solution Extractor** — Identify root cause, extract working solution with code examples. Return solution content block.
3. **Related Docs Finder** — Search `docs/solutions/` for related documentation, cross-references. Flag stale docs.
4. **Prevention Strategist** — Develop prevention strategies, best practices, test cases.
5. **Category Classifier** — Determine optimal `docs/solutions/` category and filename.

#### Phase 2: Assembly — 組み立て (Assembly)

Wait for all Phase 1 agents to complete, then:

1. Collect all text results
2. Assemble complete markdown file
3. Validate YAML frontmatter
4. Create directory if needed: `mkdir -p docs/solutions/[category]/`
5. Write the SINGLE final file

#### Phase 2.5: Selective Refresh Check — 鮮度確認 (Freshness Check)

Decide whether older docs need updating based on the new learning.

**Invoke refresh when:**
- An older doc recommends an approach the new fix contradicts
- The new fix clearly supersedes an older solution
- A refactor/migration invalidated older references

**Skip refresh when:**
- No related docs found
- Related docs still consistent with new learning
- Overlap is superficial

#### Phase 3: Optional Enhancement — 仕上げ (Finishing Touch)

Based on problem type, optionally invoke specialized review agents (performance, security, data integrity, etc.).

### Compact-Safe Mode

Single-pass alternative for context-constrained sessions:

1. Extract problem, root cause, solution from conversation
2. Classify category and filename
3. Write minimal doc with: frontmatter, problem, root cause, solution, one prevention tip
4. Skip agent reviews

```
✓ Garden compost complete (compact-safe mode)
File: docs/solutions/[category]/[filename].md
```

## What It Captures

- **Problem symptom** — exact error messages, observable behavior
- **Investigation steps** — what didn't work and why
- **Root cause** — technical explanation
- **Working solution** — step-by-step fix with code examples
- **Prevention strategies** — how to avoid in future
- **Cross-references** — links to related docs

## What It Creates

File: `docs/solutions/[category]/[filename].md`

Categories auto-detected: build-errors, test-failures, runtime-errors, performance-issues, configuration, dependency-conflicts, security, database, deployment, integration, workflow, documentation.
