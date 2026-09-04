const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');
const { withStorybook } = require('@storybook/react-native/withStorybook');

const { generate } = require('@storybook/react-native/scripts/generate');

generate({
  configPath: path.resolve(__dirname, './.ondevice'),
});

const defaultConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    resolverMainFields: ['sbmodern', 'react-native', 'browser', 'main'],
    sourceExts: [...defaultConfig.resolver.sourceExts, 'mjs'],
  },
  transformer: {
    unstable_allowRequireContext: true,
  },
};

module.exports = withStorybook(mergeConfig(defaultConfig, config), {
  configPath: path.resolve(__dirname, './.ondevice'),
  enabled: true,
});
