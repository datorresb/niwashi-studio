# Installing niwashi-studio

> These instructions are designed to be followed by an AI coding agent.

## What this does

Copies the niwashi-studio workflow files into your project:
- `@niwashi` narrative orchestrator + `@niwashi-engineer` engineering orchestrator (`.github/agents/`)
- 6 narrative slash commands + 12 engineering slash commands (`.github/prompts/`)
- 6 narrative phase skills + 10 engineering skills + 4 external skills (`skills/`)
- Workflow docs directory (`niwashi_docs/`)
- Engineering docs directories (`docs/`)
- Copilot instructions (`.github/copilot-instructions.md`)

## Steps

1. Clone the repo to a temp directory:
```bash
git clone --depth 1 https://github.com/datorresb/niwashi-studio.git /tmp/niwashi-studio
```

2. Copy the workflow files into the current project:
```bash
# Agents and prompts
mkdir -p .github/agents/references .github/prompts
cp /tmp/niwashi-studio/.github/agents/niwashi.agent.md .github/agents/
cp /tmp/niwashi-studio/.github/agents/niwashi-engineer.agent.md .github/agents/
cp /tmp/niwashi-studio/.github/agents/references/architecture.md .github/agents/references/
cp /tmp/niwashi-studio/.github/prompts/niwashi-*.prompt.md .github/prompts/
cp /tmp/niwashi-studio/.github/prompts/niwashi-eng-*.prompt.md .github/prompts/

# Skills (6 niwashi narrative + 10 niwashi engineering + 4 external)
cp -r /tmp/niwashi-studio/skills/ ./skills/

# Workflow docs directory
mkdir -p niwashi_docs/patterns
touch niwashi_docs/patterns/.gitkeep

# Engineering docs directories
mkdir -p docs/plans docs/brainstorms docs/solutions docs/ideation

# Copilot instructions (append if exists, create if not)
if [ -f .github/copilot-instructions.md ]; then
  echo "" >> .github/copilot-instructions.md
  cat <<'EOF' >> .github/copilot-instructions.md
This repo uses niwashi-studio.

- Use `@niwashi` to create interactive technical narratives (Garden Story workflow).
- Use `@niwashi-engineer` to plan, build, review, and ship features (Garden Engineering workflow).
EOF
else
  mkdir -p .github
  cat <<'EOF' > .github/copilot-instructions.md
This repo uses niwashi-studio.

- Use `@niwashi` to create interactive technical narratives (Garden Story workflow).
- Use `@niwashi-engineer` to plan, build, review, and ship features (Garden Engineering workflow).
EOF
fi
```

3. Clean up:
```bash
rm -rf /tmp/niwashi-studio
```

4. Verify installation:
```bash
# Quick check
ls .github/agents/niwashi.agent.md && echo "✅ Narrative agent installed"
ls .github/agents/niwashi-engineer.agent.md && echo "✅ Engineering agent installed"
ls .github/prompts/niwashi-01-discover.prompt.md && echo "✅ Narrative slash commands installed"
ls .github/prompts/niwashi-eng-03-plan.prompt.md && echo "✅ Engineering slash commands installed"
ls skills/niwashi-01-discover/SKILL.md && echo "✅ Narrative skills installed"
ls skills/niwashi-eng-03-plan/SKILL.md && echo "✅ Engineering skills installed"
ls niwashi_docs/patterns/.gitkeep && echo "✅ Workflow docs ready"
```

5. Commit:
```bash
git add .github/agents .github/prompts .github/copilot-instructions.md skills/ niwashi_docs/
git commit -m "feat: install niwashi-studio workflow"
```

## What's next

**For narratives:** Say `@niwashi` or `/niwashi-01-discover` to start creating your first interactive narrative.

**For engineering:** Say `@niwashi-engineer` or `/niwashi-eng-03-plan` to plan and build a feature.
