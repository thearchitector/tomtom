# tomtom

An atlas of guidelines and skills for agentic development, distributed as a [Pi package](https://pi.dev/docs/latest/packages).

Install globally:

```bash
pi install git:github.com/thearchitector/tomtom
# to update
pi update git:github.com/thearchitector/tomtom
```

## Vendored third party skills

TomTom vendors generally useful skills from third parties using Vercel's skills package. To add another, run:

```bash
DO_NOT_TRACK=1 pnx skills@latest add <ref>
```

All the vendored skills can be identified via the [`skills-lock.json`](./skills-lock.json)
