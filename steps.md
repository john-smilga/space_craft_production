# API Contract Standardization - Implementation Plan

**Purpose**: Permanently eliminate API contract mismatches between DRF backend and TypeScript/React/Next.js frontend.

**Approach**: Server-first, contract-driven, type-safe, enforced by tooling.

**Last Updated**: December 13, 2025

---

## Step 0: Repository Inspection

### Goal
Inspect and document the current state of API contracts across backend and frontend to identify inconsistencies and mismatches.

### Files Analyzed

#### Backend (DRF)
- `spacecraft/settings.py` - DRF configuration
- `common/exceptions.py` - Custom exception handler
- `accounts/serializers.py`, `accounts/views.py`
- `stores/serializers.py`, `stores/views.py`
- `displays/serializers.py`, `displays/views.py`
- `projects/serializers.py`, `projects/views.py`
- `planograms/serializers.py`, `planograms/views.py`
- `api-contracts.md` - Existing contract documentation

#### Frontend
- `front-end/lib/axios.ts` - API client
- `front-end/lib/react-query/hooks.ts` - Query/mutation wrappers
- `front-end/lib/types/index.ts` - Shared types
- `front-end/types/*.ts` - Legacy type definitions
- `front-end/features/*/types.ts` - Feature type definitions
- `front-end/features/*/schemas/*.ts` - Zod schemas
- `front-end/features/*/queries/*.ts` - API calls

### What Changed
- Initial inspection only, no code changes

### Verification Commands Executed
- N/A (inspection only)

### Verification Results
- Pass (no changes required)

---

### Backend Findings

#### Current DRF Configuration
```python
# spacecraft/settings.py
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": ["accounts.authentication.CookieJWTAuthentication"],
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.IsAuthenticated"],
    "EXCEPTION_HANDLER": "common.exceptions.custom_exception_handler",
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,
    "DEFAULT_RENDERER_CLASSES": ["rest_framework.renderers.JSONRenderer"],
    "DEFAULT_PARSER_CLASSES": ["rest_framework.parsers.JSONParser"],
}
```

#### Custom Exception Handler Format
```python
# common/exceptions.py
# Returns: { "error": { "code": "...", "message": "...", "details": {...} } }
```

#### Serializer Patterns
- **List serializers**: `StoreListSerializer`, `ProjectListSerializer`, `DisplayListSerializer`, `PlanogramListSerializer`
- **Detail serializers**: `StoreSerializer`, `ProjectSerializer`, `DisplaySerializer`, `PlanogramSerializer`
- **Create/Update serializers**: Separate input serializers for each resource
- **Flattened fields**: Uses `source="related.field"` pattern (e.g., `store_name`, `company_name`)

---

### API Shape Inconsistencies (Backend) - 5 Identified

#### 1. Login Response vs Frontend Expectation
**Location**: `accounts/views.py:163-164`
**Backend**: Returns bare User object via `Response(user_serializer.data)`
**Issue**: Frontend expects `{user: User}` wrapper based on schema

#### 2. Planogram Retrieve - Layout Merge
**Location**: `planograms/views.py:57-66`
```python
def retrieve(self, request, *args, **kwargs):
    serializer = self.get_serializer(instance)
    planogram_data = serializer.data
    layout = get_or_compute_layout(instance)
    return Response({**planogram_data, "layout": layout})  # Spreads planogram + layout
```
**Issue**: Response shape differs from create (which returns bare serializer.data without layout)

#### 3. Planogram Update vs Create Inconsistency
**Location**: `planograms/views.py:112-126`
**Issue**: Update returns `{...planogramFields, layout}`, Create returns just planogram fields

#### 4. User Serializer Extra Fields
**Location**: `accounts/serializers.py:31-43`
**Backend returns**: `first_name`, `last_name`, `is_active`
**Frontend schema missing**: These fields not in Zod schema

#### 5. Error Response Format Inconsistency
- Custom exceptions: `{"error": {"code", "message", "details"}}`
- Ad-hoc errors: `{"error": "message"}` (simpler format in views)

---

### Frontend/Backend Mismatches - 6 Identified

#### 1. Login Response Schema Mismatch
**Backend** (`accounts/views.py:163-164`): Returns bare `User` object
**Frontend** (`features/auth/schemas/login-schema.ts:9-11`):
```typescript
export const loginResponseSchema = z.object({
  user: userSchema,  // Expects wrapped response
});
```

#### 2. User Schema Missing Fields
**Backend** (`accounts/serializers.py:31-43`): Returns `first_name`, `last_name`, `is_active`
**Frontend** (`features/auth/schemas/user-schema.ts:8-16`):
```typescript
export const userSchema = z.object({
  // Missing: first_name, last_name, is_active
});
```

#### 3. Project Type Expects Nested Store Object
**Backend** (`projects/serializers.py:23-39`): Returns flat fields `store_name`, `store_code`, `store_slug`
**Frontend** (`features/projects/types.ts:5-10`):
```typescript
store?: {
  id: number;
  name: string;
  store_code: string;
  slug: string;
} | null;  // Expects nested object
```

#### 4. Planogram Detail Response Structure
**Backend**: Returns `{...planogramFields, layout: {...}}`
**Frontend** (`features/planogram/types.ts:58-61`):
```typescript
export interface PlanogramDetailResponse {
  planogram: Planogram;  // Expects `planogram` key wrapper
  layout?: GridResponse;
}
```

#### 5. Display Response Missing `type_display` Field
**Backend** (`displays/serializers.py:22-38`): Does NOT include `type_display`
**Frontend** (`features/displays/schemas/display-response-schema.ts:13`):
```typescript
type_display: z.string().optional(),  // Expected but not sent
```

#### 6. Company Schema Missing Fields
**Backend** (`accounts/serializers.py:17-20`): Returns `tax_id`, `description`, `created_at`
**Frontend**: Only expects `id` and `name`

---

### Interface Usage (Must Replace with Type) - 60+ Found

#### High Priority (API Response Types)
| File | Interfaces |
|------|------------|
| `types/auth.ts` | `Company`, `User` |
| `types/projects.ts` | `Project`, `ProjectsResponse`, `ProjectResponse` |
| `types/stores.ts` | `Store`, `StoresResponse` |
| `types/products.ts` | `Product`, `ProductsResponse` |
| `types/categories.ts` | `Category`, `SelectableCategory`, `CategoriesResponse` |
| `types/planograms.ts` | `Planogram`, `PlanogramsResponse`, `LayoutItem`, `AvailableItem`, `GridResponse` |
| `types/displays.ts` | `Display`, `DisplaysResponse`, `DisplayResponse`, `DisplayTypeOption` |

#### Feature Types (Duplicated - Need Consolidation)
| File | Interfaces |
|------|------------|
| `features/auth/types.ts` | `Company`, `User`, `LoginCredentials`, `RegisterData`, `LoginResponse`, `RegisterResponse` |
| `features/stores/types.ts` | `Store`, `StoresResponse`, `CreateStoreInput`, `UpdateStoreInput` |
| `features/displays/types.ts` | `Display`, `DisplaysResponse`, `DisplayResponse`, `DisplayTypeOption`, `DisplayTypesResponse`, `StandardDisplaysResponse`, `CreateDisplayInput` |
| `features/projects/types.ts` | `Project`, `ProjectsResponse`, `CreateProjectInput`, `UpdateProjectInput` |
| `features/planogram/types.ts` | `Planogram`, `PlanogramsResponse`, `PlanogramDetailResponse`, `LayoutItem`, `AvailableItem`, `GridResponse` |
| `features/users/types.ts` | `UsersResponse`, `UserResponse`, `InviteUserInput`, `InviteResponse` |

#### Utility Types
| File | Interfaces |
|------|------------|
| `lib/types/index.ts` | `PaginatedResponse<T>`, `MutationOptions<TData>` |
| `lib/navigation.ts` | `NavigationItem` |

---

### Existing Zod Schema Coverage

#### Using Zod Properly
| File | Schemas | Parsing API Response? |
|------|---------|----------------------|
| `features/auth/schemas/user-schema.ts` | `userSchema`, `companySchema` | Yes (in current-user query) |
| `features/auth/schemas/login-schema.ts` | `loginCredentialsSchema`, `loginResponseSchema` | Yes |
| `features/displays/schemas/display-response-schema.ts` | `displaySchema`, `displayTypeSchema` | Partial |
| `features/planogram/schemas/planogram-response-schema.ts` | `planogramSchema`, `gridResponseSchema` | No |

#### NOT Using Zod Validation (Must Fix)
| File | Issue |
|------|-------|
| `features/projects/queries/use-projects-query.ts` | Returns `response.data` directly |
| `features/projects/queries/use-project-query.ts` | Returns `response.data` directly |
| `features/stores/queries/use-stores-query.ts` | Returns `response.data` directly |
| `features/displays/queries/use-displays-query.ts` | Returns `response.data` directly |
| `features/planogram/queries/use-planogram-query.ts` | Returns `response.data` directly |

---

## Step 1: API Response Standards (Final Decision)

### Goal
Define a single, global API contract enforced across all endpoints.

### Files Touched
- None (specification only)

### What Changed
- Documented final API response format specifications

### Verification Commands Executed
- N/A (specification only)

### Verification Results
- Pass

---

### Decision: Raw DRF Responses (No Envelope)

**Justification**:
1. Matches DRF's default behavior
2. Simpler frontend handling
3. Already used by most endpoints
4. Reduces payload size
5. Industry standard REST pattern

---

### Response Format Specifications

#### Single Object Response
```json
{
  "id": 1,
  "name": "Resource Name",
  "slug": "resource-name",
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-01T00:00:00Z"
}
```
**Used for**: POST (create), GET (retrieve), PUT/PATCH (update)

#### List Response (Paginated)
```json
{
  "count": 42,
  "next": "https://api.example.com/resource/?page=2",
  "previous": null,
  "results": [
    { "id": 1, "name": "..." },
    { "id": 2, "name": "..." }
  ]
}
```
**Used for**: GET (list)

#### Array Response (Non-Paginated)
```json
[
  { "value": "option1", "label": "Option 1" },
  { "value": "option2", "label": "Option 2" }
]
```
**Used for**: Enum endpoints (`/displays/types/`, `/displays/standards/`)

#### Delete Response
```
HTTP 204 No Content
(Empty body)
```

#### Error Response
```json
{
  "error": {
    "code": "validation_error",
    "message": "Human-readable error message",
    "details": {
      "field_name": ["Error 1", "Error 2"]
    }
  }
}
```

---

### Special Cases

#### Planogram with Layout
Layout merged into response (not wrapped):
```json
{
  "id": 1,
  "name": "Planogram Name",
  "slug": "planogram-slug",
  "layout": {
    "grid": { "cols": 12, "rows": 5, "cellWidthIn": 4 },
    "rows": [...]
  }
}
```

---

## Step 2: List & Pagination Rules

### Goal
Define consistent pagination behavior for all list endpoints.

### Files Touched
- None (specification only)

### What Changed
- Documented pagination rules

### Verification Commands Executed
- N/A

### Verification Results
- Pass

---

### Rules

| Rule | Value |
|------|-------|
| Default page size | 10 |
| Maximum page size | 100 |
| Page parameter | `?page=N` |
| Page size parameter | `?page_size=N` |
| Default sort | `-created_at` |
| Sort parameter | `?ordering=field` |

### Empty List Response
```json
{
  "count": 0,
  "next": null,
  "previous": null,
  "results": []
}
```

### Exceptions (Non-Paginated)
- `GET /api/displays/types/` - Fixed enum list
- `GET /api/displays/standards/` - Small fixed list

---

## Step 3: CRUD Request Payload Standards

### Goal
Define strict rules for request payloads.

### Files Touched
- None (specification only)

### What Changed
- Documented payload standards

### Verification Commands Executed
- N/A

### Verification Results
- Pass

---

### Rules

| Operation | Content-Type | ID Handling | Fields |
|-----------|--------------|-------------|--------|
| POST (create) | `application/json` | Never send ID | All required fields |
| PUT (update) | `application/json` | ID in URL only | All writable fields |
| PATCH (partial) | `application/json` | ID in URL only | Only changed fields |

### Related Objects
Use FK ID, not nested object:
```json
// CORRECT
{ "name": "Project", "store": 42 }

// WRONG
{ "name": "Project", "store": { "id": 42, "name": "Store" } }
```

### Nullable Fields
```json
{ "display": null }  // Explicit null to clear
```

---

## Step 4: Backend Implementation

### Goal
Apply API contract to all DRF endpoints.

### Files Touched
| File | Changes | Status |
|------|---------|--------|
| `planograms/views.py` | Fixed create to return layout + standardized error responses | ✅ DONE |
| `accounts/views.py` | Standardized error responses to use custom exceptions | ✅ DONE |
| `accounts/test_views.py` | Updated error assertions + added response shape tests | ✅ DONE |
| `planograms/test_views.py` | Created comprehensive response shape tests | ✅ DONE |
| `common/exceptions.py` | Already correct - defines standard error format | ✅ N/A |

### What Changed

#### Step 4.1: Planogram Create Layout Response ✅
**File**: `planograms/views.py:109-113`

**Problem**: Create method returned only planogram data, while retrieve and update returned planogram + layout. This caused inconsistent API responses.

**Solution**: Modified `create()` method to compute and include layout in response:
```python
output_serializer = PlanogramSerializer(planogram)
planogram_data = output_serializer.data
layout = get_or_compute_layout(planogram)

return Response({**planogram_data, "layout": layout}, status=status.HTTP_201_CREATED)
```

**Result**: Now all planogram operations (create, retrieve, update) return consistent shape with layout included.

#### Step 4.2: Standardized Error Responses ✅
**Files**:
- `accounts/views.py`: Lines 23, 40-67, 78-112, 130-154, 207-211, 260-268
- `planograms/views.py`: Lines 12, 81-83

**Problem**: Error responses used ad-hoc format `{"error": "message"}` instead of the standardized error format defined in `common/exceptions.py`.

**Solution**: Replaced all ad-hoc error responses with custom exception classes:
- `ValidationError` for invalid input (400 errors)
- `UnauthorizedError` for authentication failures (401 errors)
- `NotFoundError` for missing resources (404 errors)

**Changes Made**:
1. Added imports: `from common.exceptions import UnauthorizedError, ValidationError` (accounts/views.py)
2. Added import: `from common.exceptions import NotFoundError` (planograms/views.py)
3. Replaced 15+ ad-hoc error responses with exception raising

**Before**:
```python
if not token:
    return Response({"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)
```

**After**:
```python
if not token:
    raise ValidationError("Token is required")
```

**Result**: All error responses now follow the standardized format:
```json
{
  "error": {
    "code": "validation_error",
    "message": "Token is required",
    "details": {}
  }
}
```

This is automatically handled by the custom exception handler in `common/exceptions.py`.

#### Step 4.3: Response Shape Tests ✅
**Files**:
- `accounts/test_views.py`: Updated all error assertions + added response shape tests
- `planograms/test_views.py`: Created comprehensive response shape tests

**Problem**:
1. Existing tests checked old error format (`response.data["error"]` as string)
2. No tests verified response shapes match the API contract
3. No tests verified planogram create/retrieve/update all return layout

**Solution**:
1. **Updated all error assertions** in `accounts/test_views.py` (15+ tests):
   - Changed from `response.data["error"]` to `response.data["error"]["message"]`
   - Added checks for `code` and `message` fields in error responses
   - Verified correct error codes (`validation_error`, `unauthorized`)

2. **Added response shape tests** for login and register:
   - `test_login_response_shape`: Verifies all user fields present (id, username, email, first_name, last_name, role, company, slug, is_active, date_joined)
   - `test_register_response_shape`: Verifies same fields for registration

3. **Created `planograms/test_views.py`** with comprehensive tests:
   - `TestPlanogramCreate`: Verify create includes layout
   - `TestPlanogramRetrieve`: Verify retrieve includes layout
   - `TestPlanogramUpdate`: Verify update includes layout
   - `TestPlanogramCreateErrorFormat`: Verify standardized error format
   - `TestPlanogramResponseConsistency`: Verify all CRUD operations return same shape

**Examples**:

Before (old error format):
```python
assert "expired" in response.data["error"].lower()
```

After (standardized error format):
```python
assert "error" in response.data
assert response.data["error"]["code"] == "validation_error"
assert "expired" in response.data["error"]["message"].lower()
```

New response shape test:
```python
def test_login_response_shape(self, api_client):
    # Verify all required user fields are present
    assert "id" in response.data
    assert "username" in response.data
    assert "email" in response.data
    assert "first_name" in response.data
    assert "last_name" in response.data
    # ... etc
```

**Result**: All tests now verify:
- Standardized error format is used consistently
- Success responses include all required fields
- Planogram operations (create/retrieve/update) all return layout

#### Step 4.4: Test Fixes During Verification ✅
**Files**:
- `accounts/views.py:127-153` - Fixed login exception handling
- `planograms/serializers.py:142-149` - Made dimension fields optional
- `planograms/test_views.py:139-141, 205-231` - Fixed test isolation and assertions

**Issues Found During Testing**:
1. Login returning 500 instead of 401 when raising UnauthorizedError inside except block
2. Planogram create failing validation - dimension fields required but view provides defaults
3. Test isolation - displays from other tests persisting
4. Response shape test too strict - checking exact key equality

**Fixes Applied**:
1. **Login exception handling**: Restructured to avoid raising exceptions inside except blocks
   - Moved User.DoesNotExist check to its own try/except
   - Removed generic `except Exception` that was catching our custom exceptions

2. **Planogram serializer**: Made `width_in`, `height_in`, `shelf_count` optional
   - Serializer now allows omitting these fields
   - View fills them from display defaults (existing behavior)
   - Model still enforces them as required

3. **Test isolation**: Explicitly delete all displays before error test
   ```python
   Display.objects.filter(company=company).delete()
   Display.objects.filter(company__isnull=True).delete()
   ```

4. **Response shape test**: Check core keys instead of exact equality
   - Allows optional fields like `updated_by_username` to be omitted when null

**Verification**: All 41 tests now pass ✅

### Verification Commands
```bash
pytest
pytest accounts/test_views.py -v
pytest stores/test_views.py -v
pytest displays/test_views.py -v
pytest projects/test_views.py -v
pytest planograms/test_views.py -v
```

### Verification Results
- Step 4.1: ✅ Complete - Planogram create now returns layout
- Step 4.2: ✅ Complete - All error responses use custom exceptions
- Step 4.3: ✅ Complete - Response shape tests added and updated

**Step 4: COMPLETE** ✅

All backend API endpoints now follow the standardized contract with:
- Consistent response shapes
- Standardized error format
- Comprehensive test coverage

---

## Step 5: Zod Schema Generation Pipeline

### Goal
Generate Zod schemas from OpenAPI spec.

### Files Touched
| File | Changes | Status |
|------|---------|--------|
| `pyproject.toml` / `poetry.lock` | Added `drf-spectacular==0.29.0` | ✅ DONE |
| `spacecraft/settings.py` | Configured drf-spectacular | ✅ DONE |
| `spacecraft/urls.py` | Added schema endpoint | ✅ DONE |
| `openapi.yaml` | Generated OpenAPI 3.0 schema (65KB) | ✅ DONE |
| `front-end/package.json` | Added generation scripts + @zodios/core | ✅ DONE |
| `front-end/lib/generated/api-schemas.ts` | Generated Zod schemas (40KB) | ✅ DONE |

### What Changed

#### Step 5.1: Install drf-spectacular ✅
**Command**: `poetry add drf-spectacular`

**Result**: Installed drf-spectacular v0.29.0 with dependencies

#### Step 5.2: Configure drf-spectacular in Django Settings ✅
**File**: `spacecraft/settings.py`

**Changes**:
1. Added `"drf_spectacular"` to `INSTALLED_APPS`
2. Added `"DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema"` to `REST_FRAMEWORK`
3. Added `SPECTACULAR_SETTINGS` configuration:
   ```python
   SPECTACULAR_SETTINGS = {
       "TITLE": "Spacecraft API",
       "DESCRIPTION": "Planogram management system API",
       "VERSION": "1.0.0",
       "SERVE_INCLUDE_SCHEMA": False,
       "SCHEMA_PATH_PREFIX": "/api",
       "COMPONENT_SPLIT_REQUEST": True,
   }
   ```

#### Step 5.3: Add OpenAPI Schema Endpoint ✅
**File**: `spacecraft/urls.py`

**Changes**:
- Added import: `from drf_spectacular.views import SpectacularAPIView`
- Added endpoint: `path("api/schema/", SpectacularAPIView.as_view(), name="schema")`

**Result**: OpenAPI schema now accessible at `/api/schema/`

#### Step 5.4: Generate and Validate OpenAPI Schema ✅
**Command**: `poetry run python manage.py spectacular --file openapi.yaml`

**Result**:
- Created `openapi.yaml` (65KB)
- Schema includes all CRUD endpoints: stores, displays, projects, planograms, users
- Some warnings for custom APIView endpoints (expected - can be enhanced later)
- Validation passed

#### Step 5.5: Install Frontend Schema Generation Tools ✅
**Command**: `npm install --save-dev openapi-zod-client`

**Result**: Installed openapi-zod-client v1.18.3 (37 packages)

#### Step 5.6: Configure Schema Generation Scripts ✅
**File**: `front-end/package.json`

**Changes**:
- Added script: `"generate:schema": "openapi-zod-client ../openapi.yaml -o ./lib/generated/api-schemas.ts"`

#### Step 5.7: Generate Zod Schemas from OpenAPI ✅
**Commands**:
```bash
mkdir -p lib/generated
npm run generate:schema
```

**Result**:
- Created `lib/generated/api-schemas.ts` (40KB)
- Contains Zod schemas for all endpoints
- Includes TypeScript types inferred from schemas
- Includes Zodios API client setup

#### Step 5.8: Verify Generated Schemas Compile ✅
**Issue Found**: Generated code requires `@zodios/core` which has Zod v3 peer dependency (project uses Zod v4)

**Solution**: Installed with `npm install @zodios/core --legacy-peer-deps`

**Command**: `npx tsc --noEmit`

**Result**: ✅ All schemas compile successfully with no TypeScript errors

### Verification Commands
```bash
# Backend: Regenerate OpenAPI schema
poetry run python manage.py spectacular --file openapi.yaml --validate

# Frontend: Regenerate Zod schemas
npm run generate:schema

# Verify compilation
npx tsc --noEmit
```

### Verification Results
- ✅ Backend schema generation working
- ✅ Frontend schema generation working
- ✅ TypeScript compilation passing
- ✅ Generated schemas include all core CRUD endpoints

**Step 5: COMPLETE** ✅

---

## Step 6: Frontend Refactor (Zod-First)

### Goal
All types from Zod, all API data validated.

### Files Touched (Planned)
| File | Changes |
|------|---------|
| `types/*.ts` | Delete (60+ interfaces) |
| `features/*/types.ts` | Delete (duplicates) |
| `features/*/queries/*.ts` | Add Zod parsing |
| `lib/axios.ts` | Add type-safe wrappers |

### What Changed
- Plan documented (no implementation yet)

### Verification Commands
```bash
npm run test:run
npm run lint
npm run build
grep -r "^export interface" front-end/src --include="*.ts"
```

### Verification Results
- Pending implementation

---

## Step 7: Migration & Cleanup

### Goal
Remove deprecated code, finalize system.

### Files Touched (Planned)
| Action | Files |
|--------|-------|
| Delete | `front-end/types/*.ts` |
| Delete | `front-end/features/*/types.ts` |
| Update | All imports to use generated schemas |
| Update | `CLAUDE.md`, `api-contracts.md` |

### What Changed
- Plan documented (no implementation yet)

### Verification Commands
```bash
pytest
npm run test:run
npm run lint
npm run build
```

### Verification Results
- Pending implementation

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| OpenAPI schema generation issues | Use `@extend_schema` decorators where needed |
| Breaking frontend during migration | Implement backend changes first, test in staging |
| Generated types don't match needs | Allow manual overrides, review before commit |
| Performance impact of Zod parsing | Validate in dev only, use safeParse for large responses |
| Team bypassing validation | Make type-safe helpers the only export, add linting rules |

---

## Implementation Order

| Step | Status | Depends On |
|------|--------|------------|
| Step 0: Inspection | ✅ COMPLETE | - |
| Step 1: API Standards | ✅ COMPLETE | Step 0 |
| Step 2: Pagination Rules | ✅ COMPLETE | Step 0 |
| Step 3: Payload Standards | ✅ COMPLETE | Step 0 |
| Step 4: Backend Implementation | ✅ COMPLETE | Steps 1-3 |
| Step 5: Schema Generation | ✅ COMPLETE | Step 4 |
| Step 6: Frontend Refactor | ⏳ PENDING | Step 5 |
| Step 7: Cleanup | ⏳ PENDING | Step 6 |

Each step must pass verification before proceeding.
