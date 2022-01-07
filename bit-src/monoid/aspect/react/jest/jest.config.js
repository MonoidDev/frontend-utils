const reactJestConfig = require('@teambit/react/jest/jest.config');

module.exports = {
  ...reactJestConfig,
  transform: {
    ...reactJestConfig.transform,
    /**
     * Add a setting for JSX transform to the default settings.
     */
    '^.+\\.(js|jsx|ts|tsx)$': require.resolve('./transformer'),
    /**
     * for non-runtime-css
     */
    '^\\.\\/.+.css$': require.resolve('@teambit/react/jest/css-transform'),
  },
};
