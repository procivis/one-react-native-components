module.exports = {
  stories: ['../src/**/*.stories.?(ts|tsx|js|jsx)', '../src/**/*.stories.mobile.?(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-backgrounds',
    '@storybook/addon-ondevice-actions',
  ],
};
