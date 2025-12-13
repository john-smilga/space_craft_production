import { z } from 'zod';

export const AvailableProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.string(),
  color: z.string().optional(),
  overall_score: z.number().optional(),
  margin: z.number().optional(),
  pack_width_in: z.number(),
  pack_height_in: z.number(),
  expiration_stability: z.number().optional(),
  sales_velocity: z.number().optional(),
  seasonality: z.number().optional(),
});

export const AvailableProductsResponseSchema = z.object({
  products: z.array(AvailableProductSchema),
});

export type AvailableProduct = z.infer<typeof AvailableProductSchema>;
export type AvailableProductsResponse = z.infer<typeof AvailableProductsResponseSchema>;
