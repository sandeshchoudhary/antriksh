module.exports = {
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'text-summary', 'html'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
  globals: {
    window: true
  },
  moduleFileExtensions: ['js', 'jsx'],
  setupTestFrameworkScriptFile: './test/setup.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  verbose: true
};
