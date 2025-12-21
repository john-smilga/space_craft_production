'use client';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { z } from 'zod';
import api from '@/lib/axios';
import { schemas } from '@/lib/generated/api-schemas';
import { usePlanogramStore } from '../store';
import type { PlanogramDetailResponse } from '../types';

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

async function fetchPlanogram(slug: string): Promise<PlanogramDetailResponse> {
  const { data } = await api.get(`/planograms/${slug}/`);
  const validated = PlanogramDetailResponseSchema.parse(data);
  
  // Extract layout and return structured response
  const { layout, ...planogramData } = validated;
  return {
    planogram: planogramData,
    layout,
  };
}

export function usePlanogramQuery(slug: string | null) {
  const initializeForm = usePlanogramStore.use.initializeForm();
  const initializeFromResponse = usePlanogramStore.use.initializeFromResponse();

  const query = useQuery({
    queryKey: ['planograms', slug],
    queryFn: () => fetchPlanogram(slug!),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });

  // Initialize form and layouts when data changes
  useEffect(() => {
    if (query.data) {
      const planogram = query.data.planogram;
      const displayId = planogram.display?.toString() || undefined;

      initializeForm({
        name: planogram.name,
        display_id: displayId,
        season: planogram.season,
        shelf_count: planogram.shelf_count,
        width_in: parseFloat(planogram.width_in),
        height_in: parseFloat(planogram.height_in),
        category_ids: Array.isArray(planogram.category_ids) ? planogram.category_ids : [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data?.planogram?.id]);

  useEffect(() => {
    if (query.data?.layout) {
      initializeFromResponse(query.data.layout);
    }
  }, [query.data?.layout, initializeFromResponse]);

  return query;
}

