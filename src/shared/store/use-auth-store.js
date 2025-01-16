import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// useCounterStore
export const useAuthStore = create(
  persist(
    (set) => ({
      // States
      userDetails: null,
      // Actions
      setUserDetails: (payload) => set((state) => ({ ...state, userDetails: payload })),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
