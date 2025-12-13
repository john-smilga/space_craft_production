import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';

interface UpdateUsernameInput {
  username: string;
}

export function useUpdateUsernameMutation() {
  return useAppMutation<void, UpdateUsernameInput>(
    async (input) => {
      const response = await api.patch<void>('/users/me/username/', input);
      return response.data;
    },
    {
      successMessage: 'Username updated successfully',
      errorMessage: 'Failed to update username',
      invalidateQueries: [['current-user']],
    }
  );
}

