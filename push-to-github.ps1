# GitHub 推送脚本
# 使用方法: .\push-to-github.ps1 -Username YOUR_USERNAME

param(
    [Parameter(Mandatory=$true)]
    [string]$Username,
    
    [string]$RepoName = "fabric-pattern-extractor"
)

$GitPath = "C:\Program Files\Git\bin\git.exe"

Write-Host "`n=== 推送到 GitHub ===" -ForegroundColor Cyan
Write-Host "仓库: $Username/$RepoName" -ForegroundColor Yellow

# 检查远程仓库是否已存在
$remoteExists = & $GitPath remote get-url origin 2>$null
if ($remoteExists) {
    Write-Host "`n检测到已存在的远程仓库: $remoteExists" -ForegroundColor Yellow
    $change = Read-Host "是否要更改远程仓库地址? (y/n)"
    if ($change -eq 'y') {
        & $GitPath remote remove origin
    } else {
        Write-Host "使用现有远程仓库..." -ForegroundColor Green
        & $GitPath push -u origin main
        exit
    }
}

# 添加远程仓库
Write-Host "`n添加远程仓库..." -ForegroundColor Yellow
& $GitPath remote add origin "https://github.com/$Username/$RepoName.git"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ 远程仓库已添加" -ForegroundColor Green
    
    # 推送代码
    Write-Host "`n推送代码到 GitHub..." -ForegroundColor Yellow
    & $GitPath push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✓ 代码已成功推送到 GitHub！" -ForegroundColor Green
        Write-Host "`n访问您的仓库: https://github.com/$Username/$RepoName" -ForegroundColor Cyan
        Write-Host "`n下一步: 在 GitHub 仓库设置中启用 GitHub Pages" -ForegroundColor Yellow
        Write-Host "1. 进入 Settings → Pages" -ForegroundColor White
        Write-Host "2. Source 选择 'GitHub Actions'" -ForegroundColor White
        Write-Host "3. 保存设置" -ForegroundColor White
    } else {
        Write-Host "`n❌ 推送失败，请检查:" -ForegroundColor Red
        Write-Host "1. GitHub 仓库是否已创建" -ForegroundColor Yellow
        Write-Host "2. 用户名是否正确" -ForegroundColor Yellow
        Write-Host "3. 是否已配置 GitHub 认证" -ForegroundColor Yellow
    }
} else {
    Write-Host "`n❌ 添加远程仓库失败" -ForegroundColor Red
}

