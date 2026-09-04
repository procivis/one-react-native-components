module.exports = {
  plugins: [
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    '@babel/plugin-proposal-export-namespace-from',
    'react-native-worklets/plugin',
  ],
  presets: ['module:@react-native/babel-preset'],
};
