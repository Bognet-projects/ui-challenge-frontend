module.exports = {
  setupFiles: ['./tests/setup.ts'],
  transformIgnorePatterns: ['node_modules/(?!vue-router|@babel|vuetify)'],
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  collectCoverage: true,
  coveragePathIgnorePatterns: ["/node_modules/", "/tests/Helpers.ts"]
}
