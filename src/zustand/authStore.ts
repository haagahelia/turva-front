import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthState, User } from '../types/auth';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      hasHydrated: false,
      isLoading: false,
      error: null,

      // Login
      login: (token: string, user: User) => {
        set({
          token,
          user,
          isLoggedIn: true,
          error: null,
        });
      },

      // Logout
      logout: () => {
        set({
          token: null,
          user: null,
          isLoggedIn: false,
          error: null,
          isLoading: false,
        });
      },

      // Loading state
      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },

      // Error handling
      setError: (error: string | null) => {
        set({ error });
      },

      // Hydration flag
      setHasHydrated: (value: boolean) => {
        set({ hasHydrated: value });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),

      // Avoids unnecessary data being stored in AsyncStorage
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isLoggedIn: state.isLoggedIn,
      }),

      // Prevents UI Flicker
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);