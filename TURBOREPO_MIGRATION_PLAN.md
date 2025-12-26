# Turborepo Migration Plan

## 1. Repo Findings

- **Package manager**: npm (package-lock.json in front-end)
- **Node version**: v22.18.0 (no .nvmrc or engines constraint)
- **No root package.json** currently exists
- **No CI/CD workflows** at repo root (no .github directory)
- **Frontend location**: `/front-end` (Next.js 16 with React 19)
- **Django folders at root**: accounts, common, displays, planograms, products, projects, stores, spacecraft (settings)
- **Start script**: `start-dev.sh` orchestrates both servers:
  - Django: `poetry run python manage.py runserver` (port 8000)
  - Next.js: `cd front-end && npm run dev` (port 3000)
- **Frontend env**: `.env.local` with `NEXT_PUBLIC_API_URL=http://localhost:8000/api`
- **Path alias**: tsconfig uses `@/*` -> `./*`
- **OpenAPI script**: `generate:schema` references `../openapi.yaml` (needs path update after move)
- **next.config.ts**: Uses `turbopack.root: __dirname`

---

## 2. Proposed Final Structure

```
space_craft_production/
├── apps/
│   └── web/                          # Moved from /front-end
│       ├── app/
│       ├── components/
│       ├── features/
│       ├── hooks/
│       ├── lib/
│       ├── public/
│       ├── stores/
│       ├── types/
│       ├── .env.local
│       ├── .gitignore
│       ├── eslint.config.mjs
│       ├── next.config.ts
│       ├── package.json              # Updated name: "@spacecraft/web"
│       ├── postcss.config.mjs
│       ├── tsconfig.json
│       ├── vitest.config.ts
│       └── vitest.setup.ts
├── packages/                         # Empty for now (future shared packages)
│   └── .gitkeep
├── accounts/                         # Django - UNTOUCHED
├── common/                           # Django - UNTOUCHED
├── displays/                         # Django - UNTOUCHED
├── planograms/                       # Django - UNTOUCHED
├── products/                         # Django - UNTOUCHED
├── projects/                         # Django - UNTOUCHED
├── stores/                           # Django - UNTOUCHED
├── spacecraft/                       # Django settings - UNTOUCHED
├── manage.py                         # Django - UNTOUCHED
├── pyproject.toml                    # Django - UNTOUCHED
├── poetry.lock                       # Django - UNTOUCHED
├── openapi.yaml                      # API schema - UNTOUCHED
├── start-dev.sh                      # Updated to use new paths
├── package.json                      # NEW: Root workspace config
├── turbo.json                        # NEW: Turborepo config
├── .gitignore                        # Updated
└── ... (other Django/Python files)
```

---

## 3. Plan Steps

### Step 1: Create Root package.json

**What changes**: Create `/package.json`

**Content**:
```json
{
  "name": "spacecraft",
  "version": "0.0.0",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "./start-dev.sh",
    "dev:web": "npm run dev --workspace=@spacecraft/web",
    "build": "turbo run build",
    "build:web": "npm run build --workspace=@spacecraft/web",
    "lint": "turbo run lint",
    "lint:web": "npm run lint --workspace=@spacecraft/web",
    "typecheck": "turbo run typecheck",
    "typecheck:web": "npm run typecheck --workspace=@spacecraft/web",
    "test": "turbo run test",
    "test:web": "npm run test --workspace=@spacecraft/web",
    "check": "turbo run check",
    "check:web": "npm run check --workspace=@spacecraft/web",
    "generate:schema": "npm run generate:schema --workspace=@spacecraft/web",
    "django:dev": "poetry run python manage.py runserver",
    "django:migrate": "poetry run python manage.py migrate",
    "django:shell": "poetry run python manage.py shell"
  },
  "devDependencies": {
    "turbo": "^2.3.0"
  },
  "packageManager": "npm@10.9.3",
  "engines": {
    "node": ">=20.0.0"
  }
}
```

**Commands**:
```bash
# No command yet - just create the file
```

**Verification**:
- [ ] File exists at root
- [ ] JSON is valid

**Rollback**:
```bash
rm package.json
```

---

### Step 2: Create turbo.json

**What changes**: Create `/turbo.json`

**Content**:
```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "typecheck": {
      "dependsOn": ["^typecheck"]
    },
    "test": {
      "dependsOn": ["^build"],
      "cache": false
    },
    "test:run": {
      "dependsOn": ["^build"],
      "cache": false
    },
    "check": {
      "dependsOn": ["lint", "typecheck"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

**Commands**:
```bash
# No command yet - just create the file
```

**Verification**:
- [ ] File exists at root
- [ ] JSON is valid

**Rollback**:
```bash
rm turbo.json
```

---

### Step 3: Create apps directory and move front-end

**What changes**:
- Create `/apps/` directory
- Create `/packages/` directory with .gitkeep
- Move `/front-end` -> `/apps/web`

**Commands**:
```bash
mkdir -p apps packages
touch packages/.gitkeep
mv front-end apps/web
```

**Verification**:
- [ ] `/apps/web` exists with all frontend files
- [ ] `/front-end` no longer exists
- [ ] `/packages/.gitkeep` exists

**Rollback**:
```bash
mv apps/web front-end
rm -rf apps packages
```

---

### Step 4: Update apps/web/package.json

**What changes**: Update `/apps/web/package.json`
- Change `name` from `"front-end"` to `"@spacecraft/web"`
- Update `generate:schema` script path from `../openapi.yaml` to `../../openapi.yaml`

**Before**:
```json
{
  "name": "front-end",
  ...
  "scripts": {
    ...
    "generate:schema": "openapi-zod-client ../openapi.yaml -o ./lib/generated/api-schemas.ts --strict-objects --additional-props-default-value false",
    ...
  }
}
```

**After**:
```json
{
  "name": "@spacecraft/web",
  ...
  "scripts": {
    ...
    "generate:schema": "openapi-zod-client ../../openapi.yaml -o ./lib/generated/api-schemas.ts --strict-objects --additional-props-default-value false",
    ...
  }
}
```

**Commands**:
```bash
# Manual edit or sed
```

**Verification**:
- [ ] `name` is `"@spacecraft/web"`
- [ ] `generate:schema` path is `../../openapi.yaml`
- [ ] `npm run generate:schema --workspace=@spacecraft/web` works from root

**Rollback**:
```bash
# Revert package.json name and path changes
```

---

### Step 5: Update start-dev.sh paths

**What changes**: Update `/start-dev.sh` to reference new paths

**Changes needed**:
- Line 27: `front-end/node_modules` -> `apps/web/node_modules`
- Line 29: `cd front-end` -> `cd apps/web`
- Line 86: `cd "$SCRIPT_DIR/front-end"` -> `cd "$SCRIPT_DIR/apps/web"`

**Verification**:
- [ ] `./start-dev.sh` starts both servers correctly
- [ ] Django runs on port 8000
- [ ] Next.js runs on port 3000

**Rollback**:
```bash
# Revert path changes in start-dev.sh
```

---

### Step 6: Update root .gitignore

**What changes**: Update `/.gitignore` to add Turborepo ignores

**Add these lines**:
```gitignore
# Turborepo
.turbo

# Node
node_modules/
```

**Verification**:
- [ ] `.turbo` and `node_modules/` are ignored
- [ ] Git status doesn't show node_modules

**Rollback**:
```bash
# Remove added lines from .gitignore
```

---

### Step 7: Install dependencies and verify

**Commands**:
```bash
# From repo root
npm install

# Verify turbo is available
npx turbo --version

# Test dev command
npm run dev

# In separate terminal, test build
npm run build

# Test lint
npm run lint

# Test typecheck
npm run typecheck

# Test full check
npm run check

# Test generate:schema
npm run generate:schema
```

**Verification**:
- [ ] `npm install` completes without errors
- [ ] Creates `package-lock.json` at root
- [ ] Creates `node_modules` at root (with turbo)
- [ ] `apps/web/node_modules` is hoisted appropriately
- [ ] `npm run dev` starts both Django and Next.js
- [ ] `npm run build` builds web app
- [ ] `npm run lint` runs ESLint on web
- [ ] `npm run typecheck` runs tsc on web
- [ ] `npm run generate:schema` regenerates API schemas
- [ ] All tests pass: `npm run test:web`

**Rollback**:
```bash
rm -rf node_modules package-lock.json
```

---

### Step 8: Clean up old artifacts (optional)

**What changes**: Remove `/apps/web/node_modules` and `/apps/web/package-lock.json` if hoisting is complete

**Commands**:
```bash
# Only if Step 7 verification passes and hoisting works correctly
rm -rf apps/web/node_modules
rm apps/web/package-lock.json
```

**Verification**:
- [ ] `npm run dev` still works
- [ ] `npm run build` still works
- [ ] All web app functionality intact

**Rollback**:
```bash
cd apps/web && npm install
```

---

## 4. Command Mapping Table

| Old Command | New Command | Notes |
|-------------|-------------|-------|
| `./start-dev.sh` | `npm run dev` OR `./start-dev.sh` | Both work |
| `cd front-end && npm run dev` | `npm run dev:web` | Web only (no Django) |
| `cd front-end && npm run build` | `npm run build` or `npm run build:web` | Turbo caches output |
| `cd front-end && npm run lint` | `npm run lint` or `npm run lint:web` | |
| `cd front-end && npm run typecheck` | `npm run typecheck` or `npm run typecheck:web` | |
| `cd front-end && npm run test` | `npm run test` or `npm run test:web` | |
| `cd front-end && npm run check` | `npm run check` or `npm run check:web` | |
| `cd front-end && npm run generate:schema` | `npm run generate:schema` | |
| `poetry run python manage.py runserver` | `npm run django:dev` | Convenience alias |
| `poetry run python manage.py migrate` | `npm run django:migrate` | Convenience alias |

---

## 5. Risks & Mitigations

### Risk 1: Path alias (@/*) breaks after move
**Likelihood**: Low
**Impact**: High (imports break)
**Mitigation**: The `@/*` alias is relative to tsconfig location, which moves with the project. No change needed.
**Verification**: Run `npm run typecheck` after move.

### Risk 2: .env.local not found
**Likelihood**: Low
**Impact**: High (API calls fail)
**Mitigation**: .env.local moves with the project to apps/web. Next.js automatically loads it from the app directory.
**Verification**: Run dev server and check API connectivity.

### Risk 3: generate:schema path breaks
**Likelihood**: High (will break without fix)
**Impact**: Medium (can't regenerate schemas)
**Mitigation**: Step 4 explicitly updates the path from `../openapi.yaml` to `../../openapi.yaml`.
**Verification**: Run `npm run generate:schema` from root.

### Risk 4: npm workspace hoisting issues
**Likelihood**: Medium
**Impact**: Medium (dependency resolution)
**Mitigation**: Keep apps/web/node_modules initially. Only clean up (Step 8) after verifying everything works.
**Verification**: Run all scripts before cleanup.

### Risk 5: turbopack.root in next.config.ts
**Likelihood**: Low
**Impact**: Low (turbopack specific)
**Mitigation**: `__dirname` is evaluated at runtime, so it will correctly point to apps/web.
**Verification**: Run `npm run dev` and check Next.js starts correctly.

### Risk 6: Git history for moved files
**Likelihood**: Certain (git mv vs mv)
**Impact**: Low (history still accessible)
**Mitigation**: Use `git mv` instead of `mv` if history tracking is important:
```bash
git mv front-end apps/web
```
**Note**: Git can usually track renames even with regular `mv` if the content is similar.

### Risk 7: IDE/editor caches stale
**Likelihood**: Medium
**Impact**: Low (temporary confusion)
**Mitigation**: After migration:
```bash
# Clear VS Code cache
rm -rf .vscode/.ropeproject
# Restart TypeScript server in VS Code: Cmd+Shift+P -> "TypeScript: Restart TS Server"
```

---

## 6. Questions (if any remain unclear)

All information gathered. No blocking questions at this time.

**Assumptions made**:
1. npm workspaces is acceptable (vs pnpm/yarn)
2. Turbo v2.x is acceptable
3. The existing start-dev.sh approach is preferred over switching to concurrently
4. Django scripts remain shell-based (not integrated into turbo pipelines)

---

## 7. Post-Migration Checklist

After completing all steps, verify:

- [ ] `npm run dev` starts both servers (Django:8000, Next.js:3000)
- [ ] `npm run build` completes successfully
- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] `npm run test` runs vitest
- [ ] `npm run generate:schema` regenerates API schemas
- [ ] Frontend loads in browser at http://localhost:3000
- [ ] API calls work (frontend can reach Django backend)
- [ ] Hot reload works for Next.js
- [ ] Django hot reload still works
- [ ] Git status is clean (no unexpected changes)
- [ ] `npx turbo run build --dry-run` shows correct task graph
