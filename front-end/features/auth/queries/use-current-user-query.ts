'use client';
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import api from '@/lib/axios'
import { schemas } from '@/lib/generated/api-schemas'
import { useAuthStore } from '../store'

type UserType = z.infer<typeof schemas.User>

async function fetchCurrentUser(): Promise<UserType> {
  const { data } = await api.get('/users/me/')
  return schemas.User.parse(data)
}

export function useCurrentUserQuery() {
  const user = useAuthStore.use.user()
  const setUser = useAuthStore.use.setUser()

  return useQuery({
    queryKey: ['auth', 'current-user'],
    queryFn: async () => {
      try {
        const fetchedUser = await fetchCurrentUser()
        setUser(fetchedUser)
        return fetchedUser
      } catch (error) {
        setUser(null)
        throw error
      }
    },
    enabled: !user,
    retry: false,
    staleTime: Infinity,
  })
}
