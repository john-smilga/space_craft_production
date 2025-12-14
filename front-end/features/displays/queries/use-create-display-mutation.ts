import { z } from 'zod';
import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';
import { schemas } from '@/lib/generated/api-schemas';

type CreateDisplayInput = z.infer<typeof schemas.DisplayCreateRequest>;
type DisplayResponse = z.infer<typeof schemas.Display>;

export function useCreateDisplayMutation() {
  return useAppMutation<DisplayResponse, CreateDisplayInput>(
    async (input) => {
      const validatedInput = schemas.DisplayCreateRequest.parse(input);
      const response = await api.post('/displays/', validatedInput);
      return schemas.Display.parse(response.data);
    },
    {
      successMessage: 'Display created successfully',
      errorMessage: 'Failed to create display',
      invalidateQueries: [['displays']],
    }
  );
}

