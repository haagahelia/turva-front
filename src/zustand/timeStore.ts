import { create } from "zustand";
import {TimeState} from "@/src/types/time";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const useTimeStore = create<TimeState>()(
  persist(
    (set, get) => ({
      sessionStart: null,
      activeTime: 0,

      startSession: () => {
        console.log("[Time] startSession");

        set({
          sessionStart: Date.now(),
        });
      },

      stopSession: () => {
        const { sessionStart, activeTime } = get();

        if (!sessionStart) return;

        const duration = Date.now() - sessionStart;

        console.log("[Time] stopSession", duration);

        set({
          activeTime: activeTime + duration,
          sessionStart: null,
        });
      },

      updateSession: () => {
        const { sessionStart, activeTime } = get();

        if (!sessionStart) return;

        const now = Date.now();
        const duration = now - sessionStart;

        set({
          activeTime: activeTime + duration,
          sessionStart: now,
        });

        console.log("[Time] updateSession", duration);
      },

      reset: () => {
        console.log("[Time] reset");

        set({
          sessionStart: null,
          activeTime: 0,
        });
      },
    }),
    {
      name: "time-storage",
      storage: createJSONStorage(() => AsyncStorage),
    // Avoids unnecessary data being stored in AsyncStorage
      partialize: (state) => ({
      activeTime: state.activeTime,
    }),
    }
  )
);