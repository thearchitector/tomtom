# tomtom

An atlas of guidelines and skills for agentic development.

## Setup

Agents love the `gh` command. [Install](https://github.com/cli/cli/blob/trunk/docs/install_linux.md#debian) it.

Several CLI utilities are also assumed to exist by several skills. Install them via:

```bash
$ pnpm -g install
```

Finally, copy this codex config file and install skills these: 

```bash
$ cp codex.toml ~/.codex/config.toml
$ ln -sd <path to tomtom>/skills ~/.codex/skills/tomtom
```
