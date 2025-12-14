# Frontend Structure Reorganization Plan

## Current Problems

- Components duplicated between `app/dashboard/**/components/` and `features/*/components/`
- Inconsistent naming (PascalCase vs kebab-case)
- Missing test files alongside components
- No index.ts re-exports causing verbose imports like `@/features/planograms/components/grid/grid`
- Page files import from local `./components/` folders instead of features

## Target Structure

### Features Folder Organization (Flat, Domain-Driven)

```
features/
├── auth/                    # Already well-structured ✓
├── dashboard/               # NEW - dashboard-specific components
│   ├── components/
│   │   ├── dashboard-content/
│   │   │   ├── dashboard-content.tsx
│   │   │   └── dashboard-content.test.tsx
│   │   ├── dashboard-header/
│   │   └── index.ts
│   └── index.ts
├── displays/                # Already well-structured ✓
├── planograms/              # Needs consolidation & renaming
│   ├── components/
│   │   ├── grid/
│   │   │   ├── grid.tsx
│   │   │   └── grid.test.tsx
│   │   ├── three-js-view/
│   │   ├── product-sidebar/
│   │   ├── available-products-sidebar/
│   │   ├── item-menu/
│   │   ├── shelves-table/
│   │   ├── category-select/
│   │   ├── planogram-actions/
│   │   ├── planogram-header/
│   │   ├── planogram-form-fields/
│   │   ├── planogram-name-field/
│   │   ├── planogram-categories-selector/
│   │   ├── planogram-delete-button/
│   │   ├── planogram-download-button/
│   │   ├── ai-overview-dialog/
│   │   ├── row-header/
│   │   ├── name-input/           # From /new page
│   │   ├── project-display/      # From /new page
│   │   └── index.ts              # Re-exports all
│   ├── queries/
│   ├── hooks/
│   ├── store/
│   └── types.ts
├── projects/                # Already well-structured ✓
├── stores/                  # Already well-structured ✓
└── users/                   # Already well-structured ✓
```

### App Directory (Pages Only)

```
app/
├── dashboard/
│   ├── page.tsx                    # Imports from @/features/dashboard
│   ├── layout.tsx
│   ├── displays/
│   │   ├── page.tsx
│   │   ├── new/page.tsx
│   │   └── [displaySlug]/page.tsx
│   ├── planograms/
│   │   └── page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   ├── new/page.tsx
│   │   └── [projectSlug]/
│   │       ├── page.tsx
│   │       ├── edit/page.tsx
│   │       └── planograms/
│   │           ├── page.tsx
│   │           ├── new/page.tsx
│   │           └── [planogramSlug]/
│   │               ├── page.tsx
│   │               └── info/page.tsx
│   ├── stores/
│   │   ├── page.tsx
│   │   ├── new/page.tsx
│   │   └── [storeSlug]/
│   │       ├── page.tsx
│   │       └── edit/page.tsx
│   └── users/
│       ├── page.tsx
│       ├── invite/page.tsx
│       └── [userSlug]/page.tsx
├── login/page.tsx
├── register/page.tsx
└── page.tsx
```

## Implementation Steps

### Phase 1: Create Dashboard Feature

- Create `features/dashboard/` structure
- Move `DashboardContent.tsx`, `DashboardHeader.tsx` → `features/dashboard/components/`
- Rename to kebab-case: `dashboard-content/dashboard-content.tsx`, `dashboard-header/dashboard-header.tsx`
- Create `features/dashboard/components/index.ts` with re-exports
- Update `app/dashboard/page.tsx` imports
- Delete `app/dashboard/components/` folder

### Phase 2: Consolidate Planogram Components

The planogram feature has components in TWO locations:

- `features/planogram/components/` (6 components - partially migrated)
- `app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/` (16 components)
- `app/dashboard/projects/[projectSlug]/planograms/new/components/` (6 components)

**Actions:**

- Move all 16 components from `[planogramSlug]/components/` to `features/planogram/components/`
- Move 6 components from `/new/components/` to `features/planogram/components/`
- Rename all to kebab-case (e.g., `PlanogramActions.tsx` → `planogram-actions/planogram-actions.tsx`)
- Handle duplicates: `PlanogramNameField` exists in both locations - keep the one from features, verify they're identical first
- Create component folders with placeholder test files
- Update `features/planogram/components/index.ts` to export all 22+ components
- Update all page.tsx files to import from `@/features/planogram/components`
- Delete component folders from app/ directory

### Phase 3: Update Projects Feature

- Move `ProjectCard.tsx` from `app/dashboard/components/` to `features/projects/components/project-card/`
- Rename to kebab-case: `project-card.tsx`
- Update `features/projects/components/index.ts`
- Update all imports

### Phase 4: Normalize Naming Conventions

- Audit all feature components for naming consistency
- Any PascalCase files → rename to kebab-case
- Ensure all components export named exports (not default) from their feature index.ts

### Phase 5: Create Index Re-exports

Ensure every `components/` folder has comprehensive `index.ts`:

```typescript
// features/planogram/components/index.ts
export { Grid } from './grid/grid';
export { ThreeJSView } from './three-js-view/three-js-view';
export { ProductSidebar } from './product-sidebar/product-sidebar';
export { AvailableProductsSidebar } from './available-products-sidebar/available-products-sidebar';
// ... all 22+ components
```

### Phase 6: Update All Page Imports

Update every `page.tsx` file to use clean imports:

```typescript
// Before:
import Grid from './components/Grid';
import ThreeJSView from './components/ThreeJSView';

// After:
import { Grid, ThreeJSView, ProductSidebar } from '@/features/planogram/components';
```

### Phase 7: Cleanup & Verification

- Delete all empty `components/` folders from `app/` directory
- Remove all unused files, folders, and dead code
- Run linter: `npm run lint`
- Run type checker: `npm run test:typecheck`
- Fix any import errors or type errors
- Verify all pages still render correctly
- Commit changes

## File Movement Summary

### Dashboard Components (3 files)

- `app/dashboard/components/DashboardContent.tsx` → `features/dashboard/components/dashboard-content/dashboard-content.tsx`
- `app/dashboard/components/DashboardHeader.tsx` → `features/dashboard/components/dashboard-header/dashboard-header.tsx`
- `app/dashboard/components/ProjectCard.tsx` → `features/projects/components/project-card/project-card.tsx`

### Planogram Components (22 files to move/consolidate)

From `app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/`:

- `Grid.tsx` → `features/planogram/components/grid/grid.tsx`
- `ThreeJSView.tsx` → `features/planogram/components/three-js-view/three-js-view.tsx`
- `ProductSidebar.tsx` → `features/planogram/components/product-sidebar/product-sidebar.tsx`
- `AvailableProductsSidebar.tsx` → `features/planogram/components/available-products-sidebar/available-products-sidebar.tsx`
- `CategorySelect.tsx` → `features/planogram/components/category-select/category-select.tsx`
- `ItemMenu.tsx` → `features/planogram/components/item-menu/item-menu.tsx`
- `PlanogramActions.tsx` → `features/planogram/components/planogram-actions/planogram-actions.tsx`
- `PlanogramFormFields.tsx` → `features/planogram/components/planogram-form-fields/planogram-form-fields.tsx`
- `PlanogramHeader.tsx` → `features/planogram/components/planogram-header/planogram-header.tsx`
- `ShelvesTable.tsx` → `features/planogram/components/shelves-table/shelves-table.tsx`
- (Plus 6 already partially in features - verify and consolidate)

From `app/dashboard/projects/[projectSlug]/planograms/new/components/`:

- `NameInput.tsx` → `features/planogram/components/name-input/name-input.tsx`
- `ProjectDisplay.tsx` → `features/planogram/components/project-display/project-display.tsx`
- `CategorySelector.tsx`, `CategoryTabs.tsx`, `SeasonSelector.tsx`, `TopLevelCategorySelector.tsx` (evaluate if still needed)

## Benefits

✅ **Single source of truth** - each component lives in exactly one place

✅ **Clean imports** - `@/features/planogram/components` instead of long relative paths

✅ **Co-located tests** - test files right next to components

✅ **Domain-driven** - organized by business logic, not URL structure

✅ **Scalable** - easy to add new features without deep nesting

✅ **Consistent naming** - kebab-case throughout

✅ **Better DX** - IDE autocomplete works better with index re-exports

## Validation Checklist

- [ ] All component folders have kebab-case names
- [ ] All component files are kebab-case
- [ ] Every component has a placeholder `.test.tsx` file
- [ ] Every `components/` folder has `index.ts` with re-exports
- [ ] No components remain in `app/` directory
- [ ] All unused files, folders, and code removed
- [ ] All page imports use feature paths
- [ ] `npm run lint` passes
- [ ] `npm run test:typecheck` passes
- [ ] All pages render without errors

