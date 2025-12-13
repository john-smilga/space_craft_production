import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { ProjectResponse } from '../types';

export function useProjectQuery(projectSlug: string | null) {
  return useQuery({
    queryKey: ['project', projectSlug],
    queryFn: async (): Promise<ProjectResponse> => {
      if (!projectSlug) {
        throw new Error('Project slug is required');
      }
      const response = await api.get(`/projects/${projectSlug}/`);
      return response.data;
    },
    enabled: !!projectSlug,
  });
}

