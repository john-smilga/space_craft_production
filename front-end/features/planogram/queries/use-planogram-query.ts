import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import api from '@/lib/axios';
import { usePlanogramStore } from '../store';
import type { PlanogramDetailResponse } from '../types';

async function fetchPlanogram(slug: string): Promise<PlanogramDetailResponse> {
  const { data } = await api.get(`/planograms/${slug}/`);
  return data;
}

export function usePlanogramQuery(slug: string | null) {
  const initializeForm = usePlanogramStore.use.initializeForm();
  const initializeLayouts = usePlanogramStore.use.initializeLayouts();
  const setLoading = usePlanogramStore.use.setLoading();

  const query = useQuery({
    queryKey: ['planograms', slug],
    queryFn: () => fetchPlanogram(slug!),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });

  // Initialize form and layouts when data changes
  useEffect(() => {
    if (query.data?.planogram) {
      const planogram = query.data.planogram;
      const displayId = planogram.display?.id?.toString() || undefined;

      initializeForm({
        name: planogram.name,
        display_id: displayId,
        season: planogram.season,
        shelf_count: planogram.shelf_count,
        width_in: planogram.width_in,
        height_in: planogram.height_in,
        category_ids: planogram.category_ids,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data?.planogram?.id]);

  useEffect(() => {
    if (query.data?.layout) {
      initializeLayouts(query.data.layout);
    } else if (!query.isLoading) {
      setLoading(false);
    }
  }, [query.data?.layout, query.isLoading, initializeLayouts, setLoading]);

  return query;
}

