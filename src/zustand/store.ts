import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { briefingItems } from "../mockData";
import { createThemeSlice, StoreState } from "./themeSlice";
import { createLanguageSlice, LanguageSlice } from "./languageSlice";
import { createOnboardingSlice, OnboardingSlice } from "./onboardingSlice";

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

export const useLanguageStore = create<LanguageSlice>()(
  persist(
    (...a) => ({
      ...createLanguageSlice(...a),
    }),
    {
      name: "language-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useOnboardingStore = create<OnboardingSlice>()(
  persist(
    (...a) => ({
      ...createOnboardingSlice(...a),
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

type SafetyState = {
  completed: string[];
  readCount: number;
  markCompleted: (route: string) => void;
  resetSafety: () => void;
  initializeReadCount: () => void;
};

export const useSafetyStore = create<SafetyState>()(
  persist(
    (set, get) => ({
      completed: [],
      readCount: 0,
      markCompleted: (route) =>
        set((state) => {
          const isCurrentlyCompleted = state.completed.includes(route);
          const newCompleted = isCurrentlyCompleted
            ? state.completed.filter(item => item !== route)
            : [...state.completed, route];
          
          // Count only valid briefing item routes
          const validBriefingRoutes = newCompleted.filter(item => {
            // Must be a safety-info route with a valid itemId
            return item.includes('safety-info?itemId=') && 
                   briefingItems.some(briefingItem => 
                     item.includes(`itemId=${briefingItem.id}`)
                   );
          });
          
          const newReadCount = validBriefingRoutes.length;
          
          return {
            completed: newCompleted,
            readCount: newReadCount,
          };
        }),
      resetSafety: () => set({ completed: [], readCount: 0 }),
      initializeReadCount: () =>
        set((state) => {
          const validBriefingRoutes = state.completed.filter(item => {
            return item.includes('safety-info?itemId=') && 
            briefingItems.some(briefingItem => 
              item.includes(`itemId=${briefingItem.id}`)
            );
          });
          
          const readCount = validBriefingRoutes.length;
          
          return {
            ...state,
            readCount: readCount,
          };
        }),
    }),
    {
      name: "safety-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
