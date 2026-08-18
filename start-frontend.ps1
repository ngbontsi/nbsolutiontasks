$dashDir = Join-Path $PSScriptRoot 'frontend\decoded_dashboard'
Set-Location $dashDir
Write-Host "Starting dashboard dev server..." -ForegroundColor Cyan
Start-Process -NoNewWindow -FilePath "cmd.exe" -WorkingDirectory $dashDir -ArgumentList "/c","npm run dev" -RedirectStandardOutput "$env:TEMP\vite-dev.log" -RedirectStandardError "$env:TEMP\vite-dev-err.log"
Start-Sleep 4
Write-Host "Dashboard dev server started at http://localhost:3000/decodedsolutions/dashboard/" -ForegroundColor Green
