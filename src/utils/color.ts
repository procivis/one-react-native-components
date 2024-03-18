/* eslint-disable no-bitwise */
import normalizeColor from '@react-native/normalize-color';
import type { ColorValue } from 'react-native';

export const colorArray = (color: ColorValue) => {
  const normalized = normalizeColor(color);

  const r = (normalized >> 24) & 0xff;
  const g = (normalized >> 16) & 0xff;
  const b = (normalized >> 8) & 0xff;
  const a = normalized & 0xff;

  return [r / 255, g / 255, b / 255, a / 255];
};

export const getBrightness = (color: ColorValue) => {
  const rgb = colorArray(color);
  // https://en.wikipedia.org/wiki/Relative_luminance
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
};
