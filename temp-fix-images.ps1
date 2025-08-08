# PowerShell script to temporarily comment out broken images
Write-Host "Temporarily commenting out broken WordPress images..." -ForegroundColor Green

# Get all markdown files
$markdownFiles = Get-ChildItem -Path "posts" -Filter "*.md" -Recurse

$filesUpdated = 0

foreach ($file in $markdownFiles) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Comment out broken image references (but keep them for later restoration)
    $content = $content -replace '!\[([^\]]*)\]\(https://thejpanda\.com/wp-content/uploads/[^)]+\)', '<!-- TODO: Restore image - ![$1](ORIGINAL_URL_HERE) -->'
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Updated: $($file.Name)" -ForegroundColor Yellow
        $filesUpdated++
    }
}

Write-Host "Completed! Updated $filesUpdated files by commenting out broken images." -ForegroundColor Green
Write-Host "This prevents 404 errors. Restore images later using IMAGE-MIGRATION-GUIDE.md" -ForegroundColor Cyan
