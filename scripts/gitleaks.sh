#!/usr/bin/env sh
set -eu

version="${GITLEAKS_VERSION:-8.30.1}"

if command -v gitleaks >/dev/null 2>&1; then
  exec gitleaks "$@"
fi

os="$(uname -s | tr '[:upper:]' '[:lower:]')"
arch="$(uname -m)"

case "$os" in
darwin | linux) ;;
*)
  echo "Unsupported OS for automatic gitleaks install: $os" >&2
  echo "Install gitleaks manually, then rerun this command." >&2
  exit 127
  ;;
esac

case "$arch" in
arm64 | aarch64) arch="arm64" ;;
x86_64 | amd64) arch="x64" ;;
*)
  echo "Unsupported architecture for automatic gitleaks install: $arch" >&2
  echo "Install gitleaks manually, then rerun this command." >&2
  exit 127
  ;;
esac

cache_root="${XDG_CACHE_HOME:-./node_modules/.cache}"
install_dir="$cache_root/gitleaks/v$version"
bin="$install_dir/gitleaks"

if [ ! -x "$bin" ]; then
  mkdir -p "$install_dir"
  archive="$install_dir/gitleaks.tar.gz"
  url="https://github.com/gitleaks/gitleaks/releases/download/v$version/gitleaks_${version}_${os}_${arch}.tar.gz"

  echo "Downloading gitleaks v$version..." >&2
  curl --fail --location --silent --show-error "$url" --output "$archive"
  tar -xzf "$archive" -C "$install_dir" gitleaks
  chmod +x "$bin"
fi

exec "$bin" "$@"
