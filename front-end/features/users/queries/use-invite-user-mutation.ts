import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';
import type { InviteResponse, InviteUserInput } from '../types';

export function useInviteUserMutation() {
  return useAppMutation<InviteResponse, InviteUserInput>(
    async (input) => {
      const response = await api.post('/users/invite/', input);
      return response.data;
    },
    {
      successMessage: 'User invitation created successfully',
      errorMessage: 'Failed to create invitation',
      invalidateQueries: [['users']],
    }
  );
}

