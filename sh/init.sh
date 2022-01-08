#!/usr/bin/env bash

set -eu

command -V yarn >/dev/null
declare -r yarn_version="$(yarn --version)"

command -V jq >/dev/null

declare the_version_of_prefer_import_with_ts_paths=
# if the version of the yarn of a project is the berry
if [[ ! "$yarn_version" =~ ^1 ]]; then
  the_version_of_prefer_import_with_ts_paths="$(
    yarn npm info @monoid/utils.eslint-rule.prefer-import-with-ts-paths --json |
      jq -r .version
  )"
fi

declare -a dependencies=(
  @monoid/utils.commitlint.config
  "@monoid/eslint-plugin-prefer-import-with-ts-paths@npm:@monoid/utils.eslint-rule.prefer-import-with-ts-paths${the_version_of_prefer_import_with_ts_paths:+"@$the_version_of_prefer_import_with_ts_paths"}"
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
  read -p "Okay? (Press the enter) " -n 1

  (
    set -x
    yarn add -DE "${dependencies[@]}"
  )
fi
