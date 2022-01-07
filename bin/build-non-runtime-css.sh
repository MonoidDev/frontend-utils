#!/usr/bin/env bash

set -eu

PATH="node_modules/.bin/:$PATH"

command -V yarn >/dev/null
command -V tailwindcss >/dev/null

(
  set -x
  tailwindcss \
    --input node_modules/tailwindcss/tailwind.css \
    --output bit-src/monoid/non-runtime-css/zipper-frontend/zipper-frontend.css \
    --config tailwind.zipper-frontend.config.js \
    --minify
)
