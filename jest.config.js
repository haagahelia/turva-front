module.exports = {
  preset: 'jest-expo',
  setupFiles: ['<rootDir>/jest.setup.ts'],

  transformIgnorePatterns: [
    'node_modules/(?!(?:' +
      'react-native' +
      '|@react-native' +
      '|@react-native-community' +
      '|@react-native-js-polyfills' +
      '|expo-modules-core' +
      '|expo' +
      '|@expo' +
      ')/)',
  ],
};
