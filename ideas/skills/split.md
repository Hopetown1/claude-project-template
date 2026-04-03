---
name: split
description: "Split a PRD into parallel workstreams for worktree-based development. Use after creating a PRD to divide work across multiple Claude sessions. Triggers on: split this prd, divide into worktrees, parallel tasks from prd, split for parallel."
---

# PRD Splitter for Parallel Development

Converts a PRD into separate task files, each suitable for a parallel worktree with its own Claude session.

**Reference:** See `.claude/worktree-reference.md` for the full parallel development workflow.

---

## The Job

1. Read an existing PRD from `tasks/prd-[name].md`
2. Analyze user stories for dependencies and conflicts
3. Group stories into parallel workstreams
4. Create task files: `tasks/task-[workstream-name].md`
5. Output shell commands to create worktrees

**Important:** This is for planning parallel work, not implementation.

---

## Analysis Steps

### 1. Identify Dependencies

Map which stories depend on others:
- Core systems before systems that use them
- ScriptableObject definitions before scripts that reference them
- Event definitions before subscribers
- Base classes before derived classes

### 2. Check for Conflicts

Flag stories that touch the same files:
- **High conflict:** Same C# script, same methods
- **Low conflict:** Same file, different sections (e.g., adding new events to GameEvents.cs)
- **No conflict:** Different scripts entirely
- **Scene conflicts:** Unity .scene files are binary — only ONE workstream should modify a scene

### 3. Group into Workstreams

Create workstreams that:
- Can run in parallel without blocking each other
- Minimize merge conflicts
- Are roughly equal in scope

---

## Output Format

### Task File Template

For each workstream, create `tasks/task-[workstream-name].md`:

```markdown
# Task: [Workstream Name]

**Branch:** `feature/[workstream-name]`

## Context

[Brief description of what this workstream accomplishes]

## User Stories

### US-XXX: [Title]
[Copy from PRD]

### US-YYY: [Title]
[Copy from PRD]

## Files to Modify

- `Assets/_Project/Scripts/...`

## Shared Files (Coordinate with other workstreams)

- `GameEvents.cs` — Adding new events (additive, low conflict)

## Acceptance Criteria

- [ ] All user stories complete
- [ ] Unity compiles with zero errors
- [ ] No regressions in existing functionality
- [ ] Tested in Play Mode
- [ ] Ready to merge to main

## Merge Order

Merge this workstream: [FIRST | AFTER workstream-x | LAST]
```

### Summary Output

After creating task files, output:

```markdown
## Parallel Development Plan

### Workstreams

| Workstream | Stories | Estimated Size | Merge Order |
|------------|---------|----------------|-------------|
| [name-a]   | US-001, US-002 | Small | First |
| [name-b]   | US-003, US-004 | Medium | After name-a |

### Conflict Matrix

| File | workstream-a | workstream-b | Risk |
|------|--------------|--------------|------|
| GameEvents.cs | adds events | adds events | LOW |
| GameScene.unity | no changes | modifies | NONE |

### Shell Commands

```bash
# Create worktrees
workon [name-a]
workon [name-b]

# In each worktree, start work:
# /worktask tasks/task-[name].md
```
```

---

## Workstream Naming

Use descriptive kebab-case names:
- `add-stealth-enemies` (not `task-1`)
- `tower-upgrade-branching` (not `towers`)
- `combat-round-system` (not `pvp`)

---

## Checklist

Before outputting the split:

- [ ] Read and understood the full PRD
- [ ] Mapped dependencies between stories
- [ ] Identified potential file conflicts (especially .unity scenes)
- [ ] Created logical workstream groupings
- [ ] Each workstream is independently testable
- [ ] Merge order is clear and documented
- [ ] Shell commands provided for worktree creation
