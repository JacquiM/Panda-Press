#!/bin/bash
# Extract all image URLs from blog posts

echo "=== UNIQUE IMAGE URLS FOUND IN BLOG POSTS ==="
echo ""

# Find all image URLs in markdown files
grep -r "https://thejpanda.com/wp-content/uploads/" posts/ | \
    grep -o "https://thejpanda.com/wp-content/uploads/[^)]*\.[a-zA-Z]*" | \
    sort | uniq

echo ""
echo "=== SUGGESTED ACTIONS ==="
echo "1. Download these images from your WordPress backup"
echo "2. Place them in: client/public/images/blog/"
echo "3. Update markdown files to use: /images/blog/filename.ext"
