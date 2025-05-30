import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set, get) => ({
      isDark: false,
      setIsDark: (value) => set({ isDark: value }),
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({
        isDark: state.isDark,
      }),
    }
  )
);