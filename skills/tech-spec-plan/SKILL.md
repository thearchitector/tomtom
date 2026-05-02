---
name: tech-spec-plan
description: Create a technical specification and implementation plan encompassing a series of stages, each with concrete tasks, for human review and agentic implementation. Use this when planning implementations of PRDs, one-off feature request prompts, or iterations from peer reviews.
---

# Technical Specification Plan

Technical specification plans should be a technical contract: a set of technical invariant and product assumptions, followed by a series of milestones, each with concrete tasks. The core requirement of a tech spec plan is that it be self-contained, self-explanatory, novice-guiding, and outcome-focused. A single stateless agent must be able to read your plan from top to bottom and:

1. understand the core design / changes being proposed, and
2. produce a working, observable result.

The agent executing your will not know any prior knowledge, nor the current context, and cannot infer what you meant. Repeat any assumption you rely on. Do not point to external blogs or docs; if knowledge is required, embed it in the plan itself.

## Planning Process

You must follow this process:

1. Use `$grill-me` interactively with the human before drafting. Ask one question at a time, provide a recommended answer, and wait for each response. Do not continue until the human has answered or explicitly told you to proceed.
2. based on the final shared understanding, draft solution milestones, using all available MCPs and skills to ground analysis.
3. output the specification as a markdown file in subdirectory of `plans/`.
4. ask and wait for human approval or feedback, repeating steps 1-4 to revise the in-progress plan until the human approves.
5. once the human approves the plan, write `pragma: no ai` to the top of the plan file. This will mark the plan as complete and immutable.

Files that include a `pragma: no ai` comment are authoritative files, and should be used as anchors and sources of truth when designing solutions and creating milestones.

You must include, before the first milestone, a list of technical invariants and product assumptions based on the initial subagent synthesis.

### Mandatory Grill Gate

Before writing any plan file, you MUST run an interactive `$grill-me` phase with the human.

Rules:
- Ask exactly one question per assistant turn.
- Include a recommended answer for each question.
- Wait for the human’s answer before asking the next question or drafting the plan.
- Do not treat codebase exploration as a substitute for product/design questions.
- Codebase exploration may answer only factual repo questions, such as current file layout, existing APIs, dependencies, and tests.
- Continue grilling until either:
  - all blocking product/design decisions are resolved, or
  - the human explicitly says "draft the plan", "stop grilling", "use your judgment", or equivalent.
- Only after that shared understanding exists may you create or update `plans/plan*.md`.

## Milestones

Milestones must form the bulk of your plan, and serve to split the implementation into incremental, additive, and independently verifiable changes. They should include:

- a description of the milestone's technical scope.
- a list of concrete tasks
- acceptance criteria by which to judge success or failure of the milestone.

Never write complete code in the plan. The objective is to communicate, coarsely, the desired structure and direction. The agent or human that implements the plan should still have leeway when it comes to literal implementation, as opposed to copy/pasting the plan's code snippets.

It can be a good idea to include explicit prototyping milestones in order to de-risk a larger change. For example, by validating wanted behavior and feasibility through an isolated test script before applying it broadly. For prototype milestones, they should be clearly labeled, describe how observe results, and state how to promote or discard the prototype.

Milestones and their tasks should always be ordered by dependency, with prerequisite ones first.

### Implementation-Detail Guard

Plans are technical contracts, not partial implementations. Prefer observable behavior, public interfaces, data shapes, invariants, and acceptance criteria over specific function bodies.

Allowed code fences:

- package/workspace/config snippets needed to establish build shape
- public API signatures or CLI/API examples
- JSON/schema/fixture contracts
- short usage examples for docs
- exact generated artifacts when the artifact itself is the contract

Avoid code fences for:

- private helper implementations
- parsing algorithms
- language binding internals
- error-conversion plumbing
- test harness boilerplate
- speculative implementation sketches

When implementation detail is needed, write `Required behavior:` bullets instead of code. Each bullet must be concrete and observable. The implementing agent may choose function names, helper boundaries, and library-specific APIs unless the name or shape is part of the public contract.

A plan is overfit failure if changing a private helper name or replacing an algorithm with an equivalent implementation would appear to violate the plan. Revise those sections into behavioral requirements.

### No Placeholders

Every task must contain the actual content the executing agent needs. These are plan failures - never write them:

- "TBD", "TODO", "implement later", "fill in details"
- "Add appropriate error handling" / "add validation" / "handle edge cases"
- "Write tests for the above" (without enumerated concrete test cases)
- "Similar to Task N" (repeat — the engineer may be reading tasks out of order)
- References to new types, functions, or methods not defined in any task

## Output

Use the $caveman skill in ultra mode to write plans.

Plans must be put in `plans/` directory of the active repo, and be named `plan.md`. If there is already a `plan.md` file in the directory, the file name should be `plan.N.md`, where `N` is the next increment after the current largest increment.

If you need to cite something, include either a link to the source (e.g., a URL or file and line number) or a small fence block. Always use paths relative to the repository being referenced (e.g., `datagraph/datagraph/io.py`, not `../../../datagraph/datagraph/io.py`), and never use absolute paths.
