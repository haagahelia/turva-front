import { StateCreator } from "zustand";

type QuizResult = {
  quizId: number;
  correctAnswers: number;
  totalAnswers: number;
};

export type GameProgressSlice = {
  quizResults: Record<number, QuizResult>;

  setQuizResult: (result: QuizResult) => void;
  resetGameProgress: () => void;
  completedWorlds: number[];
  completeWorld: (worldId: number, worlds: any[]) => void;
  isQuizCompleted: (quizId: number) => boolean;
  isWorldCompleted: (worldId: number, quizzes: any[]) => boolean;
  isWorldUnlocked: (worldId: number, worlds: any[], quizzes: any[]) => boolean;
};

export const createGameProgressSlice: StateCreator<GameProgressSlice> = (set, get) => ({
  quizResults: {},
  completedWorlds: [],

  setQuizResult: (result) =>
    set((state) => ({
      quizResults: {
        ...state.quizResults,
        [result.quizId]: result,
      },
    })),

  resetGameProgress: () => {
    set({ quizResults: {}, completedWorlds: []});
  },

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
});