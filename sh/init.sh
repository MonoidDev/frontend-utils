#!/usr/bin/env bash

set -eu

command -V yarn

declare -a dependencies=(
  @monoid/utils.commitlint.config
  @monoid/utils.eslint-rule.prefer-import-with-ts-paths
  @monoid/utils.eslint.config
  @monoid/utils.lint-staged.config
  @monoid/utils.postcss.config
  @monoid/utils.prettier.config
  @monoid/utils.tailwindcss.config
)

set -- "${dependencies[@]}"

while (("$#")); do
  printf "%3s %s\n" "-" "$1"
  shift
done

read -p 'Install these? Yn) ' -n 1 answer
printf "%s\n" "${answer:=Y}"

if [[ ! "$answer" =~ [YyNn] ]]; then
  echo "Please enter either y or n" >&2
  exit 1
fi

if [[ "$answer" =~ [Yy] ]]; then
  cat <<EOS
Before installing, please add the following configuration to your .yarnrc.yml.
-------------------------------------------
npmScopes:
  monoid:
    npmRegistryServer: https://node.bit.dev
-------------------------------------------
EOS
  read -p "Okay? " -n 1

  (
    set -x
    yarn add -DE "${dependencies[@]}"
  )
fi
