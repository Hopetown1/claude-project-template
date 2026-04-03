---
description: Start working on a task in a fresh worktree. Reads PRD and begins implementation.
allowed-tools: Bash(git:*), Read, Glob, Grep, Edit, Write
---

## Worktree Task Runner

**Reference:** See `.claude/worktree-reference.md` for the parallel development workflow.

### Current Worktree Info
- **Branch:** !`git branch --show-current`
- **Worktree:** !`git rev-parse --show-toplevel`

### PRD File
$ARGUMENTS

---

## Your Job

You are starting work on a feature in a **fresh worktree**. Follow these steps in order:

### Step 1: Read the Conflict Manifest

**CRITICAL:** Read `tasks/CONFLICTS.md` to understand which files you must NOT modify.

This prevents merge conflicts with other parallel features.

### Step 2: Read the PRD

Read the PRD file specified in the arguments (e.g., `tasks/prd-stealth-enemies.md`).

If no PRD file was specified, list available PRDs:
```bash
ls tasks/prd-*.md 2>/dev/null || echo "No PRD files found"
```

### Step 3: Read Architecture Docs

Read `docs/Architecture/technical-architecture.md` and any relevant Vision docs referenced in the PRD.

### Step 4: Summarize Before Starting

After reading the PRD, conflicts, and architecture, provide this summary:

```markdown
## Ready to Start: [Feature Name]

**Branch:** feature/[name]
**Merge Order:** [1st/2nd/3rd]

### What This Feature Does
[1-2 sentence summary]

### Files I Will Modify
- [file1]
- [file2]

### Files I Must NOT Modify (Conflict Avoidance)
- [file1] - owned by [other-feature]

### First Step
[What you'll do first]
```

### Step 5: Begin Implementation

Implement the feature according to the PRD.

**Reminders:**
- Follow all code rules from CLAUDE.md and the architecture doc
- Use `[SerializeField] private` for Inspector fields
- Add new events to `GameEvents.cs` if needed
- Add new constants to `GameConstants.cs` if needed
- Pooled objects need `Reset()` methods
- **Re-check CONFLICTS.md before modifying any shared file**
- Test in Unity Play Mode
