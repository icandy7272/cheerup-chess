#!/usr/bin/env bash
# Usage: ./deploy/release.sh user@tencent-host
# Initial nginx and certificate setup is documented in docs/DEPLOY.md.
set -euo pipefail
host="${1:?Usage: ./deploy/release.sh SSH_HOST}"
cd "$(dirname "$0")/.."
npm test
npm run build
release="$(date -u +%Y%m%dT%H%M%SZ)-$(git rev-parse --short HEAD)"
ssh "$host" "mkdir -p '/var/www/cheerup-chess/releases/$release'"
COPYFILE_DISABLE=1 tar --no-xattrs -C dist -czf - . | ssh "$host" "tar -xzf - -C '/var/www/cheerup-chess/releases/$release'"
ssh "$host" "test -f '/var/www/cheerup-chess/releases/$release/index.html' && ln -s '/var/www/cheerup-chess/releases/$release' '/var/www/cheerup-chess/current-next-$release' && mv -Tf '/var/www/cheerup-chess/current-next-$release' '/var/www/cheerup-chess/current'"
curl --fail --show-error --silent https://chess.cheerup.tech/ >/dev/null
printf 'Released %s to https://chess.cheerup.tech/\n' "$release"
