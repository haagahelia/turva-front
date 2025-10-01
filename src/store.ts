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

export { StoreState };
