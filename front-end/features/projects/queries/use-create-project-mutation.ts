import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';
import type { ProjectResponse, CreateProjectInput } from '../types';

export function useCreateProjectMutation() {
  return useAppMutation<ProjectResponse, CreateProjectInput>(
    async (input) => {
      const response = await api.post('/projects/', input);
      return response.data;
    },
    {
      successMessage: 'Project created successfully',
      errorMessage: 'Failed to create project',
      invalidateQueries: [['projects']],
    }
  );
}

