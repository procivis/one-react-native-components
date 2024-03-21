import { Platform, TextStyle } from 'react-native';

export interface FontStyle {
  fontFamily?: string;
  fontWeight?: TextStyle['fontWeight'];
}

enum FontFace {
  OpenSans = 'OpenSans',
  IBMPlexMono = 'IBMPlexMono',
}

enum FontWeight {
  Medium = '500',
  Regular = '400',
}

export interface FontFactoryProps {
  face: FontFace;
  weight: FontWeight;
}

// generate styles for a font with given weight and style
export const fontFactory = ({ face, weight }: FontFactoryProps): FontStyle => {
  if (Platform.OS === 'android') {
    const suffix = Object.keys(FontWeight)[Object.values(FontWeight).indexOf(weight)];
    return {
      fontFamily: face + (suffix.length ? `-${suffix}` : ''),
    };
  } else {
    return {
      fontFamily: face,
      fontWeight: weight,
    };
  }
};

const font = {
  regular: fontFactory({ face: FontFace.OpenSans, weight: FontWeight.Regular }),
  medium: fontFactory({ face: FontFace.OpenSans, weight: FontWeight.Medium }),
  code: fontFactory({ face: FontFace.IBMPlexMono, weight: FontWeight.Regular }),
};

export default font;
