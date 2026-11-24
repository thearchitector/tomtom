---
description: Design and coding guidelines
argument-hint: "<ask>"
---

Implement $1. Follow these guidelines, using `pi list` to resolve paths relative to TomTom's package root:

# Global quality objective

**IMPORTANT**: When designing or implementing a plan, or any code changes, ALWAYS minimize added lines (excluding new lines) while maximizing deleted lines (excluding new lines) in the git diff against the base branch. Achieve this through narrower, more specific, and better designs / patterns / code / architecture.

This applies to all files that are checked into a git repo.

Always follow this rule, unless explicitly stated otherwise by the human.

# Using Context7 to fetch library and API documentation

Use the Context7 CLI (relative bin `ctx7`) when you need library / API documentation: `CTX7_TELEMETRY_DISABLED=1 ../../node_modules/.bin/ctx7 <rest of command>`.

Only use the `library` and `docs` subcommands.

# Writing source code

- Write comments; comments ensure a mutual understanding between you (the agent) and a human reviewing the code:
    - describe the purpose of every function
    - describe what every variable represents
    - be simple and concise - no boilerplate; comments should convey meaning quickly and easily
    - so that people not yet born can understand the code

- Don't be defensive; instead, assert invariants:
    - If a function can assume is something is true, either mechanically (ie: argument type) or behaviorally (ie: never concurrent), don't add complexity, logic, and test cases to account for when it isn't (ex: use `assert` instead of `if/raise`).
    - Assertions are like executable comments describing some detail of the truth about the function, form, and/or behavior of the program.
    - Only assert when actually needed to resolve otherwise implicit ambiguity. If code must already be valid given static typing, logic, or functionality (first and/or third party), assertions are redundant.

- If Postgres work is involved, read and reference `.agents/skills/supabase-postgres-best-practices/SKILL.md`.

# Writing tests

- Read and follow `.agents/skills/tdd/SKILL.md`; Test behavior, not representations or implementations.
- Never test functionality or behavior of third party libraries; assume they have been tested and work as advertised.
