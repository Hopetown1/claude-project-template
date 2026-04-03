---
description: Plan and analyze parallel feature development to minimize merge conflicts
allowed-tools: Read, Glob, Grep, Bash(cat:*), Bash(git branch:*), Bash(git worktree:*)
---

## Context

You are helping plan parallel feature development across multiple git worktrees. Each worktree has its own Claude session working on a feature branch.

**Reference:** See `.claude/worktree-reference.md` for full documentation on the parallel development workflow.

### Current Parallel Features
!`cat .parallel-features.json 2>/dev/null || echo '{"features":{},"nextSlot":1}'`

### Active Worktrees
!`git worktree list`

### Current Branch
!`git branch --show-current`

## High-Risk Shared Files (likely to cause merge conflicts)

These files are modified by most features and require careful coordination:

**Core Scripts:**
- `Assets/_Project/Scripts/Core/GameManager.cs`
- `Assets/_Project/Scripts/Core/WaveManager.cs`
- `Assets/_Project/Scripts/Core/EconomyManager.cs`
- `Assets/_Project/Scripts/Utilities/GameEvents.cs`
- `Assets/_Project/Scripts/Utilities/GameConstants.cs`

**Data Definitions:**
- `Assets/_Project/Scripts/Towers/TowerData.cs`
- `Assets/_Project/Scripts/Enemies/EnemyData.cs`

**Scene Files (binary — cannot merge):**
- `Assets/_Project/Scenes/GameScene.unity`

## Your Task

$ARGUMENTS

If no arguments provided, show:
1. Current parallel features
2. Any potential conflicts between active features
3. Recommendations for the user

If arguments describe new features to plan:
1. Analyze each proposed feature
2. Predict which files each will likely modify
3. Build a conflict matrix showing overlaps
4. Recommend:
   - Which features can safely run in parallel
   - Which should be sequenced
   - Strategies to isolate changes

## Conflict Prevention Strategies

When you identify potential conflicts, suggest these mitigations:

1. **Additive-only pattern**: Add new scripts instead of modifying shared ones
2. **Deferred registration**: Collect event/constant changes, merge them last
3. **Feature modules**: Create `Scripts/Features/<name>/` directories with self-contained code
4. **Interface segregation**: Define interfaces in shared files, implement in feature files
5. **Scene avoidance**: Prefer runtime-generated objects over scene modifications

## Output Format

Provide a clear summary:

```
## Parallel Development Analysis

### Active Features
- feature-a: [brief description]
- feature-b: [brief description]

### Conflict Matrix
| File | feature-a | feature-b | Risk |
|------|-----------|-----------|------|
| GameEvents.cs | adds events | adds events | LOW - additive |
| GameScene.unity | no changes | modifies | HIGH - binary |

### Recommendations
1. [specific recommendation]
2. [specific recommendation]

### Merge Order
1. feature-a (no dependencies)
2. feature-b (after feature-a merges)
```
