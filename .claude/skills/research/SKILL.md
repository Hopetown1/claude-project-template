---
name: research
description: >
  Deep-research a topic using Perplexity MCP (or WebSearch as fallback) and produce a
  self-contained reference document in docs/research/<slug>.md that gives a future agent
  or developer everything they need to implement without doing their own research.
  ALWAYS use this skill when the user says "research X", "look up X", "investigate X",
  "find out about X", "deep dive into X", "what do you know about X for implementation",
  or any time they want background knowledge captured as a persistent file rather than
  just answered in chat. Trigger even if the user doesn't say "research" explicitly —
  if they want durable findings written down so they can /clear and continue, use this skill.
---

# Research Skill

Your job is to research a topic thoroughly and distill the findings into a compact, self-contained
reference document. The document's only reader is **a future agent (or developer) who has zero
prior context** — someone who needs to implement something and must understand the topic without
doing additional research. Write for that reader.

## Step 1 — Understand the topic

Parse the user's request. Identify:
- The core topic or technology
- The angle they care about (e.g., "how to integrate X", "best practices for Y", "compare X vs Y")
- Any specific aspects they called out

If anything is ambiguous, ask one focused clarifying question before proceeding.

## Step 2 — Research with Perplexity (preferred) or WebSearch

**If `mcp__perplexity-ask__perplexity_ask` is available**, use it for deep research.
Make 2–4 targeted queries covering:
- Core concepts and official docs
- Practical implementation patterns
- Known gotchas, edge cases, and common pitfalls
- Code examples or API references

**If Perplexity is not available**, use the `WebSearch` tool with the same 2–4 targeted queries.
The output will be slightly shallower but the same document structure applies.

Research aggressively — pull enough information that no follow-up searches are needed. The goal
is a document that makes future research unnecessary.

## Step 3 — Synthesize, don't transcribe

You are not a copy-paste tool. After collecting raw findings:

- **Eliminate redundancy.** If three sources say the same thing, say it once.
- **Prioritize actionability.** What does someone need to *do* or *know* to use this? That goes first.
- **Cut the fluff.** No marketing copy, no "X is a powerful tool for..." openers. Start with facts.
- **Keep code minimal but complete.** One good working example beats five partial ones.

## Step 4 — Write the reference document

Save to `docs/research/<topic-slug>.md` where `<topic-slug>` is a lowercase kebab-case filename
derived from the topic (e.g., "stripe-webhooks", "react-server-components", "postgres-full-text-search").

Use this exact structure:

```markdown
# <Topic Name>

> <One sentence: what this is and the single most important thing to know about it.>

## Summary
2–3 sentences. What it is, why it matters, and what problem it solves. No fluff.

## Key Concepts
Bullet list of must-know terms, ideas, or mental models. Each bullet: term in **bold** followed by
a tight definition. Skip anything obvious to a developer. Include anything that has a non-obvious
meaning in this domain.

## Implementation Guide
Step-by-step: how to actually set this up or use it. Be prescriptive. Include:
- Prerequisites / setup
- The minimal path to a working integration
- Configuration decisions that matter and why

## API / Interface Reference
Key methods, endpoints, config options, or schemas. Format as a compact table or code block.
Only include what someone would actually look up — not the full API surface.

## Gotchas & Edge Cases
Bullet list of things that will bite you if you don't know them. Rate-limits, auth quirks,
version incompatibilities, common misconfigurations. If there are no real gotchas, omit this section.

## Code Examples
1–3 minimal but complete code snippets. Each must:
- Actually run (no pseudo-code unless clearly labeled)
- Show the most common use case
- Include language identifier in the fenced code block

## References
Links to official docs, authoritative sources. 3–5 max. No tutorial blogs — primary sources only.
```

## Step 5 — Tell the user

After writing the file, output this message (adapt as appropriate):

```
Research saved to `docs/research/<filename>.md`

The document is structured for a fresh agent — it has everything needed to implement
without additional research. You can:
- `/clear` this context and start a new session, referencing the file with @docs/research/<filename>.md
- Or continue here if you want to act on the findings now
```

## Quality bar

Before saving, ask yourself: if I handed this document to an agent with no other context,
could it implement a basic integration without Googling anything? If no, add what's missing.
A good research doc is 200–600 lines. Less means you cut too much; more means you didn't synthesize.
