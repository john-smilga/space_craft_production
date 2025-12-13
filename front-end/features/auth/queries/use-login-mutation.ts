import { useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';
import { loginResponseSchema } from '../schemas/login-schema';
import { useAuthStore } from '../store';
import type { LoginCredentials, LoginResponse } from '../types';

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore.use.setUser();

  return useAppMutation<LoginResponse, LoginCredentials>(
    async (credentials) => {
      const { data } = await api.post('/auth/login/', credentials);
      return loginResponseSchema.parse(data);
    },
    {
      successMessage: 'Logged in successfully',
      errorMessage: 'Login failed',
      onSuccess: (data) => {
        setUser(data.user);
        queryClient.setQueryData(['auth', 'current-user'], data.user);
      },
    }
  );
}

