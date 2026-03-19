import { StateCreator } from "zustand";

type QuizResult = {
  quizId: number;
  correctAnswers: number;
  totalAnswers: number;
};

export type GameProgressSlice = {
  quizResults: Record<number, QuizResult>;

  setQuizResult: (result: QuizResult) => void;

  isQuizCompleted: (quizId: number) => boolean;
  isWorldCompleted: (worldId: number, quizzes: any[]) => boolean;
  isWorldUnlocked: (worldId: number, worlds: any[], quizzes: any[]) => boolean;
};

export const createGameProgressSlice: StateCreator<GameProgressSlice> = (set, get) => ({
  quizResults: {},

  setQuizResult: (result) =>
    set((state) => ({
      quizResults: {
        ...state.quizResults,
        [result.quizId]: result,
      },
    })),

  isQuizCompleted: (quizId) => {
    const result = get().quizResults[quizId];
    if (!result) return false;

    return result.correctAnswers / result.totalAnswers >= 0.8;
  },

  isWorldCompleted: (worldId, quizzes) => {
    return quizzes
      .filter((q) => q.world_id === worldId)
      .every((q) => get().isQuizCompleted(q.quiz_id));
  },

  isWorldUnlocked: (worldId, worlds, quizzes) => {
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