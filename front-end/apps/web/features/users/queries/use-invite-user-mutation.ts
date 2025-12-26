'use client';
import { z } from 'zod';
import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';
import { schemas } from '@/lib/generated/api-schemas';;

type InviteUserInput = z.infer<typeof schemas.UserInviteRequest>;
type InviteResponse = z.infer<typeof schemas.UserInviteResponse>;

export function useInviteUserMutation() {
  return useAppMutation<InviteResponse, InviteUserInput>(
    async (input) => {
      const validatedInput = schemas.UserInviteRequest.parse(input);
      const response = await api.post('/users/invite/', validatedInput);
      return schemas.UserInviteResponse.parse(response.data);
    },
    {
      successMessage: 'User invitation created successfully',
      errorMessage: 'Failed to create invitation',
      invalidateQueries: [['users']],
    }
  );
}

