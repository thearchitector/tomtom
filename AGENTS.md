# AGENTS.md

## Prompting

- The user will use language and key words like ALWAYS, NEVER, SHOULD, alongside their negatives, to indicate the strictness with which to follow instructions. These correspond to RFC-2119 definitions. It is CRITICAL to adhere to these key words, and similar imperative language, when executing a task.
- When the user asks you to implement a plan, ALWAYS implement the task to completion; NEVER ask the user whether or not to proceed.

## Planning

The goal of the plan is to produce a set of discrete tasks, akin to a thouroughly designed technical specification. Your process should be:

1. understand the product requirements; ALWAYS interview the user to clarify current or potential ambiguities.
2. explore the codebase thoroughly, finding existing patterns and similar features to understand the current architecture within the lens of the prompt.
3. design solutions, considering trade-offs and architectural impacts.
4. generate a concrete markdown plan that can be referenced, then archived.

Plans should be grounded in reality, not aspirational; do research now to generate a more detaliled plan, rather than steps to do research in the plan itself. They should NEVER be self-contradictory. If you need to cite something, include either a link to the source (e.g., a URL or file and line number) or a small fence block.

## Development Guidelines

- NEVER update files that include a `pragma: no ai` comment. These are authoritative files and should be used as anchors and sources of truth when making changes. ALWAYS validate changes against these authoritative files, executing tests against them or by extracting relevant code blocks to verify manually.
- Mirror the established architecture, type hints, and docstring style unless explicitly told you may ignore them.
- Update relevant docs or TODO items when behavior shifts or tasks complete.
- ALWAYS add a timeout to commands you run to avoid waiting indefinitely.
- ALWAYS use `uv run` for Python: Use `uv run` when running Python commands. Never run Python directly (e.g., python script.py). Always use `uv run pytest`, `uv run python script.py`, `uv run python -c "..."`, etc. This ensures the correct virtual environment and dependencies are used.
- ALWAYS cover modifications with new or updated unit tests, run `pytest`, and address any failures prior to stopping.
- ALWAYS verify changes with `prek run -a`. Address any failures and warnings prior to stopping.

## Implementation Patterns

### Type Hints

ALWAYS assume you can type according to Python 3.13+ conventions. Use `type Foo = Bar` to create type aliases where necessasry, and import generic structure from `collections.abc`. ALWAYS try to import as few things as possible during runtime, ideally importing specific items when `TYPE_CHECKING` is true. NEVER import the entire `typing` module. ALWAYS import specific items from `typing`. ALWAYS use forward references when using a type that requires type-time importing only. NEVER use forward references for types that must be imported at runtime, or for any builtin types like `float`, `list`, `str`, etc.

ALWAYS follow this general pattern for importing and using types:

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

NEVER follow this pattern in unit tests. When writing unit tests, ALWAYS import types directly and NEVER write `TYPE_CHECKING` blocks.

NEVER use `from __future__ import annotations`.

### Type Usage

ALWAYS ensure that static typing is valid and passes a check with mypy, via `uv run mypy .`. When fixing typing errors, ALWAYS prefer to `cast()` types in instances ONLY where we can make assumptions about the type that the type checker is unaware of. NEVER use `# type: ignore` UNLESS we're circumventing a typing error from an external library.

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

### Prefer to import specific items instead of entire modules

You SHOULD prefer to import specific items instead of entire modules. For example:

**BAD**:

```python
import some_module

some_module.func()
```

**GOOD**:

```python
from some_module import func

func()
```

There are a select few exceptions to this rule, mainly semantic. For example, it would be preferable to `import orjson` and use `orjson.dumps` rather than `from orjson import dumps`, as the "dumps" is fairly nondescript. Similarly, `asyncio.run` instead of `from asyncio import run`. When this distinction is not clear, ALWAYS ask the user for clarification.

### Docstrings

ALWAYS write docstrings for _public-facing_ functions and classes. If a function or class is not intended to be used outside of the module, docstrings are OPTIONAL. Docstrings should be concise, and only include a brief description of what the actual function does. Do not include implementation details, parameter descriptions, or examples in the docstring. ALWAYS place the triple quotes on their own line, EXCEPT for when the docstring can fit within a 85 characters limit. For example:

```python
def fibbonaci(n: int) -> int:
    """Recursively computes the n-th Fibonacci number."""
    pass


# This docstring is too long and will be formatted as a multi-line docstring.
def hello(tomato: list["Any"]) -> str | None:
    """
    This docstring is too long and must be formatted as a multi-line docstring, where the length of each line is
    capped at the maximum allowable by Ruff, and where the triple quotes are on their own lines.
    """
    pass
```

### Unit Testing

Use `pytest` to implement unit tests, keeping tests DRY by using properly scoped fixtures. Split tests into logical groups in different files; NEVER nest tests within classes within a single file. Parameterized tests should always include short case `ids`, and test names themselves should be descriptive but concise. Use `pytest-asyncio` for async tests, and always use `pytest-cov` to validate coverage.
