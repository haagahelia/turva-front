// store.ts
import { create } from "zustand";
import { createThemeSlice, StoreState } from "./themeSlice";

export const useThemeStore = create<StoreState>()((...a) => ({
  ...createThemeSlice(...a),
}));
