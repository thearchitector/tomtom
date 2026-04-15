---
name: agentic-development
description: Implementation guidelines, coding practices, development processes, and git workflows. Use when making any and all code changes.
---

# Agentic Development

1. Implement changes for only the next milestone, following the workflow and language-specific guidelines.
2. After finishing a milestone and **before** committing, spawn a subagent using [this prompt](assets/request-code-review.txt) (replace word-for-word the `ASSUMPTIONS_INVARIANTS` and `MILESTONE_AND_ACCEPTANCE_CRITERIA` placeholders with their snippets from the tech spec plan). Address any feedback it provides.
3. Always `git commit` between milestones. Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification when writing commit messages. For breaking changes, use the `!` type syntax.
4. Repeat steps 1-3 until all milestones are complete.
5. Always `git push` before finishing.
6. If a draft PR does not already exist, create one with a title based on the plan name also following the conventional commits spec.

## Workflow guidelines

- Always validate changes against `pragma: no ai` files, executing tests against them or by extracting relevant code blocks to verify manually. Never update them.
- Always add a timeout to commands you run to avoid waiting indefinitely.
- Always cover behavioral and functionality changes with new and/or updated unit tests, and address any failures prior to stopping.

## Language-specific implementation guidelines

When making changes to Python code, follow our [Python development guidelines](references/python.md).
