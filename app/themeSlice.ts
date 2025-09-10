// themeSlice.ts
import { StateCreator } from "zustand";
import { ThemeSlice } from "./types";

export const createThemeSlice: StateCreator<ThemeSlice, [], [], ThemeSlice> = (
  set,
  get
) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
  toggleTheme: () =>
    set({ theme: get().theme === "light" ? "dark" : "light" }),
});
