import { z } from 'zod';
import { schemas } from '@/lib/generated/api-schemas';

// Export the TYPE (not the schema) as Planogram for backward compatibility
export type Planogram = z.infer<typeof schemas.Planogram>;
export type CreatePlanogramInput = z.infer<typeof schemas.PlanogramCreateRequest>;
export type UpdatePlanogramInput = z.infer<typeof schemas.PlanogramUpdateRequest>;
export type Season = z.infer<typeof schemas.SeasonC9aEnum>;

export interface PlanogramDetailResponse {
  planogram: Planogram;
  layout?: GridResponse;
}

export interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  meta: {
    id: number;
    name: string;
    category: string;
    color?: string;
    score: number;
    pack_width_in: number;
    pack_height_in: number;
  };
}

export interface AvailableItem {
  id: number;
  name: string;
  category: string;
  color?: string;
  score: number;
  margin: number;
  pack_width_in: number;
  pack_height_in: number;
}

export interface GridResponse {
  grid: {
    cols: number;
    rows: number;
    cellWidthIn: number;
    normalizedWidthIn?: number;
    normalizedHeightIn?: number;
  };
  rows: Array<{
    id: number;
    category: string | null;
    name: string;
    items: LayoutItem[];
  }>;
}

export interface PlanogramCategory {
  id: number;
  name: string;
  slug?: string;
}

