import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createSelectors } from '@/lib/zustand/create-selectors';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

const useAuthStoreBase = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }, false, 'setUser'),
      clearUser: () => set({ user: null }, false, 'clearUser'),
    }),
    { name: 'AuthStore' }
  )
);

export const useAuthStore = createSelectors(useAuthStoreBase);

