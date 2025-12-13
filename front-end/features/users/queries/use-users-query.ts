import api from '@/lib/axios';
import { usePaginatedQuery } from '@/lib/react-query/hooks';
import type { User } from '../types';

export function useUsersQuery() {
  return usePaginatedQuery<User>(
    ['users'],
    async () => {
      const response = await api.get('/users/');
      return response.data;
    }
  );
}

