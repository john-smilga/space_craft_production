'use client';
import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';

export function useDeleteUserMutation(userSlug: string) {
  return useAppMutation<void, void>(
    async () => {
      await api.delete(`/users/${userSlug}/`);
    },
    {
      successMessage: 'User deleted successfully',
      errorMessage: 'Failed to delete user',
      invalidateQueries: [['users'], ['user', userSlug]],
    }
  );
}

