'use client';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import api from '@/lib/axios';
import { schemas } from '@/lib/generated/api-schemas';

type Planogram = z.infer<typeof schemas.Planogram>;

async function fetchPlanogram(slug: string): Promise<Planogram> {
  const { data } = await api.get(`/planograms/${slug}/`);
  return schemas.Planogram.parse(data);
}

export function usePlanogramQuery(slug: string | null) {
  return useQuery({
    queryKey: ['planograms', 'detail', slug],
    queryFn: () => fetchPlanogram(slug!),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
}
