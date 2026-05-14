import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTimeStore } from "../zustand/timeStore";

describe("time store app/session tracking", () => {
  const waitForPersist = async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  };

  beforeEach(async () => {
    jest.restoreAllMocks();
    jest.useRealTimers();
    jest.spyOn(console, "log").mockImplementation(() => {});
    await AsyncStorage.clear();

    useTimeStore.setState({
      sessionStart: null,
      activeTime: 0,
    });
  });

  it("startSession sets sessionStart using Date.now", () => {
    const nowSpy = jest.spyOn(Date, "now").mockReturnValue(1_000);

    useTimeStore.getState().startSession();

    expect(nowSpy).toHaveBeenCalled();
    expect(useTimeStore.getState().sessionStart).toBe(1_000);
  });

  it("stopSession adds elapsed milliseconds to activeTime", () => {
    jest
      .spyOn(Date, "now")
      .mockReturnValueOnce(1_000) // startSession
      .mockReturnValueOnce(1_750); // stopSession

    useTimeStore.getState().startSession();
    useTimeStore.getState().stopSession();

    const state = useTimeStore.getState();
    expect(state.activeTime).toBe(750);
    expect(state.sessionStart).toBeNull();
  });

  it("stopSession does nothing if sessionStart is null", () => {
    useTimeStore.setState({ sessionStart: null, activeTime: 200 });

    useTimeStore.getState().stopSession();

    const state = useTimeStore.getState();
    expect(state.activeTime).toBe(200);
    expect(state.sessionStart).toBeNull();
  });

  it("updateSession adds elapsed time while keeping the session active", () => {
    useTimeStore.setState({ sessionStart: 1_000, activeTime: 50 });
    jest.spyOn(Date, "now").mockReturnValue(1_500);

    useTimeStore.getState().updateSession();

    const state = useTimeStore.getState();
    expect(state.activeTime).toBe(550);
    expect(state.sessionStart).toBe(1_500);
  });

  it("multiple updateSession calls accumulate time correctly", () => {
    useTimeStore.setState({ sessionStart: 1_000, activeTime: 0 });
    jest
      .spyOn(Date, "now")
      .mockReturnValueOnce(1_400)
      .mockReturnValueOnce(2_000);

    useTimeStore.getState().updateSession(); // +400
    useTimeStore.getState().updateSession(); // +600

    const state = useTimeStore.getState();
    expect(state.activeTime).toBe(1_000);
    expect(state.sessionStart).toBe(2_000);
  });

  it("reset clears activeTime and sessionStart", () => {
    useTimeStore.setState({ sessionStart: 1_234, activeTime: 9_999 });

    useTimeStore.getState().reset();

    const state = useTimeStore.getState();
    expect(state.activeTime).toBe(0);
    expect(state.sessionStart).toBeNull();
  });

  it("persists activeTime without persisting sessionStart", async () => {
    useTimeStore.setState({ sessionStart: 4_200, activeTime: 2_500 });
    await waitForPersist();

    const storedRaw = await AsyncStorage.getItem("time-storage");
    expect(storedRaw).toBeTruthy();

    const stored = JSON.parse(storedRaw as string);

    expect(stored.state.activeTime).toBe(2_500);
    expect(stored.state.sessionStart).toBeUndefined();
  });
});
