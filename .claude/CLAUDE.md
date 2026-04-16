# Project: [PROJECT_NAME]

## Tech Stack
- Language: [LANGUAGE]
- Framework: [FRAMEWORK]
- Database: [DATABASE]
- Package Manager: [PACKAGE_MANAGER]

## Essential Commands
- Build: `[BUILD_COMMAND]`
- Test: `[TEST_COMMAND]`
- Lint: `[LINT_COMMAND]`
- Dev Server: `[DEV_COMMAND]`

## Project Structure
- Source code: `[SOURCE_DIR]`
- Tests: `[TEST_DIR]`
- Config files: `[CONFIG_DIR]`

## Code Style
- [STYLE_GUIDE_OR_CONVENTIONS]

## Key Architecture Decisions
- [ARCHITECTURE_NOTES]

## Task Management
- Design specs live in `docs/superpowers/specs/`
- Implementation plans live in `docs/superpowers/plans/`
- Research documents live in `docs/research/`
- Delete task files after features are merged to keep the folder clean

## Skills System

If you think there is even a 1% chance a skill might apply to what you are doing, you MUST invoke the skill. This is not optional.

**Skill priority:** Process skills first (brainstorming, systematic-debugging), then implementation skills.

**Before responding to any user message, check if a skill applies:**
- "Build X" / "Create X" / "Add X" → brainstorming first
- "Fix this bug" / "This is broken" → systematic-debugging first
- "Research X" / "Look up X" → research skill
- "Implement the plan" → subagent-driven-development or executing-plans
- About to claim "done" → verification-before-completion

**The workflow chain auto-invokes:** brainstorming → writing-plans → subagent-driven-development → finishing-a-development-branch. You only need to trigger the first skill; the rest chain automatically.

## Model Policy

Use the right model for the right job to balance quality and cost.

| Role | Model | Rationale |
|------|-------|-----------|
| Main conversation (brainstorm, plan, architect, coordinate) | Opus | Design judgment, architecture decisions |
| Implementation subagents | Sonnet | Reliable code generation |
| Spec compliance review subagents | Haiku | Mechanical checklist — fast and cheap |
| Code quality review subagents | Sonnet | Needs judgment to catch subtle issues |

When dispatching subagents via the Agent tool, always set the `model` parameter explicitly.

## Skills Available
- **research** — deep-research a topic and save findings to `docs/research/`
- **skill-creator** — create, test, and iteratively improve skills with quantitative evaluation
- **brainstorming** — turn ideas into designs through collaborative dialogue before any implementation
- **writing-plans** — create detailed implementation plans from approved specs
- **test-driven-development** — RED-GREEN-REFACTOR cycle for all features and bugfixes
- **subagent-driven-development** — execute plans via fresh subagent per task with two-stage review
- **executing-plans** — alternative: execute plans inline with checkpoints
- **using-git-worktrees** — create isolated workspaces for feature development
- **finishing-a-development-branch** — merge, PR, keep, or discard completed work
- **systematic-debugging** — 4-phase root cause investigation before any fix
- **verification-before-completion** — no completion claims without fresh evidence
- **requesting-code-review** — dispatch code-reviewer subagent
- **receiving-code-review** — respond to review feedback with technical rigor
- **dispatching-parallel-agents** — delegate independent tasks to concurrent agents
- **writing-skills** — create new skills using TDD applied to documentation
- **using-superpowers** — how to find and use skills (bootstrap)
