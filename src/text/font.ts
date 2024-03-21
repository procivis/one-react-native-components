import { Platform, TextStyle } from 'react-native';

export interface FontStyle {
  fontFamily?: string;
  fontWeight?: TextStyle['fontWeight'];
}

enum FontFace {
  OpenSans = 'Open Sans',
  IBMPlexMono = 'IBM Plex Mono',
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
    const filePrefix = Object.keys(FontFace)[Object.values(FontFace).indexOf(face)];
    const fileSuffix = Object.keys(FontWeight)[Object.values(FontWeight).indexOf(weight)];
    return {
      fontFamily: `${filePrefix}-${fileSuffix}`,
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
