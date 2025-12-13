export interface Planogram {
  id: number;
  name: string;
  season: string;
  season_display?: string;
  category_ids?: number[];
  categories: Array<{
    id: number;
    slug: string;
    name: string;
  }>;
  slug: string;
  project?: {
    id: number;
    name: string;
    slug: string;
  };
  project_name?: string;
  project_slug?: string;
  display?: {
    id: number | null;
    name: string | null;
    type: string | null;
    slug: string | null;
    width_in?: number;
    height_in?: number;
    depth_in?: number;
    shelf_count?: number;
  } | null;
  display_name?: string | null;
  // Dimensions stored directly on planogram
  width_in?: number;
  height_in?: number;
  depth_in?: number | null;
  shelf_count?: number;
  shelf_spacing?: number | null;
  company?: {
    id: number;
    name: string;
  };
  company_name?: string;
  created_at?: string;
  updated_at?: string;
  preserve_layout?: boolean;
  created_by?: {
    id: number;
    username: string;
  } | null;
  updated_by?: {
    id: number;
    username: string;
  } | null;
}

export interface PlanogramsResponse {
  planograms: Planogram[];
}

export interface PlanogramResponse {
  planogram: Planogram;
  layout?: GridResponse;
}

export interface PlanogramDetailResponse {
  planogram: Planogram;
  layout?: GridResponse;
}

export type PlanogramCreateResponse = Planogram;

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
  grid: { cols: number; rows: number; cellWidthIn: number };
  rows: Array<{
    id: number;
    category: string | null;
    name: string;
    items: LayoutItem[];
  }>;
}
