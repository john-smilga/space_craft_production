export interface Product {
  id: number;
  name: string;
  pack_width_in: number;
  pack_height_in: number;
  expiration_stability?: number;
  margin?: number;
  sales_velocity?: number;
  seasonality?: number;
  overall_score?: number;
  category?: string; // Category name from path
}

export interface ProductsResponse {
  products: Product[];
}
