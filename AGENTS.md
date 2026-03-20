# AGENTS.md

## Planning

Plan should be sets of concrete tasks, akin to a thorough technical specification. Your process must be:

1. interview the user to clarify current or potential ambiguities and understand the product requirements
2. design solutions, considering trade-offs and architectural impacts. Always use the context7 and github MCPs to ground solutions.
3. generate a plan as a markdown file that can be copy/pasted, optimizing for human review.

Tasks and sections of a plan should always be order by dependency; include an order of operations if useful.

If you need to cite something, include either a link to the source (e.g., a URL or file and line number) or a small fence block. Never include absolute file paths. Always use paths relative to the plan document itself.

## Development Guidelines

- Never update files that include a `pragma: no ai` comment. These are authoritative files and should be used as anchors and sources of truth when making changes. Always validate changes against these authoritative files, executing tests against them or by extracting relevant code blocks to verify manually.
- Mirror the established architecture and design patterns.
- Always add a timeout to commands you run to avoid waiting indefinitely.
- Always use `uv run` for Python commands.
- Cover behavioral and functionality changes with new or updated unit tests, and address any failures prior to stopping. Never write meta-tests that validate imports etc., or tests of specific usage patterns rather than code itself, unless explicitly told.
- Before pushing, verify changes with `prek run -a`. Address any failures and warnings prior to finishing.
- Update relevant docs or TODO items when behavior shifts or tasks complete.
- Always follow git best practices and our git workflow:
 
### Git workflow

Always use the github MCP where applicable.

- Always create working branches before making for any code changes.
- Always `git commit` at natural breakpoints, `git push` after finishing work in a specific repo. Always prefer more commits rather than fewer.
- Tests do not have to work between commits, as long as they pass before `git push`.
- Always follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification when writing commit messages. For breaking changes, prefer the `!` type syntax.

## Implementation Patterns

### Type hints

Always assume you can type according to Python 3.13+ conventions (ie. `type Foo = Bar` to create type aliases), and import generic structure from `collections.abc`. Always try to import as few things as possible during runtime, ideally importing specific items when `TYPE_CHECKING` is true, and never rely on `from __future__ import annotations`:

```python
from typing import TYPE_CHECKING

from some_module import SomeClass

if TYPE_CHECKING:
    from collections.abc import Callable
    from typing import Any


# `Callable` and `Any` are only used for typing, so their imports exist only in the TYPE_CHECKING block,
# and they are forward referenced in the function signature.
def foo(bar: "Callable[[Any], Any]") -> None:
    pass


# `list` is a builtin type, so no import is necessary and thus it can be used directly. `Any` is only used
# for typing, so it is forward referenced in the function signature.
def hello(tomato: list["Any"]) -> str | None:
    pass


# `SomeClass` is used during runtime, so it does not need to be forward referenced.
def world() -> SomeClass:
    return SomeClass()
```

When writing unit tests, always import types directly and never write `TYPE_CHECKING` blocks.

### Type usage

When fixing typing errors, use `cast()` in instances where we can make assertions about the type that the type checker is unaware of. Never use `# type: ignore` unless we're circumventing a typing error from an external library; if there is an internal typing failure that requires type ignore, always confirm the specific case with the user.

For example:

**BAD**:

```python
import json


def get_user_email(payload: str) -> str:
    data = json.loads(payload)
    return data["user"]["email"]  # type: ignore[no-return-any]
```

**GOOD**:

```python
import json
from typing import cast


def get_user_email(payload: str) -> str:
    data = json.loads(payload)
    return cast(str, data["user"]["email"])
```

### Docstrings

Write docstrings for functions and classes. If a function or class is not intended to be used outside of the module (ie. a helper), docstrings are suggested when the helper is non-trivial. Docstrings should be concise, and only include a brief description of what the actual function does. Do not include implementation details, parameter descriptions, or examples in the docstring.

Always place the triple quotes on their own line.

### Unit testing

- Use `pytest` to implement unit tests, keeping tests DRY by using properly scoped fixtures.
- Split tests into logical groups in different files; never nest tests within classes within a single file.
- Parameterized tests should always include short case `ids`, and test names themselves should be descriptive but concise.
- Use `pytest-asyncio` for async tests and `pytest-cov` to validate coverage of test cases.
