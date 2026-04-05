---
description: Show current worktree status
allowed-tools: Bash(cat:*), Bash(git:*)
---

**Reference:** See `.claude/worktree-reference.md` for full documentation on the parallel development workflow.

## Current Worktree Status

### Git Info
- **Branch**: !`git branch --show-current`
- **Worktree**: !`git rev-parse --show-toplevel`

### All Worktrees
!`git worktree list`

### Feature Manifest
!`cat .parallel-features.json 2>/dev/null || echo '{"features":{},"nextSlot":1}'`

### Recent Commits
!`git log --oneline -5`

### Uncommitted Changes
!`git status --short`

## Quick Reference

| Command | Description |
|---------|-------------|
| `workon <feature>` | Create new worktree + branch |
| `workls` | List all worktrees |
| `workcd <feature>` | Jump to a feature worktree |
| `workrm <feature>` | Remove a worktree |

## Claude Commands

| Command | Description |
|---------|-------------|
| `/worktask <prd>` | Start work from a PRD file |
| `/parallel` | Plan parallel features |
| `/parallel-start` | Commit PRDs and start worktrees |
| `/workmerge` | Merge completed features |
| `/checkconflicts` | Check for merge conflict risks |
