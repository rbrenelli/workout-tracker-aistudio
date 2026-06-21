<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/0962ad32-8cc9-46aa-85d7-fb9de9ffa326

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

This is a Vite React app, so GitHub Pages must serve the built `dist/` folder rather than the repository root. The included GitHub Actions workflow builds the app and publishes `dist/` automatically when changes are pushed to `main`.

### One-time repository setup

1. In GitHub, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push this repository to the `main` branch.
4. Open the completed **Deploy to GitHub Pages** workflow run to find the published URL.

For this repository, the Vite base path is configured for the project Pages URL `/workout-tracker-aistudio/` during the GitHub Actions build. Local development continues to use `/`.

### Manual local production build

```bash
npm install
npm run build
npm run preview
```

