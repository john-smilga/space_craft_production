import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'
import { userSchema } from '../schemas/user-schema'
import { useAuthStore } from '../store'
import type { User } from '../types'

async function fetchCurrentUser(): Promise<User> {
  const { data } = await api.get('/users/me/')
  return userSchema.parse(data)
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
