---
name: para-audit
description: >
  Audit the Obsidian vault's PARA structure and suggest reorganization moves — filing misplaced notes,
  archiving stale content, merging duplicates, triaging inbox, and flattening over-nested folders.
  Use this skill whenever the user says "clean up", "tidy", "audit", "reorganize", "review structure",
  "what's out of place", "vault hygiene", "PARA check", or asks about whether their notes are in the
  right place. Also use it when the user mentions feeling lost in their vault, can't find things, or
  says the vault feels messy. Even if they don't mention PARA by name — if they're asking about note
  organization in this vault, this is the skill to use.
---

# PARA Vault Audit

You are auditing an Obsidian vault that follows the PARA method (Projects, Areas, Resources, Archive) with an Inbox prefix. Your job is to scan the vault, identify organizational issues, and suggest specific moves the user can approve or reject.

## How PARA works (so you can judge correctly)

PARA sorts notes by **actionability**, not topic:

- **Projects** (`01 Projects/`) — time-bound work with a specific goal. Has a deadline or clear "done" state. "Build outreach engine V1" is a project. "Marketing" is not.
- **Areas** (`02 Areas/`) — ongoing responsibilities with a standard to maintain, no end date. "Tech skills", "Health", "Revenue strategy".
- **Resources** (`03 Resources/`) — reference material on topics of interest. Not tied to active work. Useful someday. Research docs, how-to guides, comparison tables.
- **Archive** (`04 Archive/`) — anything from the above three that's no longer active. Completed projects, outdated resources, retired areas.
- **Inbox** (`00 Inbox/`) — unprocessed captures. Items here haven't been classified yet.

The key question for every note: **"What am I actively doing with this?"** — not "What is this about?"

Notes flow along an actionability spectrum over time: Projects → Areas → Resources → Archive. A project finishes and gets archived. A resource becomes relevant to a new project and might get linked from there.

## The audit process

### Step 1: Scan the vault

Read the filesystem to understand the current structure. For each PARA folder:
- List all files and subfolders
- Note file counts per folder/subfolder
- Read file contents (at least the first 50-100 lines) to understand what each note is about

Also check:
- `Board - Kanban.md` for active tasks and their linked projects
- `Project Overview.md` for the user's stated goals
- Git log (last 30 days) to see what's been recently changed vs untouched

### Step 2: Apply the checks

Run through each of these checks. Only report issues you actually find — don't pad the report with "everything looks fine" for checks that pass.

**Inbox health:**
- Items older than 7 days that haven't been triaged
- More than 10 items sitting in Inbox
- Notes that have grown into something substantial but still live in Inbox

**Misplaced notes:**
- Resource notes that contain task checkboxes or next actions (should probably be in Projects)
- Area notes that have a deadline or "finish by" language (should probably be Projects)
- Project notes where all tasks are done (should be archived)
- Notes in any folder that would make more sense elsewhere based on their content

**Stale content:**
- Project notes unchanged for >30 days — are they still active?
- Resource notes that no active project or area links to (orphaned)
- Notes whose content has been superseded by newer notes on the same topic

**Structural issues:**
- Any folder with >12 files at the top level (getting hard to scan)
- Subfolders more than 2 levels deep (notes go to die in deep nesting)
- Two or more notes covering substantially the same topic (candidates for merging)

**Missing structure:**
- Active projects with no clear goal/objective stated
- The Kanban board referencing notes that don't exist or have been moved
- Broken `[[wikilinks]]` pointing to deleted or renamed notes

### Step 3: Present findings as an actionable report

Structure your output like this:

```
## Vault Audit — [date]

### Summary
[2-3 sentence overview: how healthy is the vault? What's the biggest issue?]

### Suggested Moves
[Each suggestion is a specific, concrete action the user can approve or reject]

1. **[Action verb]: [what]** → [where]
   _Why:_ [brief reasoning]

2. ...

### Questions
[If you're unsure about something — e.g., whether a project is still active, 
or whether two similar notes should be merged — ask here instead of guessing]
```

## Important guidelines

- **Suggest, don't act.** Present moves for the user to approve. Don't move, rename, or delete anything without explicit confirmation.
- **Ask when unsure.** This is the user's first time with PARA. If something is ambiguous — like whether a note is a project or an area — ask them. Frame it as a quick clarifying question, not a lecture.
- **Be concise.** The report should be scannable in under 2 minutes. No walls of text. Use bullet points.
- **Prioritize.** Lead with the highest-impact suggestions. If there are 15 small issues, group them and highlight the top 3-5.
- **Respect the user's system.** They have a working setup with a Kanban board, weekly reviews, and Excalidraw diagrams. The goal is to tighten the existing structure, not redesign it.
- **Don't reorganize Resources subfolders unnecessarily.** If `03 Resources/` has clear topic groupings (Outreach Engine, Research, Strategy, Weekly Reviews), that's fine. Only flag it if the groupings are confusing or if files are landing in the wrong subfolder.
- **Root-level files are OK.** `Board - Kanban.md` and `Project Overview.md` live at the vault root by design. Don't suggest moving them.
- **Check the Kanban board.** Tasks in "Done" that link to projects tell you what's been completed. Tasks in "Backlog" or "This Week" tell you what's active. Use this to judge whether projects are stale.
