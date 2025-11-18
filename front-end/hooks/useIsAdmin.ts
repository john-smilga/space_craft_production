import { useAuthStore } from '@/stores/authStore';

export function useIsAdmin(): boolean {
  const { user } = useAuthStore();
  return user?.role === 'admin' || false;
}
