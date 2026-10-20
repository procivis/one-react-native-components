declare module '@react-native/normalize-color' {
  import { ColorValue } from 'react-native';
  const normalizeColor: (color: ColorValue) => number;
  export = normalizeColor;
}
