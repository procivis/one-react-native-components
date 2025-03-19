import type { StorybookConfig } from '@storybook/react-native-web-vite';

type ServerStorybookConfig = StorybookConfig & {
  reactNativeServerOptions: { host: string; port: number };
};

const main: ServerStorybookConfig = {
  stories: ['../src/**/*.stories.?(ts|tsx|js|jsx)', '../storybook/web/*.stories.?(ts|tsx|js|jsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-react-native-server',
    '@storybook/addon-designs',
  ],

  framework: {
    name: '@storybook/react-native-web-vite',
    options: {},
  },

  viteFinal: async (config) => ({
    ...config,
    resolve: {
      ...(config.resolve || {}),
      alias: {
        'react-native$': 'react-native-web',
        '../Utilities/Platform': 'react-native-web/src/exports/Platform',
        '../../Utilities/Platform': 'react-native-web/src/exports/Platform',
        '@react-native-community/blur': '/storybook/modules/blur',
        '@procivis/react-native-picker': 'react-native-web/src/exports/View',
        'react-native-vision-camera': '/storybook/modules/react-native-vision-camera',
        '@procivis/react-native-one-core': '/storybook/modules/react-native-one-core',
        'lottie-react-native': 'react-native-web/src/exports/View',
        'react-native-bluetooth-state-manager': '/storybook/modules/react-native-bluetooth-state-manager',
        'qrcode-svg': '/storybook/modules/qrcode-svg',
        'react-native-reanimated-carousel': 'react-native-web/src/exports/View',
        '@react-navigation/native': '/storybook/modules/react-navigation-native'
      },
    },
  }),

  reactNativeServerOptions: {
    host: 'localhost',
    port: 7007,
  },

  docs: {},

  staticDirs: ['./assets'],

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
};

export default main;
