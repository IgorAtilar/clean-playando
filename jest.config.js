module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/protocols/**/*',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/presentation/styles/**/*',
    '!<rootDir>/src/presentation/app/**/*',
    '!<rootDir>/src/utils/test/*',
    '!<rootDir>/src/**/test/**/*',
    '!<rootDir>/src/**/styles.{ts,tsx}'
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
