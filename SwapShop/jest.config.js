/** @type {import('jest').Config} */
const config = {
    verbose: true,
    preset: "react-native",
    setupFiles: ['<rootDir>/jest.setup.js'],
    setupFilesAfterEnv: ["./__mocks__/mockFirebase"],
    automock: false,
    globals: {
        __DEV__: true
    },
    moduleFileExtensions: ["ts", "tsx","js","jsx","json","node"],
    "transformIgnorePatterns": ["node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation/(.*)|@react-native-firebase/auth|@react-navigation/native|@react-native-firebase)"],
  };
  
  module.exports = config;