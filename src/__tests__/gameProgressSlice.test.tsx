import AsyncStorage from "@react-native-async-storage/async-storage";
import { create, type UseBoundStore, type StoreApi } from "zustand";
import {
  createGameProgressSlice,
  GameProgressSlice,
} from "../zustand/gameProgressSlice";

describe("game progress points tracking", () => {
  let useGameProgressTestStore: UseBoundStore<StoreApi<GameProgressSlice>>;

  const waitForAsyncSideEffects = async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  };

  const mockQuizSaveResponse = (bonusAwarded: boolean) => {
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: true,
      statusText: "OK",
      json: async () => ({
        message: "Result saved successfully",
        worldCompleted: bonusAwarded,
        bonusAwarded,
      }),
    });
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    await AsyncStorage.clear();
    await AsyncStorage.setItem("authToken", "test-token");

    useGameProgressTestStore = create<GameProgressSlice>()((...a) => ({
      ...createGameProgressSlice(...a),
    }));

    mockQuizSaveResponse(false);
  });

  it("setQuizResult awards correctAnswers as points on first completion", async () => {
    useGameProgressTestStore.getState().setQuizResult({
      quizId: 1,
      correctAnswers: 3,
      totalAnswers: 5,
      worldId: 1,
    });

    await waitForAsyncSideEffects();

    const state = useGameProgressTestStore.getState();
    expect(state.totalPoints).toBe(3);
    expect(state.awardedQuizPoints[1]).toBe(3);
    expect(state.quizResults[1]).toEqual({
      quizId: 1,
      correctAnswers: 3,
      totalAnswers: 5,
      worldId: 1,
    });
  });

  it("repeating the same quiz result does not add duplicate points", async () => {
    const result = {
      quizId: 2,
      correctAnswers: 4,
      totalAnswers: 5,
      worldId: 1,
    };

    useGameProgressTestStore.getState().setQuizResult(result);
    await waitForAsyncSideEffects();

    useGameProgressTestStore.getState().setQuizResult(result);
    await waitForAsyncSideEffects();

    const state = useGameProgressTestStore.getState();
    expect(state.totalPoints).toBe(4);
    expect(state.awardedQuizPoints[2]).toBe(4);
  });

  it("improving a quiz score only adds the positive delta", async () => {
    useGameProgressTestStore.getState().setQuizResult({
      quizId: 3,
      correctAnswers: 2,
      totalAnswers: 5,
      worldId: 1,
    });
    await waitForAsyncSideEffects();

    useGameProgressTestStore.getState().setQuizResult({
      quizId: 3,
      correctAnswers: 4,
      totalAnswers: 5,
      worldId: 1,
    });
    await waitForAsyncSideEffects();

    const state = useGameProgressTestStore.getState();
    expect(state.totalPoints).toBe(4);
    expect(state.awardedQuizPoints[3]).toBe(4);
  });

  it("submitting a lower score does not reduce totalPoints", async () => {
    useGameProgressTestStore.getState().setQuizResult({
      quizId: 4,
      correctAnswers: 5,
      totalAnswers: 5,
      worldId: 2,
    });
    await waitForAsyncSideEffects();

    useGameProgressTestStore.getState().setQuizResult({
      quizId: 4,
      correctAnswers: 2,
      totalAnswers: 5,
      worldId: 2,
    });
    await waitForAsyncSideEffects();

    const state = useGameProgressTestStore.getState();
    expect(state.totalPoints).toBe(5);
    expect(state.awardedQuizPoints[4]).toBe(5);
    expect(state.quizResults[4].correctAnswers).toBe(2);
  });

  it("bonusAwarded true from backend adds exactly 10 points and marks the world completed", async () => {
    mockQuizSaveResponse(true);

    useGameProgressTestStore.getState().setQuizResult({
      quizId: 5,
      correctAnswers: 3,
      totalAnswers: 5,
      worldId: 2,
    });

    await waitForAsyncSideEffects();

    const state = useGameProgressTestStore.getState();
    expect(state.totalPoints).toBe(13);
    expect(state.completedWorlds).toContain(2);
  });

  it("bonusAwarded false does not add bonus points", async () => {
    mockQuizSaveResponse(false);

    useGameProgressTestStore.getState().setQuizResult({
      quizId: 6,
      correctAnswers: 3,
      totalAnswers: 5,
      worldId: 2,
    });

    await waitForAsyncSideEffects();

    const state = useGameProgressTestStore.getState();
    expect(state.totalPoints).toBe(3);
    expect(state.completedWorlds).not.toContain(2);
  });

  it("resetGameProgress restores the initial state", async () => {
    mockQuizSaveResponse(true);

    useGameProgressTestStore.getState().setQuizResult({
      quizId: 7,
      correctAnswers: 4,
      totalAnswers: 5,
      worldId: 3,
    });

    await waitForAsyncSideEffects();

    useGameProgressTestStore.getState().resetGameProgress();

    const state = useGameProgressTestStore.getState();
    expect(state.totalPoints).toBe(0);
    expect(state.quizResults).toEqual({});
    expect(state.awardedQuizPoints).toEqual({});
    expect(state.claimedWorldBonuses).toEqual({});
    expect(state.completedWorlds).toEqual([]);
  });

  it("isQuizCompleted returns false below 80% and true at or above 80%", async () => {
    useGameProgressTestStore.getState().setQuizResult({
      quizId: 8,
      correctAnswers: 3,
      totalAnswers: 4,
      worldId: 1,
    });

    useGameProgressTestStore.getState().setQuizResult({
      quizId: 9,
      correctAnswers: 4,
      totalAnswers: 5,
      worldId: 1,
    });

    await waitForAsyncSideEffects();

    const state = useGameProgressTestStore.getState();
    expect(state.isQuizCompleted(8)).toBe(false);
    expect(state.isQuizCompleted(9)).toBe(true);
  });
});
