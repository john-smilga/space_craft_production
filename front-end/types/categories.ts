import { z } from 'zod';
import { schemas } from '@/lib/generated/api-schemas';

// Export types from generated schemas
export type Category = z.infer<typeof schemas.Category>;
export type CategoriesResponse = z.infer<typeof schemas.CategoryListResponse>;

// Custom type for selectable categories (with IDs)
export interface SelectableCategory {
  id: number;
  slug: string;
  name: string;
}

export interface SelectableCategoriesResponse {
  categories: SelectableCategory[];
}
