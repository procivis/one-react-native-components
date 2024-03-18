import { Dimensions } from 'react-native';

// Returns the height in Display Points - resolution scaled with the pixel density
// This is i.e. 568 for iPhone 5 or 667 for iPhone 6 (iOS logical pixels)
// Android is using Density Indepentent Pixels (800 for a normal 5' phone, 480 for a small/older phone)
const screenHeight = Dimensions.get('screen').height;
const minScreenHeight = 600;

const grid = screenHeight < minScreenHeight ? 6 : 8;

const theme = {
  grid,
  padding: grid * 3,
  paddingM: grid * 2,
};

export default theme;
