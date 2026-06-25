$composeDir = Join-Path $PSScriptRoot 'devops'
Write-Host "Starting containers from $composeDir..." -ForegroundColor Cyan
Set-Location $composeDir
docker compose up -d
if ($?) {
  Write-Host "All containers started. Use 'docker compose ps' to verify." -ForegroundColor Green
} else {
  Write-Host "Failed to start containers." -ForegroundColor Red
}
