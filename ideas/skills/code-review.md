# Skill Idea: Code Review

**Goal:** Perform a thorough code review on a PR or set of changes, checking for bugs, security issues, performance problems, and style consistency.
**Trigger Phrases:** "Review this PR", "Code review", "Review my changes"
**Required Tools:** None (uses git diff and file reading)
**Workflow Steps:**
1. Get the diff (from a PR number, branch comparison, or staged changes)
2. Analyze changes for: correctness, security, performance, readability
3. Check for test coverage of changed code
4. Output a structured review with severity levels (critical, warning, suggestion)
5. Suggest specific fixes for any issues found

*Note: When ready to build, run "Use skill-creator to build a skill based on ideas/skills/code-review.md"*
