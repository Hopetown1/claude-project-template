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
     │    │  ┄┄ design-depth gate ┄┄    if spec has visual surfaces
     │    │                             pick: full │ function-first │ deferred
     │    ┊
     │    ┊  design-foundation          on 'full', if design-system.json is missing
     │    ┊  (optional, once)           intent + brand + aesthetic + design system v1
     │    ┊
     │    ┊  ui-surface-design          on 'full', per surface
     │    ┊  (optional, per surface)    2-3 variations → critic passes → surface spec
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

## Skills (21 total)

### Custom Skills
| Skill | Purpose |
|-------|---------|
| **research** | Deep-research a topic via Perplexity/WebSearch, save to `docs/research/` |
| **skill-creator** | Create, test, and improve skills with quantitative eval infrastructure |
| **contrarian-research-partner** | Challenge assumptions, find blind spots, stress-test ideas via Socratic dialogue |
| **excalidraw-diagram-skill** | Produce Excalidraw JSON diagrams for workflows, architectures, concepts |

### Design Skills
| Skill | Purpose |
|-------|---------|
| **design-foundation** | Establish project-wide design intent, brand, aesthetic direction, and design system v1 |
| **ui-surface-design** | Design a specific surface (page/screen) with 2–3 variations against the design system |
| **design-component-creation** | Fill a component gap in the design system (sole mutator of `design-system.json`) |

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

## Design Workflow

UI-heavy projects opt into a gated design workflow that composes with the normal skill chain. When `brainstorming` produces a spec describing visual surfaces or flows, you're asked to choose a **design depth** before planning begins:

- **`full`** — run `design-foundation` (if `docs/design/02-system/design-system.json` is missing), then `ui-surface-design` per surface, then `writing-plans`.
- **`function-first`** — plan immediately against a bare-minimum accessibility/structure baseline; a follow-up design pass is appended.
- **`deferred`** — plan immediately with a blocking "design TBD" task gating any visible UI work.

Design skills produce artifacts and return control to the orchestrator; they do not invoke `writing-plans` themselves.

### Design Knowledge (`.claude/knowledge/design/`)

Shared, project-agnostic resources the design skills load at runtime:

- **`personas/`** — craft and critique personas (art-director, visual-designer, design-systems-architect, conversion-designer, onboarding-designer, data-designer, ux-writer, accessibility-specialist, design-critic, user-advocate) loaded into subagents based on the task.
- **`aesthetic-references/`** — named directions (swiss-international, editorial, brutalist, tech-minimal, warm-organic, playful-maximalist) used as stakes, not templates.
- **`domains/`** — craft knowledge (typography, color-and-contrast, layout-and-composition, accessibility-wcag).
- **`schemas/`** — JSON schemas for brand foundation, design system, surface specs, component specs, intent.
- **`intent-taxonomy.md`**, **`quality-bars.md`** — shared vocabulary and acceptance criteria.
- **`scripts/validate-all.sh`** — runs schema validation across design artifacts.

## Directory Structure

- **`.claude/CLAUDE.md`** — Project context: tech stack, commands, conventions, skills bootstrap.

- **`.claude/skills/<name>/SKILL.md`** — Each skill's trigger description and instructions; one folder per skill.

- **`.claude/knowledge/design/`** — Project-agnostic design resources (personas, aesthetic references, domain knowledge, schemas) loaded by design skills.

- **`src/`** — All project source code; structure is project-specific.

- **`docs/research/`** — Permanent research findings written by the research skill.

- **`docs/superpowers/specs/`** — Design specs produced by the brainstorming skill.

- **`docs/superpowers/plans/`** — Implementation plans produced by the writing-plans skill.

- **`docs/design/`** — Project-specific design artifacts: `00-foundation/`, `01-direction/`, `02-system/`, `03-surfaces/`, `04-flows/`, `05-handoff/`.

- **`docs/architecture/`** — Architecture Decision Records (ADRs).

- **`ideas/skills/`** — Low-friction inbox for rough skill concepts before building a full SKILL.md.

- **`ideas/skills/archive/`** — Archived skills and commands replaced during migration.

## Setup

1. Clone or use this repo as a template
2. Fill in the placeholders in `.claude/CLAUDE.md` (tech stack, commands, project structure)
3. Start a Claude Code session — skills activate automatically
