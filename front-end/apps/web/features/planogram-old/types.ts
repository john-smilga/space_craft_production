import { z } from 'zod';
import { schemas } from '@/lib/generated/api-schemas';

// Export types from generated schemas
export type Planogram = z.infer<typeof schemas.Planogram>;
export type PlanogramDetail = z.infer<typeof schemas.PlanogramDetail>;
export type CreatePlanogramInput = z.infer<typeof schemas.PlanogramCreateRequest>;
export type UpdatePlanogramInput = z.infer<typeof schemas.PlanogramUpdateRequest>;
export type Season = z.infer<typeof schemas.SeasonEnum>;

// Layout types from generated schemas
export type Layout = z.infer<typeof schemas.Layout>;
export type LayoutItem = z.infer<typeof schemas.LayoutItem>;
export type LayoutItemMeta = z.infer<typeof schemas.LayoutItemMeta>;
export type LayoutRow = z.infer<typeof schemas.LayoutRow>;
export type GridConfig = z.infer<typeof schemas.GridConfig>;

// Backward compatibility alias
export type GridResponse = Layout;

// Structured response combining planogram + layout
export type PlanogramDetailResponse = {
  planogram: Planogram;
  layout?: Layout | null;
}

// Derive from Product API schema
type ProductFields = Pick<
  z.infer<typeof schemas.Product>,
  'id' | 'name' | 'category' | 'color' | 'margin' | 'pack_width_in' | 'pack_height_in'
>;

// AvailableItem extends Product with score (mapped from overall_score)
export type AvailableItem = ProductFields & {
  score: number; // Mapped from Product.overall_score
}

// Derive from API schema Category type
export type PlanogramCategory = Pick<z.infer<typeof schemas.Category>, 'id' | 'name' | 'slug'>;

