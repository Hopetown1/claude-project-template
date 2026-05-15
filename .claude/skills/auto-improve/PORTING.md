# Porting auto-improve to a real project

When you're ready to run this against your real Next.js project (likely on a different laptop / Claude account):

## 1. Copy the skill files

From this template repo, copy `.claude/skills/auto-improve/` to the real project's `.claude/skills/auto-improve/`. Including the `samples/`, `prompts/`, `schemas/`, `scripts/`, and all four sub-skill directories.

## 2. Add the gitignore entries

In the real project's `.gitignore`, add:

```
auto-improve.config.yaml
backlog.yaml
STOP
docs/runs/
```

## 3. Install devDependencies

Run, in the project root:

```bash
npm install --save-dev ajv ajv-formats js-yaml playwright @lhci/cli @axe-core/playwright pixelmatch pngjs
npx playwright install chromium
```

## 4. Author your real BRAND.md

At the project root. Follow the structure in `.claude/skills/auto-improve/samples/` (look at the sample-site BRAND.md for reference). Be specific.

## 5. Drop in the Claude Design handoff bundle

At the project root: `handoff-bundle/`.

## 6. Author auto-improve.config.yaml

Copy `.claude/skills/auto-improve/samples/auto-improve.config.example.yaml` to the project root and edit. Crucially, update `project:`:

- `dev_server`: how the project's dev server starts (e.g., `npm run dev`)
- `dev_url`: usually `http://localhost:3000`
- `build_command`, `lint_command`, `test_command`, `typescript_command`: per the project's package.json scripts.

Start with a SHORT wall_clock_hours (say, 1) for the first run. You can extend later.

## 7. Author backlog.yaml

Copy `.claude/skills/auto-improve/samples/backlog.example.yaml` and edit. For your first run, ONE scope is recommended. Pick something low-risk — not your hero or homepage — so failures don't damage anything important.

## 8. Run pre-flight

```bash
node .claude/skills/auto-improve/scripts/validate-config.mjs auto-improve.config.yaml
node .claude/skills/auto-improve/scripts/validate-backlog.mjs backlog.yaml
```

Both must pass.

## 9. First run

Tell the Claude session: "Run the auto-improve loop for 1 hour against this site." It should invoke `auto-improve:running-the-loop`, ask you to confirm the cost, and proceed.

## 10. Watch the first 15 minutes

Real-project runs surface real-project bugs that the toy site couldn't:
- Gate scripts assuming wrong paths
- Dev server failing to start under the orchestrator's `spawn`
- Visual-regression flakiness from real fonts and animations
- Critic prompts choking on production-scale diffs

Be ready to `touch STOP`, fix the issue, and re-run.

## 11. After the run

Inspect `docs/runs/<run-id>/log.md`. If you like what you see:

```bash
git checkout main
git merge --ff-only auto-improve/<run-id>/trunk
```

If you don't:

```bash
git checkout main
git for-each-ref --format='%(refname:short)' "refs/heads/auto-improve/<run-id>/*" \
  | xargs -r git branch -D
```

## Known shake-out items

- **Visual regression noise.** Tune the threshold in `gates/visual-regression.mjs` if real-project fonts and animations push false positives.
- **Critic verbosity on big diffs.** A real production page has more code than the sample. Critics may slow down or run out of context. Watch for it.
- **Dev server lifecycle.** Some projects have slow start times. Increase the `waitFor` timeout in `screenshot.mjs` and gate scripts if needed.
- **TypeScript path aliases.** If the real project uses path aliases that the sample didn't, gate scripts that hard-code paths may need updating.
