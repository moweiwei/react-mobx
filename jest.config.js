module.exports = {
  bail: true,
  transformIgnorePatterns: [
    // Change MODULE_NAME_HERE to your module that isn't being compiled
    '/node_modules/.+\\.js$',
  ],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '\\.svg': '<rootDir>/jest/svgMock.js',
    '^common(.*)$': '<rootDir>/common$1',
    '^src(.*)$': '<rootDir>/src$1',
    '^less(.*)$': '<rootDir>/src/less$1',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^layouts(.*)$': '<rootDir>/src/layouts$1',
    '^stores(.*)$': '<rootDir>/src/stores$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
  },
  globals: {},
  testPathIgnorePatterns: ['node_modules', '.cache', 'cypress'],
  setupFiles: ['<rootDir>/jest/setupTests.js'],
  setupFilesAfterEnv: ['./node_modules/jest-enzyme/lib/index.js'],
}
