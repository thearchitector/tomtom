---
name: pull-request-feedback
description: Guidelines for creating new plans based on iterative human-in-the-loop PR reviews. Use this to review PR comments and create iteration plans for incorporating feedback.
---

# Pull Request Reviews

When addressing PR comments, it is CRITICAL that you NEVER automatically implement the changes requested. The purpose of reviewing PR feedback is to prompt a subagent to create a new iteration of an existing tech spec plan.

You must follow this process _to the letter_:

1. Fetch all unresolved comments made on the requested PR. For unresolved comments made by other users, keep ONLY the ones where `@clanker` is mentioned. Keep all unresolved comments made by the currently authenticated user or Cursor.
2. Reply directly to questions about implementation, design choice, or potential ideas. Be concise and clear, including tiny illustrative snippets or linking to external references when useful. Prefix your replies with `:sparkles: ` to identify yourself as an agent.
3. Fetch failed commit check statuses and logs for the last commit.
4. Use a subagent, providing ONLY the remaining comments and any applicable PR check failures, to generate a new standalone technical plan that addresses them via the $tech-spec-plan skill. The subagent must NOT reference specific PRs in the plan; it must resolve direction and embed all relevant context in the plan itself to ensure it remains self-contained.
5. Check the generated plan againt the kept unresolved comments to ensure all feedback has been addressed. If any feedback has not been addressed, tell the subagent to revise the plan iteration to include them.
6. Repeat steps 4-6 until all all feedback is addressed by the plan iteration.
