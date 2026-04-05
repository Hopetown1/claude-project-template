---
description: Set up the parallel development shell commands (workon, workls, workcd, workrm) in the user's shell config.
allowed-tools: Bash, Read, Write, Edit, AskUserQuestion
---

## Setup Parallel Development Shell Commands

This command installs the git worktree helper functions into the user's shell config so they can manage parallel feature worktrees.

### What Gets Installed

| Command | Description |
|---------|-------------|
| `workon <feature> [base]` | Create worktree + branch + open IDE |
| `workls` | List all worktrees |
| `workcd <feature>` | cd into a feature worktree |
| `workrm <feature>` | Remove worktree and merged branch |

---

## Your Job

### Step 1: Detect Shell

Detect which shell the user is running and find the correct config file:

```bash
echo $SHELL
```

Map to config file:
- `zsh` → `~/.zshrc`
- `bash` → `~/.bashrc` (or `~/.bash_profile` on macOS)
- `fish` → Not supported yet — inform user and stop

### Step 2: Check if Already Installed

Search the shell config for `workon()`. If found, tell the user it's already installed and offer to update/reinstall.

### Step 3: Ask About IDE Command

The `workon` function opens an IDE after creating the worktree. Ask the user what command opens their IDE:
- `code <path>` — VS Code
- `cursor <path>` — Cursor
- `antigravity <path>` — AntiGravity
- Custom command
- None (skip IDE auto-open)

### Step 4: Append to Shell Config

Append the following block to the detected shell config file. Replace `IDE_COMMAND` with the user's choice from Step 3 (or remove the IDE line if "None").

```bash
# =============================================================================
# Git Worktree helpers for parallel development
# =============================================================================

# Create a new feature worktree and open IDE
# Usage: workon feature-name [base-branch]
workon() {
    local feature="$1"
    local base="${2:-main}"

    if [[ -z "$feature" ]]; then
        echo "Usage: workon <feature-name> [base-branch]"
        return 1
    fi

    local repo_root=$(git rev-parse --show-toplevel 2>/dev/null)
    if [[ -z "$repo_root" ]]; then
        echo "Error: Not in a git repository"
        return 1
    fi
    local repo_name=$(basename "$repo_root")
    local worktree_path="$(dirname "$repo_root")/${repo_name}-${feature}"
    local branch_name="feature/${feature}"

    if [[ -d "$worktree_path" ]]; then
        echo "Worktree already exists at $worktree_path"
    else
        echo "Creating worktree for '$feature' based on '$base'..."
        git worktree add -b "$branch_name" "$worktree_path" "$base" || {
            git worktree add "$worktree_path" "$branch_name" 2>/dev/null || {
                echo "Error: Failed to create worktree"
                return 1
            }
        }
        echo "Created worktree at $worktree_path"
    fi

    IDE_COMMAND "$worktree_path"

    echo ""
    echo "Worktree ready for '$feature'"
    echo "  Path: $worktree_path"
    echo "  Branch: $branch_name"
}

# List all worktrees
workls() {
    local repo_root=$(git rev-parse --show-toplevel 2>/dev/null)
    if [[ -z "$repo_root" ]]; then
        echo "Error: Not in a git repository"
        return 1
    fi

    echo "Active worktrees:"
    echo ""
    git worktree list
}

# Remove a feature worktree
workrm() {
    local feature="$1"

    if [[ -z "$feature" ]]; then
        echo "Usage: workrm <feature-name>"
        return 1
    fi

    local repo_root=$(git rev-parse --show-toplevel 2>/dev/null)
    if [[ -z "$repo_root" ]]; then
        echo "Error: Not in a git repository"
        return 1
    fi
    local repo_name=$(basename "$repo_root")
    local worktree_path="$(dirname "$repo_root")/${repo_name}-${feature}"

    if [[ ! -d "$worktree_path" ]]; then
        echo "Error: Worktree not found at $worktree_path"
        return 1
    fi

    echo "Removing worktree at $worktree_path..."
    git worktree remove "$worktree_path"

    local branch="feature/${feature}"
    if git branch --merged main 2>/dev/null | grep -q "$branch"; then
        git branch -d "$branch" 2>/dev/null && echo "Branch '$branch' deleted (was merged)"
    else
        echo "  Branch '$branch' kept (not yet merged into main)"
        echo "  Force delete with: git branch -D $branch"
    fi

    git worktree prune
    echo "Worktree removed"
}

# Jump to an existing worktree
workcd() {
    local feature="$1"

    if [[ -z "$feature" ]]; then
        echo "Usage: workcd <feature-name>"
        return 1
    fi

    local repo_root=$(git rev-parse --show-toplevel 2>/dev/null)
    if [[ -z "$repo_root" ]]; then
        echo "Error: Not in a git repository"
        return 1
    fi
    local repo_name=$(basename "$repo_root")
    local worktree_path="$(dirname "$repo_root")/${repo_name}-${feature}"

    if [[ ! -d "$worktree_path" ]]; then
        echo "Error: Worktree not found at $worktree_path"
        echo "Create it with: workon $feature"
        return 1
    fi

    cd "$worktree_path"
}
```

### Step 5: Handle IDE_COMMAND Placeholder

Replace `IDE_COMMAND "$worktree_path"` with the actual command from Step 3. If "None", remove that line.

### Step 6: Verify

Tell the user to reload their shell:

```bash
source ~/.zshrc   # or ~/.bashrc
```

Then verify:

```bash
type workon
type workrm
type workls
```

### Step 7: Summary

Print what was installed and quick start guide.
