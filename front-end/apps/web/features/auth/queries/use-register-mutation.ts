'use client';
import { useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';
import { schemas } from '@/lib/generated/api-schemas';
import { useAuthStore } from '../store';

type RegisterData = z.infer<typeof schemas.RegisterRequestRequest>;
type RegisterResponse = z.infer<typeof schemas.User>;

export function useRegisterMutation() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore.use.setUser();

  return useAppMutation<RegisterResponse, RegisterData>(
    async (data) => {
      const validatedInput = schemas.RegisterRequestRequest.parse(data);
      const response = await api.post('/auth/register/', validatedInput);
      return schemas.User.parse(response.data);
    },
    {
      successMessage: 'Registered successfully',
      errorMessage: 'Registration failed',
      onSuccess: (data) => {
        setUser(data);
        queryClient.setQueryData(['auth', 'current-user'], data);
      },
    }
  );
}

