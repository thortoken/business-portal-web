const path = require('path');
const { injectBabelPlugin } = require('react-app-rewired');

module.exports = {
  webpack(config, env) {
    /**
     * Inject babel plugin for CSS imports.
     * This way we don't need to include the whole CSS from antd package
     * in the bundle - just files imported by used components.
     */
    config = injectBabelPlugin(
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: 'css',
        },
      ],
      config
    );

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
      '^~utils/(.+)': '<rootDir>/src/utils/$1',
    };
    return config;
  },
};
