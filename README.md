# tomtom

An atlas of guidelines and skills for agentic development, distributed as a [Pi package](https://pi.dev/docs/latest/packages).

Install globally:

```bash
pi install git:github.com/thearchitector/tomtom
# to update
pi update git:github.com/thearchitector/tomtom
```

## Code review

- `/review main` checks changes since the merge base with `main` against repo standards and the originating spec.
- `/review deep` runs a deeper, evidence-based review. Add a scope, for example `/review deep whole repository`.

Both review workflows are vendored through Vercel Skills in `.agents/skills/` like the other skills. Pi skips them during skill discovery via `.agents/skills/.ignore`, so they're available through `/review` but not as `/skill:` commands.

## Vendored third party skills

TomTom vendors generally useful skills from third parties using Vercel's skills package. To add another, run:

```bash
DO_NOT_TRACK=1 pnx skills@latest add <ref>
```

All the vendored skills can be identified via the [`skills-lock.json`](./skills-lock.json)
