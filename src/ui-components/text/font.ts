import { Platform, TextStyle } from 'react-native';

export interface FontStyle {
  fontFamily?: string;
  fontWeight?: TextStyle['fontWeight'];
}

enum FontFace {
  OpenSans = 'Open Sans',
  IBMPlexMono = 'IBM Plex Mono',
  ProcivisBook = 'Procivis-Book',
}

enum FontWeight {
  Medium = '500',
  Regular = '400',
}

export interface FontFactoryProps {
  face: FontFace;
  weight?: FontWeight;
}

// generate styles for a font with given weight and style
export const fontFactory = ({ face, weight }: FontFactoryProps): FontStyle => {
  if (Platform.OS === 'android') {
    const filePrefix = Object.values(FontFace)[Object.values(FontFace).indexOf(face)]?.replace(' ', '');
    if (!weight) {
      return {
        fontFamily: filePrefix,
      };
    }
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
  heading: fontFactory({ face: FontFace.ProcivisBook }),
};

export default font;
