import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// useCounterStore
export const useFilterToggleStore = create(
  persist(
    (set) => ({
      // States
      opened: true,
      // Actions
      toggle: () => set((state) => ({ opened: !state.opened })),
    }),
    {
      name: 'filter-toggle-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
