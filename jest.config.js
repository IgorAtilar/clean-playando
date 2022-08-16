module.exports = {
  preset: 'ts-jest',
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
  transform: {
    '.+\\.ts$': 'ts-jest',
    '^.+\\.svg$': 'jest-transformer-svg'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts']
};
