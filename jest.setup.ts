import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

// Use mock asyncstorage for testing
jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);
