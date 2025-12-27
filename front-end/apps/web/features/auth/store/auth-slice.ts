import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { z } from 'zod';
import { createSelectors } from '@/lib/zustand/create-selectors';
import { schemas } from '@/lib/generated/api-schemas';

type UserType = z.infer<typeof schemas.User>;

type AuthState = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
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

