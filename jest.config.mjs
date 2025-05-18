export default {
    coverageDirectory: 'coverage',
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ['**/*.(spec|test).[jt]s?(x)'],
    testPathIgnorePatterns: [
        "/node_modules/",
        "/playwright/",
        "/example/",
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
};

