#!/usr/bin/env sh
set -eu

tracked_file="worker-configuration.d.ts"
env_file="worker-configuration.env"
temp_file="$(mktemp ./worker-configuration.check.XXXXXX.d.ts)"
normalized_file="${temp_file}.normalized"

cleanup() {
  rm -f "$temp_file" "$normalized_file"
}
trap cleanup EXIT

rm -f "$temp_file"
pnpm exec wrangler types "$temp_file" --env-file="$env_file" >/dev/null

sed "s|wrangler types .* --env-file=${env_file}|wrangler types ${tracked_file} --env-file=${env_file}|" \
  "$temp_file" >"$normalized_file"

diff -u "$tracked_file" "$normalized_file"
