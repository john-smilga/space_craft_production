import { z } from 'zod';
import api from '@/lib/axios';
import { usePaginatedQuery } from '@/lib/react-query/hooks';
import { schemas } from '@/lib/generated/api-schemas';;

type ProjectType = z.infer<typeof schemas.ProjectList>;

export function useProjectsQuery() {
  return usePaginatedQuery<ProjectType>(
    ['projects'],
    async () => {
      const response = await api.get('/projects/');
      return schemas.PaginatedProjectListList.parse(response.data);
    }
  );
}

