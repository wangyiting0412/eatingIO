# PowerShell部署脚本 - 个人网站部署
# 使用方法: .\deploy.ps1

param(
    [string]$ServerPath = "/var/www/liuyang2330.xyz",
    [string]$ServerIP = "",
    [string]$Username = "root"
)

# 设置控制台编码为UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "🚀 开始部署个人网站..." -ForegroundColor Green

# 检查是否安装了pnpm
try {
    $pnpmVersion = pnpm --version
    Write-Host "✅ 检测到pnpm版本: $pnpmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ 未检测到pnpm，请先安装pnpm" -ForegroundColor Red
    Write-Host "安装命令: npm install -g pnpm" -ForegroundColor Yellow
    exit 1
}

# 构建生产版本
Write-Host "📦 构建生产版本..." -ForegroundColor Cyan
pnpm build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 构建失败，请检查错误信息" -ForegroundColor Red
    exit 1
}

Write-Host "✅ 构建成功！" -ForegroundColor Green

# 创建部署包
Write-Host "📁 创建部署包..." -ForegroundColor Cyan
if (Test-Path "deploy") {
    Remove-Item "deploy" -Recurse -Force
}
New-Item -ItemType Directory -Name "deploy" | Out-Null

# 复制构建文件
Copy-Item "dist\static\*" -Destination "deploy\" -Recurse -Force
Copy-Item "nginx.conf" -Destination "deploy\" -Force

# 创建部署说明
$readmeContent = @"
# 部署说明

## 文件结构
- index.html - 主页面
- assets/ - 静态资源
- nginx.conf - Nginx配置文件

## 部署步骤
1. 将deploy目录下的所有文件上传到服务器的 $ServerPath 目录
2. 如果修改了nginx.conf，需要重启Nginx服务
3. 测试配置: sudo nginx -t
4. 重启Nginx: sudo systemctl restart nginx

## 域名配置
确保域名 liuyang2330.xyz 已正确解析到服务器IP地址

## 快速部署命令
\`\`\`bash
# 上传文件后，如果需要重启Nginx
sudo nginx -t
sudo systemctl restart nginx
\`\`\`
"@

$readmeContent | Out-File -FilePath "deploy\README.md" -Encoding UTF8

Write-Host "📋 部署说明已创建" -ForegroundColor Green
Write-Host "✅ 部署包准备完成！" -ForegroundColor Green

# 显示部署包内容
Write-Host ""
Write-Host "📦 部署包内容:" -ForegroundColor Cyan
Get-ChildItem "deploy" -Recurse | ForEach-Object {
    $icon = if ($_.PSIsContainer) { "📁" } else { "📄" }
    $size = if ($_.PSIsContainer) { "" } else { "($([math]::Round($_.Length/1KB, 2)) KB)" }
    Write-Host "  $icon $($_.Name) $size" -ForegroundColor White
}

Write-Host ""
Write-Host "📤 下一步操作:" -ForegroundColor Yellow
Write-Host "1. 将 deploy/ 目录上传到服务器" -ForegroundColor White
Write-Host "2. 按照 deploy/README.md 中的说明进行配置" -ForegroundColor White
Write-Host "3. 确保域名解析正确" -ForegroundColor White

# 如果提供了服务器信息，显示上传提示
if ($ServerIP -and $Username) {
    Write-Host ""
    Write-Host "🔗 上传提示:" -ForegroundColor Yellow
    Write-Host "使用scp命令上传: scp -r deploy/* $Username@$ServerIP`:$ServerPath" -ForegroundColor White
    Write-Host "或使用SFTP工具上传到: $ServerPath" -ForegroundColor White
}

Write-Host ""
Write-Host "🎉 部署包准备完成！" -ForegroundColor Green
