import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';
import { usePlanogramStore } from '../store';

interface AIOverviewVariables {
  slug: string;
}

interface AIOverviewResponse {
  overview: string;
}

async function fetchAIOverview(variables: AIOverviewVariables): Promise<string> {
  const { data } = await api.post<AIOverviewResponse>(`/planograms/${variables.slug}/ai-overview/`);
  return data.overview;
}

export function useAIOverviewMutation() {
  const setAILoading = usePlanogramStore.use.setAILoading();
  const setAIError = usePlanogramStore.use.setAIError();
  const setAIOverview = usePlanogramStore.use.setAIOverview();

  return useMutation({
    mutationFn: fetchAIOverview,
    onMutate: () => {
      setAILoading(true);
      setAIError(null);
    },
    onSuccess: (data) => {
      setAIOverview(data);
      setAILoading(false);
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        setAIError(error.message || 'Failed to generate AI overview');
      } else {
        setAIError('Failed to generate AI overview');
      }
      setAILoading(false);
    },
  });
}

