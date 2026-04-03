---
description: Commit PRD files and start parallel development across worktrees
allowed-tools: Bash(git:*), Bash(cat:*), Bash(ls:*), Read, Glob
---

## Parallel Development Starter

**Reference:** See `.claude/worktree-reference.md` for the full workflow.

### Current State

**Branch:** !`git branch --show-current`
**Uncommitted PRDs:** !`git status --short tasks/*.md 2>/dev/null || echo "No task files"`

### Available PRDs
!`ls -1 tasks/prd-*.md 2>/dev/null || echo "No PRD files found"`

### Conflicts Manifest
!`cat tasks/CONFLICTS.md 2>/dev/null | head -30 || echo "No CONFLICTS.md found"`

---

## Your Job

Prepare and start parallel development:

### Step 1: Commit PRD Files

Commit all PRD files and CONFLICTS.md so they're available in all worktrees:

```bash
git add tasks/prd-*.md tasks/CONFLICTS.md
git commit -m "docs: add PRDs and conflict manifest for parallel development

Features planned:
- [list features from PRDs]

See tasks/CONFLICTS.md for file ownership."
```

### Step 2: Push to Remote

```bash
git push origin main
```

### Step 3: Provide Worktree Instructions

Parse the PRDs and CONFLICTS.md to generate instructions. Output:

```markdown
## Ready for Parallel Development

### Commit
PRDs and CONFLICTS.md committed and pushed

### Create Worktrees

Run these commands in your terminal:

```bash
workon <feature-1>
workon <feature-2>
```

### In Each IDE Session

**<feature-1>:**
```
/worktask tasks/prd-<feature-1>.md
```

**<feature-2>:**
```
/worktask tasks/prd-<feature-2>.md
```

### Merge Order

1. <feature-1> - [reason]
2. <feature-2> - [reason]

### When Complete

Return to main worktree and run:
```
/workmerge
```
```

---

## Important

- Ensure you're on the main branch before starting
- All PRDs must be committed before creating worktrees (so they exist in each)
- Each worktree will have its own Claude session
