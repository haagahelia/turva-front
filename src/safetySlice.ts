import { StateCreator } from "zustand";

export interface SafetyState {
  completed: string[];
  markCompleted: (route: string) => void;
  resetSafety: () => void;
}

export const createSafetySlice: StateCreator<SafetyState> = (set) => ({
  completed: [],
  markCompleted: (route) =>
    set((state) => ({
      completed: state.completed.includes(route)
        ? state.completed
        : [...state.completed, route],
    })),
  resetSafety: () => set({ completed: [] }),
});
