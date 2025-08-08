# PowerShell script to extract image URLs from blog posts
Write-Host "=== UNIQUE IMAGE URLS FOUND IN BLOG POSTS ===" -ForegroundColor Green
Write-Host ""

# Get all markdown files
$markdownFiles = Get-ChildItem -Path "posts" -Filter "*.md" -Recurse

$imageUrls = @()

foreach ($file in $markdownFiles) {
    $content = Get-Content $file.FullName -Raw
    # Find URLs matching the pattern
    $matches = [regex]::Matches($content, 'https://thejpanda\.com/wp-content/uploads/[^)]*\.[a-zA-Z]+')
    foreach ($match in $matches) {
        $imageUrls += $match.Value
    }
}

# Get unique URLs and sort them
$uniqueUrls = $imageUrls | Sort-Object | Get-Unique

foreach ($url in $uniqueUrls) {
    Write-Host $url
}

Write-Host ""
Write-Host "=== SUGGESTED ACTIONS ===" -ForegroundColor Yellow
Write-Host "1. Download these images from your WordPress backup"
Write-Host "2. Place them in: client/public/images/blog/"
Write-Host "3. Update markdown files to use: /images/blog/filename.ext"
Write-Host ""
Write-Host "Total unique images found: $($uniqueUrls.Count)" -ForegroundColor Cyan
