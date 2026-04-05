---
name: prd
description: "Generate a Product Requirements Document (PRD) for a new feature or project. Use when planning a feature, starting a new project, scoping work, or when asked to create a PRD. Triggers on: create a prd, write prd for, plan this feature, requirements for, spec out, scope this, define requirements, feature spec."
---

# PRD Generator

Create detailed Product Requirements Documents that are clear, actionable, and suitable for implementation by developers or AI agents working in parallel.

---

## The Job

1. Read the project's `CLAUDE.md` to understand the tech stack, project structure, architecture, and conventions
2. Receive a feature description from the user
3. Ask 3-5 essential clarifying questions (with lettered options for quick answers)
4. Generate a structured PRD based on answers and project context
5. Save to `tasks/prd-[feature-name].md`

**Important:** Do NOT start implementing. The PRD is the deliverable.

---

## Before You Start

Read the project's `CLAUDE.md` file to gather:

- **Tech stack** — language, framework, database, package manager
- **Project structure** — source, test, and config directories
- **Architecture decisions** — patterns, conventions, key design choices
- **Build/test/lint commands** — so requirements can reference how to verify

If the project has architecture docs, design docs, or ADRs referenced in CLAUDE.md, read those too. This context shapes every section of the PRD — from technical considerations to file change predictions.

---

## Step 1: Clarifying Questions

Ask only critical questions where the initial prompt is ambiguous. Tailor the options to the project's domain based on what you learned from CLAUDE.md.

Focus on:

- **Problem/Goal:** What problem does this solve?
- **Core Functionality:** What are the key actions?
- **Scope/Boundaries:** What should it NOT do?
- **Success Criteria:** How do we know it's done?

### Format Questions Like This:

```
1. What is the primary goal of this feature?
   A. New user-facing functionality
   B. System improvement (performance, reliability, architecture)
   C. Developer experience enhancement (tooling, testing, CI)
   D. Other: [please specify]

2. What is the scope?
   A. Minimal viable version (smallest useful slice)
   B. Full-featured implementation
   C. Refactoring / reworking existing code
   D. New system from scratch

3. Who is the primary audience?
   A. End users
   B. Internal team / developers
   C. API consumers / integrators
   D. Other: [please specify]
```

This lets users respond with "1A, 2B, 3A" for quick iteration. Adapt the options to the project — if CLAUDE.md reveals this is a CLI tool, offer CLI-relevant choices; if it's a web app, offer UI/API choices, etc.

---

## Step 2: PRD Structure

Generate the PRD with these sections:

### 1. Introduction / Overview

Brief description of the feature and the problem it solves. One or two paragraphs max.

### 2. Goals

Specific, measurable objectives (bullet list). Each goal should be verifiable — "improve performance" is vague, "reduce API response time below 200ms for the /search endpoint" is concrete.

### 3. User Stories

Each story needs:

- **Title:** Short descriptive name
- **Description:** "As a [user], I want [feature] so that [benefit]"
- **Acceptance Criteria:** Verifiable checklist of what "done" means

Each story should be small enough to implement in one focused session.

**Format:**

```markdown
### US-001: [Title]

**Description:** As a [user], I want [feature] so that [benefit].

**Acceptance Criteria:**

- [ ] Specific verifiable criterion
- [ ] Another criterion
- [ ] All tests pass
- [ ] Meets project lint/style requirements
```

**Key principles:**

- Acceptance criteria must be verifiable, not vague. "Works correctly" is bad. "Returns a 404 response with JSON error body when the resource doesn't exist" is good.
- Include criteria for how to verify — "Run `[TEST_COMMAND]` and confirm X" or "Start dev server and verify Y in the UI."

### 4. Functional Requirements

Numbered list of specific functionalities:

- "FR-1: The system must..."
- "FR-2: When a user submits the form, it must..."

Be explicit and unambiguous. Each requirement should be independently testable.

### 5. Non-Goals (Out of Scope)

What this feature will NOT include. This section is critical for managing scope and preventing creep. Be specific — "not building an admin dashboard for this" is better than "keeping scope small."

### 6. Design Considerations (Optional)

- How this interacts with existing features or systems
- UX/UI implications
- Data model changes
- Reference relevant design docs or ADRs from the project

### 7. Technical Considerations (Optional)

Based on the project's tech stack and architecture (from CLAUDE.md), note:

- New components, modules, or packages needed
- Database migrations or schema changes
- API endpoint additions or modifications
- Third-party dependencies to add
- Configuration or environment variable changes
- Performance implications (caching, indexing, query optimization)
- Impact on existing system architecture (new integration points, execution order changes)

### 8. Files Likely to Change

List the files that will probably need modification, organized by category. Use the project structure from CLAUDE.md to predict paths:

```
Source:
- [SOURCE_DIR]/path/to/new-or-modified-file

Tests:
- [TEST_DIR]/path/to/test-file

Config:
- [CONFIG_DIR]/path/to/config-change (if applicable)
```

### 9. Open Questions

Remaining questions or areas needing clarification before implementation begins.

---

## Writing for Implementation

The PRD reader may be a developer in a parallel worktree or an AI agent picking up work. Write accordingly:

- Be explicit and unambiguous — assume the reader has no context beyond CLAUDE.md and this PRD
- Reference specific files and components by name where possible
- Reference project docs for deeper context (architecture docs, design docs, ADRs)
- Number requirements so they can be referenced in commits and PRs ("implements FR-3")
- Include specific values, thresholds, and constraints rather than hand-waving

---

## Output

- **Format:** Markdown (`.md`)
- **Location:** `tasks/`
- **Filename:** `prd-[feature-name].md` (kebab-case)

---

## Checklist

Before saving the PRD:

- [ ] Read CLAUDE.md for project context
- [ ] Asked clarifying questions with lettered options
- [ ] Incorporated user's answers
- [ ] User stories are small and specific
- [ ] Acceptance criteria are verifiable (not vague)
- [ ] Functional requirements are numbered and unambiguous
- [ ] Non-goals section defines clear boundaries
- [ ] Technical considerations reflect the project's actual tech stack
- [ ] Listed files likely to change using real project paths
- [ ] Saved to `tasks/prd-[feature-name].md`
