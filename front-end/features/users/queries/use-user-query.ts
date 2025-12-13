import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { UserResponse } from '../types';

export function useUserQuery(userSlug: string | null) {
  return useQuery({
    queryKey: ['user', userSlug],
    queryFn: async (): Promise<UserResponse> => {
      if (!userSlug) {
        throw new Error('User slug is required');
      }
      const response = await api.get(`/users/${userSlug}/`);
      return response.data;
    },
    enabled: !!userSlug,
  });
}

