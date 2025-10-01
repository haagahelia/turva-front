import AsyncStorage from "@react-native-async-storage/async-storage";
import { StoreState, useThemeStore } from "../store";


describe("theme store with persistence", () => {
  beforeEach(async () => {
     // clear persisted storage
    await AsyncStorage.clear();
    // reset store
    useThemeStore.setState({ theme: "light" }); 
  });

  it("should initialize with light theme", () => {
    expect(useThemeStore.getState().theme).toBe("light");
  });

  it("should toggle theme correctly", () => {
    useThemeStore.getState().toggleTheme();
    expect(useThemeStore.getState().theme).toBe("dark");

    useThemeStore.getState().toggleTheme();
    expect(useThemeStore.getState().theme).toBe("light");
  });

  it("should set theme directly", () => {
    useThemeStore.getState().setTheme("dark");
    expect(useThemeStore.getState().theme).toBe("dark");
  });

  it("should persist the theme to AsyncStorage", async () => {
    useThemeStore.getState().setTheme("dark");

    // Zustand persist middleware saves asynchronously
    await new Promise((resolve) => setTimeout(resolve, 0));

    const storedValue = await AsyncStorage.getItem("theme-storage");
    expect(storedValue).toContain('"theme":"dark"');
  });

it("should restore the theme from AsyncStorage", async () => {
  await AsyncStorage.setItem(
    "theme-storage",
    JSON.stringify({ state: { theme: "dark" }, version: 0 })
  );

  jest.resetModules();
  const { useThemeStore: recreatedStore } = require("../store");

  // Wait until the store updates its theme
  await new Promise<void>((resolve) => {
    const unsubscribe = recreatedStore.subscribe((state: StoreState) => {
      if (state.theme === "dark") {
        unsubscribe();
        resolve();
      }
    });
  });

  expect(recreatedStore.getState().theme).toBe("dark");
});

});
