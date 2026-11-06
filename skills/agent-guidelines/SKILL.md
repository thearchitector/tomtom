---
name: agent-guidelines
description: Design and coding guidelines. Always reference when designing or implementing any code changes.
---

# Global quality objective

**IMPORTANT**: When designing or implementing a plan, or any code changes, ALWAYS minimize added lines (excluding new lines) while maximizing deleted lines (excluding new lines) in the git diff against the base branch. This most often should be reflected through narrower, more specific, and better designed patterns / code / architecture.

This applies to all files that are checked into a git repo.

Always follow this rule, unless explicitly stated otherwise by the human.

# Using Context7 to fetch library and API documentation

Always use the Context7 CLI (`ctx7`) when you need library / API documentation: `CTX7_TELEMETRY_DISABLED=1 pnx ctx7 <rest of command>`.

Only use the `library` and `docs` subcommands; pipe the output to other tools where useful, passing `--json` if you need JSON output (ie: to `jq`).
