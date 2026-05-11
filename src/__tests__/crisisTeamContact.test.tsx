import AsyncStorage from "@react-native-async-storage/async-storage";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Linking } from "react-native";
import { PaperProvider } from "react-native-paper";

import CrisisTeamContactScreen from "../../app/(tabs)/home/crisis-team-contact";
import { useLanguageStore } from "../zustand/store";

jest.mock("@/src/config/api", () => ({
  API_URL: "https://example.test",
}));

describe("CrisisTeamContactScreen", () => {
  const contacts = [
    {
      contact_id: 1,
      name_fi: "Teemu Kokko",
      name_en: "Teemu Kokko",
      role_fi: "Rehtori",
      role_en: "Rector",
      phone: "050 555 1131",
      order_number: 1,
    },
    {
      contact_id: 2,
      name_fi: "Minna Hiillos",
      name_en: "Minna Hiillos",
      role_fi: "Vararehtori",
      role_en: "Vice Rector",
      phone: "050 583 9521",
      order_number: 2,
    },
  ];

  const renderScreen = () =>
    render(
      <PaperProvider>
        <CrisisTeamContactScreen />
      </PaperProvider>
    );

  beforeEach(async () => {
    jest.clearAllMocks();
    await AsyncStorage.clear();
    useLanguageStore.setState({ language: "fi" });

    jest.spyOn(console, "warn").mockImplementation(() => {});

    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => contacts,
    });

    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  it("fetches crisis team contacts on mount using API_URL", async () => {
    renderScreen();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "https://example.test/api/crisis-team/"
      );
    });
  });

  it("renders contact names and roles after successful fetch", async () => {
    const { findByText } = renderScreen();

    expect(await findByText("Teemu Kokko")).toBeTruthy();
    expect(await findByText("Rehtori")).toBeTruthy();
    expect(await findByText("Minna Hiillos")).toBeTruthy();
    expect(await findByText("Vararehtori")).toBeTruthy();
  });

  it("renders Finnish name_fi and role_fi when language is fi", async () => {
    useLanguageStore.setState({ language: "fi" });

    const { findByText, queryByText } = renderScreen();

    expect(await findByText("Teemu Kokko")).toBeTruthy();
    expect(await findByText("Rehtori")).toBeTruthy();
    expect(queryByText("Rector")).toBeNull();
  });

  it("renders English name_en and role_en when language is en", async () => {
    useLanguageStore.setState({ language: "en" });

    const { findByText, queryByText } = renderScreen();

    expect(await findByText("Teemu Kokko")).toBeTruthy();
    expect(await findByText("Rector")).toBeTruthy();
    expect(queryByText("Rehtori")).toBeNull();
  });

  it("does not crash on failed fetch and renders no contact cards", async () => {
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => [],
    });

    const { findByText, queryByText } = renderScreen();

    // Header still renders even if fetching contacts fails.
    expect(await findByText("Haaga-Helian valmius- ja kriisiryhmä")).toBeTruthy();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    expect(queryByText("Teemu Kokko")).toBeNull();
    expect(queryByText("Rehtori")).toBeNull();
  });

  it("pressing the phone action calls Linking.openURL with tel:<phone>", async () => {
    const openUrlSpy = jest
      .spyOn(Linking, "openURL")
      .mockResolvedValueOnce(undefined as never);

    const { findByText } = renderScreen();

    const phoneText = await findByText("050 555 1131");
    fireEvent.press(phoneText);

    expect(openUrlSpy).toHaveBeenCalledWith("tel:050 555 1131");
  });
});
