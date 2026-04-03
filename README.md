# claude-project-template

A template repository for managing Claude Code configurations, skills, and workflows across projects.

- **`CLAUDE.md`** — Root context file: tech stack, commands, conventions, and an index of available skills and commands. Keep under 100 lines.
    
- **`.claude/skills/<name>/SKILL.md`** — Each skill's trigger description and instructions; one folder per skill.
    
- **`.claude/commands/`** — Slash commands for git worktree and parallel development workflows.
    
- **`src/`** — All project source code lives here; structure is project-specific.
    
- **`tasks/`** — Ephemeral PRD and task files created by the `prd` skill; deleted after each feature is merged.
    
- **`docs/research/`** — Permanent research findings written by the research skill or manually added.
    
- **`docs/architecture/`** — Architecture Decision Records (ADRs) documenting why key choices were made.
    
- **`ideas/skills/`** — Low-friction inbox for rough skill concepts before they are worth building into a full `SKILL.md`.