# Image Migration Guide for JPanda Solutions Blog

## Problem
Your blog posts reference 77 images from your old WordPress site at URLs like:
`https://thejpanda.com/wp-content/uploads/2020/08/automation-1.png`

Since your site is now hosted on GitHub Pages instead of WordPress, these URLs return 404 errors.

## Solution Options

### Option 1: Quick Fix (Recommended for now)
1. Temporarily comment out broken images in markdown files
2. Deploy the site without images
3. Add images back gradually

### Option 2: Full Migration (Long-term solution)
1. Download all 77 images from your WordPress backup
2. Organize them in `/client/public/images/blog/`
3. Update all markdown files to use local paths

## Images to Download
Run this to see the full list:
```powershell
powershell -ExecutionPolicy Bypass -File extract-image-urls.ps1
```

## File Structure
```
client/public/images/blog/
├── 2020/08/automation-1.png
├── 2021/01/image-1.png
├── 2022/03/image.png
├── 2023/01/image-8.png
├── 2024/11/flow-3.png
└── ... (other images)
```

## Update Process
1. Place images in the correct folder structure
2. Update markdown files to use: `/images/blog/2020/08/automation-1.png`
3. Test locally before deploying

## Commands to Update URLs
```powershell
# Replace WordPress URLs with local paths
(Get-Content "posts/your-post.md") -replace 
  'https://thejpanda.com/wp-content/uploads/', 
  '/images/blog/' | 
Set-Content "posts/your-post.md"
```
