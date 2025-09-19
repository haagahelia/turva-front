import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createThemeSlice, StoreState } from "./themeSlice";

export const useThemeStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createThemeSlice(...a),
    }),
    {
      name: "theme-storage", // storage key
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

type SafetyState = {
  completed: string[];
  markCompleted: (route: string) => void;
  resetSafety: () => void;
};

export const useSafetyStore = create<SafetyState>()(
  persist(
    (set) => ({
      completed: [],
      markCompleted: (route) =>
        set((state) => ({
          completed: state.completed.includes(route)
            ? state.completed
            : [...state.completed, route],
        })),
      resetSafety: () => set({ completed: [] }),
    }),
    {
      name: "safety-storage", // safety key
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
