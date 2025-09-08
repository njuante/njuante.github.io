# GitHub Pages Deployment Troubleshooting

## Common Issues and Solutions

### 1. Jekyll Error (YAML Exception)
**Error**: `YAML Exception reading /github/workspace/src/layouts/Layout.astro`

**Cause**: GitHub Pages is trying to build with Jekyll instead of our custom Astro workflow.

**Solution**:
1. Go to your repository **Settings**
2. Navigate to **Pages** in the sidebar
3. Under **"Source"**, select **"GitHub Actions"** (NOT "Deploy from a branch")
4. Push a new commit to trigger the workflow

### 2. Site Not Loading / 404 Error
**Cause**: Incorrect base path configuration.

**Solution**:
1. Check `astro.config.mjs` and ensure:
   ```js
   export default defineConfig({
     site: 'https://yourusername.github.io',
     base: '/your-repo-name',
   });
   ```
2. Replace `yourusername` with your GitHub username
3. Replace `your-repo-name` with your repository name

### 3. Workflow Not Running
**Cause**: GitHub Actions not enabled or wrong branch.

**Solution**:
1. Check the **Actions** tab in your repository
2. Ensure GitHub Actions are enabled
3. Check that you're pushing to `main` or `master` branch
4. The workflow file should be at `.github/workflows/deploy.yml`

### 4. Build Fails
**Cause**: Dependencies or build errors.

**Solution**:
1. Check the Actions log for specific errors
2. Run `npm run build` locally to test
3. Ensure all dependencies are in `package.json`
4. Check for TypeScript errors

## Manual Verification Steps

1. **Local Build Test**:
   ```bash
   npm install
   npm run build
   npm run preview
   ```

2. **Check Files**:
   - Ensure `.nojekyll` exists in root and `public/` directories
   - Verify `astro.config.mjs` has correct site/base URLs
   - Check `.github/workflows/deploy.yml` exists

3. **GitHub Settings**:
   - Repository Settings → Pages → Source: "GitHub Actions"
   - Actions tab should show workflow runs
   - No Jekyll-related files (`_config.yml`, `Gemfile`) should exist

## Contact Support

If you're still having issues:
1. Check the repository's Issues tab
2. Review GitHub Pages documentation
3. Ensure your repository is public (or you have GitHub Pro for private repos)
