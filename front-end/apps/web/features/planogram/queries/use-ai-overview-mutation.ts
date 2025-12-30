'use client';

import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';
import { schemas } from '@/lib/generated/api-schemas';

type AIOverviewVariables = {
  slug: string;
};

async function fetchAIOverview(variables: AIOverviewVariables): Promise<string> {
  const { data } = await api.post(`/planograms/${variables.slug}/ai-overview/`);
  const validated = schemas.AIOverviewResponse.parse(data);
  return validated.overview;
}

export function useAIOverviewMutation() {
  return useMutation({
    mutationFn: fetchAIOverview,
  });
}
