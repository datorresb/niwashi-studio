# Installing niwashi-studio

> These instructions are designed to be followed by an AI coding agent.

## What this does

Copies the niwashi-studio workflow files into your project:
- `@niwashi` orchestrator agent (`.github/agents/`)
- 6 slash commands (`.github/prompts/`)
- 6 phase skills + 4 external skills (`skills/`)
- Workflow docs directory (`niwashi_docs/`)
- Copilot instructions (`.github/copilot-instructions.md`)

## Steps

1. Clone the repo to a temp directory:
```bash
git clone --depth 1 https://github.com/datorresb/niwashi-studio.git /tmp/niwashi-studio
```

2. Copy the workflow files into the current project:
```bash
# Agent and prompts
mkdir -p .github/agents/references .github/prompts
cp /tmp/niwashi-studio/.github/agents/niwashi.agent.md .github/agents/
cp /tmp/niwashi-studio/.github/agents/references/architecture.md .github/agents/references/
cp /tmp/niwashi-studio/.github/prompts/niwashi-*.prompt.md .github/prompts/

# Skills (6 niwashi phases + 4 external)
cp -r /tmp/niwashi-studio/skills/ ./skills/

# Workflow docs directory
mkdir -p niwashi_docs/patterns
touch niwashi_docs/patterns/.gitkeep

# Copilot instructions (append if exists, create if not)
if [ -f .github/copilot-instructions.md ]; then
  echo "" >> .github/copilot-instructions.md
  echo "This repo uses niwashi-studio. Use \`@niwashi\` to create interactive technical narratives." >> .github/copilot-instructions.md
else
  mkdir -p .github
  echo "This repo uses niwashi-studio. Use \`@niwashi\` to create interactive technical narratives." > .github/copilot-instructions.md
fi
```

3. Clean up:
```bash
rm -rf /tmp/niwashi-studio
```

4. Verify installation:
```bash
ls .github/agents/niwashi.agent.md && echo "✅ Agent installed"
ls .github/prompts/niwashi-01-discover.prompt.md && echo "✅ Slash commands installed"
ls skills/niwashi-01-discover/SKILL.md && echo "✅ Skills installed"
ls niwashi_docs/patterns/.gitkeep && echo "✅ Workflow docs ready"
```

5. Commit:
```bash
git add .github/agents .github/prompts .github/copilot-instructions.md skills/ niwashi_docs/
git commit -m "feat: install niwashi-studio workflow"
```

## What's next

Say `@niwashi` or `/niwashi-01-discover` to start creating your first narrative.
