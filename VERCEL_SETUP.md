# Vercel Deployment Configuration for Turborepo

## Issue
Error: `The file "/vercel/path0/front-end/.next/routes-manifest.json" couldn't be found`

This happens because Vercel needs specific configuration for turborepo monorepos.

## Solution: Configure in Vercel Dashboard

### 1. Project Settings in Vercel Dashboard

Go to your project settings on Vercel and configure:

**General → Build & Development Settings:**

```
Root Directory: front-end
```
✅ Click "Edit" next to Root Directory and select `front-end`

**Framework Preset:**
```
Framework: Next.js
```

**Build & Development Settings:**

```
Build Command: npm run build:web
```

```
Output Directory: apps/web/.next
```
⚠️ **IMPORTANT**: Set to `apps/web/.next` (relative to root directory)

```
Install Command: npm install
```

**Development Command:**
```
npm run dev:web
```

### 2. Environment Variables (if needed)

Add any environment variables in the Vercel dashboard under:
- Settings → Environment Variables

### 3. Turborepo Cache (Optional but Recommended)

Turborepo will automatically use Vercel's Remote Caching when deployed.
No additional configuration needed.

## Expected Directory Structure

```
space_craft_production/
├── front-end/                 ← Root Directory in Vercel
│   ├── apps/
│   │   └── web/              ← Your Next.js app
│   │       ├── .next/        ← Build output (after build)
│   │       ├── app/
│   │       ├── package.json
│   │       └── next.config.mjs
│   ├── packages/
│   ├── package.json          ← Monorepo root package.json
│   └── turbo.json
├── accounts/
├── planograms/
└── manage.py
```

## Verification

After configuring, trigger a new deployment. You should see:

1. ✅ Vercel correctly identifies root as `front-end/`
2. ✅ Runs `npm install` in `front-end/`
3. ✅ Runs `npm run build:web` which triggers turbo
4. ✅ Finds build output in `apps/web/.next/`
5. ✅ Deployment succeeds

## Troubleshooting

If you still get errors:

1. **Clear Build Cache**: In Vercel dashboard, go to Deployments → ⋯ Menu → Redeploy → Clear cache and redeploy
2. **Check Build Logs**: Verify that the build command runs successfully
3. **Verify Output**: Check that `apps/web/.next/` is created during build

## Alternative: vercel.json (Not Recommended)

If you prefer file-based configuration, create `front-end/vercel.json`:

```json
{
  "buildCommand": "npm run build:web",
  "outputDirectory": "apps/web/.next",
  "installCommand": "npm install"
}
```

But dashboard configuration is preferred for turborepo projects.
