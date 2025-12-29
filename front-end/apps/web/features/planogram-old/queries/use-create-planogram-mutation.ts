'use client';
import { z } from 'zod';
import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';
import { schemas } from '@/lib/generated/api-schemas';
import type { PlanogramDetailResponse } from '../types';

type CreatePlanogramInput = z.infer<typeof schemas.PlanogramCreateRequest>;

// Schema for layout item structure
const LayoutItemSchema = z.object({
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
});

const GridResponseSchema = z.object({
  grid: z.object({
    cols: z.number(),
    rows: z.number(),
    cellWidthIn: z.number(),
  }),
  rows: z.array(
    z.object({
      id: z.number(),
      category: z.string().nullable(),
      name: z.string(),
      items: z.array(LayoutItemSchema),
    })
  ),
});

// API returns planogram fields spread out + layout field
const PlanogramDetailResponseSchema = schemas.Planogram.extend({
  layout: GridResponseSchema.optional(),
});

export function useCreatePlanogramMutation() {
  return useAppMutation<PlanogramDetailResponse, CreatePlanogramInput>(
    async (input) => {
      const validatedInput = schemas.PlanogramCreateRequest.parse(input);
      const response = await api.post('/planograms/', validatedInput);
      const validated = PlanogramDetailResponseSchema.parse(response.data);
      
      // Extract layout and return structured response
      const { layout, ...planogramData } = validated;
      return {
        planogram: planogramData,
        layout,
      };
    },
    {
      successMessage: 'Planogram created successfully',
      errorMessage: 'Failed to create planogram',
      invalidateQueries: [['planograms'], ['projects']],
    }
  );
}

