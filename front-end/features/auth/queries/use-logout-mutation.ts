import { useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';
import { useAuthStore } from '../store';

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const clearUser = useAuthStore.use.clearUser();

  return useAppMutation<void, void>(
    async () => {
      await api.post('/auth/logout/');
    },
    {
      successMessage: 'Logged out successfully',
      errorMessage: 'Logout failed',
      onSuccess: () => {
        clearUser();
        queryClient.setQueryData(['auth', 'current-user'], null);
        queryClient.clear();
      },
    }
  );
}

