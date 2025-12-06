import { StateCreator } from "zustand";

export interface OnboardingSlice {
  hasCompletedGameOnboarding: boolean;
  completeGameOnboarding: () => void;
  resetGameOnboarding: () => void;
}

export const createOnboardingSlice: StateCreator<
  OnboardingSlice,
  [],
  [],
  OnboardingSlice
> = (set) => ({
    hasCompletedGameOnboarding: false,

    completeGameOnboarding: () =>
      set({ hasCompletedGameOnboarding: true }),

    resetGameOnboarding: () =>
      set({ hasCompletedGameOnboarding: false }),
});