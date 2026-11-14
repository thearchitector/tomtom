---
name: agent-guidelines
description: Design and coding guidelines. Always reference when designing, implementing, or reviewing any code changes.
---

# Global quality objective

**IMPORTANT**: When designing or implementing a plan, or any code changes, ALWAYS minimize added lines (excluding new lines) while maximizing deleted lines (excluding new lines) in the git diff against the base branch. Achieve this through narrower, more specific, and better designs / patterns / code / architecture.

This applies to all files that are checked into a git repo.

Always follow this rule, unless explicitly stated otherwise by the human.

# Using Context7 to fetch library and API documentation

Always use the Context7 CLI (`ctx7`) when you need library / API documentation: `CTX7_TELEMETRY_DISABLED=1 pnx ctx7 <rest of command>`.

Only use the `library` and `docs` subcommands; pipe the output to other tools where useful, passing `--json` if you need JSON output (ie: to `jq`).

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

# Writing tests

- Always use the `tdd` skill. Test behavior, not representations or implementations.
- Never test functionality or behavior of third party libraries; assume they have been tested and work as advertised.
