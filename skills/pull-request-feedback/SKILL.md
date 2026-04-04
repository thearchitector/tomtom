---
name: pull-request-feedback
description: Guidelines for creating new plans based on iterative human-in-the-loop PR reviews. Use this to review PR comments and create iteration plans for incorporating feedback.
---

# Pull Request Reviews

When addressing PR comments, it is CRITICAL that you NEVER automatically implement the changes requested. The purpose of reviewing PR feedback is to create a new iteration of an existing tech spec plan.

You must follow this process _to the letter_:

1. Fetch all unresolved comments made on the requested PR. 
2. Via the GitHub MCP, respond directly to questions about implementation, design choice, or potential ideas. Be concise and clear, linking to external references when useful, and prefix your replies with `:sparkles: ` to identify yourself as an agent.
3. Fetch failed commit check statuses for the last commit.
4. Use the remaining comments, and any applicable PR check failures, to generate a new standalone technical plan that addresses them, via the skill. Do NOT reference specific PRs in the plan; you must resolve direction and embed all relevant context in the plan itself to ensure it remains self-contained.
