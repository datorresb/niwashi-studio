---
name: niwashi-eng-04-deepen
description: "Enhance a plan with parallel research agents for each section — dig deeper into the earth to strengthen the root system. Use when a plan needs more depth, best practices, implementation details, or quality improvements. Triggers on 'deepen plan', 'add more detail', 'research this plan', 'strengthen the blueprint'."
---

# 深掘り (Fukabori) — Digging Deeper

> *When the garden blueprint calls for a great tree, the holes must be dug deep enough for strong roots. Shallow planting yields weak growth.*

**Note: The current year is 2026.**

Take an existing plan (from `/niwashi-eng-03-plan`) and enhance each section with parallel research agents. Each major element gets its own dedicated sub-agent to find best practices, performance optimizations, quality enhancements, and real-world implementation examples.

## Plan File

<plan_path> #$ARGUMENTS </plan_path>

**If empty:**
1. Check for recent plans: `ls -la docs/plans/`
2. Ask: "Which plan would you like to deepen?"

## Procedure

### Step 1: Parse Plan — 図面解析 (Blueprint Analysis)

Read the plan and extract:
- Overview / Problem Statement
- Proposed Solution sections
- Technical Approach / Architecture
- Implementation phases / units
- Code examples and file references
- Acceptance criteria
- Technologies and domain areas

Create a section manifest:
```
Section 1: [Title] — [What to research]
Section 2: [Title] — [What to research]
```

### Step 2: Discover & Apply Skills — 道具の棚卸し (Tool Inventory)

**Discover ALL available skills** from all sources:
```bash
ls skills/                                    # Project skills
ls ~/.copilot/skills/ 2>/dev/null             # User global skills
find ~/.copilot/plugins/cache -type d -name "skills" 2>/dev/null  # All plugins
```

For each discovered skill:
1. Read its SKILL.md to understand what it does
2. Check if any plan section matches the skill's domain
3. If matched, spawn a sub-agent to apply that skill's knowledge

**Spawn ALL matched skill sub-agents in PARALLEL.** No limit — 10, 20, 30 is fine.

### Step 3: Discover & Apply Learnings — 過去の知恵 (Past Wisdom)

Search `docs/solutions/` for documented learnings. Filter by relevance to plan sections. Spawn sub-agents for applicable learnings.

### Step 4: Per-Section Research (Parallel) — 区画調査 (Plot Research)

For each major section, spawn research agents:
- Query framework documentation
- Search for best practices
- Find real-world implementation examples
- Identify edge cases and gotchas

### Step 5: Discover & Run ALL Review Agents (Parallel) — 全方位レビュー (360° Review)

Find all agents from all sources. Launch every agent in parallel (20+, 40+ is fine). Let all agents decide if they have relevant input.

### Step 6: Synthesize — 統合 (Integration)

Collect all agent outputs. Deduplicate. Prioritize. Flag conflicts.

### Step 7: Enhance Plan — 設計強化 (Blueprint Reinforcement)

Merge findings back into the plan. For each enhanced section, add:

```markdown
#### Research Insights
- **Best practices:** [what industry recommends]
- **Performance:** [optimization opportunities]
- **Implementation details:** [concrete examples, edge cases]
- **References:** [documentation links]
```

### Step 8: Enhancement Summary

Add to top of plan:
```markdown
## Enhancement Summary
- **Date:** YYYY-MM-DD
- **Sections enhanced:** [list]
- **Skills applied:** [count and names]
- **Learnings referenced:** [count]
- **Key improvements:** [summary]
```

### Step 9: Write Enhanced Plan

Update the plan file in place (or create `-deepened` variant if user prefers).

### Step 10: Next Steps — 次の一手 (Next Move)

1. 🌿 **Start work** → `/niwashi-eng-05-work`
2. 📐 **View diff** — see what changed
3. 🌳 **Deepen further** — another pass
4. ↩️ **Revert** — restore original

## Key Rules

- **Discover before assuming** — don't hardcode skill/agent lists
- **No limit on parallel agents** — let the swarm do its work
- **NEVER CODE** — research and enhancement only
- **Preserve original structure** — add "Research Insights" subsections, don't restructure
