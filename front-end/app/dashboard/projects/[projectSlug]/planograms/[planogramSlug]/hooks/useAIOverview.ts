import api from '@/lib/axios';
import { usePlanogramAIStore } from '@/stores/planogramAIStore';

interface AIOverviewResponse {
  overview: string;
}

export function useAIOverview() {
  const { setLoading, setError, setOverview, reset } = usePlanogramAIStore();

  const fetchAIOverview = async (planogramSlug: string) => {
    setLoading(true);
    setError(null);
    setOverview(null);

    try {
      const response = await api.post<AIOverviewResponse>(`/planograms/${planogramSlug}/ai-overview/`);
      setOverview(response.data.overview);
      return { data: response.data.overview, error: null };
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to generate AI overview';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { fetchAIOverview, reset };
}
