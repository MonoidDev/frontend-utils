# frontend-utils

Shared bit component library

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

### yarn

If possible, you should use the `bin/yarn.sh` instead of the `yarn` command so that mistakes reduce implicitly.

```diff
- yarn
+ bin/yarn.sh
```

```diff
- yarn dlx eslint
+ bin/yarn.sh dlx eslint
```

## Development

`yarn dev` is executed specifying a target of development. targets can be choose either `bit` or `vite`

```bash
yarn dev --target bit
yarn dev --target vite
```

Instead of `—target` flag, you can use `-t`.

### VSCode tasks

If you use VSCode to develop, I recommend that you use the tasks feature.

1. `command+p`
2. `task ` typing
3. choose either `dev --target {bit,vite}`

## Commit

Follow the Conventional Commit syntax.

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```
