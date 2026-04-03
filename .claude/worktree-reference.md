# Worktree Parallel Development Reference

This document describes the worktree-based parallel development workflow used in this project. Reference this when working with features, PRDs, or any parallel development tasks.

---

## Overview

This project uses **git worktrees** to enable parallel feature development. Each feature gets:
- Its own directory (sibling to main repo)
- Its own branch (`feature/<name>`)
- Its own Claude session

---

## Shell Commands (User's Terminal)

These commands are defined in the user's shell config and must be run by the user:

| Command | Description |
|---------|-------------|
| `workon <feature>` | Create worktree + branch + open IDE |
| `workls` | List all worktrees |
| `workcd <feature>` | Change directory to a feature worktree |
| `workrm <feature>` | Remove worktree and merged branch |

---

## Claude Commands (Skills)

| Command | Description |
|---------|-------------|
| `/worktask <prd>` | Start work in fresh worktree (reads PRD + conflicts) |
| `/parallel-start` | Commit PRDs and get instructions to start parallel worktrees |
| `/workstatus` | Show current worktree, branch, active worktrees |
| `/checkconflicts` | Analyze changes for potential merge conflicts |
| `/parallel` | Plan parallel features, analyze conflicts |
| `/workmerge` | Merge completed features back to main |
| `/prd` | Create a Product Requirements Document |
| `/split` | Split a PRD into parallel workstreams |

---

## Workflow

### Starting New Parallel Features

1. **Create PRDs**: `/prd` to document each feature
2. **Plan parallel work**: `/parallel` to analyze conflicts and plan
3. **Start parallel dev**: `/parallel-start` to commit PRDs and get worktree instructions
4. **Create worktrees**: User runs `workon <feature-name>` for each
5. **Begin work**: In each worktree, run `/worktask tasks/prd-<name>.md`

### During Development

1. **Check status**: `/workstatus` to see branch and worktrees
2. **Check conflicts**: `/checkconflicts` before making shared file changes
3. **Test in Unity**: Open the worktree's project in Unity Editor

### Merging Completed Features

1. **Go to main worktree**: User navigates to main
2. **Run merge**: `/workmerge` to analyze and merge features
3. **Cleanup**: User runs `workrm <feature>` for each merged feature

---

## File Locations

| File | Purpose |
|------|---------|
| `.parallel-features.json` | Tracks active features |
| `tasks/prd-*.md` | Product Requirements Documents |
| `tasks/CONFLICTS.md` | File ownership for parallel features |

---

## High-Risk Shared Files

These files are modified by most features — coordinate carefully:

**Core Scripts:**


**Data:**


**Scene:**


---

## Conflict Prevention Strategies

1. **Additive changes**: Add new scripts rather than modifying shared ones
2. **Feature modules**: Create feature-specific directories under Scripts/
3. **Merge order**: Merge independent features first, dependent ones after
4. **Small PRs**: Keep features small to minimize conflict surface
5. **Avoid scene changes**: Prefer runtime-generated objects over scene modifications when possible
