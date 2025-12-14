import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import api from '@/lib/axios';
import { schemas } from '@/lib/generated/api-schemas';;

type ProjectResponse = z.infer<typeof schemas.Project>;

export function useProjectQuery(projectSlug: string | null) {
  return useQuery({
    queryKey: ['project', projectSlug],
    queryFn: async (): Promise<ProjectResponse> => {
      if (!projectSlug) {
        throw new Error('Project slug is required');
      }
      const response = await api.get(`/projects/${projectSlug}/`);
      return schemas.Project.parse(response.data);
    },
    enabled: !!projectSlug,
  });
}

