# CLAUDE.md Best Practices

> A special markdown file Claude Code reads at the start of every session — its only job is to give Claude context it cannot infer from the code itself.

## Summary

CLAUDE.md turns Claude Code from a generic assistant into a project-aware collaborator. It is loaded into the context window on every session, so every unnecessary line is a tax paid on every conversation. The goal is a file that is small, high-signal, and impossible to live without — not a comprehensive project wiki.

## Key Concepts

- **Instruction budget** — Claude's compliance degrades noticeably past ~150–200 instructions. Treat every line as spending from that budget.
- **Hierarchy** — Three levels of CLAUDE.md, each with a different scope (see Implementation Guide).
- **Necessity test** — For every line, ask: *"Would removing this cause Claude to make a mistake?"* If no, cut it.
- **Skills** — Domain knowledge or workflows that are only occasionally relevant belong in Skills (loaded on demand), not CLAUDE.md (loaded always).
- **Hooks** — Automated, repeatable behaviors ("always run lint before committing") belong in hooks/settings, not CLAUDE.md prose.

## Implementation Guide

### File hierarchy

| Level | Path | Checked into git? | Scope |
|---|---|---|---|
| Global | `~/.claude/CLAUDE.md` | No | All projects; personal preferences |
| Project | `./CLAUDE.md` (repo root) | Yes | Entire repo; shared with team |
| Local | `./.claude/CLAUDE.md` or `CLAUDE.local.md` | No (auto-gitignored) | Project-local personal tweaks |

**Rule of thumb:** if a teammate should follow the same instruction, it goes in Project. If it's your personal workflow preference, it goes in Global or Local. Specific wins over general when the same instruction appears at multiple levels.

### What to include

Use a WHY / WHAT / HOW structure:

1. **WHAT** — One-sentence project purpose + tech stack + key directories. Gives Claude a map.
2. **WHY** — Architecture decisions and non-obvious constraints that explain *why* things are the way they are.
3. **HOW** — Commands Claude needs to run (build, test, lint, dev server), plus project-specific gotchas.

Concrete categories worth including:

- **Essential commands** — test, build, lint, dev server. Claude cannot infer these reliably.
- **Gotchas and warnings** — things that will break silently if Claude doesn't know them (e.g., "never run migrations manually", "env vars must be prefixed with NEXT_PUBLIC_").
- **Custom tool references** — if you have internal CLIs or scripts Claude should use, document them here with basic usage.
- **Task management conventions** — where PRDs live, how to handle task cleanup, etc.

### What NOT to include

- **Code style rules** — delegate to your linter/formatter. These add noise and LLMs are slow at style enforcement.
- **Vague quality instructions** — "write clean code" is not actionable. Omit it or make it specific and checkable.
- **Anything Claude already does correctly** — if Claude gets it right without the instruction, the instruction is pure noise.
- **Information derivable from the code** — imports, file structure, and patterns Claude can read directly.
- **Git history or recent changes** — `git log` is authoritative; don't duplicate it here.
- **Long workflow documentation** — move anything >5 lines into a Skill or a linked file.

### Length targets

| Target | Ceiling |
|---|---|
| Ideal: 60–150 lines | Hard limit: ~300 lines |
| Concise teams: ~100 words | Compliance drops sharply above 200 instructions |

Anthropic's own guidance: keep it "as short as possible." Err toward cutting.

## API / Interface Reference

Claude Code reads these files in this order (all are merged into context):

```
~/.claude/CLAUDE.md          # global
<repo-root>/CLAUDE.md        # project (checked in)
<repo-root>/.claude/CLAUDE.md  # local (gitignored)
<subdirectory>/CLAUDE.md     # directory-scoped (if Claude is invoked there)
```

`/init` generates a starter `./CLAUDE.md` from your project structure. Use it as a starting point, then prune aggressively.

## Gotchas & Edge Cases

- **Skills are not auto-loaded** — if Claude should use a Skill, mention it in CLAUDE.md so it knows to invoke it. But only list Skills that are broadly relevant; niche ones can live in local CLAUDE.md.
- **Global CLAUDE.md is personal** — teammates don't have your `~/.claude/CLAUDE.md`. Don't put team-required instructions there.
- **Mixing scopes pollutes both** — global-level preferences in the project file force every collaborator to carry your personal settings. Keep scopes clean.
- **Vague instructions backfire** — "be concise" means different things to different models/sessions. Write specific, checkable rules instead.
- **CLAUDE.md is not a hook** — prose like "always run tests before committing" is unreliable. Use a pre-commit hook for that instead.
- **Longer ≠ better** — more instructions dilute compliance. A 60-line file that Claude follows 100% beats a 300-line file it follows 60% of the time.

## Code Examples

### Minimal high-signal CLAUDE.md (project level)

```markdown
# My Project

One-sentence description of what this does and who uses it.

## Stack
- Language: TypeScript, Node 22
- Framework: Next.js 15 (App Router)
- DB: PostgreSQL via Prisma
- Package manager: pnpm

## Commands
- Dev: `pnpm dev`
- Test: `pnpm test` (Vitest, no mocks — tests hit a real test DB)
- Lint: `pnpm lint` (ESLint + Prettier — run before every commit)
- Build: `pnpm build`

## Structure
- `src/app/` — Next.js routes and pages
- `src/lib/` — shared utilities and DB client
- `prisma/` — schema and migrations

## Gotchas
- Never run `prisma migrate deploy` manually in dev — use `pnpm db:migrate`
- All env vars must be in `.env.local`; `.env` is for CI only
- The `src/lib/auth.ts` singleton must not be imported in edge runtimes

## Task management
- PRDs and task files live in `tasks/`
- Delete task files after features are merged
```

### What a bloated CLAUDE.md looks like (anti-pattern)

```markdown
## Code Style
- Use meaningful variable names
- Write clean, well-documented code
- Follow SOLID principles
- Prefer composition over inheritance
- Write self-documenting code
- Add comments for complex logic
```

None of these are checkable, none prevent a specific mistake, and all are noise.

## References

- [Official: Using CLAUDE.MD files](https://claude.com/blog/using-claude-md-files)
- [Official: Claude Code Best Practices](https://code.claude.com/docs/en/best-practices)
- [HumanLayer: Writing a good CLAUDE.md](https://www.humanlayer.dev/blog/writing-a-good-claude-md)
- [Builder.io: How to Write a Good CLAUDE.md File](https://www.builder.io/blog/claude-md-guide)
- [claudecodetutorials.com: Understanding the CLAUDE.md Hierarchy](https://www.claudecodetutorials.com/learn/posts/understanding-the-claude-md-hierarchy-user-project-and-directory-scopes-explained)
