<#
  直接从本机把当前项目发布到 Vercel（不经过 GitHub）。

  用法：
    $env:VERCEL_TOKEN = 'vcp_xxx'      # Vercel → Settings → Tokens 生成的令牌
    pwsh -NoProfile -File scripts/deploy-to-vercel.ps1

  可选参数：
    -ProjectName  zhang7     Vercel 上的项目名
    -ProjectId    prj_xxx    项目 ID（带上更稳）
    -TeamId       team_xxx   团队 ID（个人账号可省略）
    -Preview                 发到预览环境，不覆盖正式网站

  流程与 Vercel 官方客户端一致：
    1) 逐个文件上传到 /v2/files（带 sha1 摘要）
    2) 用文件清单创建 /v13/deployments 部署
#>
param(
  [string]$Token = $env:VERCEL_TOKEN,
  [string]$ProjectName = 'zhang7',
  [string]$ProjectId = 'prj_lkKdLaftJwuDYYcEnlFXGm88yZWt',
  [string]$TeamId = 'team_cGzDqGHWgo8cd6FUN9TFg9ns',
  [string]$Root,
  [switch]$Preview
)

$ErrorActionPreference = 'Stop'
if (-not $Token) { throw '缺少令牌：请先设置 $env:VERCEL_TOKEN' }
if (-not $Root) { $Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path }
$Root = (Resolve-Path $Root).Path

# 不参与上传的目录 / 文件
$skipDirs = @('node_modules', 'dist', 'dist-ssr', '.git', '.pnpm-store', '.vercel', '.vite', '.idea')
$skipFilePattern = '^(上传到GitHub.*\.zip|.*\.log|\.DS_Store)$'

$files = Get-ChildItem -Path $Root -Recurse -File -Force | Where-Object {
  $rel = $_.FullName.Substring($Root.Length).TrimStart('\')
  $segments = $rel.Split('\')
  $dirSegments = if ($segments.Count -gt 1) { $segments[0..($segments.Count - 2)] } else { @() }
  $inSkipDir = $false
  foreach ($seg in $dirSegments) { if ($skipDirs -contains $seg) { $inSkipDir = $true } }
  (-not $inSkipDir) -and ($segments[-1] -notmatch $skipFilePattern)
}
if (-not $files) { throw "在 $Root 里没有找到可上传的文件" }

$totalKB = [Math]::Round((($files | Measure-Object Length -Sum).Sum / 1KB), 1)
Write-Host ("准备上传 {0} 个文件，共 {1} KB" -f $files.Count, $totalKB)

$headers = @{ Authorization = "Bearer $Token"; Accept = 'application/json' }
$query = if ($TeamId) { "?teamId=$TeamId" } else { '' }
$deploymentFiles = New-Object System.Collections.Generic.List[object]
$shaCache = @{}
$done = 0

foreach ($f in $files) {
  $rel = $f.FullName.Substring($Root.Length).TrimStart('\').Replace('\', '/')
  $bytes = [IO.File]::ReadAllBytes($f.FullName)
  $sha1 = [Security.Cryptography.SHA1]::Create()
  $sha = ($sha1.ComputeHash($bytes) | ForEach-Object { $_.ToString('x2') }) -join ''

  if (-not $shaCache.ContainsKey($sha)) {
    $uploaded = $false
    for ($try = 1; $try -le 3 -and -not $uploaded; $try++) {
      try {
        Invoke-RestMethod -Uri "https://api.vercel.com/v2/files$query" -Method Post -Headers (@{
            Authorization  = "Bearer $Token"
            'Content-Type' = 'application/octet-stream'
            'x-now-digest' = $sha
            'x-now-size'   = [string]$bytes.Length
          }) -Body $bytes -TimeoutSec 300 | Out-Null
        $uploaded = $true
      } catch {
        if ($try -eq 3) { throw "上传失败 $rel ：$($_.Exception.Message)" }
        Start-Sleep -Seconds 2
      }
    }
    $shaCache[$sha] = $true
  }

  $deploymentFiles.Add(@{ file = $rel; size = $bytes.Length; sha = $sha; mode = 33188 })
  $done++
  if ($done % 20 -eq 0) { Write-Host ("  已处理 {0}/{1}" -f $done, $files.Count) }
}

$body = @{
  name            = $ProjectName
  project         = $ProjectId
  version         = 2
  target          = if ($Preview) { 'preview' } else { 'production' }
  files           = $deploymentFiles
  projectSettings = @{
    framework       = 'vite'
    buildCommand    = $null
    installCommand  = $null
    outputDirectory = $null
    nodeVersion     = '22.x'
  }
} | ConvertTo-Json -Depth 6 -Compress

Write-Host '正在创建部署…'
$dep = Invoke-RestMethod -Uri "https://api.vercel.com/v13/deployments$query&forceNew=1" -Method Post -Headers (@{
    Authorization  = "Bearer $Token"
    'Content-Type' = 'application/json'
  }) -Body $body -TimeoutSec 300
Write-Host ("部署已创建：https://{0}" -f $dep.url)

$id = $dep.id
$state = $dep.readyState
for ($i = 0; $i -lt 150 -and $state -notin 'READY', 'ERROR', 'CANCELED'; $i++) {
  Start-Sleep -Seconds 4
  $state = (Invoke-RestMethod -Uri "https://api.vercel.com/v13/deployments/$id$query" -Headers $headers -TimeoutSec 60).readyState
  Write-Host ("  状态：{0}" -f $state)
}

if ($state -ne 'READY') {
  Write-Host '部署失败，以下是云端构建日志：' -ForegroundColor Red
  $events = Invoke-RestMethod -Uri "https://api.vercel.com/v3/deployments/$id/events?builds=1&limit=300$($(if ($TeamId) { "&teamId=$TeamId" }))" -Headers $headers -TimeoutSec 60
  $events | Where-Object { $_.text } | ForEach-Object { $_.text }
  exit 1
}

Write-Host ('完成！正式地址：https://{0}' -f $dep.url) -ForegroundColor Green
