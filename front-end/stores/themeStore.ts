import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  initTheme: () => () => void;
}

export const useThemeStore = create<ThemeState>()(
  devtools(
    (set) => ({
      isDark: false,

      setIsDark: (isDark) => set({ isDark }, false, 'theme/setIsDark'),

      initTheme: () => {
        const checkTheme = () => {
          const isDark = document.documentElement.classList.contains('dark');
          set({ isDark }, false, 'theme/initTheme');
        };

        checkTheme();

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['class'],
        });

        return () => observer.disconnect();
      },
    }),
    { name: 'ThemeStore' }
  )
);
