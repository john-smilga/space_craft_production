import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import api from '@/lib/axios';
import { schemas } from '@/lib/generated/api-schemas';;

type UserResponse = z.infer<typeof schemas.User>;

export function useUserQuery(userSlug: string | null) {
  return useQuery({
    queryKey: ['user', userSlug],
    queryFn: async (): Promise<UserResponse> => {
      if (!userSlug) {
        throw new Error('User slug is required');
      }
      const response = await api.get(`/users/${userSlug}/`);
      return schemas.User.parse(response.data);
    },
    enabled: !!userSlug,
  });
}

