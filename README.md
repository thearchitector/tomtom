# tomtom

An atlas of stuff for agentic interaction, distributed as a [Pi package](https://pi.dev/docs/latest/packages).

Install globally:

```bash
pi install git:github.com/thearchitector/tomtom
# to update
pi update git:github.com/thearchitector/tomtom
```

## Prompts

- To develop an idea, use `/grill <topic>`.
- When directing an agent to implement changes, use `/implement <ask>`.
- To run a code review, use `/review <scope of focus>`.

## Vendored third party skills

TomTom uses Vercel's skills package to vendor generally useful skills from third parties into specific prompts. To add another, run:

```bash
DO_NOT_TRACK=1 pnx skills@latest add <ref>
```

All the vendored skills can be identified via the [`skills-lock.json`](./skills-lock.json)
