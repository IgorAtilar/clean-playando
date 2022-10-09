const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './'
});

/** @type {import('jest').Config} */
const customJestConfig = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/protocols/**/*',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/presentation/styles/**/*',
    '!<rootDir>/src/presentation/app/**/*',
    '!<rootDir>/src/utils/**/*',
    '!<rootDir>/src/**/test/**/*',
    '!<rootDir>/src/**/styles.{ts,tsx}',
    '!<rootDir>/src/infra/state/index.tsx',
    '!<rootDir>/src/infra/state/adapters/index.ts',
    '!<rootDir>/src/infra/state/redux/store/index.ts',
    '!<rootDir>/src/infra/axios-http-client/index.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts']
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
