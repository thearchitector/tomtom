---
name: tech-spec-plan
description: Create a technical specification and implementation plan encompassing a series of stages, each with concrete tasks, for human review and agentic implementation. Use this when planning implementations of PRDs, one-off feature request prompts, or iterations from peer reviews.
---

# Technical Specification Plan

Technical specification plans should be a set of technical invariant and product assumptions, followed by a series of milestones, each with concrete tasks. The core requirement of a tech spec plan is that it be self-contained, self-explanatory, novice-guiding, and outcome-focused. A single stateless agent must be able to read your plan from top to bottom and:

1. understand the core design / changes being proposed, and
2. produce a working, observable result.

The agent executing your will not know any prior knowledge, nor the current context, and cannot infer what you meant. Repeat any assumption you rely on. Do not point to external blogs or docs; if knowledge is required, embed it in the plan itself.

## Planning Process

You must follow this process:

1. Use the `$grill-me` skill to synthesize the prompt into product requirements and a design direction.
2. based on the shared understanding, draft solution milestones, using all available MCPs and skills to ground analysis.
3. output the specification as a markdown file in subdirectory of `plans/`.
4. ask and wait for human approval or feedback, repeating steps 1-4 to revise the in-progress plan until the human approves.
5. once the human approves the plan, write `pragma: no ai` to the top of the plan file. This will mark the plan as complete and immutable.

Files that include a `pragma: no ai` comment are authoritative files, and should be used as anchors and sources of truth when designing solutions and creating milestones.

You must include, before the first milestone, a list of technical invariants and product assumptions based on the initial subagent synthesis.

## Milestones

Milestones must form the bulk of your plan, and serve to split the implementation into incremental, additive, and independently verifiable changes. They should include:

- a description of the milestone's technical scope.
- a list of concrete changes and tasks to with specific pseudocode or small illustrative code snippets.
- acceptance criteria by which to judge success or failure of the milestone.

Never write complete code in the plan. The objective is to communicate, coarsely, the desired structure and direction. The agent or human that implements the plan should still have leeway when it comes to literal implementation, as opposed to copy/pasting the plan's code snippets.

It can be a good idea to include explicit prototyping milestones in order to de-risk a larger change. For example, by validating wanted behavior and feasibility through an isolated test script before applying it broadly. For prototype milestones, they should be clearly labeled, describe how observe results, and state how to promote or discard the prototype.

Milestones and their tasks should always be ordered by dependency, with prerequisite ones first.

### No Placeholders

Every task must contain the actual content the executing agent needs. These are plan failures - never write them:

- "TBD", "TODO", "implement later", "fill in details"
- "Add appropriate error handling" / "add validation" / "handle edge cases"
- "Write tests for the above" (without actual test code)
- "Similar to Task N" (repeat the code — the engineer may be reading tasks out of order)
- Steps that describe what to do without showing how (code blocks required for code steps)
- References to new types, functions, or methods not defined in any task

## Output

Use the $caveman skill in ultra mode to write plans.

Plans must be put in `plans/` directory of the active repo, and be named `plan.md`. If there is already a `plan.md` file in the directory, the file name should be `plan.N.md`, where `N` is the next increment after the current largest increment.

If you need to cite something, include either a link to the source (e.g., a URL or file and line number) or a small fence block. Always use paths relative to the repository being referenced (e.g., `datagraph/datagraph/io.py`, not `../../../datagraph/datagraph/io.py`), and never use absolute paths.
