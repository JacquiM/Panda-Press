# Build the project
Write-Host "Building project..." -ForegroundColor Green
npm run build:github

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

# Set variables
$buildDir = "dist/public"
$tempDir = "temp-gh-pages"

Write-Host "Preparing deployment..." -ForegroundColor Green

# Remove temp dir if exists
if (Test-Path $tempDir) { 
    Write-Host "Cleaning up existing temp directory..." -ForegroundColor Yellow
    Remove-Item $tempDir -Recurse -Force 
}

# Check if build directory exists
if (-not (Test-Path $buildDir)) {
    Write-Host "Build directory $buildDir not found!" -ForegroundColor Red
    exit 1
}

# Copy build output to temp dir
Write-Host "Copying build files..." -ForegroundColor Green
Copy-Item $buildDir $tempDir -Recurse

# Go to temp dir
Set-Location $tempDir

# Initialize git and push to gh-pages branch
Write-Host "Deploying to GitHub Pages..." -ForegroundColor Green
git init
git remote add origin https://github.com/JacquiM/Panda-Press.git
git checkout -b gh-pages
git add .
git commit -m "Deploy to GitHub Pages - $(Get-Date)"
git push origin gh-pages --force

if ($LASTEXITCODE -eq 0) {
    Write-Host "Deployment successful!" -ForegroundColor Green
} else {
    Write-Host "Deployment failed!" -ForegroundColor Red
}

# Return to project root and clean up
Set-Location ..
Remove-Item $tempDir -Recurse -Force

Write-Host "Cleanup complete. Deployment finished!" -ForegroundColor Green
