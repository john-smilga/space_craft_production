# Data Format Consistency Fix - Step by Step Plan

## Overview

This document outlines a systematic approach to fix data format inconsistencies between the Django backend API and Next.js frontend.

---

## Issues Identified

### Critical Issues

1. **Response Wrapping Inconsistency** - Some endpoints wrap responses (`{display: Display}`), others return bare objects
2. **Planogram Create vs Update Mismatch** - POST returns bare object, PUT returns wrapped
3. **`/users/me/` Response** - Returns bare User, but login/register return `{user: User}`
4. **Missing Response Validation** - Frontend doesn't validate API responses with Zod schemas

### Medium Priority

5. **Decimal Fields** - Backend returns strings, frontend expects numbers
6. **Special Endpoints** - `/displays/types/` and `/displays/standards/` use non-standard wrapping

---

## Step 1: Document Current API Contracts

**Goal**: Create a reference document of current API behavior

### Tasks

- [ ] 1.1 Create `api-contracts.md` documenting all endpoints:
  - Request method, URL, and body format
  - Response format (wrapped vs unwrapped)
  - Required vs optional fields

- [ ] 1.2 Add examples for each endpoint showing actual request/response JSON

### Files to Review
- `accounts/views.py`
- `stores/views.py`
- `projects/views.py`
- `displays/views.py`
- `planograms/views.py`

---

## Step 2: Standardize Backend Response Format

**Goal**: Make all single-object responses consistent

### Decision: Use UNWRAPPED responses for simplicity

**Rationale**: DRF's default pattern is unwrapped responses. Pagination already uses `{count, next, previous, results}`. Changing to unwrapped is simpler.

### Tasks

- [ ] 2.1 **Fix `/users/me/` endpoint** (`accounts/views.py`)
  - Keep returning bare `User` object (matches unwrapped pattern)
  - Document this is intentional

- [ ] 2.2 **Fix auth endpoints** (`accounts/views.py`)
  - Change login response from `{"user": {...}}` to bare User object
  - Change register response from `{"user": {...}}` to bare User object
  - Update frontend to match

- [ ] 2.3 **Fix display endpoints** (`displays/views.py`)
  - Change POST `/displays/` response to bare Display (if currently wrapped)
  - Change `/displays/types/` from `{"types": [...]}` to bare array
  - Change `/displays/standards/` from `{"standards": [...]}` to bare array

- [ ] 2.4 **Fix planogram endpoints** (`planograms/views.py`)
  - Change GET `/planograms/{slug}/` from `{"planogram": {...}, "layout": {...}}` to `{...planogram, layout: {...}}`
  - Keep POST returning bare Planogram
  - Change PUT to return bare Planogram (currently wrapped)

### Files to Modify
- `accounts/views.py` - lines 119, 164, 203
- `displays/views.py` - lines 62, 85, 94
- `planograms/views.py` - lines 66, 110

---

## Step 3: Add Backend API Tests

**Goal**: Ensure response formats are correct and prevent regressions

### Tasks

- [ ] 3.1 **Create/update test files** for each app:
  - `accounts/test_views.py` - Test auth and user endpoints
  - `stores/test_views.py` - Test store CRUD
  - `projects/test_views.py` - Test project CRUD
  - `displays/test_views.py` - Test display CRUD + special endpoints
  - `planograms/test_views.py` - Test planogram CRUD

- [ ] 3.2 **Test response structure assertions**:
  ```python
  def test_create_store_response_format(self):
      response = self.client.post('/api/stores/', data)
      # Assert response is NOT wrapped
      self.assertIn('id', response.data)
      self.assertIn('name', response.data)
      self.assertNotIn('store', response.data)  # Not wrapped
  ```

- [ ] 3.3 **Test required fields are present**:
  ```python
  def test_store_response_has_required_fields(self):
      response = self.client.get('/api/stores/ABC123/')
      required_fields = ['id', 'name', 'store_code', 'slug', 'address', 'created_at']
      for field in required_fields:
          self.assertIn(field, response.data)
  ```

- [ ] 3.4 **Run all backend tests**:
  ```bash
  python manage.py test
  pytest
  ```

### Files to Create/Modify
- `accounts/test_views.py`
- `stores/test_views.py`
- `projects/test_views.py`
- `displays/test_views.py`
- `planograms/test_views.py`

---

## Step 4: Update Frontend Type Definitions

**Goal**: Ensure TypeScript types match actual API responses

### Tasks

- [ ] 4.1 **Review and update type files**:
  - `front-end/types/auth.ts`
  - `front-end/types/stores.ts`
  - `front-end/types/projects.ts`
  - `front-end/types/displays.ts`
  - `front-end/types/planograms.ts`

- [ ] 4.2 **Update feature-specific types**:
  - `front-end/features/*/types.ts`

- [ ] 4.3 **Handle decimal fields** - Add type coercion or use `string` type:
  ```typescript
  // Option A: Accept both
  width_in: number | string;

  // Option B: Transform in Zod schema
  width_in: z.coerce.number()
  ```

### Files to Modify
- `front-end/types/*.ts`
- `front-end/features/*/types.ts`

---

## Step 5: Add Zod Response Validation to Mutations

**Goal**: Validate all API responses to catch format issues early

### Tasks

- [ ] 5.1 **Create Zod schemas for API responses**:
  - `front-end/features/stores/schemas/store-response-schema.ts`
  - `front-end/features/projects/schemas/project-response-schema.ts`
  - `front-end/features/displays/schemas/display-response-schema.ts`
  - `front-end/features/planogram/schemas/planogram-response-schema.ts`

- [ ] 5.2 **Update mutations to validate responses**:
  ```typescript
  // Before
  return response.data;

  // After
  return storeResponseSchema.parse(response.data);
  ```

- [ ] 5.3 **Add response validation to queries**:
  - Validate list responses match `PaginatedResponse<T>` schema
  - Validate single-object responses match entity schema

### Files to Create/Modify
- `front-end/features/*/schemas/*-response-schema.ts` (new)
- `front-end/features/*/queries/use-*-mutation.ts`
- `front-end/features/*/queries/use-*-query.ts`

---

## Step 6: Update Frontend Mutations for New Response Format

**Goal**: Ensure frontend correctly handles standardized responses

### Tasks

- [ ] 6.1 **Update auth mutations** (`front-end/features/auth/`):
  - Update login mutation to expect bare User (not `{user: User}`)
  - Update register mutation similarly

- [ ] 6.2 **Update planogram mutations**:
  - Remove manual unwrapping: `response.data.planogram` → `response.data`
  - `front-end/features/planogram/queries/use-update-planogram-mutation.ts`

- [ ] 6.3 **Update display queries**:
  - Handle `/displays/types/` returning bare array
  - Handle `/displays/standards/` returning bare array

### Files to Modify
- `front-end/features/auth/queries/use-login-mutation.ts`
- `front-end/features/auth/queries/use-register-mutation.ts`
- `front-end/features/planogram/queries/use-update-planogram-mutation.ts`
- `front-end/features/planogram/queries/use-planogram-query.ts`
- `front-end/features/displays/queries/use-display-types-query.ts`
- `front-end/features/displays/queries/use-standard-displays-query.ts`

---

## Step 7: Add Frontend Tests

**Goal**: Ensure frontend correctly handles API responses

### Tasks

- [ ] 7.1 **Create API mock utilities**:
  - `front-end/lib/test-utils/api-mocks.ts`
  - Define mock responses matching actual API format

- [ ] 7.2 **Add mutation tests**:
  ```typescript
  // front-end/features/stores/queries/__tests__/use-create-store-mutation.test.ts
  it('correctly parses store creation response', async () => {
    // Mock API response (bare object)
    mockApi.post('/stores/').reply(201, { id: 1, name: 'Test', ... });

    const { result } = renderHook(() => useCreateStoreMutation());
    await result.current.mutateAsync({ name: 'Test', ... });

    expect(result.current.data).toMatchObject({ id: 1, name: 'Test' });
  });
  ```

- [ ] 7.3 **Add query tests**:
  - Test paginated responses are correctly parsed
  - Test single-object responses are correctly parsed

- [ ] 7.4 **Run frontend tests**:
  ```bash
  cd front-end && npm test
  ```

### Files to Create
- `front-end/features/*/queries/__tests__/*.test.ts`
- `front-end/lib/test-utils/api-mocks.ts`

---

## Step 8: Integration Testing

**Goal**: Verify end-to-end data flow works correctly

### Tasks

- [ ] 8.1 **Manual testing checklist**:
  - [ ] Login flow works
  - [ ] Register flow works
  - [ ] Create/edit/delete stores works
  - [ ] Create/edit/delete projects works
  - [ ] Create/edit/delete displays works
  - [ ] Create/edit/delete planograms works
  - [ ] Planogram layout save/load works

- [ ] 8.2 **Test error scenarios**:
  - [ ] Validation errors are displayed correctly
  - [ ] Network errors are handled gracefully
  - [ ] 404 errors show appropriate messages

- [ ] 8.3 **Run full test suite**:
  ```bash
  # Backend
  python manage.py test
  pytest --cov

  # Frontend
  cd front-end && npm test && npm run build
  ```

---

## Step 9: Documentation & Cleanup

**Goal**: Document changes and clean up

### Tasks

- [ ] 9.1 **Update API documentation**:
  - Document standardized response format
  - Add examples for each endpoint

- [ ] 9.2 **Remove this file** (`steps.md`) after completion

- [ ] 9.3 **Commit changes** with clear message:
  ```
  fix: standardize API response format between backend and frontend

  - Standardized all single-object responses to use unwrapped format
  - Added Zod validation for API responses in frontend
  - Added comprehensive API tests for response format
  - Fixed decimal field type handling
  ```

---

## Execution Order

```
Step 1 (Document) ─┬─> Step 2 (Backend fixes) ──> Step 3 (Backend tests)
                   │
                   └─> Step 4 (Frontend types) ──> Step 5 (Zod schemas) ──> Step 6 (Mutations)
                                                                                    │
                                                                                    v
                                              Step 7 (Frontend tests) ──> Step 8 (Integration)
                                                                                    │
                                                                                    v
                                                                          Step 9 (Cleanup)
```

**Estimated file changes**: ~25-30 files
**Risk level**: Medium (API contract changes require coordinated frontend/backend updates)

---

## Rollback Plan

If issues arise:
1. Revert backend changes first (git revert)
2. Revert frontend changes
3. Re-run tests to verify original behavior

---

## Notes

- All response format changes should be made atomically (backend + frontend together)
- Test each endpoint after changes before moving to next
- Keep old response format tests as regression tests
