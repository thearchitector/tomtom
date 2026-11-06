# tomtom

An atlas of guidelines and skills for agentic development.

Install this repository as a marketplace and global plugin:

```bash
codex plugin marketplace add git@github.com:thearchitector/tomtom.git
codex plugin add tomtom@thearchitector
```

To update:

```bash
codex plugin marketplace upgrade thearchitector
codex plugin remove tomtom@thearchitector
codex plugin add tomtom@thearchitector
```

## Vendored third party skills

TomTom vendors generally useful skills from third parties using Vercel's skills package. To add another, run:

```bash
DO_NOT_TRACK=1 pnx skills@latest add <ref> -a openclaw
```

I use Codex, but the OpenClaw argument tells `skills` to vendor skills into the repository's `skills` directory, where plugins expect them.

All the vendored skills can be identified via the [`skills-lock.json`](./skills-lock.json)
