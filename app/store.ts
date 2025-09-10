// store.ts
import { create } from "zustand";
import { createThemeSlice } from "./themeSlice";
import { StoreState } from "./types";

export const useThemeStore = create<StoreState>()((...a) => ({
  ...createThemeSlice(...a),
}));
