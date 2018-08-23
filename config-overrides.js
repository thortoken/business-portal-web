const path = require('path');

module.exports = {
  webpack(config, env) {
    /**
     * Aliases for imports to prevent ../../ hell.
     * Also, makes moving things around effortless.
     */
    const rootDir = path.dirname('');
    config.resolve = {
      ...config.resolve,
      alias: {
        ...(config.resolve || {}).alias,
        '~components': path.resolve(rootDir, 'src/components'),
        '~pages': path.resolve(rootDir, 'src/pages'),
        '~redux': path.resolve(rootDir, 'src/redux/'),
        '~services': path.resolve(rootDir, 'src/services/'),
        '~utils': path.resolve(rootDir, 'src/utils/'),
      },
    };
    return config;
  },
  jest(config) {
    /**
     * Jest doesn't know about webpack config above,
     * so we need to tell him how to map custom import paths.
     */
    config.moduleNameMapper = {
      ...config.moduleNameMapper,
      '^~components/(.+)': '<rootDir>/src/components/$1',
      '^~pages/(.+)': '<rootDir>/src/pages/$1',
      '^~redux/(.+)': '<rootDir>/src/redux/$1',
      '^~services/(.+)': '<rootDir>/src/services/$1',
      '^~utils/(.+)': '<rootDir>/src/utils/$1',
      '^.+\\.(less|scss|css)$': 'identity-obj-proxy',
    };
    return config;
  },
};
