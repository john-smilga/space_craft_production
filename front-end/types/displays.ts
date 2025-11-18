export type DisplayType = 'gondola' | 'endcap' | 'wall_unit' | 'refrigerated_case' | 'freezer_case' | 'island_display' | 'checkout_counter' | 'shelf' | 'rack' | 'bin' | 'other';

export interface DisplayTypeOption {
  value: DisplayType;
  label: string;
}

export interface Display {
  id: number;
  name: string;
  type: DisplayType;
  type_display: string;
  width_in: number;
  height_in: number;
  depth_in: number | null;
  shelf_count: number;
  shelf_spacing: number | null;
  slug: string;
  display_category: 'standard' | 'custom';
  company: {
    id: number;
    name: string;
  } | null; // null for standard displays
  created_at: string;
  created_by: {
    id: number;
    username: string;
  } | null;
  usage?: {
    pog_count: number;
    can_delete: boolean;
  };
}

export interface DisplaysResponse {
  displays: Display[];
}

export interface DisplayResponse {
  display: Display;
}

export interface DisplayTypesResponse {
  types: DisplayTypeOption[];
}

export interface StandardDisplaysResponse {
  standards: Display[]; // Standard displays are Display objects with display_category='standard'
}
