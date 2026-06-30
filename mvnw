#!/bin/bash
# Maven wrapper that delegates to WSL's mvn (offline-capable)
cd "$(dirname "$0")"
exec mvn "$@"
