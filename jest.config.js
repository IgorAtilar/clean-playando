module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/$styles.{ts,tsx}',
    '!<rootDir>/src/**/$styles.{ts,tsx}',
    '!<rootDir>/src/presentation/styles',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/utils'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts']
};
