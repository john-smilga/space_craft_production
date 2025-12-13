# SpaceCraft Frontend Refactoring Steps

## Guiding Principle

**Features contain logic; Pages only render.**

- **Routes (`app/`)** = URL structure, thin page components that compose features
- **Features (`features/`)** = Domain boundaries with components, queries, stores, schemas
- **Components in features** = Grouped by functionality, each in own folder with tests
- **Pages** = Import and render feature components, pass route params, handle navigation

---

## Phase 1: Infrastructure Setup (DONE)

### Step 1.1: Install React Query ✅
- React Query already installed

### Step 1.2: Create React Query client configuration ✅
- `lib/react-query/client.ts` exists
- `lib/react-query/index.ts` exists

### Step 1.3: Create QueryClientProvider wrapper ✅
- `app/providers.tsx` exists
- `app/layout.tsx` uses providers

### Step 1.4: Create Zustand createSelectors helper ✅
- `lib/zustand/create-selectors.ts` exists

---

## Phase 2: Auth Feature (DONE)

### Step 2.1: Auth feature structure ✅
Auth feature is complete at `features/auth/`:
- `store/auth-slice.ts` - Zustand store with selectors
- `queries/` - React Query hooks (login, logout, register, current-user)
- `hooks/` - useIsAdmin, useRequireAdmin
- `schemas/` - Zod validation
- `types.ts` - Auth types

### Step 2.2: Move LoginForm to features ✅
- **Current**: `app/login/components/LoginForm.tsx`
- **Target**: Already using features/auth queries
- **Page**: `app/login/page.tsx` should import from features

---

## Phase 3: Stores Feature (Move Components to Features)

### Step 3.1: Create stores feature structure
- **Goal**: Complete feature with queries, schemas, types, AND components
- **Files to create**:
  ```
  features/stores/
  ├── index.ts                           # Public exports
  ├── types.ts                           # Store types
  ├── queries/
  │   ├── index.ts
  │   ├── use-stores-query.ts            # List stores
  │   ├── use-store-query.ts             # Single store
  │   ├── use-create-store-mutation.ts
  │   ├── use-update-store-mutation.ts
  │   └── use-delete-store-mutation.ts
  ├── schemas/
  │   ├── index.ts
  │   └── store-form-schema.ts           # Zod validation
  └── components/
      ├── index.ts                       # Re-exports
      ├── store-list/
      │   ├── store-list.tsx
      │   └── store-list.test.tsx
      ├── store-card/
      │   ├── store-card.tsx             # Move from app/dashboard/stores/components/
      │   └── store-card.test.tsx
      ├── store-form/
      │   ├── store-form.tsx             # Create/Edit form
      │   └── store-form.test.tsx
      └── store-detail/
          ├── store-detail.tsx
          └── store-detail.test.tsx
  ```
- **Risk**: Medium
- **Verify**: TypeScript compiles

### Step 3.2: Move store components from app/ to features/
- **Goal**: Components live in features, not routes
- **Files to move**:
  - `app/dashboard/stores/components/StoreCard.tsx` → `features/stores/components/store-card/store-card.tsx`
- **Files to create** (extract from pages):
  - `features/stores/components/store-list/store-list.tsx` (from `app/dashboard/stores/page.tsx`)
  - `features/stores/components/store-form/store-form.tsx` (from `app/dashboard/stores/new/page.tsx` + edit)
- **Risk**: Medium
- **Verify**: Store pages render correctly

### Step 3.3: Make store pages thin
- **Goal**: Pages only import and render feature components
- **Files to change**:
  - `app/dashboard/stores/page.tsx` → imports `<StoreList />` from features
  - `app/dashboard/stores/new/page.tsx` → imports `<StoreForm />` from features
  - `app/dashboard/stores/[storeSlug]/page.tsx` → imports `<StoreDetail />` from features
  - `app/dashboard/stores/[storeSlug]/edit/page.tsx` → imports `<StoreForm />` from features
- **Pattern**:
  ```tsx
  // app/dashboard/stores/page.tsx (THIN PAGE)
  import { StoreList } from '@/features/stores/components';

  export default function StoresPage() {
    return <StoreList />;
  }
  ```
- **Risk**: Low
- **Verify**: All store routes work

---

## Phase 4: Displays Feature (Move Components to Features)

### Step 4.1: Create displays feature structure
- **Goal**: Complete feature with components
- **Files to create**:
  ```
  features/displays/
  ├── index.ts
  ├── types.ts
  ├── queries/
  │   ├── index.ts
  │   ├── use-displays-query.ts
  │   ├── use-display-query.ts
  │   ├── use-display-types-query.ts
  │   ├── use-standard-displays-query.ts
  │   ├── use-create-display-mutation.ts
  │   └── use-delete-display-mutation.ts
  ├── schemas/
  │   ├── index.ts
  │   └── display-form-schema.ts
  └── components/
      ├── index.ts
      ├── display-list/
      │   ├── display-list.tsx
      │   └── display-list.test.tsx
      ├── display-card/
      │   ├── display-card.tsx
      │   └── display-card.test.tsx
      ├── display-form/
      │   ├── display-form.tsx
      │   └── display-form.test.tsx
      └── display-selector/
          ├── display-selector.tsx         # For planogram creation
          └── display-selector.test.tsx
  ```
- **Risk**: Medium
- **Verify**: TypeScript compiles

### Step 4.2: Move display components to features
- **Goal**: Extract components from pages
- **Files to create** (extract from pages):
  - `features/displays/components/display-list/display-list.tsx`
  - `features/displays/components/display-form/display-form.tsx`
- **Files to move**:
  - `app/dashboard/projects/[projectSlug]/planograms/new/components/DisplaySelector.tsx` → `features/displays/components/display-selector/display-selector.tsx`
- **Risk**: Medium
- **Verify**: Display pages and planogram creation work

### Step 4.3: Make display pages thin
- **Goal**: Pages only render feature components
- **Files to change**:
  - `app/dashboard/displays/page.tsx` → imports `<DisplayList />`
  - `app/dashboard/displays/new/page.tsx` → imports `<DisplayForm />`
  - `app/dashboard/displays/[displaySlug]/page.tsx` → imports `<DisplayDetail />`
- **Risk**: Low
- **Verify**: All display routes work

---

## Phase 5: Projects Feature (Move Components to Features)

### Step 5.1: Create projects feature structure
- **Goal**: Complete feature with components
- **Files to create**:
  ```
  features/projects/
  ├── index.ts
  ├── types.ts
  ├── queries/
  │   ├── index.ts
  │   ├── use-projects-query.ts
  │   ├── use-project-query.ts
  │   ├── use-create-project-mutation.ts
  │   ├── use-update-project-mutation.ts
  │   └── use-delete-project-mutation.ts
  ├── schemas/
  │   ├── index.ts
  │   └── project-form-schema.ts
  └── components/
      ├── index.ts
      ├── project-list/
      │   ├── project-list.tsx
      │   └── project-list.test.tsx
      ├── project-card/
      │   ├── project-card.tsx
      │   └── project-card.test.tsx
      ├── project-form/
      │   ├── project-form.tsx            # Create/Edit
      │   └── project-form.test.tsx
      ├── project-detail/
      │   ├── project-detail.tsx
      │   └── project-detail.test.tsx
      ├── project-planograms-card/
      │   ├── project-planograms-card.tsx  # Move from app/
      │   └── project-planograms-card.test.tsx
      └── no-stores-alert/
          ├── no-stores-alert.tsx          # Move from app/
          └── no-stores-alert.test.tsx
  ```
- **Risk**: Medium
- **Verify**: TypeScript compiles

### Step 5.2: Move project components to features
- **Goal**: Components in features, not routes
- **Files to move**:
  - `app/dashboard/projects/components/CreateProjectForm.tsx` → `features/projects/components/project-form/project-form.tsx`
  - `app/dashboard/projects/components/NoStoresAlert.tsx` → `features/projects/components/no-stores-alert/no-stores-alert.tsx`
  - `app/dashboard/projects/[projectSlug]/components/ProjectDetailsCard.tsx` → `features/projects/components/project-detail/project-detail.tsx`
  - `app/dashboard/projects/[projectSlug]/components/ProjectPlanogramsCard.tsx` → `features/projects/components/project-planograms-card/project-planograms-card.tsx`
  - `app/dashboard/projects/[projectSlug]/components/ProjectErrorAlert.tsx` → remove (inline or shared component)
- **Risk**: Medium
- **Verify**: Project pages render correctly

### Step 5.3: Make project pages thin
- **Goal**: Pages only render feature components
- **Files to change**:
  - `app/dashboard/projects/page.tsx` → imports `<ProjectList />`
  - `app/dashboard/projects/new/page.tsx` → imports `<ProjectForm />`
  - `app/dashboard/projects/[projectSlug]/page.tsx` → imports `<ProjectDetail />`
  - `app/dashboard/projects/[projectSlug]/edit/page.tsx` → imports `<ProjectForm />`
- **Delete empty directories**:
  - `app/dashboard/projects/components/`
  - `app/dashboard/projects/[projectSlug]/components/`
- **Risk**: Low
- **Verify**: All project routes work

---

## Phase 6: Users Feature (Move Components to Features)

### Step 6.1: Create users feature structure
- **Goal**: Complete feature with components
- **Files to create**:
  ```
  features/users/
  ├── index.ts
  ├── types.ts
  ├── queries/
  │   ├── index.ts
  │   ├── use-users-query.ts
  │   ├── use-user-query.ts
  │   ├── use-invite-user-mutation.ts
  │   └── use-delete-user-mutation.ts
  ├── schemas/
  │   ├── index.ts
  │   └── invite-user-schema.ts
  └── components/
      ├── index.ts
      ├── user-list/
      │   ├── user-list.tsx
      │   └── user-list.test.tsx
      ├── user-detail/
      │   ├── user-detail.tsx
      │   └── user-detail.test.tsx
      └── invite-user-form/
          ├── invite-user-form.tsx
          └── invite-user-form.test.tsx
  ```
- **Risk**: Low
- **Verify**: TypeScript compiles

### Step 6.2: Extract user components to features
- **Goal**: Extract from pages into feature components
- **Files to change**:
  - Extract list logic from `app/dashboard/users/page.tsx` → `features/users/components/user-list/user-list.tsx`
  - Extract form from `app/dashboard/users/invite/page.tsx` → `features/users/components/invite-user-form/invite-user-form.tsx`
  - Extract detail from `app/dashboard/users/[userSlug]/page.tsx` → `features/users/components/user-detail/user-detail.tsx`
- **Risk**: Low
- **Verify**: User management works

### Step 6.3: Make user pages thin
- **Goal**: Pages only render feature components
- **Files to change**:
  - `app/dashboard/users/page.tsx` → imports `<UserList />`
  - `app/dashboard/users/invite/page.tsx` → imports `<InviteUserForm />`
  - `app/dashboard/users/[userSlug]/page.tsx` → imports `<UserDetail />`
- **Risk**: Low
- **Verify**: All user routes work

---

## Phase 7: Planogram Feature (MAJOR - Move 17 Components)

### Step 7.1: Complete planogram feature structure
- **Goal**: Move ALL 17 components + 5 hooks from app/ to features/
- **Current location**: `app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/`
- **Target structure**:
  ```
  features/planogram/
  ├── index.ts
  ├── types.ts
  ├── store/
  │   ├── index.ts
  │   └── planogram-slice.ts              # Consolidated store (already exists)
  ├── queries/
  │   ├── index.ts
  │   ├── use-planogram-query.ts
  │   ├── use-planogram-grid-query.ts
  │   ├── use-update-planogram-mutation.ts
  │   ├── use-save-layout-mutation.ts
  │   ├── use-ai-overview-mutation.ts
  │   └── use-available-products-query.ts
  ├── hooks/
  │   ├── index.ts
  │   ├── use-planogram-data.ts           # Move from app/
  │   ├── use-planogram-form.ts           # Move from app/
  │   ├── use-planogram-layout.ts         # Move from app/
  │   └── use-grid-actions.ts             # Move from app/
  ├── schemas/
  │   ├── index.ts
  │   ├── planogram-schema.ts
  │   └── grid-schema.ts
  └── components/
      ├── index.ts
      ├── planogram-editor/               # Main editor container
      │   ├── planogram-editor.tsx
      │   └── planogram-editor.test.tsx
      ├── planogram-grid/
      │   ├── planogram-grid.tsx          # Move Grid.tsx
      │   └── planogram-grid.test.tsx
      ├── planogram-3d-view/
      │   ├── planogram-3d-view.tsx       # Move ThreeJSView.tsx
      │   └── planogram-3d-view.test.tsx
      ├── product-sidebar/
      │   ├── product-sidebar.tsx         # Move ProductSidebar.tsx
      │   └── product-sidebar.test.tsx
      ├── available-products-sidebar/
      │   ├── available-products-sidebar.tsx
      │   └── available-products-sidebar.test.tsx
      ├── planogram-header/
      │   ├── planogram-header.tsx
      │   └── planogram-header.test.tsx
      ├── planogram-form-fields/
      │   ├── planogram-form-fields.tsx
      │   └── planogram-form-fields.test.tsx
      ├── planogram-actions/
      │   ├── planogram-actions.tsx
      │   └── planogram-actions.test.tsx
      ├── planogram-categories-selector/
      │   ├── planogram-categories-selector.tsx
      │   └── planogram-categories-selector.test.tsx
      ├── shelves-table/
      │   ├── shelves-table.tsx
      │   └── shelves-table.test.tsx
      ├── row-header/
      │   ├── row-header.tsx
      │   └── row-header.test.tsx
      ├── item-menu/
      │   ├── item-menu.tsx
      │   └── item-menu.test.tsx
      ├── ai-overview-dialog/
      │   ├── ai-overview-dialog.tsx
      │   └── ai-overview-dialog.test.tsx
      ├── planogram-download-button/
      │   ├── planogram-download-button.tsx
      │   └── planogram-download-button.test.tsx
      ├── planogram-delete-button/
      │   ├── planogram-delete-button.tsx
      │   └── planogram-delete-button.test.tsx
      ├── planogram-name-field/
      │   ├── planogram-name-field.tsx
      │   └── planogram-name-field.test.tsx
      ├── category-select/
      │   ├── category-select.tsx
      │   └── category-select.test.tsx
      ├── planogram-list/
      │   ├── planogram-list.tsx
      │   └── planogram-list.test.tsx
      ├── planogram-card/
      │   ├── planogram-card.tsx          # Move from app/dashboard/planograms/components/
      │   └── planogram-card.test.tsx
      └── planogram-create-wizard/
          ├── planogram-create-wizard.tsx  # For /new page
          ├── planogram-create-wizard.test.tsx
          ├── name-input.tsx               # Sub-components
          ├── category-selector.tsx
          ├── category-tabs.tsx
          ├── season-selector.tsx
          └── project-display.tsx
  ```
- **Risk**: High (largest migration)
- **Verify**: TypeScript compiles

### Step 7.2: Move planogram hooks to features
- **Goal**: Hooks in features, not routes
- **Files to move**:
  - `app/.../[planogramSlug]/hooks/usePlanogramData.ts` → `features/planogram/hooks/use-planogram-data.ts`
  - `app/.../[planogramSlug]/hooks/usePlanogramForm.ts` → `features/planogram/hooks/use-planogram-form.ts`
  - `app/.../[planogramSlug]/hooks/usePlanogramLayout.ts` → `features/planogram/hooks/use-planogram-layout.ts`
  - `app/.../[planogramSlug]/hooks/useGridActions.ts` → `features/planogram/hooks/use-grid-actions.ts`
  - `app/.../[planogramSlug]/hooks/useAIOverview.ts` → merge into `features/planogram/queries/use-ai-overview-mutation.ts`
- **Rename to kebab-case** during move
- **Risk**: Medium
- **Verify**: Hooks import correctly

### Step 7.3: Move planogram editor components to features
- **Goal**: All editor components in features
- **Files to move** (rename to kebab-case):
  - `Grid.tsx` → `features/planogram/components/planogram-grid/planogram-grid.tsx`
  - `ThreeJSView.tsx` → `features/planogram/components/planogram-3d-view/planogram-3d-view.tsx`
  - `ProductSidebar.tsx` → `features/planogram/components/product-sidebar/product-sidebar.tsx`
  - `AvailableProductsSidebar.tsx` → `features/planogram/components/available-products-sidebar/available-products-sidebar.tsx`
  - `PlanogramHeader.tsx` → `features/planogram/components/planogram-header/planogram-header.tsx`
  - `PlanogramFormFields.tsx` → `features/planogram/components/planogram-form-fields/planogram-form-fields.tsx`
  - `PlanogramActions.tsx` → `features/planogram/components/planogram-actions/planogram-actions.tsx`
  - `PlanogramCategoriesSelector.tsx` → `features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx`
  - `ShelvesTable.tsx` → `features/planogram/components/shelves-table/shelves-table.tsx`
  - `RowHeader.tsx` → `features/planogram/components/row-header/row-header.tsx`
  - `ItemMenu.tsx` → `features/planogram/components/item-menu/item-menu.tsx`
  - `AIOverviewDialog.tsx` → `features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx`
  - `PlanogramDownloadButton.tsx` → `features/planogram/components/planogram-download-button/planogram-download-button.tsx`
  - `PlanogramDeleteButton.tsx` → `features/planogram/components/planogram-delete-button/planogram-delete-button.tsx`
  - `PlanogramNameField.tsx` → `features/planogram/components/planogram-name-field/planogram-name-field.tsx`
  - `CategorySelect.tsx` → `features/planogram/components/category-select/category-select.tsx`
  - `categoryColors.ts` → `features/planogram/utils/category-colors.ts`
- **Risk**: High
- **Verify**: Components render

### Step 7.4: Move planogram creation wizard components
- **Goal**: Move /new page components to features
- **Files to move**:
  - `app/.../planograms/new/components/NameInput.tsx` → `features/planogram/components/planogram-create-wizard/name-input.tsx`
  - `app/.../planograms/new/components/CategorySelector.tsx` → `features/planogram/components/planogram-create-wizard/category-selector.tsx`
  - `app/.../planograms/new/components/TopLevelCategorySelector.tsx` → merge into category-selector
  - `app/.../planograms/new/components/CategoryTabs.tsx` → `features/planogram/components/planogram-create-wizard/category-tabs.tsx`
  - `app/.../planograms/new/components/SeasonSelector.tsx` → `features/planogram/components/planogram-create-wizard/season-selector.tsx`
  - `app/.../planograms/new/components/ProjectDisplay.tsx` → `features/planogram/components/planogram-create-wizard/project-display.tsx`
  - `app/.../planograms/new/utils.ts` → `features/planogram/utils/create-wizard-utils.ts`
- **Risk**: Medium
- **Verify**: Planogram creation works

### Step 7.5: Move planogram list components
- **Goal**: Move list/card components to features
- **Files to move**:
  - `app/dashboard/planograms/components/PlanogramCard.tsx` → `features/planogram/components/planogram-card/planogram-card.tsx`
- **Files to create**:
  - `features/planogram/components/planogram-list/planogram-list.tsx` (extract from page)
- **Risk**: Low
- **Verify**: Planogram list page works

### Step 7.6: Create main PlanogramEditor component
- **Goal**: Single container component that composes all editor parts
- **File to create**: `features/planogram/components/planogram-editor/planogram-editor.tsx`
- **Pattern**:
  ```tsx
  // Composes: Header, Grid/3DView, Sidebars, Actions
  export function PlanogramEditor({ planogramSlug, projectSlug }: Props) {
    // Uses hooks from features/planogram/hooks/
    // Renders sub-components from features/planogram/components/
  }
  ```
- **Risk**: Medium
- **Verify**: Editor loads and functions

### Step 7.7: Make planogram pages thin
- **Goal**: Pages only render feature components
- **Files to change**:
  - `app/dashboard/planograms/page.tsx` → imports `<PlanogramList />`
  - `app/dashboard/projects/[projectSlug]/planograms/page.tsx` → imports `<PlanogramList />`
  - `app/dashboard/projects/[projectSlug]/planograms/new/page.tsx` → imports `<PlanogramCreateWizard />`
  - `app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx` → imports `<PlanogramEditor />`
  - `app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/info/page.tsx` → imports `<PlanogramDetail />`
- **Delete directories after migration**:
  - `app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/`
  - `app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/hooks/`
  - `app/dashboard/projects/[projectSlug]/planograms/new/components/`
  - `app/dashboard/planograms/components/`
- **Risk**: High
- **Verify**: All planogram routes work

---

## Phase 8: Dashboard Feature

### Step 8.1: Create dashboard feature structure
- **Goal**: Move dashboard components to features
- **Files to create**:
  ```
  features/dashboard/
  ├── index.ts
  ├── components/
  │   ├── index.ts
  │   ├── dashboard-header/
  │   │   ├── dashboard-header.tsx        # Move from app/
  │   │   └── dashboard-header.test.tsx
  │   ├── dashboard-content/
  │   │   ├── dashboard-content.tsx       # Move from app/
  │   │   └── dashboard-content.test.tsx
  │   └── project-card/
  │       ├── project-card.tsx            # Move from app/
  │       └── project-card.test.tsx
  └── queries/
      ├── index.ts
      └── use-dashboard-stats-query.ts    # If needed
  ```
- **Risk**: Low
- **Verify**: Dashboard page works

### Step 8.2: Move dashboard components
- **Files to move**:
  - `app/dashboard/components/DashboardHeader.tsx` → `features/dashboard/components/dashboard-header/dashboard-header.tsx`
  - `app/dashboard/components/DashboardContent.tsx` → `features/dashboard/components/dashboard-content/dashboard-content.tsx`
  - `app/dashboard/components/ProjectCard.tsx` → `features/dashboard/components/project-card/project-card.tsx`
- **Delete**: `app/dashboard/components/` directory
- **Risk**: Low
- **Verify**: Dashboard renders

---

## Phase 9: Cleanup

### Step 9.1: Remove old hooks directory
- **Goal**: Delete legacy hooks
- **Files to delete**:
  - `hooks/useFetch.ts`
  - `hooks/useMutation.ts`
  - `hooks/usePaginatedFetch.ts`
- **Risk**: Low (verify no imports first)
- **Verify**: Build succeeds

### Step 9.2: Remove old stores directory
- **Goal**: Delete legacy Zustand stores
- **Files to delete**:
  - `stores/planogramFormStore.ts`
  - `stores/planogramLayoutStore.ts`
  - `stores/planogramUIStore.ts`
  - `stores/planogramAvailableProductsStore.ts`
  - `stores/planogramSidebarStore.ts`
  - `stores/planogramDownloadStore.ts`
  - `stores/planogramAIStore.ts`
- **Keep**: `stores/themeStore.ts` (or move to `features/ui/`)
- **Risk**: Low
- **Verify**: Build succeeds

### Step 9.3: Clean up types directory
- **Goal**: Only shared types remain in types/
- **Files to move**:
  - `types/planograms.ts` → `features/planogram/types.ts` (merge)
  - `types/projects.ts` → `features/projects/types.ts` (merge)
  - `types/stores.ts` → `features/stores/types.ts` (merge)
  - `types/displays.ts` → `features/displays/types.ts` (merge)
  - `types/auth.ts` → `features/auth/types.ts` (merge)
- **Keep in types/**:
  - `types/api.ts` - Shared API types
  - `types/common.ts` - Shared utility types
- **Risk**: Low
- **Verify**: All imports resolve

### Step 9.4: Verify all app/ directories are clean
- **Goal**: No components/hooks directories in app/
- **Expected final app/ structure**:
  ```
  app/
  ├── layout.tsx
  ├── page.tsx
  ├── providers.tsx
  ├── globals.css
  ├── login/
  │   └── page.tsx           # Thin: imports LoginForm from features/auth
  ├── register/
  │   └── page.tsx           # Thin
  └── dashboard/
      ├── layout.tsx
      ├── page.tsx           # Thin: imports DashboardContent from features/dashboard
      ├── my-profile/
      │   └── page.tsx
      ├── stores/
      │   ├── page.tsx       # Thin
      │   ├── new/page.tsx   # Thin
      │   └── [storeSlug]/
      │       ├── page.tsx   # Thin
      │       └── edit/page.tsx
      ├── displays/
      │   ├── page.tsx       # Thin
      │   ├── new/page.tsx   # Thin
      │   └── [displaySlug]/page.tsx
      ├── projects/
      │   ├── page.tsx       # Thin
      │   ├── new/page.tsx   # Thin
      │   └── [projectSlug]/
      │       ├── page.tsx   # Thin
      │       ├── edit/page.tsx
      │       └── planograms/
      │           ├── page.tsx
      │           ├── new/page.tsx
      │           └── [planogramSlug]/
      │               ├── page.tsx
      │               └── info/page.tsx
      ├── planograms/
      │   └── page.tsx       # Thin
      └── users/
          ├── page.tsx       # Thin
          ├── invite/page.tsx
          └── [userSlug]/page.tsx
  ```
- **NO components/ or hooks/ directories should exist in app/**
- **Risk**: Low
- **Verify**: Build succeeds, all routes work

### Step 9.5: Add re-export index files
- **Goal**: Clean public APIs for each feature
- **Files to verify/create**: Each feature has `index.ts` that re-exports:
  - Components
  - Queries/mutations
  - Types
  - Store (if applicable)
- **Pattern**:
  ```tsx
  // features/stores/index.ts
  export * from './components';
  export * from './queries';
  export * from './types';
  ```
- **Risk**: Low
- **Verify**: Imports work with `@/features/stores`

---

## Phase 10: Testing Infrastructure Setup

### Step 10.1: Install testing dependencies
- **Goal**: Add all testing libraries
- **Command**:
  ```bash
  npm install -D vitest @vitest/coverage-v8 @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom msw @faker-js/faker
  ```
- **Libraries**:
  | Library | Purpose |
  |---------|---------|
  | `vitest` | Test runner (fast, ESM-native) |
  | `@vitest/coverage-v8` | Code coverage |
  | `@testing-library/react` | Component testing |
  | `@testing-library/user-event` | User interaction simulation |
  | `@testing-library/jest-dom` | Custom matchers |
  | `jsdom` | DOM environment |
  | `msw` | API mocking at network level |
  | `@faker-js/faker` | Test data generation |
- **Risk**: Low
- **Verify**: `npm install` succeeds

### Step 10.2: Create Vitest configuration
- **Goal**: Configure Vitest for Next.js + React
- **File to create**: `vitest.config.ts`
- **Content**:
  ```typescript
  import { defineConfig } from 'vitest/config';
  import react from '@vitejs/plugin-react';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./vitest.setup.ts'],
      include: ['**/*.test.{ts,tsx}'],
      exclude: ['node_modules', '.next', 'e2e'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/',
          '.next/',
          '**/*.d.ts',
          '**/*.config.*',
          '**/index.ts',
          'app/**/page.tsx',      // Thin pages excluded
          'app/**/layout.tsx',
        ],
        thresholds: {
          global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
      },
    },
  });
  ```
- **Risk**: Low
- **Verify**: `npx vitest --version` works

### Step 10.3: Create Vitest setup file
- **Goal**: Configure global test setup
- **File to create**: `vitest.setup.ts`
- **Content**:
  ```typescript
  import '@testing-library/jest-dom/vitest';
  import { cleanup } from '@testing-library/react';
  import { afterEach, beforeAll, afterAll } from 'vitest';
  import { server } from './lib/test-utils/msw-server';

  // Cleanup after each test
  afterEach(() => {
    cleanup();
  });

  // MSW server setup
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  ```
- **Risk**: Low
- **Verify**: Setup file compiles

### Step 10.4: Create test utilities
- **Goal**: Shared testing utilities for all tests
- **Files to create**:
  ```
  lib/test-utils/
  ├── index.ts                    # Re-exports
  ├── render.tsx                  # Custom render with providers
  ├── msw-server.ts              # MSW server setup
  ├── msw-handlers.ts            # Default API handlers
  ├── factories/
  │   ├── index.ts
  │   ├── user-factory.ts        # User test data
  │   ├── store-factory.ts       # Store test data
  │   ├── project-factory.ts     # Project test data
  │   ├── display-factory.ts     # Display test data
  │   └── planogram-factory.ts   # Planogram test data
  └── mocks/
      ├── next-navigation.ts     # Mock useRouter, useParams
      └── next-image.ts          # Mock next/image
  ```
- **Risk**: Low
- **Verify**: Imports work

### Step 10.5: Create custom render function
- **Goal**: Render components with all providers (React Query, Zustand, Router)
- **File to create**: `lib/test-utils/render.tsx`
- **Content**:
  ```typescript
  import { render, type RenderOptions } from '@testing-library/react';
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
  import { type ReactElement, type ReactNode } from 'react';

  // Create fresh QueryClient for each test
  const createTestQueryClient = () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
          staleTime: 0,
        },
        mutations: {
          retry: false,
        },
      },
    });

  type CustomRenderOptions = Omit<RenderOptions, 'wrapper'> & {
    queryClient?: QueryClient;
  };

  export function renderWithProviders(
    ui: ReactElement,
    options: CustomRenderOptions = {}
  ) {
    const { queryClient = createTestQueryClient(), ...renderOptions } = options;

    function Wrapper({ children }: { children: ReactNode }) {
      return (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );
    }

    return {
      ...render(ui, { wrapper: Wrapper, ...renderOptions }),
      queryClient,
    };
  }

  // Re-export everything from RTL
  export * from '@testing-library/react';
  export { renderWithProviders as render };
  ```
- **Risk**: Low
- **Verify**: Custom render works

### Step 10.6: Create MSW server and handlers
- **Goal**: Mock all API endpoints at network level
- **File to create**: `lib/test-utils/msw-server.ts`
- **Content**:
  ```typescript
  import { setupServer } from 'msw/node';
  import { handlers } from './msw-handlers';

  export const server = setupServer(...handlers);
  ```
- **File to create**: `lib/test-utils/msw-handlers.ts`
- **Content**:
  ```typescript
  import { http, HttpResponse } from 'msw';
  import { createUser, createStore, createProject } from './factories';

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

  export const handlers = [
    // Auth handlers
    http.get(`${API_URL}/auth/me/`, () => {
      return HttpResponse.json({ user: createUser() });
    }),

    http.post(`${API_URL}/auth/login/`, async ({ request }) => {
      const body = await request.json();
      if (body.email === 'test@example.com') {
        return HttpResponse.json({ user: createUser() });
      }
      return HttpResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }),

    http.post(`${API_URL}/auth/logout/`, () => {
      return HttpResponse.json({ success: true });
    }),

    // Stores handlers
    http.get(`${API_URL}/stores/`, () => {
      return HttpResponse.json({
        stores: [createStore(), createStore(), createStore()],
      });
    }),

    http.get(`${API_URL}/stores/:slug/`, ({ params }) => {
      return HttpResponse.json({ store: createStore({ slug: params.slug }) });
    }),

    // Projects handlers
    http.get(`${API_URL}/projects/`, () => {
      return HttpResponse.json({
        projects: [createProject(), createProject()],
      });
    }),

    // Add more handlers as needed...
  ];
  ```
- **Risk**: Low
- **Verify**: MSW server starts

### Step 10.7: Create test data factories
- **Goal**: Generate realistic test data with Faker
- **File to create**: `lib/test-utils/factories/user-factory.ts`
- **Pattern**:
  ```typescript
  import { faker } from '@faker-js/faker';
  import type { User } from '@/features/auth/types';

  export function createUser(overrides: Partial<User> = {}): User {
    return {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      role: 'member',
      companyId: faker.string.uuid(),
      companyName: faker.company.name(),
      createdAt: faker.date.past().toISOString(),
      ...overrides,
    };
  }

  export function createAdmin(overrides: Partial<User> = {}): User {
    return createUser({ role: 'admin', ...overrides });
  }
  ```
- **Create similar factories for**: Store, Project, Display, Planogram
- **Risk**: Low
- **Verify**: Factories generate valid data

### Step 10.8: Create Next.js mocks
- **Goal**: Mock Next.js specific modules
- **File to create**: `lib/test-utils/mocks/next-navigation.ts`
- **Content**:
  ```typescript
  import { vi } from 'vitest';

  export const mockRouter = {
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  };

  export const mockParams = {};
  export const mockSearchParams = new URLSearchParams();

  vi.mock('next/navigation', () => ({
    useRouter: () => mockRouter,
    useParams: () => mockParams,
    useSearchParams: () => mockSearchParams,
    usePathname: () => '/',
  }));
  ```
- **Risk**: Low
- **Verify**: Mocks work in tests

### Step 10.9: Add npm scripts
- **Goal**: Add test scripts to package.json
- **File to change**: `package.json`
- **Scripts to add**:
  ```json
  {
    "scripts": {
      "test": "vitest",
      "test:run": "vitest run",
      "test:coverage": "vitest run --coverage",
      "test:ui": "vitest --ui",
      "test:watch": "vitest --watch"
    }
  }
  ```
- **Risk**: Low
- **Verify**: `npm test` runs

---

## Phase 11: Feature Testing (80% Coverage Target)

### Testing Strategy

**What to test (in priority order):**
1. **React Query hooks** - API calls, loading/error/success states
2. **Zustand stores** - State changes, actions, selectors
3. **Feature components** - User interactions, conditional rendering
4. **Form components** - Validation, submission, error display
5. **Shared components** - Props handling, accessibility

**What NOT to test:**
- Thin page components (just render feature components)
- Third-party libraries (shadcn/ui internals)
- Type definitions

---

### Step 11.1: Test auth feature
- **Goal**: Full test coverage for auth feature
- **Files to create**:
  ```
  features/auth/
  ├── store/
  │   └── auth-slice.test.ts           # Store tests
  ├── queries/
  │   ├── use-login-mutation.test.ts
  │   ├── use-logout-mutation.test.ts
  │   ├── use-register-mutation.test.ts
  │   └── use-current-user-query.test.ts
  ├── hooks/
  │   ├── use-is-admin.test.ts
  │   └── use-require-admin.test.ts
  └── components/
      └── login-form/
          └── login-form.test.tsx       # If component exists
  ```
- **Tests to write**:
  - Store: `setUser`, `clearUser`, `isAuthenticated` selector
  - Queries: success/error states, cache invalidation
  - Hooks: admin check logic, redirect behavior
- **Risk**: Medium (critical path)
- **Verify**: `npm test features/auth` passes, coverage ≥80%

### Step 11.2: Test stores feature
- **Goal**: Full test coverage for stores feature
- **Files to create**:
  ```
  features/stores/
  ├── queries/
  │   ├── use-stores-query.test.ts
  │   ├── use-store-query.test.ts
  │   ├── use-create-store-mutation.test.ts
  │   ├── use-update-store-mutation.test.ts
  │   └── use-delete-store-mutation.test.ts
  └── components/
      ├── store-list/
      │   └── store-list.test.tsx
      ├── store-card/
      │   └── store-card.test.tsx
      ├── store-form/
      │   └── store-form.test.tsx
      └── store-detail/
          └── store-detail.test.tsx
  ```
- **Test patterns**:
  ```typescript
  // Query test example
  describe('useStoresQuery', () => {
    it('fetches stores successfully', async () => {
      const { result } = renderHook(() => useStoresQuery(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data?.stores).toHaveLength(3);
    });

    it('handles error state', async () => {
      server.use(
        http.get('*/stores/', () => HttpResponse.error())
      );

      const { result } = renderHook(() => useStoresQuery(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isError).toBe(true));
    });
  });

  // Component test example
  describe('StoreList', () => {
    it('renders loading state', () => {
      render(<StoreList />);
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('renders stores after loading', async () => {
      render(<StoreList />);

      await waitFor(() => {
        expect(screen.getByText('Store 1')).toBeInTheDocument();
      });
    });

    it('navigates to store detail on click', async () => {
      const user = userEvent.setup();
      render(<StoreList />);

      await waitFor(() => screen.getByText('Store 1'));
      await user.click(screen.getByText('Store 1'));

      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard/stores/store-1');
    });
  });
  ```
- **Risk**: Low
- **Verify**: Coverage ≥80%

### Step 11.3: Test displays feature
- **Goal**: Full test coverage for displays feature
- **Files to create**: Same pattern as stores
- **Key tests**:
  - Display list with standard/custom filtering
  - Display form validation
  - Display selector in planogram creation
- **Risk**: Low
- **Verify**: Coverage ≥80%

### Step 11.4: Test projects feature
- **Goal**: Full test coverage for projects feature
- **Files to create**: Same pattern as stores
- **Key tests**:
  - Project list filtered by company
  - Project creation with store selection
  - NoStoresAlert when no stores exist
  - Project detail with planogram count
- **Risk**: Low
- **Verify**: Coverage ≥80%

### Step 11.5: Test users feature
- **Goal**: Full test coverage for users feature
- **Files to create**: Same pattern as stores
- **Key tests**:
  - User list (admin only)
  - Invite user form validation
  - User deletion confirmation
- **Risk**: Low
- **Verify**: Coverage ≥80%

### Step 11.6: Test planogram feature - Store & Queries
- **Goal**: Test planogram Zustand store and React Query hooks
- **Files to create**:
  ```
  features/planogram/
  ├── store/
  │   └── planogram-slice.test.ts
  └── queries/
      ├── use-planogram-query.test.ts
      ├── use-planogram-grid-query.test.ts
      ├── use-update-planogram-mutation.test.ts
      ├── use-save-layout-mutation.test.ts
      ├── use-ai-overview-mutation.test.ts
      └── use-available-products-query.test.ts
  ```
- **Store tests**:
  - Form state: setName, setDisplay, setCategories, setSeason
  - Layout state: setGrid, updateCell, clearCell
  - UI state: sidebar toggles, notifications
  - Products state: setAvailableProducts, filter
- **Query tests**:
  - Planogram fetch by slug
  - Grid calculation response
  - Layout save optimistic update
  - AI overview loading state
- **Risk**: High (complex state)
- **Verify**: Coverage ≥80%

### Step 11.7: Test planogram feature - Hooks
- **Goal**: Test custom planogram hooks
- **Files to create**:
  ```
  features/planogram/hooks/
  ├── use-planogram-data.test.ts
  ├── use-planogram-form.test.ts
  ├── use-planogram-layout.test.ts
  └── use-grid-actions.test.ts
  ```
- **Key tests**:
  - `usePlanogramData`: initialization, loading states
  - `usePlanogramForm`: form validation, dirty state
  - `usePlanogramLayout`: grid manipulation
  - `useGridActions`: drag/drop, add/remove products
- **Risk**: Medium
- **Verify**: Coverage ≥80%

### Step 11.8: Test planogram feature - Components
- **Goal**: Test planogram UI components
- **Files to create**:
  ```
  features/planogram/components/
  ├── planogram-grid/
  │   └── planogram-grid.test.tsx
  ├── product-sidebar/
  │   └── product-sidebar.test.tsx
  ├── planogram-form-fields/
  │   └── planogram-form-fields.test.tsx
  ├── planogram-actions/
  │   └── planogram-actions.test.tsx
  ├── ai-overview-dialog/
  │   └── ai-overview-dialog.test.tsx
  ├── planogram-card/
  │   └── planogram-card.test.tsx
  └── planogram-create-wizard/
      └── planogram-create-wizard.test.tsx
  ```
- **Key tests**:
  - Grid: renders cells, handles click, drag/drop
  - Sidebar: product list, search, drag start
  - Form fields: validation errors, field changes
  - Actions: save button states, delete confirmation
  - AI dialog: loading state, response display
- **Risk**: High (complex interactions)
- **Verify**: Coverage ≥80%

### Step 11.9: Test dashboard feature
- **Goal**: Test dashboard components
- **Files to create**:
  ```
  features/dashboard/components/
  ├── dashboard-header/
  │   └── dashboard-header.test.tsx
  ├── dashboard-content/
  │   └── dashboard-content.test.tsx
  └── project-card/
      └── project-card.test.tsx
  ```
- **Key tests**:
  - Header: user info display, navigation
  - Content: stats display, recent projects
  - Card: project info, planogram count
- **Risk**: Low
- **Verify**: Coverage ≥80%

### Step 11.10: Test shared components
- **Goal**: Test reusable components in /components
- **Files to create**:
  ```
  components/
  ├── AuthProvider.test.tsx
  ├── AuthenticatedLayout.test.tsx
  ├── AdminOnly.test.tsx
  ├── UserMenu.test.tsx
  ├── EmptyState.test.tsx
  └── Navbar.test.tsx
  ```
- **Key tests**:
  - AuthProvider: context values, children rendering
  - AuthenticatedLayout: redirect when not authenticated
  - AdminOnly: shows/hides based on role
  - UserMenu: dropdown interactions
- **Risk**: Low
- **Verify**: Coverage ≥80%

### Step 11.11: Test lib utilities
- **Goal**: Test utility functions
- **Files to create**:
  ```
  lib/
  ├── utils.test.ts
  ├── axios.test.ts
  ├── react-query/
  │   └── client.test.ts
  └── zustand/
      └── create-selectors.test.ts
  ```
- **Key tests**:
  - Utility functions: edge cases, error handling
  - Axios: interceptors, error formatting
  - Query client: default options
  - Selectors: type inference
- **Risk**: Low
- **Verify**: Coverage ≥80%

---

## Phase 12: Coverage Verification & CI

### Step 12.1: Run full coverage report
- **Goal**: Verify 80% coverage threshold
- **Command**: `npm run test:coverage`
- **Expected output**:
  ```
  ----------------------|---------|----------|---------|---------|
  File                  | % Stmts | % Branch | % Funcs | % Lines |
  ----------------------|---------|----------|---------|---------|
  All files             |   80+   |   80+    |   80+   |   80+   |
  features/auth         |   85    |   82     |   88    |   85    |
  features/stores       |   82    |   80     |   85    |   82    |
  features/planogram    |   80    |   78     |   82    |   80    |
  ...
  ----------------------|---------|----------|---------|---------|
  ```
- **Risk**: Low
- **Verify**: All thresholds met

### Step 12.2: Add coverage to CI
- **Goal**: Fail CI if coverage drops below 80%
- **File to change**: `.github/workflows/ci.yml` (or create)
- **Add step**:
  ```yaml
  - name: Run tests with coverage
    run: npm run test:coverage

  - name: Upload coverage report
    uses: codecov/codecov-action@v3
    with:
      files: ./coverage/coverage-final.json
      fail_ci_if_error: true
  ```
- **Risk**: Low
- **Verify**: CI pipeline runs tests

### Step 12.3: Add pre-commit hook (optional)
- **Goal**: Run tests before commits
- **File to change**: `package.json`
- **Add**:
  ```json
  {
    "scripts": {
      "precommit": "npm run test:run"
    }
  }
  ```
- **Risk**: Low
- **Verify**: Tests run on commit

---

## Acceptance Criteria

- [ ] App builds and runs without errors
- [ ] TypeScript strict mode passes
- [ ] Lint passes (Biome)
- [ ] **All components live in `features/*/components/`** (not in `app/`)
- [ ] **All hooks live in `features/*/hooks/` or `features/*/queries/`** (not in `app/`)
- [ ] **Pages are thin** - only import and render feature components
- [ ] **No `components/` or `hooks/` directories exist in `app/`**
- [ ] Files use kebab-case naming
- [ ] Each component folder has component + test file
- [ ] All data fetching uses React Query hooks
- [ ] Auth flow works (login, logout, protected routes)
- [ ] Planogram editor fully functional
- [ ] All CRUD operations work
- [ ] **Test coverage ≥80%** for branches, functions, lines, statements
- [ ] **All tests pass**: `npm run test:run`
- [ ] **Coverage report generated**: `npm run test:coverage`

---

# Recommended Execution Order

## Week 1: Testing Infrastructure + Simple Features
1. **Phase 10** (Testing Infrastructure) - Steps 10.1-10.9
2. Phase 3 (Stores feature) - All steps
3. Step 11.2 (Test stores feature)

## Week 2: More Features + Tests
4. Phase 4 (Displays feature) - All steps + Step 11.3 (tests)
5. Phase 5 (Projects feature) - All steps + Step 11.4 (tests)
6. Phase 6 (Users feature) - All steps + Step 11.5 (tests)

## Week 3: Planogram Migration + Tests
7. Phase 7 (Planogram feature) - Steps 7.1-7.4
8. Phase 7 (Planogram feature) - Steps 7.5-7.7
9. Steps 11.6-11.8 (Planogram tests)

## Week 4: Dashboard, Auth Tests & Cleanup
10. Phase 8 (Dashboard feature) - All steps + Step 11.9 (tests)
11. Step 11.1 (Auth tests) + Step 11.10 (Shared component tests)
12. Step 11.11 (Lib tests)
13. Phase 9 (Cleanup) - All steps

## Week 5: Coverage & CI
14. **Phase 12** (Coverage verification) - All steps
15. Final coverage audit and gap filling

---

# Risk Mitigation

1. **Auth changes**: Test login/logout flow after every change
2. **Component moves**: Update imports incrementally, test each route
3. **Planogram migration**: Most complex - do in small batches, test frequently
4. **Build verification**: Run `npm run build` after each step
5. **Imports**: Use find-and-replace for bulk import updates when moving components
6. **Test alongside refactor**: Write tests for each feature immediately after migration (don't defer)
7. **MSW handlers**: Keep API mocks in sync with actual API - update handlers when API changes
8. **Coverage gaps**: Run `npm run test:coverage` weekly to identify gaps early
9. **Flaky tests**: Use `waitFor` and proper async handling - avoid arbitrary timeouts
