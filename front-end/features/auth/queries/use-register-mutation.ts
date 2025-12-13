import { useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';
import { registerResponseSchema } from '../schemas/login-schema';
import { useAuthStore } from '../store';
import type { RegisterData, RegisterResponse } from '../types';

export function useRegisterMutation() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore.use.setUser();

  return useAppMutation<RegisterResponse, RegisterData>(
    async (data) => {
      const response = await api.post('/auth/register/', data);
      return registerResponseSchema.parse(response.data);
    },
    {
      successMessage: 'Registered successfully',
      errorMessage: 'Registration failed',
      onSuccess: (data) => {
        setUser(data.user);
        queryClient.setQueryData(['auth', 'current-user'], data.user);
      },
    }
  );
}

