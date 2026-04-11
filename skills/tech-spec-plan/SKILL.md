---
name: tech-spec-plan
description: Create a technical specification and implementation plan encompassing a series of stages, each with concrete tasks, for human review and agentic implementation. Use this when planning implementations of PRDs, one-off feature request prompts, or iterations from peer reviews.
---

# Technical Specification Plan

Technical specification plans should be a series of milestones, each with concrete tasks. The core requirement of a tech spec plan is that it be SELF-CONTAINED, SELF-SUFFICIENT, JUNIOR-GUIDING, and OUTCOME-FOCUSED. A single stateless agent, or junior human developer, must be able to read your plan from top to bottom and:

1. understand the core design / changes being proposed, and
2. produce a working, observable result.

The agent or human executing your will not know any prior knowledge and cannot infer what you meant from your current context. Repeat any assumption you rely on. Do not point to external blogs or docs; if knowledge is required, embed it in the plan itself in your own words.

## Planning Process

You must follow this process:

1. spawn a subagent to understand the prompt, product requirements, and design directions using the `$grill-me` skill.
2. the draft solution, using all available MCPs to ground analysis, based on the subagent's takeaways.
3. output the specification as a markdown file in subdirectory of `plans/`.

Files that include a `pragma: no ai` comment are authoritative files, and should be used as anchors and sources of truth when designing solutions and creating milestones.

## Milestones

Milestones must form the bulk of your plan, and serve to split the implementation into incremental, additive, and independently verifiable changes. They should include:

- a brief that describes the technical scope of the milestone
- a list of concrete changes and tasks to with specific pseudocode and illustrative small code snippets
- acceptance criteria by which to judge success or failure of the milestone.

It can be a good idea to include explicit prototyping milestones in order to de-risk a larger change. For example, by validating wanted behavior and feasibility through an isolated test script before applying it broadly. For prototype milestones, they should be clearly labeled, describe how observe results, and state how to promote or discard the prototype.

Milestones and their tasks should always be ordered by dependency, with prerequisite ones first.

### No Placeholders

Every task must contain the actual content an engineer needs. These are plan failures - never write them:

- "TBD", "TODO", "implement later", "fill in details"
- "Add appropriate error handling" / "add validation" / "handle edge cases"
- "Write tests for the above" (without actual test code)
- "Similar to Task N" (repeat the code — the engineer may be reading tasks out of order)
- Steps that describe what to do without showing how (code blocks required for code steps)
- References to types, functions, or methods not defined in any task

## Output

Plans must follow this template, be put in `plans/` directory of the active repo, and be named `plan.md`. If there is already a `plan.md` file in the feature directory, the file name should be `plan.N.md`, where `N` is the next increment after the current largest increment. NEVER replace the contents of an existing plan file.

If you need to cite something, include either a link to the source (e.g., a URL or file and line number) or a small fence block. Always use paths relative to the repository being referenced (e.g., `datagraph/datagraph/io.py`, not `../../../datagraph/datagraph/io.py`), and never use absolute paths.
