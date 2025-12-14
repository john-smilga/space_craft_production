import { useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';
import { schemas } from '@/lib/generated/api-schemas';
import type { LayoutItem, Planogram } from '../types';

type UpdatePlanogramInput = z.infer<typeof schemas.PlanogramUpdateRequest>;

interface UpdatePlanogramVariables extends UpdatePlanogramInput {
  slug: string;
  layout?: Record<number, LayoutItem[]>;
}

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

export function useUpdatePlanogramMutation() {
  const queryClient = useQueryClient();

  return useAppMutation<Planogram, UpdatePlanogramVariables>(
    async (variables) => {
      const { slug, ...data } = variables;
      const validatedInput = schemas.PlanogramUpdateRequest.parse(data);
      const response = await api.put(`/planograms/${slug}/`, validatedInput);
      const validated = PlanogramDetailResponseSchema.parse(response.data);
      
      // Return just the planogram data (layout field is omitted)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { layout, ...planogramData } = validated;
      return planogramData;
    },
    {
      successMessage: 'Planogram updated successfully',
      errorMessage: 'Failed to update planogram',
      invalidateQueries: [['planograms']],
      onSuccess: (data) => {
        queryClient.setQueryData(['planograms', data.slug], data);
        queryClient.invalidateQueries({ queryKey: ['planograms', data.slug] });
      },
    }
  );
}

