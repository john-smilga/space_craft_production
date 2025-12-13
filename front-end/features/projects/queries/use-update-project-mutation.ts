import { useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';
import type { ProjectResponse, UpdateProjectInput } from '../types';

export function useUpdateProjectMutation(projectSlug: string) {
  const queryClient = useQueryClient();

  return useAppMutation<ProjectResponse, UpdateProjectInput>(
    async (input) => {
      const response = await api.put(`/projects/${projectSlug}/`, input);
      return response.data;
    },
    {
      successMessage: 'Project updated successfully',
      errorMessage: 'Failed to update project',
      invalidateQueries: [['projects'], ['project', projectSlug]],
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['project', data.slug] });
      },
    }
  );
}

