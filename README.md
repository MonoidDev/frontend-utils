# frontend-utils

Shared bit component library

## Required tools

- `bash@^4`

## Env

### bit

First, you have to install `bvm` command, which is is a version manager for Bit.

```bash
yarn global add @teambit/bvm
```

Then, the latest `bit` command is installed.

```bash
bvm install
```

After the `bit` command was been installed, you make the `monoid.monoid` scope on bit visible doing login to bit.dev.

```bash
bit login --port 58085
```

## Commit

Follow the Conventional Commit syntax.

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Install in other repositories

```bash
bash -c "$(curl -sSf -o- https://raw.githubusercontent.com/MonoidDev/frontend-utils/main/sh/init.sh)"
# intaracting...
```
