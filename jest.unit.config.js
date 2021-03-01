module.exports = {
    verbose: true,
    rootDir: '.',
    preset: 'ts-jest',
    testMatch: ['<rootDir>./dist/test/*.spec.js'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    testEnvironment: 'node',
    clearMocks: true
  }