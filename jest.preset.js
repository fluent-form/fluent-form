const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  coverageReporters: ['html', 'json', 'lcov', 'text-summary', 'clover'],
};
