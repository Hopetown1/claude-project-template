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

## Skills (16 total)

### Custom Skills
| Skill | Purpose |
|-------|---------|
| **research** | Deep-research a topic via Perplexity/WebSearch, save to `docs/research/` |
| **skill-creator** | Create, test, and improve skills with quantitative eval infrastructure |

### Superpowers Skills
| Skill | Purpose |
|-------|---------|
| **brainstorming** | Collaborative design before any implementation |
| **writing-plans** | Detailed implementation plans from approved specs |
| **subagent-driven-development** | Execute plans via fresh subagent per task with two-stage review |
| **executing-plans** | Alternative: execute plans inline with checkpoints |
| **test-driven-development** | RED-GREEN-REFACTOR for all features and bugfixes |
| **systematic-debugging** | 4-phase root cause investigation |
| **verification-before-completion** | No completion claims without fresh evidence |
| **using-git-worktrees** | Isolated workspaces for feature development |
| **finishing-a-development-branch** | Merge, PR, keep, or discard completed work |
| **requesting-code-review** | Dispatch code-reviewer subagent |
| **receiving-code-review** | Respond to review feedback with technical rigor |
| **dispatching-parallel-agents** | Delegate independent tasks to concurrent agents |
| **writing-skills** | Create new skills using TDD applied to documentation |
| **using-superpowers** | Bootstrap: ensures skills auto-trigger |

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
