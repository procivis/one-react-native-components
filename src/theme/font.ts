import { Platform, TextStyle } from 'react-native';

export interface FontStyle {
  fontFamily?: string;
  fontWeight?: TextStyle['fontWeight'];
}

enum FontWeight {
  Bold = '700',
  Normal = '400',
}

const family = 'OpenSans';

export interface FontFactoryProps {
  weight?: FontWeight;
}

// generate styles for a font with given weight and style
export const fontFactory = (props: FontFactoryProps = { weight: FontWeight.Normal }): FontStyle => {
  const { weight } = props;

  if (Platform.OS === 'android') {
    const weightName = Object.keys(FontWeight)[Object.values(FontWeight).indexOf(weight as FontWeight)];
    const suffix = weightName;
    return {
      fontFamily: family + (suffix.length ? `-${suffix}` : ''),
    };
  } else {
    return {
      fontFamily: family,
      fontWeight: weight,
    };
  }
};

const font = {
  normal: fontFactory(),
  bold: fontFactory({ weight: FontWeight.Bold }),
};

export default font;
