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
