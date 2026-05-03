# claude-project-template

A template repository for managing Claude Code skills and workflows across projects.
## How It Works

Start a session and describe what you want to build. The skills system activates automatically — brainstorming your design, writing a detailed plan, dispatching subagents to implement each task with two-stage code review, and finishing the branch. You intervene at approval gates (design, spec, execution choice, merge/PR), but the handoffs between skills happen on their own.

## The Workflow

```
"I want to build X"
     │
     ├─ research (optional, manual)     Research a topic before designing
     │
     ├─ brainstorming (auto)            Clarifying questions → 2-3 approaches → design spec
     │    │
     │    ├─ writing-plans (auto)       Spec → granular tasks with actual code
     │    │    │
     │    │    ├─ subagent-driven-      Fresh agent per task + spec review + quality review
     │    │    │  development (auto)
     │    │    │
     │    │    └─ finishing-a-          Merge / PR / keep / discard
     │    │       development-branch
     │    │
     │    └─ (TDD, verification, and code review run inside subagents automatically)
     │
     └─ systematic-debugging (auto)     Triggers on "fix this" / "this is broken"
```

## Custom Skills

These live in `.claude/skills/` and travel with the repo.

| Skill | Purpose |
|-------|---------|
| **research** | Deep-research a topic via Perplexity/WebSearch, save to `docs/research/` |
| **skill-creator** | Create, test, and improve skills with quantitative eval infrastructure |
| **contrarian-research-partner** | Pressure-test ideas through Socratic dialogue |
| **llm-council** | Run a decision through 5 AI advisors with peer review and synthesis |
| **para-audit** | Audit and reorganize an Obsidian vault's PARA structure |
| **excalidraw-diagram-skill** | Generate Excalidraw JSON diagrams that make visual arguments |

The workflow skills (brainstorming, writing-plans, subagent-driven-development, TDD, systematic-debugging, etc.) are provided by the **superpowers** plugin — see below.

## Plugins & External Tools

These aren't bundled in this repo — they install separately.

### Claude Code Plugins (auto-installed via `.claude/settings.json`)

| Plugin | Purpose |
|--------|---------|
| **superpowers** ([obra/superpowers](https://github.com/obra/superpowers)) | Workflow skills: brainstorming, writing-plans, subagent-driven-development, TDD, systematic-debugging, verification-before-completion, code-review, git-worktrees, and more. |
| **ui-ux-pro-max** ([nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)) | UI/UX design intelligence: 67 styles, 161 palettes, 57 font pairings, 15+ stack guidelines. |

When you open this repo in Claude Code, you'll be prompted to trust the marketplaces and install both.

### External Tools (manual install)

| Tool | Install | Purpose |
|------|---------|---------|
| **Graphify** ([safishamsi/graphify](https://github.com/safishamsi/graphify)) | `pip install graphify && graphify install` | Builds a knowledge graph index of your codebase so Claude reads a compact graph instead of raw files — claims up to 71.5× fewer tokens per query on large repos. Re-run after major changes. |

## Directory Structure

- **`.claude/CLAUDE.md`** — Project context: tech stack, commands, conventions, skills bootstrap.

- **`.claude/skills/<name>/SKILL.md`** — Each skill's trigger description and instructions; one folder per skill.

- **`src/`** — All project source code; structure is project-specific.

- **`docs/research/`** — Permanent research findings written by the research skill.

- **`docs/superpowers/specs/`** — Design specs produced by the brainstorming skill.

- **`docs/superpowers/plans/`** — Implementation plans produced by the writing-plans skill.

- **`docs/architecture/`** — Architecture Decision Records (ADRs).

- **`ideas/skills/`** — Low-friction inbox for rough skill concepts before building a full SKILL.md.

- **`ideas/skills/archive/`** — Archived skills and commands replaced during migration.

## Setup

1. Clone or use this repo as a template
2. Fill in the placeholders in `.claude/CLAUDE.md` (tech stack, commands, project structure)
3. Start a Claude Code session — skills activate automatically
