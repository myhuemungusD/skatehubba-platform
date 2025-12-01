module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|expo|@expo|react-native-reanimated|@tanstack|@skatehubba)/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@skatehubba/ui$': '<rootDir>/__mocks__/@skatehubba/ui.js',
  },
  testMatch: ['**/tests/**/*.spec.tsx', '**/tests/**/*.spec.ts'],
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
