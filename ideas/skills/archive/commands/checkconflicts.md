---
description: Check if current changes might conflict with other parallel features
allowed-tools: Bash(git:*), Bash(cat:*), Read, Glob
---

**Reference:** See `.claude/worktree-reference.md` for full documentation on the parallel development workflow.

## Conflict Check

### Files Changed in This Branch
!`git diff --name-only main...HEAD 2>/dev/null || git diff --name-only HEAD~10...HEAD 2>/dev/null || echo "Unable to determine changed files"`

### Uncommitted Changes
!`git status --short`

### High-Risk Files Status

Checking if you've modified any high-risk shared files:

!`git diff --name-only main...HEAD 2>/dev/null | grep -E "(GameManager|WaveManager|EconomyManager|GameEvents|GameConstants|TowerData|EnemyData|GameScene)" || echo "No high-risk files modified"`

### Other Active Features
!`cat .parallel-features.json 2>/dev/null || echo '{"features":{}}'`

## Your Task

Analyze the changes in this branch and:

1. **Identify high-risk modifications**: Flag any changes to shared files
2. **Check for potential conflicts**: Based on the feature manifest, warn if other features might touch the same files
3. **Scene file warning**: If any .unity files were modified, flag as HIGH risk (binary files cannot merge)
4. **Suggest isolation strategies**: If conflicts are likely, recommend how to restructure

## Output

Provide a brief conflict risk assessment:

```
## Conflict Risk: [LOW/MEDIUM/HIGH]

### Modified Shared Files
- [file]: [what was changed]

### Potential Conflicts
- [other-feature] may also modify [file] because [reason]

### Recommendations
- [action to take]
```

If no conflicts detected, simply confirm the branch is safe to continue.
