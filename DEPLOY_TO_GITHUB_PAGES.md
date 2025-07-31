# How to Deploy JPanda Solutions Website to GitHub Pages

Follow these step-by-step instructions to deploy your website to GitHub Pages.

## Prerequisites
- A GitHub account
- Git installed on your computer

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository `Panda-Press` (or any name you prefer)
5. Make sure it's set to **Public** (required for free GitHub Pages)
6. Don't initialize with README, .gitignore, or license (we already have these files)
7. Click "Create repository"

## Step 2: Upload Your Website Files

### Option A: Using Git Command Line
1. Open your terminal/command prompt in your project folder
2. Run these commands (replace YOUR_USERNAME with your GitHub username):

```bash
git init
git add .
git commit -m "Initial commit: JPanda Solutions website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Panda-Press.git
git push -u origin main
```

### Option B: Using GitHub Web Interface
1. In your new repository, click "uploading an existing file"
2. Drag and drop all your project files (or use the file picker)
3. Write a commit message like "Initial commit: JPanda Solutions website"
4. Click "Commit changes"

## Step 3: Enable GitHub Pages

1. In your repository, go to **Settings** (top menu bar)
2. Scroll down to **Pages** in the left sidebar
3. Under **Source**, select **"GitHub Actions"**
4. The page will show that GitHub Pages is now enabled

## Step 4: Wait for Deployment

1. Go to the **Actions** tab in your repository
2. You'll see a workflow called "Deploy to GitHub Pages" running
3. Wait for it to complete (green checkmark)
4. This usually takes 2-5 minutes

## Step 5: Access Your Website

Your website will be available at:
```
https://YOUR_USERNAME.github.io/Panda-Press/
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Updating Your Website

To update your website:
1. Make changes to your files
2. Commit and push to the main branch:
```bash
git add .
git commit -m "Update website content"
git push
```
3. The website will automatically rebuild and deploy

## Troubleshooting

**Problem**: Website shows 404 error
- **Solution**: Make sure your repository is public and GitHub Pages is enabled

**Problem**: Changes don't appear
- **Solution**: Wait a few minutes and clear your browser cache

**Problem**: Build fails
- **Solution**: Check the Actions tab for error details

**Problem**: CSS/styling issues
- **Solution**: The website is configured for the `/Panda-Press/` base path

## Custom Domain (Optional)

To use your own domain (like `www.jpanda.com`):
1. In repository Settings > Pages
2. Add your custom domain
3. Configure your DNS provider to point to GitHub Pages
4. Enable "Enforce HTTPS"

## Need Help?

If you encounter any issues:
1. Check the repository's Actions tab for build errors
2. Ensure all files were uploaded correctly
3. Verify your repository is public
4. Contact JPanda Solutions for technical support

---

**Congratulations!** Your JPanda Solutions website is now live on GitHub Pages! 🎉