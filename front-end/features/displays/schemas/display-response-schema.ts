import { z } from 'zod';

export const displayTypeSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const displaySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  type: z.string(),
  type_display: z.string().optional(),
  width_in: z.number(),
  height_in: z.number(),
  depth_in: z.number().nullable().optional(),
  shelf_count: z.number(),
  shelf_spacing: z.number().nullable().optional(),
  display_category: z.enum(['standard', 'custom']),
  company: z.object({ id: z.number(), name: z.string() }).nullable().optional(),
  created_at: z.string(),
  created_by: z.object({ id: z.number(), username: z.string() }).nullable().optional(),
  usage: z.object({ pog_count: z.number(), can_delete: z.boolean() }).optional(),
});

export const displayTypesResponseSchema = z.array(displayTypeSchema);

export const standardDisplaysResponseSchema = z.array(displaySchema);

export type DisplayType = z.infer<typeof displayTypeSchema>;
export type Display = z.infer<typeof displaySchema>;
export type DisplayTypesResponse = z.infer<typeof displayTypesResponseSchema>;
export type StandardDisplaysResponse = z.infer<typeof standardDisplaysResponseSchema>;
