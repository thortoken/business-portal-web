const path = require('path');
const { injectBabelPlugin } = require('react-app-rewired');

module.exports = {
  webpack(config, env) {
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

    const rootDir = path.dirname('');
    config.resolve = {
      ...config.resolve,
      alias: {
        ...(config.resolve || {}).alias,
        '~components': path.resolve(rootDir, 'src/components'),
        '~pages': path.resolve(rootDir, 'src/pages'),
        '~redux': path.resolve(rootDir, 'src/redux/'),
      },
    };
    return config;
  },
  jest(config) {
    config.moduleNameMapper = {
      ...config.moduleNameMapper,
      '^~components/(.+)': '<rootDir>/src/components/$1',
      '^~pages/(.+)': '<rootDir>/src/pages/$1',
      '^~redux/(.+)': '<rootDir>/src/redux/$1',
    };
    return config;
  },
};
