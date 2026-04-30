# Python guidelines

Initially:

1. always make sure the repo's `pyproject.toml` supersets the same configurations listed in [the project template](assets/pyproject.toml).
2. always make sure the repo's prek config superses the same one [here](assets/.pre-commit-config.yaml).

Then:

- Always validate tests by running `uv run pytest`
- Always lint changes with `uv run prek run -a`.  Address any failures and warnings prior to finishing.

## Unit testing

- Use `pytest` to implement unit tests, keeping tests DRY by using properly scoped fixtures.
- Use `pytest-asyncio` for async tests and `pytest-cov` + `pytest-crap` to validate coverage of test cases.
- Split tests into logical groups in different files; never nest tests within classes within a single file.
- Place fixtures in the files they're used. If a fixture can be used by multiple test file in the same directory, place it a `conftest.py` file. If it can be used by multiple directories, place it in a grandparent `conftest.py` file. Continue upwards, placing fixtures in the main `conftest.py` file only as a last resort.
- Parameterized tests should always include short case `ids`, and test names themselves should be descriptive but concise and only use `[A-Za-z0-9-]`.

## Implementation patterns

### Type casting

When fixing typing errors, use `cast()` in instances where we can make assertions about the type that the type checker is unaware of. Never use `assert` to narrow typing, nor `# type: ignore` unless we're circumventing a typing error from an external library; if there is an internal typing failure that requires type ignore, always confirm the specific case with the user.

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
