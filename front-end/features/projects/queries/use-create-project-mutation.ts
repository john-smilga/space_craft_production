'use client';
import { z } from 'zod';
import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';
import { schemas } from '@/lib/generated/api-schemas';;

type CreateProjectInput = z.infer<typeof schemas.ProjectCreateRequest>;
type ProjectResponse = z.infer<typeof schemas.Project>;

export function useCreateProjectMutation() {
  return useAppMutation<ProjectResponse, CreateProjectInput>(
    async (input) => {
      const validatedInput = schemas.ProjectCreateRequest.parse(input);
      const response = await api.post('/projects/', validatedInput);
      return schemas.Project.parse(response.data);
    },
    {
      successMessage: 'Project created successfully',
      errorMessage: 'Failed to create project',
      invalidateQueries: [['projects']],
    }
  );
}

