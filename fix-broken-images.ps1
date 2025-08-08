# PowerShell script to replace broken image URLs with placeholders
Write-Host "Replacing broken WordPress image URLs with placeholder..." -ForegroundColor Green

# Get all markdown files
$markdownFiles = Get-ChildItem -Path "posts" -Filter "*.md" -Recurse

$replacements = 0

foreach ($file in $markdownFiles) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Replace the most common broken image with a placeholder
    $content = $content -replace 'https://thejpanda\.com/wp-content/uploads/2020/08/automation-1\.png', '/images/blog/placeholder-automation.png'
    
    # Replace other common patterns with placeholders  
    $content = $content -replace 'https://thejpanda\.com/wp-content/uploads/[^"]*\.png', '/images/blog/placeholder.png'
    $content = $content -replace 'https://thejpanda\.com/wp-content/uploads/[^"]*\.jpg', '/images/blog/placeholder.png'
    $content = $content -replace 'https://thejpanda\.com/wp-content/uploads/[^"]*\.jpeg', '/images/blog/placeholder.png'
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Updated: $($file.Name)" -ForegroundColor Yellow
        $replacements++
    }
}

Write-Host "Completed! Updated $replacements files." -ForegroundColor Green
