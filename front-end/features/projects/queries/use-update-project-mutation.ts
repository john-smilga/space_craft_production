import { useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';
import { schemas } from '@/lib/generated/api-schemas';;

type UpdateProjectInput = z.infer<typeof schemas.ProjectUpdateRequest>;
type ProjectResponse = z.infer<typeof schemas.ProjectUpdate>;

export function useUpdateProjectMutation(projectSlug: string) {
  const queryClient = useQueryClient();

  return useAppMutation<ProjectResponse, UpdateProjectInput>(
    async (input) => {
      const validatedInput = schemas.ProjectUpdateRequest.parse(input);
      const response = await api.put(`/projects/${projectSlug}/`, validatedInput);
      return schemas.ProjectUpdate.parse(response.data);
    },
    {
      successMessage: 'Project updated successfully',
      errorMessage: 'Failed to update project',
      invalidateQueries: [['projects'], ['project', projectSlug]],
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['project', data.name] });
      },
    }
  );
}

