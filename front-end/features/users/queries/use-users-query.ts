import { z } from 'zod';
import api from '@/lib/axios';
import { usePaginatedQuery } from '@/lib/react-query/hooks';
import { schemas } from '@/lib/generated/api-schemas';;

type UserType = z.infer<typeof schemas.User>;

export function useUsersQuery() {
  return usePaginatedQuery<UserType>(
    ['users'],
    async () => {
      const response = await api.get('/users/');
      return schemas.PaginatedUserList.parse(response.data);
    }
  );
}

