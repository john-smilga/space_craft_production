'use client';
import { z } from 'zod';
import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';
import { schemas } from '@/lib/generated/api-schemas';

type UpdateUsernameInput = z.infer<typeof schemas.PatchedUserRequest>;
type UserResponse = z.infer<typeof schemas.User>;

export function useUpdateUsernameMutation() {
  return useAppMutation<UserResponse, UpdateUsernameInput>(
    async (input) => {
      const validatedInput = schemas.PatchedUserRequest.parse(input);
      const response = await api.patch('/users/me/username/', validatedInput);
      return schemas.User.parse(response.data);
    },
    {
      successMessage: 'Username updated successfully',
      errorMessage: 'Failed to update username',
      invalidateQueries: [['current-user']],
    }
  );
}

