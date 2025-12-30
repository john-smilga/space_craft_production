'use client';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import api from '@/lib/axios';
import { schemas } from '@/lib/generated/api-schemas';

type Layout = z.infer<typeof schemas.Layout>;

async function fetchLayout(planogramSlug: string): Promise<Layout> {
  const { data } = await api.get(`/planograms/${planogramSlug}/layout/`);
  return schemas.Layout.parse(data);
}

export function useLayoutQuery(planogramSlug: string | null) {
  return useQuery({
    queryKey: ['planograms', 'layout', planogramSlug],
    queryFn: () => fetchLayout(planogramSlug!),
    enabled: !!planogramSlug,
    staleTime: 0, // Always refetch when needed (layout can change frequently)
    retry: 1,
  });
}
