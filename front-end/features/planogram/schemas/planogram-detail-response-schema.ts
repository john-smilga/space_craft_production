import { z } from 'zod';

export const PlanogramDetailResponseSchema = z.object({
  planogram: z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    season: z.string(),
    category_ids: z.array(z.number()).optional(),
    shelf_count: z.number(),
    width_in: z.number(),
    height_in: z.number(),
    depth_in: z.number().nullable().optional(),
    shelf_spacing: z.number().nullable().optional(),
    display: z.object({
      id: z.number().nullable(),
      name: z.string().nullable(),
      type: z.string().nullable(),
      slug: z.string().nullable(),
      width_in: z.number().optional(),
      height_in: z.number().optional(),
      depth_in: z.number().optional(),
      shelf_count: z.number().optional(),
    }).nullable().optional(),
    project: z.object({
      id: z.number(),
      name: z.string(),
      slug: z.string(),
    }).optional(),
    categories: z.array(z.object({
      id: z.number(),
      slug: z.string(),
      name: z.string(),
    })),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    created_by: z.object({
      id: z.number(),
      username: z.string(),
    }).nullable().optional(),
    updated_by: z.object({
      id: z.number(),
      username: z.string(),
    }).nullable().optional(),
  }),
  layout: z.object({
    grid: z.object({
      cols: z.number(),
      rows: z.number(),
      cellWidthIn: z.number(),
    }),
    rows: z.array(z.object({
      id: z.number(),
      category: z.string().nullable(),
      name: z.string(),
      items: z.array(z.object({
        i: z.string(),
        x: z.number(),
        y: z.number(),
        w: z.number(),
        h: z.number(),
        meta: z.object({
          id: z.number(),
          name: z.string(),
          category: z.string(),
          color: z.string().optional(),
          score: z.number(),
          pack_width_in: z.number(),
          pack_height_in: z.number(),
        }),
      })),
    })),
  }).optional(),
});

export type PlanogramDetailResponse = z.infer<typeof PlanogramDetailResponseSchema>;
