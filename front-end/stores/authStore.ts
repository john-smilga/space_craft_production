import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import api from '@/lib/axios';
import type { User } from '@/types/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (token: string, password: string, username?: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set, get) => ({
      user: null,
      loading: false,

      login: async (email, password) => {
        set({ loading: true }, false, 'login/start');
        try {
          const { data } = await api.post('/auth/login/', { email, password });
          set({ user: data.user, loading: false }, false, 'login/success');
        } catch (error: any) {
          set({ loading: false }, false, 'login/error');
          throw error;
        }
      },

      register: async (token, password, username) => {
        set({ loading: true }, false, 'register/start');
        try {
          const { data } = await api.post('/auth/register/', { token, password, username });
          set({ user: data.user, loading: false }, false, 'register/success');
        } catch (error: any) {
          set({ loading: false }, false, 'register/error');
          throw error;
        }
      },

      logout: async () => {
        await api.post('/auth/logout/');
        set({ user: null, loading: false }, false, 'logout');
      },

      fetchUser: async () => {
        set({ loading: true }, false, 'fetchUser/start');
        try {
          const { data } = await api.get('/users/me/');
          set({ user: data, loading: false }, false, 'fetchUser/success');
        } catch {
          set({ user: null, loading: false }, false, 'fetchUser/error');
        }
      },
    }),
    { name: 'AuthStore' }
  )
);
