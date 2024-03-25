import React, { FC, ReactElement, useMemo } from 'react';
import { Image, ImageProps, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  imageWrapper: {
    overflow: 'hidden',
  },
});

interface ImageSourceComponentProps {
  source: ImageSourcePropType;
  style: StyleProp<ImageStyle>;
  resizeMode?: ImageProps['resizeMode'];
  resizeMethod?: ImageProps['resizeMethod'];
}

const ImageSourceComponent: FC<ImageSourceComponentProps> = ({
  source,
  style,
  resizeMode = 'cover',
  resizeMethod = 'resize',
}) => {
  const imageStyle = useMemo<ImageStyle>(() => {
    const {
      width,
      height,
      borderWidth = 0,
      borderBottomWidth,
      borderTopWidth,
      borderLeftWidth,
      borderRightWidth,
    } = StyleSheet.flatten(style);

    const borderWidths = {
      left: borderLeftWidth ?? borderWidth,
      right: borderRightWidth ?? borderWidth,
      top: borderTopWidth ?? borderWidth,
      bottom: borderBottomWidth ?? borderWidth,
    };

    return {
      width: typeof width === 'number' ? width - borderWidths.left - borderWidths.right : width,
      height: typeof height === 'number' ? height - borderWidths.top - borderWidths.bottom : height,
    };
  }, [style]);

  return (
    <View style={[styles.imageWrapper, style]}>
      <Image style={imageStyle} source={source} resizeMode={resizeMode} resizeMethod={resizeMethod} />
    </View>
  );
};

export type ImageOrComponentSource =
  | {
      imageSource: ImageSourcePropType;
      resizeMode?: ImageProps['resizeMode'];
      resizeMethod?: ImageProps['resizeMethod'];
    }
  | { component: ReactElement };

interface ImageOrComponentProps {
  source: ImageOrComponentSource;
  style: StyleProp<ImageStyle>;
}

const ImageOrComponent: FC<ImageOrComponentProps> = ({ source, style }) => {
  if ('imageSource' in source) {
    return (
      <ImageSourceComponent
        style={style}
        source={source.imageSource}
        resizeMode={source.resizeMode}
        resizeMethod={source.resizeMethod}
      />
    );
  }
  if ('component' in source) {
    return <View style={style}>{source.component}</View>;
  }
  return null;
};

export default ImageOrComponent;
