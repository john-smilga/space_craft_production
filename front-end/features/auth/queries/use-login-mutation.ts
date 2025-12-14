import { useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';
import { schemas } from '@/lib/generated/api-schemas';
import { useAuthStore } from '../store';

type LoginCredentials = z.infer<typeof schemas.LoginRequest>;
type LoginResponse = z.infer<typeof schemas.User>;

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore.use.setUser();

  return useAppMutation<LoginResponse, LoginCredentials>(
    async (credentials) => {
      const validatedInput = schemas.LoginRequest.parse(credentials);
      const { data } = await api.post('/auth/login/', validatedInput);
      return schemas.User.parse(data);
    },
    {
      successMessage: 'Logged in successfully',
      errorMessage: 'Login failed',
      onSuccess: (data) => {
        setUser(data);
        queryClient.setQueryData(['auth', 'current-user'], data);
      },
    }
  );
}

