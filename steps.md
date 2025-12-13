# Planogram Page - Form and Products Sidebar Fix - Step by Step Plan

## Overview

The planogram detail page is missing two critical components:
1. **Edit Form** (name, season, shelf count, display selection, categories)
2. **Available Products Sidebar** (right sidebar showing products to add)

These components are defined in code but not displaying due to:
- Form components not rendering (likely store initialization or rendering logic issue)
- Products sidebar not showing products (API response mismatch or fetch logic issue)

This plan fixes both issues systematically.

---

## Root Cause Analysis

### Issue 1: Form Components Missing

**Components involved:**
- `PlanogramNameField.tsx` - Uses `usePlanogramStore.use.name()` to get/set name
- `PlanogramFormFields.tsx` - Uses store for season, shelf_count, display selection
- `PlanogramCategoriesSelector.tsx` - Uses store for selected categories
- `PlanogramActions.tsx` - Regenerate and Explore Products buttons

**Root cause:** The Zustand store `usePlanogramStore` is likely not properly initialized with form data when the page loads. The `initializeForm()` function in `usePlanogramData` hook sets the store values, but there may be timing issues or the store selectors aren't working properly.

### Issue 2: Available Products Sidebar Empty

**Component involved:**
- `AvailableProductsSidebar.tsx` - Displays `availableItems` from store

**Root cause:** The `fetchAvailableProducts()` function in `usePlanogramData` hook is called on mount, but:
1. The API endpoint `/products/by-categories/` may be returning data in unexpected format
2. The response mapping from `product.overall_score` to `score` field may not match actual API response
3. The sidebar visibility flag may not be set to open

---

## Step 1: Verify and Fix Store Initialization

**Goal:** Ensure Zustand store is properly initialized with planogram data

### Tasks

- [ ] 1.1 **Check planogram-slice.ts store definition**
  - Verify `initializeForm()` action exists and is correct
  - Check selector hooks (`use.name()`, `use.season()`, etc.) are properly typed
  - Verify initial state values

- [ ] 1.2 **Check usePlanogramData hook**
  - Verify `planogramQuery.data?.planogram` is being accessed correctly
  - Check timing of `initializeForm()` call relative to data fetch
  - Ensure dependencies in useEffect are correct to avoid skipping initialization

- [ ] 1.3 **Add console logging to debug**
  - Log when planogram data is fetched
  - Log when initializeForm is called
  - Log store state after initialization
  - Temporarily add to understand data flow

**Files to Review:**
- `front-end/features/planogram/store/planogram-slice.ts`
- `front-end/features/planogram/hooks/use-planogram-data.ts`
- `front-end/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx`

---

## Step 2: Verify Form Component Rendering

**Goal:** Ensure form components render when store is initialized

### Tasks

- [ ] 2.1 **Check PlanogramNameField rendering**
  - Verify `usePlanogramStore.use.name()` hook selector is working
  - Check if FormField component is properly accepting/displaying value
  - Verify onChange handler is correctly updating store

- [ ] 2.2 **Check PlanogramFormFields rendering**
  - Verify all three field selectors (season, shelfCount, display) work
  - Check if Select components are rendering options
  - Test onChange handlers

- [ ] 2.3 **Check PlanogramCategoriesSelector rendering**
  - Verify categories are fetched via `leafCategoriesQuery`
  - Check if multi-select dropdown displays categories
  - Verify selected categories display as badges

- [ ] 2.4 **Test form in browser**
  - Open planogram page and check browser DevTools
  - Look for JavaScript errors in console
  - Check if form fields exist in DOM but hidden (CSS issue)
  - Check if data is present in store but not in components

**Files to Review:**
- `front-end/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramNameField.tsx`
- `front-end/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx`
- `front-end/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramCategoriesSelector.tsx`
- `front-end/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramActions.tsx`

---

## Step 3: Verify Available Products API and Response Handling

**Goal:** Ensure products are fetched correctly from API and stored in Zustand

### Tasks

- [ ] 3.1 **Check API endpoint and request format**
  - Verify `/products/by-categories/` endpoint exists and works
  - Check query params: `category_ids` (comma-separated) and `season`
  - Test endpoint manually with curl or Postman

- [ ] 3.2 **Verify API response format**
  - Get actual response from `/products/by-categories/` endpoint
  - Check if response has `products` key (current expectation: `response.data.products`)
  - Check product field names: `overall_score`, `margin`, `pack_width_in`, etc.
  - Compare with actual API response structure

- [ ] 3.3 **Check fetchAvailableProducts logic**
  - Verify function is called in useEffect
  - Check if planogram.category_ids is non-empty
  - Check try/catch error handling
  - Add console logging to track execution

- [ ] 3.4 **Check store persistence**
  - Verify `setAvailableItems()` action properly sets store.availableItems
  - Verify `setLoadingAvailableItems()` properly tracks loading state
  - Check Zustand store selector `availableItems` in sidebar component

- [ ] 3.5 **Check sidebar visibility**
  - Verify sidebar is opening with `availableProductsSidebarOpen` flag
  - Check if "Explore Products" button in actions sets this flag
  - Verify sidebar render conditions

**Files to Review:**
- `front-end/features/planogram/hooks/use-planogram-data.ts` (lines 60-103)
- `front-end/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx` (lines 1-60)
- Backend: `/products/by-categories/` endpoint in Django views

---

## Step 4: Fix Data Type Mismatches (API Contract Issue)

**Goal:** Fix data format issues identified in api-contracts.md

### Tasks

- [ ] 4.1 **Check /displays/standards/ endpoint response**
  - Current format: `{"standards": [...]}`
  - Expected format: bare array `[...]`
  - Fix in backend OR adjust frontend parsing

- [ ] 4.2 **Check /displays/types/ endpoint response**
  - Current format: `{"types": [...]}`
  - Expected format: bare array `[...]`
  - Fix in backend OR adjust frontend parsing

- [ ] 4.3 **Check /planograms/{slug}/ endpoint response**
  - Current format: `{"planogram": {...}, "layout": {...}}`
  - Expected format: Merged object with both planogram and layout fields
  - Fix in backend OR adjust frontend response handling (currently: `planogramQuery.data?.planogram`)

- [ ] 4.4 **Check /products/by-categories/ response format**
  - Determine actual response structure
  - Update `fetchAvailableProducts()` to match actual format
  - May need to adjust from `response.data.products` to different accessor

**Files to Review:**
- Backend API endpoints (Django views)
- `front-end/features/planogram/hooks/use-planogram-data.ts`
- `front-end/features/displays/queries/use-displays-query.ts`
- `front-end/features/displays/queries/use-standard-displays-query.ts`

---

## Step 5: Add Type Validation with Zod (Optional but Recommended)

**Goal:** Add runtime validation to catch API response format issues

### Tasks

- [ ] 5.1 **Create Zod schemas for API responses**
  - `front-end/features/planogram/schemas/planogram-detail-response-schema.ts`
  - `front-end/features/products/schemas/available-products-response-schema.ts`
  - Define expected structure to catch mismatches

- [ ] 5.2 **Update hooks to validate responses**
  - Use `schema.parse()` in `usePlanogramData` to validate planogram response
  - Use `schema.parse()` in `fetchAvailableProducts` to validate products response
  - Add error handling for validation failures

**Files to Create/Modify:**
- `front-end/features/planogram/schemas/planogram-detail-response-schema.ts`
- `front-end/features/products/schemas/available-products-response-schema.ts`
- `front-end/features/planogram/hooks/use-planogram-data.ts`

---

## Step 6: Test and Debug

**Goal:** Verify all components work correctly

### Tasks

- [ ] 6.1 **Manual browser testing**
  - Load planogram page
  - Check if form fields are visible and populated
  - Check if you can edit form fields and store updates
  - Check if "Explore Products" button opens sidebar
  - Check if products appear in sidebar

- [ ] 6.2 **Check browser DevTools**
  - Console: No JavaScript errors
  - Network: API calls returning correct status (200)
  - Network: Response payloads match expectations
  - Application: Zustand store state correct

- [ ] 6.3 **Test specific workflows**
  - [ ] Load planogram → Form visible with data populated
  - [ ] Edit name field → Store updates, component re-renders
  - [ ] Change season → Available products refetch
  - [ ] Click "Explore Products" → Sidebar opens
  - [ ] Select product quantity → Store updates
  - [ ] Select shelf → targetRowId updates
  - [ ] Click "Add Items" → Products added to grid

- [ ] 6.4 **Edge cases**
  - [ ] Planogram with no categories selected
  - [ ] Planogram with invalid display ID
  - [ ] API returns empty products list
  - [ ] Network error during product fetch

---

## Step 7: Implementation Summary

**What Will Change:**

1. **Form Components** - No code changes needed if store initialization is working
2. **Store Initialization** - May need timing/dependency fixes in useEffect
3. **API Response Handling** - Update parsers to match actual API response format
4. **Zod Validation** - Add schemas for runtime validation (recommended)
5. **Sidebar Visibility** - Ensure "Explore Products" button opens sidebar correctly

**Expected Outcome:**

- Form fields (Name, Season, Shelf Count, Display, Categories) are visible and editable
- Form values populate from loaded planogram data
- "Explore Products" button opens right sidebar
- Available products sidebar shows list of products (name, score, margin, width)
- Can select products and add to grid

---

## Execution Order

```
Step 1: Verify Store Init
    ├─ Check store definition
    ├─ Check hook implementation
    └─ Debug via console logs

Step 2: Test Form Rendering
    ├─ Verify each component
    ├─ Browser DevTools inspection
    └─ Identify rendering issues

Step 3: Test Products Fetch
    ├─ Verify API endpoint
    ├─ Check response format
    ├─ Debug fetch logic
    └─ Check store persistence

Step 4: Fix Data Type Mismatches
    ├─ Identify format issues (backend vs frontend expectations)
    └─ Fix either backend or frontend parsers

Step 5: Add Zod Validation (Optional)
    ├─ Create schemas
    └─ Integrate into hooks

Step 6: Full Testing
    ├─ Manual browser testing
    ├─ DevTools verification
    ├─ Workflow testing
    └─ Edge case testing

Step 7: Commit Changes
```

---

## Critical Files Summary

**Frontend Components:**
- `/front-end/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx` - Main page
- `/front-end/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramNameField.tsx`
- `/front-end/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramFormFields.tsx`
- `/front-end/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/PlanogramCategoriesSelector.tsx`
- `/front-end/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/components/AvailableProductsSidebar.tsx`

**Frontend State & Hooks:**
- `/front-end/features/planogram/store/planogram-slice.ts` - Zustand store
- `/front-end/features/planogram/hooks/use-planogram-data.ts` - Data fetching and initialization
- `/front-end/features/planogram/types.ts` - TypeScript types

**Backend Endpoints:**
- `GET /planograms/{slug}/` - Fetch planogram details
- `GET /products/by-categories/` - Fetch products by category
- `GET /displays/` - Fetch custom displays
- `GET /displays/standards/` - Fetch standard displays
- `GET /categories/leaf/` - Fetch leaf categories

---

## Rollback Plan

If issues arise:
1. Revert store changes (git revert)
2. Revert API response parser changes
3. Verify form and products appear again
4. Re-run tests

---

## Notes

- The planogram page is already fully built and components exist in code
- Issue is likely integration/initialization, not missing components
- Start with debugging existing code rather than rewriting
- Use browser DevTools Network tab to inspect API responses
- Check Zustand store state in browser extensions (Redux DevTools works with Zustand)
