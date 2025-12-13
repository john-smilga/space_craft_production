import api from '@/lib/axios';
import { usePaginatedQuery } from '@/lib/react-query/hooks';
import type { Project } from '../types';

export function useProjectsQuery() {
  return usePaginatedQuery<Project>(
    ['projects'],
    async () => {
      const response = await api.get('/projects/');
      return response.data;
    }
  );
}

