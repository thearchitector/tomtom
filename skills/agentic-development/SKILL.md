---
name: agentic-development
description: Implementation guidelines, coding practices, development processes, and git workflows. Use when making any and all code changes. Do NOT use this if you're simply referencing code or are generating snippets within plans.
---

# Agentic Development

## Plan-driven Development

Follow these steps when implementing a tech spec plan:

1. Implement changes for only the next milestone, following the workflow and language-specific guidelines.
2. After finishing a milestone and **before** committing, tell a subagent to review the changes via the $caveman-review skill. Address any feedback it provides.
3. Always `git commit` between milestones. Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification when writing commit messages. For breaking changes, use the `!` type syntax.
4. Stop the subagent, and repeat steps 1-4 until all milestones are complete.
5. Spawn a new subagent to do a final review of all code changed over every milestone, and address any of its feedback.
5. Always `git push` before finishing.
6. If a draft PR does not already exist, create one with a title based on the plan name, also following the conventional commits spec.

## Workflow guidelines

- Always validate changes against `pragma: no ai` files, executing tests against them or by extracting relevant code blocks to verify manually. Never update them.
- Always add a timeout to commands you run to avoid waiting indefinitely.
- Always cover behavioral and functionality changes with new and/or updated unit tests, and address any failures prior to stopping.
- When making changes to Python code, follow these [Python development guidelines](references/python.md).
