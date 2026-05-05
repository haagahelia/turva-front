import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config/api";
import { StateCreator } from "zustand";

const WORLD_COMPLETION_BONUS = 10; // 10 points per completed world

type QuizResult = {
  quizId: number;
  correctAnswers: number;
  totalAnswers: number;
  worldId: number
};

export type GameProgressSlice = {
  quizResults: Record<number, QuizResult>;
  totalPoints: number;
  awardedQuizPoints: Record<number, number>;
  claimedWorldBonuses: Record<number, boolean>;
  completedWorlds: number[];

  setQuizResult: (result: QuizResult) => void;
  resetGameProgress: () => void;
  completeWorld: (worldId: number, worlds: any[]) => void;
  isQuizCompleted: (quizId: number) => boolean;
  isWorldCompleted: (worldId: number, quizzes: any[]) => boolean;
  isWorldUnlocked: (worldId: number, worlds: any[], quizzes: any[]) => boolean;
  getPointsSummary: () => { quizPoints: number; bonusPoints: number; total: number };
};

const initialState = {
  quizResults: {} as Record<number, QuizResult>,
  totalPoints: 0,
  awardedQuizPoints: {} as Record<number, number>,
  claimedWorldBonuses: {} as Record<number, boolean>,
  completedWorlds: [] as number[],
};

export const createGameProgressSlice: StateCreator<GameProgressSlice> = (set, get) => ({
  ...initialState,

  setQuizResult: (result) => {
    set((state) => {
      const previouslyAwarded = state.awardedQuizPoints[result.quizId] ?? 0;
      const deltaPoints = Math.max(0, result.correctAnswers - previouslyAwarded);

      return {
        quizResults: {
          ...state.quizResults,
          [result.quizId]: result,
        },
        awardedQuizPoints: {
          ...state.awardedQuizPoints,
          [result.quizId]: previouslyAwarded + deltaPoints,
        },
        totalPoints: state.totalPoints + deltaPoints,
      };
    });

    const sendToBackend = async () => {
      try {
        // const token = "" // Temporary token for testing, replace with actual token retrieval when auth is implemented
        const token = await AsyncStorage.getItem("authToken");
        if (!token) throw new Error("No auth token found");

        const res = await fetch(`${API_URL}/api/quiz-result`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            quiz_id: result.quizId,
            correct_answers: result.correctAnswers,
            time_spent_seconds: 0, // temporary value
          }),
        });

        if (!res.ok) throw new Error(`Quiz result save failed: ${res.statusText}`);

        const data = await res.json();

        if (data.bonusAwarded) {
          set((state) => ({
            completedWorlds: [...state.completedWorlds, result.worldId],
            totalPoints: state.totalPoints + WORLD_COMPLETION_BONUS,
          }));
        }
      } catch (err) {
        console.error("Error saving quiz result:", err);
      }
    };

    sendToBackend();
  },

  resetGameProgress: () => set(initialState),
  //DEV FORCE COMPLETE
  completeWorld: (worldId, worlds) =>
    set((state) => {
      const sortedWorlds = [...worlds].sort(
        (a, b) => Number(a.order_number) - Number(b.order_number)
      );

      const index = sortedWorlds.findIndex((w) => w.world_id === worldId);

      const worldsToComplete = sortedWorlds
        .slice(0, index + 1)
        .map((w) => w.world_id);

      return {
        completedWorlds: Array.from(
          new Set([...state.completedWorlds, ...worldsToComplete])
        ),
      };
  }),

  isQuizCompleted: (quizId) => {
    const result = get().quizResults[quizId];
    if (!result) return false;

    return result.correctAnswers / result.totalAnswers >= 0.8;
  },

  isWorldCompleted: (worldId, quizzes) => {
    if (get().completedWorlds.includes(worldId)) return true;

    return quizzes
      .filter((q) => q.world_id === worldId)
      .every((q) => get().isQuizCompleted(q.quiz_id));
  },

  isWorldUnlocked: (worldId, worlds, quizzes) => {
    if (get().completedWorlds.includes(worldId)) return true;

    const sortedWorlds = [...worlds].sort(
      (a, b) => Number(a.order_number) - Number(b.order_number)
    );

    const index = sortedWorlds.findIndex((w) => w.world_id === worldId);

    // World 1 always unlocked
    if (index === 0) return true;

    const previousWorld = sortedWorlds[index - 1];

    return get().isWorldCompleted(previousWorld.world_id, quizzes);
  },

  getPointsSummary: () => {
    const state = get();
    const quizPoints = Object.values(state.awardedQuizPoints).reduce((sum, p) => sum + p, 0);
    const bonusPoints =
      Object.values(state.claimedWorldBonuses).filter(Boolean).length * WORLD_COMPLETION_BONUS;
    return { quizPoints, bonusPoints, total: quizPoints + bonusPoints };
  },
});