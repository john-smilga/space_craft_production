# API Contract Documentation

**Purpose**: Document current API response formats to identify inconsistencies and plan standardization.

**Last Updated**: December 13, 2025

---

## Auth Endpoints

### POST `/api/auth/login/`
**Current Format**: WRAPPED
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "user",
    "role": "admin|member",
    "first_name": "John",
    "last_name": "Doe",
    "is_active": true,
    "date_joined": "2025-01-01T00:00:00Z"
  }
}
```
**Issue**: Wrapped response inconsistent with DRF default patterns

### POST `/api/auth/register/`
**Current Format**: WRAPPED
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "user",
    "role": "member",
    "first_name": "",
    "last_name": "",
    "is_active": true,
    "date_joined": "2025-01-01T00:00:00Z"
  }
}
```
**Issue**: Wrapped response inconsistent with DRF default patterns

### GET `/api/auth/me/`
**Current Format**: UNWRAPPED
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "username": "user",
  "role": "admin|member",
  "first_name": "John",
  "last_name": "Doe",
  "is_active": true,
  "date_joined": "2025-01-01T00:00:00Z"
}
```
**Status**: Correct format ✓

### POST `/api/users/invite/`
**Current Format**: Custom
```json
{
  "message": "Invitation created successfully",
  "invitation_token": "token_string",
  "invitation_link": "https://frontend/register?token=token_string",
  "user": {
    "id": "uuid",
    "email": "new@example.com",
    "username": "newuser",
    "role": "member",
    "is_active": false,
    "date_joined": "2025-01-01T00:00:00Z"
  }
}
```
**Note**: This endpoint returns additional metadata with the user object

### PATCH `/api/users/me/username/`
**Current Format**: WRAPPED
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "newusername",
    "role": "admin|member",
    "first_name": "John",
    "last_name": "Doe",
    "is_active": true,
    "date_joined": "2025-01-01T00:00:00Z"
  }
}
```
**Issue**: Wrapped response

---

## Store Endpoints

### POST `/api/stores/`
**Current Format**: UNWRAPPED
```json
{
  "id": "uuid",
  "name": "Store Name",
  "store_code": "STORE001",
  "slug": "store-name",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zip_code": "10001",
  "country": "USA",
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-01T00:00:00Z"
}
```
**Status**: Correct format ✓

### GET `/api/stores/{slug}/`
**Current Format**: UNWRAPPED
```json
{
  "id": "uuid",
  "name": "Store Name",
  "store_code": "STORE001",
  "slug": "store-name",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zip_code": "10001",
  "country": "USA",
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-01T00:00:00Z"
}
```
**Status**: Correct format ✓

### PUT/PATCH `/api/stores/{slug}/`
**Current Format**: UNWRAPPED
```json
{
  "id": "uuid",
  "name": "Updated Store Name",
  "store_code": "STORE001",
  "slug": "updated-store-name",
  "address": "456 Oak Ave",
  "city": "New York",
  "state": "NY",
  "zip_code": "10001",
  "country": "USA",
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-01T12:00:00Z"
}
```
**Status**: Correct format ✓

### GET `/api/stores/`
**Current Format**: PAGINATED
```json
{
  "count": 10,
  "next": "https://api/stores/?page=2",
  "previous": null,
  "results": [
    {
      "id": "uuid",
      "name": "Store Name",
      "store_code": "STORE001",
      "slug": "store-name",
      "address": "123 Main St",
      "created_at": "2025-01-01T00:00:00Z"
    }
  ]
}
```
**Status**: Correct format ✓

---

## Project Endpoints

### POST `/api/projects/`
**Current Format**: UNWRAPPED
```json
{
  "id": "uuid",
  "name": "Project Name",
  "slug": "project-name",
  "store": {
    "id": "uuid",
    "name": "Store Name",
    "slug": "store-slug"
  },
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-01T00:00:00Z"
}
```
**Status**: Correct format ✓

### GET `/api/projects/{slug}/`
**Current Format**: UNWRAPPED
```json
{
  "id": "uuid",
  "name": "Project Name",
  "slug": "project-name",
  "store": {
    "id": "uuid",
    "name": "Store Name",
    "slug": "store-slug"
  },
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-01T00:00:00Z"
}
```
**Status**: Correct format ✓

### GET `/api/projects/`
**Current Format**: PAGINATED
```json
{
  "count": 5,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": "uuid",
      "name": "Project Name",
      "slug": "project-slug",
      "created_at": "2025-01-01T00:00:00Z"
    }
  ]
}
```
**Status**: Correct format ✓

---

## Display Endpoints

### POST `/api/displays/`
**Current Format**: UNWRAPPED
```json
{
  "id": "uuid",
  "name": "Custom Display",
  "slug": "custom-display",
  "type": "wall|gondola|endcap",
  "width_in": 48,
  "height_in": 72,
  "depth_in": 24,
  "shelf_count": 5,
  "shelf_spacing": 14,
  "display_category": "custom",
  "created_at": "2025-01-01T00:00:00Z"
}
```
**Status**: Correct format ✓

### GET `/api/displays/{slug}/`
**Current Format**: UNWRAPPED
```json
{
  "id": "uuid",
  "name": "Display Name",
  "slug": "display-slug",
  "type": "wall|gondola|endcap",
  "width_in": 48,
  "height_in": 72,
  "depth_in": 24,
  "shelf_count": 5,
  "shelf_spacing": 14,
  "display_category": "standard|custom",
  "created_at": "2025-01-01T00:00:00Z"
}
```
**Status**: Correct format ✓

### GET `/api/displays/types/`
**Current Format**: WRAPPED
```json
{
  "types": [
    {
      "value": "wall",
      "label": "Wall Display"
    },
    {
      "value": "gondola",
      "label": "Gondola"
    },
    {
      "value": "endcap",
      "label": "End Cap"
    }
  ]
}
```
**Issue**: Wrapped response - should return bare array

### GET `/api/displays/standards/`
**Current Format**: WRAPPED
```json
{
  "standards": [
    {
      "id": "uuid",
      "name": "Standard Display 1",
      "slug": "standard-display-1",
      "type": "wall",
      "width_in": 48,
      "height_in": 72,
      "display_category": "standard",
      "created_at": "2025-01-01T00:00:00Z"
    }
  ]
}
```
**Issue**: Wrapped response - should return bare array

### GET `/api/displays/`
**Current Format**: PAGINATED
```json
{
  "count": 10,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": "uuid",
      "name": "Display Name",
      "slug": "display-slug",
      "type": "wall",
      "created_at": "2025-01-01T00:00:00Z"
    }
  ]
}
```
**Status**: Correct format ✓

---

## Planogram Endpoints

### POST `/api/planograms/`
**Current Format**: UNWRAPPED
```json
{
  "id": "uuid",
  "name": "Planogram Name",
  "slug": "planogram-slug",
  "project": {
    "id": "uuid",
    "name": "Project Name",
    "slug": "project-slug"
  },
  "display": {
    "id": "uuid",
    "name": "Display Name",
    "type": "wall"
  },
  "width_in": 48,
  "height_in": 72,
  "depth_in": 24,
  "shelf_count": 5,
  "shelf_spacing": 14,
  "layout": null,
  "season": "spring",
  "created_at": "2025-01-01T00:00:00Z"
}
```
**Status**: Correct format ✓

### GET `/api/planograms/{slug}/`
**Current Format**: WRAPPED (Mixed)
```json
{
  "planogram": {
    "id": "uuid",
    "name": "Planogram Name",
    "slug": "planogram-slug",
    "project": {
      "id": "uuid",
      "name": "Project Name"
    },
    "display": {
      "id": "uuid",
      "name": "Display Name"
    },
    "width_in": 48,
    "height_in": 72,
    "depth_in": 24,
    "shelf_count": 5,
    "layout": null,
    "season": "spring",
    "created_at": "2025-01-01T00:00:00Z"
  },
  "layout": {
    "shelves": [
      {
        "row": 0,
        "items": []
      }
    ]
  }
}
```
**Issue**: Wrapped response - should merge planogram and layout

### PUT `/api/planograms/{slug}/`
**Current Format**: WRAPPED (Mixed)
```json
{
  "planogram": {
    "id": "uuid",
    "name": "Updated Planogram Name",
    "slug": "planogram-slug",
    "project": { ... },
    "display": { ... },
    "width_in": 48,
    "height_in": 72,
    "layout": null,
    "season": "summer",
    "updated_at": "2025-01-01T12:00:00Z"
  },
  "layout": {
    "shelves": [...]
  }
}
```
**Issue**: Wrapped response - should merge planogram and layout

### POST `/api/planograms/{slug}/layout/`
**Current Format**: UNWRAPPED
```json
{
  "id": "uuid",
  "name": "Planogram Name",
  "slug": "planogram-slug",
  "layout": {
    "shelves": [
      {
        "row": 0,
        "items": [
          {
            "product_id": "uuid",
            "quantity": 5,
            "position": 0
          }
        ]
      }
    ]
  },
  "updated_at": "2025-01-01T12:00:00Z"
}
```
**Status**: Correct format ✓

### GET `/api/planograms/`
**Current Format**: PAGINATED
```json
{
  "count": 20,
  "next": "https://api/planograms/?page=2",
  "previous": null,
  "results": [
    {
      "id": "uuid",
      "name": "Planogram Name",
      "slug": "planogram-slug",
      "project": { "name": "Project Name" },
      "created_at": "2025-01-01T00:00:00Z"
    }
  ]
}
```
**Status**: Correct format ✓

---

## Summary of Issues

### Critical Issues to Fix

1. **Auth Endpoints** (3 issues)
   - Login: Returns `{"user": User}` → Should return bare User
   - Register: Returns `{"user": User}` → Should return bare User
   - Update Username: Returns `{"user": User}` → Should return bare User

2. **Display Endpoints** (2 issues)
   - `/displays/types/`: Returns `{"types": [...]}` → Should return bare array
   - `/displays/standards/`: Returns `{"standards": [...]}` → Should return bare array

3. **Planogram Endpoints** (2 issues)
   - GET (retrieve): Returns `{"planogram": {...}, "layout": {...}}` → Should merge into single object
   - PUT (update): Returns `{"planogram": {...}, "layout": {...}}` → Should merge into single object

### Standardization Decision

**Use unwrapped responses for all single-object endpoints:**
- All single-object responses: bare object (e.g., `{id, name, ...}`)
- All list responses: paginated format `{count, next, previous, results}`
- All array responses (enums/types): bare array

This matches Django REST Framework's default pattern and simplifies frontend handling.
