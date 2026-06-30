@echo off
REM Maven wrapper that delegates to WSL's mvn (offline-capable)
wsl -d Ubuntu bash -c "cd \"$(wslpath '%~dp0')\" && mvn %*"
