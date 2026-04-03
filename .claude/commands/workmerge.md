---
description: Merge completed parallel features back to main with conflict checking and cleanup
allowed-tools: Bash(git:*), Bash(cat:*), Bash(rm:*), Read, Glob, Edit, Write
---

## Worktree Merge Assistant

### Current State

**You are on:** !`git branch --show-current`
**Worktree:** !`git rev-parse --show-toplevel`

### Active Feature Branches

!`git worktree list`

### Feature Manifest
!`cat .parallel-features.json 2>/dev/null || echo '{"features":{},"nextSlot":1}'`

---

## Shell Commands Reference

| Command | Description |
|---------|-------------|
| `workon <feature>` | Create new worktree + branch + open IDE |
| `workls` | List all worktrees |
| `workcd <feature>` | Jump to a feature worktree |
| `workrm <feature>` | Remove worktree (keeps branch for manual cleanup) |

**Note:** These are shell commands the USER runs in their terminal.

---

## Your Task

$ARGUMENTS

If no arguments provided, analyze what can be merged:

1. **List mergeable branches** — Show all feature branches with their status
2. **Check for conflicts** — Compare each branch against main and each other
3. **Recommend merge order** — Based on dependencies and conflicts

If arguments specify branches to merge:

1. **Pre-merge checklist** for each branch:
   - Files changed vs main
   - Potential conflicts with other branches
   - Any uncommitted changes

2. **Conflict analysis**:
   - Files modified by multiple branches
   - Risk assessment (HIGH/MEDIUM/LOW)
   - Special attention to .unity scene files (binary, cannot merge)

3. **Execute merges** (if user confirms):
   - Merge in recommended order
   - Handle conflicts if they arise
   - Verify each merge succeeds

4. **Post-merge cleanup guidance**:
   - Tell user to run `workrm <feature>` for each merged feature
   - Delete merged PRD files
   - Update/remove CONFLICTS.md

---

## Merge Workflow

### Step 1: Ensure you're on main
```bash
git checkout main
git pull origin main
```

### Step 2: Merge each feature (in order)
```bash
git merge feature/<name> --no-edit
```

### Step 3: Push to remote
```bash
git push origin main
```

### Step 4: User cleanup
Tell the user to run:
```bash
workrm <feature-name>
git branch -d feature/<name>
git push origin --delete feature/<name>
```

### Step 5: PRD and Artifact Cleanup
```bash
rm tasks/prd-<feature-name>.md
# Update or remove tasks/CONFLICTS.md
git add -A && git commit -m "chore: cleanup PRDs and conflicts after merge"
```

---

## Output Format

```markdown
## Merge Plan

### Branches to Merge
| Branch | Files Changed | Conflicts | Status |
|--------|---------------|-----------|--------|
| feature/x | 3 files | None | Ready |
| feature/y | 2 files | None | Ready |

### Recommended Merge Order
1. `feature/x` — No dependencies
2. `feature/y` — No conflicts with feature/x

### Ready to Proceed?
I will run:
1. `git merge feature/x --no-edit`
2. `git merge feature/y --no-edit`
3. Clean up PRDs
4. Commit cleanup

After merging, you should run:
- `workrm x` then `workrm y`
```

---

## Important Notes

- **Always merge from main**
- **Pull first** — always pull latest main before merging
- **One at a time** — merge branches one at a time to isolate issues
- **Test after each merge** — open Unity and verify compilation
- **Scene file conflicts are fatal** — if two branches modified the same .unity file, one must be rebuilt
