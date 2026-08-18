# Deploy all live demos to GitHub Pages
# Run this from the project root: ./deploy.ps1
# Note: the marketing website (decodedsolutionsite) is its own repo with its own pipeline.

$ErrorActionPreference = "Stop"
$PlatformRoot = $PSScriptRoot

$apps = @(
    @{ Name = "butcher-shop";       Path = "$PlatformRoot\frontend\butcher-shop";         Dest = "butcher-shop" },
    @{ Name = "guesthouse-client";  Path = "$PlatformRoot\frontend\guesthouse-client";    Dest = "guesthouse-client" },
    @{ Name = "dashboard";          Path = "$PlatformRoot\frontend\decoded_dashboard";    Dest = "dashboard" },
    @{ Name = "zozos-shop";         Path = "$PlatformRoot\frontend\zozos-shop";           Dest = "zozos-shop" },
    @{ Name = "vuyolwethu";         Path = "$PlatformRoot\frontend\vuyolwethu";           Dest = "vuyolwethu" },
    @{ Name = "portfolio";          Path = "$PlatformRoot\frontend\portfolio";            Dest = "freelance-work" }
)

Write-Host "`n========== Deploying to GitHub Pages ==========" -ForegroundColor Cyan

# -- Deploy client apps to decodedsolutions gh-pages --
Write-Host "`n[1/1] Deploying client apps..." -ForegroundColor Yellow

foreach ($app in $apps) {
    Write-Host "`n  Building $($app.Name)..."
    Push-Location $app.Path
    try {
        npx --yes vite build 2>&1 | Out-Null
        if ($LASTEXITCODE -ne 0) { throw "Build failed for $($app.Name)" }

        npx --yes gh-pages -d dist --dest $app.Dest 2>&1
        if ($LASTEXITCODE -ne 0) { throw "Deploy failed for $($app.Name)" }

        Write-Host "  [OK] $($app.Name) -> https://ngbontsi.github.io/decodedsolutions/$($app.Dest)/" -ForegroundColor Green
    }
    catch {
        Write-Host "  [FAIL] Error: $_" -ForegroundColor Red
    }
    finally {
        Pop-Location
    }
}

Write-Host "`n========== Deploy Complete ==========" -ForegroundColor Cyan
