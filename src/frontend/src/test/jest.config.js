module.exports = {
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/src/App.test.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  }
};
