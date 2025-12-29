import { z } from 'zod';
import { schemas } from '@/lib/generated/api-schemas';

export const planogramFormSchema = schemas.PatchedPlanogramUpdateRequest.pick({
  name: true,
  shelf_count: true,
  display: true,
  category_ids: true,
}).required({
  name: true,
  shelf_count: true,
  display: true,
  category_ids: true,
}).refine(
  (data) => data.shelf_count >= 1 && data.shelf_count <= 20,
  {
    message: 'Shelf count must be between 1 and 20',
    path: ['shelf_count'],
  }
).refine(
  (data) => data.category_ids.length >= 1,
  {
    message: 'At least one category is required',
    path: ['category_ids'],
  }
);

export type PlanogramFormData = z.infer<typeof planogramFormSchema>;
