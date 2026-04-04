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

1. understand the prompt, product requirements, and design directions.
2. draft solutions, using all available MCPs to ground analysis. Prefer to mirror the established architecture and design patterns.
3. formulate any unknowns, ambiguities, or pending design questions from steps 1 & 2. Ask the user to provide concrete answers to them, **and wait for them to reply**. These are assumptions / invariants.
4. using the user's answers, loop through steps 1 - 3 until no more questions remain.
5. output the specification as a markdown file in subdirectory of `plans/`.

Files that include a `pragma: no ai` comment are authoritative files, and should be used as anchors and sources of truth when designing solutions and creating milestones.

## Milestones

Milestones must form the bulk of your plan, and serve to split the implementation into incremental, additive, and independently verifiable changes. They should include:

- a brief that describes the scope of the milestone
- what will exist at the end of the milestone that did not exist before
- a list of concrete changes and tasks to with specific pseudocode and code snippets
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

Plans must follow this template, be put in tomtom's `plans/` directory, and be named `plan.md`. If there is already a `plan.md` file in the feature directory, the file name should be `plan.N.md`, where `N` is the next increment after the current largest increment. NEVER replace the contents of an existing plan file.

If you need to cite something, include either a link to the source (e.g., a URL or file and line number) or a small fence block. Always use paths relative to the repository being referenced (e.g., `datagraph/datagraph/io.py`, not `../../../datagraph/datagraph/io.py`), and never use absolute paths.

The plan name should correspond to a <40 character summary of the milestones.

```markdown
<!-- pragma: no ai -->
# Plan Name

> prompt: the human's prompt, word for word

A short description of the plan outlining major technical objectives addressed by each the milestones below.

## Assumptions / Invariants

- A core technical or product assumption that guided design, specific milestones, and that should guide an agent's implementation.
- Another core technical invariant or product assumption.

## Milestones

### A Goal

A brief about what this milestone enables and achieves.

1. [ ] Task 1, with concrete references, specific code snippets, and/or commands to run.
2. [ ] Task 2, with concrete references, specific code snippets, and/or commands to run.

A list of acceptance criteria, including validating code changes.
```
