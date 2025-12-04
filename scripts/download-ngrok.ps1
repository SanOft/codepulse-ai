# PowerShell script to download and install ngrok
$ErrorActionPreference = "Stop"

$BinDir = Join-Path $PSScriptRoot "..\bin"
$NgrokZip = Join-Path $BinDir "ngrok.zip"
$NgrokExe = Join-Path $BinDir "ngrok.exe"
# Note: ngrok requires account signup for direct download
# This script provides instructions for manual download
$NgrokUrl = ""

Write-Host "Downloading ngrok..." -ForegroundColor Cyan

if (-not (Test-Path $BinDir)) {
    New-Item -ItemType Directory -Path $BinDir -Force | Out-Null
}

if (Test-Path $NgrokExe) {
    Write-Host "ngrok.exe already exists!" -ForegroundColor Green
    Write-Host "Location: $NgrokExe" -ForegroundColor Gray
    Write-Host ""
    Write-Host "To use it, run: yarn ngrok" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "ngrok requires manual download:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Quick Steps:" -ForegroundColor Cyan
Write-Host "1. Open: https://ngrok.com/download" -ForegroundColor White
Write-Host "2. Sign up for free account (or sign in)" -ForegroundColor White
Write-Host "3. Download Windows version" -ForegroundColor White
Write-Host "4. Extract ngrok.exe" -ForegroundColor White
Write-Host "5. Copy ngrok.exe to this folder:" -ForegroundColor White
Write-Host "   $BinDir" -ForegroundColor Gray
Write-Host ""
Write-Host "After copying ngrok.exe:" -ForegroundColor Cyan
Write-Host "  1. Run: yarn setup:ngrok (to configure authtoken)" -ForegroundColor White
Write-Host "  2. Run: yarn ngrok (to start tunnel)" -ForegroundColor White
Write-Host ""
Write-Host "Alternative: Use Chocolatey (requires admin PowerShell):" -ForegroundColor Yellow
Write-Host "  choco install ngrok" -ForegroundColor White
Write-Host "  Then run: yarn setup:ngrok" -ForegroundColor White
Write-Host ""
exit 0
