#!/usr/bin/env bash
# Sets up a new auto-improve run.
# Usage: setup-run.sh
# Prints the run-id on stdout. Side effects:
#   - Cuts auto-improve/<run-id> from main
#   - Creates docs/runs/<run-id>/{log.md,rejected_proposals/}
#   - Pre-condition: working tree must be clean

set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

if ! git diff-index --quiet HEAD --; then
  echo "ERROR: working tree is not clean. Commit or stash first." >&2
  exit 1
fi

if ! git rev-parse --verify --quiet main >/dev/null; then
  echo "ERROR: no 'main' branch found." >&2
  exit 1
fi

scripts_dir="$(cd "$(dirname "$0")" && pwd)"
run_id="$("$scripts_dir/compute-run-id.sh")"
trunk="auto-improve/${run_id}"

git checkout main >/dev/null 2>&1
git checkout -b "$trunk" >/dev/null 2>&1

mkdir -p "docs/runs/${run_id}/rejected_proposals"
cat > "docs/runs/${run_id}/log.md" <<EOF
# Auto-improve run ${run_id}

Started: $(date '+%Y-%m-%d %H:%M:%S')
Trunk: ${trunk}

---
EOF

echo "$run_id"
