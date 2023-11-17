module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    transform: {
      '^.+\\.js$': 'babel-jest'
    },
    setupFiles: ['./jest.setup.js']  // Add this line
  };
  