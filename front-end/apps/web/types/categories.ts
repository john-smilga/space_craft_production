import { z } from 'zod';
import { schemas } from '@/lib/generated/api-schemas';

// Export types from generated schemas
export type Category = z.infer<typeof schemas.Category>;
export type CategoriesResponse = z.infer<typeof schemas.CategoryListResponse>;

// Derive SelectableCategory from API schema (no duplication)
export type SelectableCategory = Pick<Category, 'id' | 'slug' | 'name'>;

// Use CategoryListResponse from API schema
export type SelectableCategoriesResponse = CategoriesResponse;
