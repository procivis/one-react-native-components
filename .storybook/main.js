// .storybook/main.js

module.exports = {
  stories: ['../src/**/*.stories.?(ts|tsx|js|jsx)', '../storybook/web/*.stories.?(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-react-native-web',
    'storybook-addon-designs',
  ],
  framework: '@storybook/react',
  webpackFinal: async (config) => ({
    ...config,
    resolve: {
      ...(config.resolve || {}),
      alias: {
        'react-native$': 'react-native-web',
        '../Utilities/Platform': 'react-native-web/src/exports/Platform',
        '../../Utilities/Platform': 'react-native-web/src/exports/Platform',
      },
    },
  }),
};
