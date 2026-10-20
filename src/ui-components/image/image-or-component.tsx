import React, { FC, ReactElement, useMemo } from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  imageWrapper: {
    overflow: 'hidden',
  },
});

interface ImageSourceComponentProps {
  resizeMethod?: ImageProps['resizeMethod'];
  resizeMode?: ImageProps['resizeMode'];
  source: ImageSourcePropType;
  style: StyleProp<ImageStyle>;
  testID?: string;
}

const ImageSourceComponent: FC<ImageSourceComponentProps> = ({
  source,
  style,
  resizeMode = 'cover',
  resizeMethod = 'resize',
  testID,
}) => {
  const imageStyle = useMemo<ImageStyle>(() => {
    const flatStyle = StyleSheet.flatten(style);
    if (!flatStyle) {
      return {};
    }

    const {
      width,
      height,
      borderWidth = 0,
      borderBottomWidth,
      borderTopWidth,
      borderLeftWidth,
      borderRightWidth,
    } = flatStyle;

    const borderWidths = {
      bottom: borderBottomWidth ?? borderWidth,
      left: borderLeftWidth ?? borderWidth,
      right: borderRightWidth ?? borderWidth,
      top: borderTopWidth ?? borderWidth,
    };

    return {
      height:
        typeof height === 'number'
          ? height - borderWidths.top - borderWidths.bottom
          : height,
      width:
        typeof width === 'number'
          ? width - borderWidths.left - borderWidths.right
          : width,
    };
  }, [style]);

  return (
    <View style={[styles.imageWrapper, style]}>
      <Image
        resizeMethod={resizeMethod}
        resizeMode={resizeMode}
        source={source}
        style={imageStyle}
        testID={testID}
      />
    </View>
  );
};

export type ImageOrComponentSource =
  | {
      imageSource: ImageSourcePropType;
      resizeMethod?: ImageProps['resizeMethod'];
      resizeMode?: ImageProps['resizeMode'];
    }
  | { component: ReactElement };

interface ImageOrComponentProps {
  source: ImageOrComponentSource;
  style: StyleProp<ImageStyle>;
  testID?: string;
}

const ImageOrComponent: FC<ImageOrComponentProps> = ({
  source,
  style,
  testID,
}) => {
  if ('imageSource' in source) {
    return (
      <ImageSourceComponent
        resizeMethod={source.resizeMethod}
        resizeMode={source.resizeMode}
        source={source.imageSource}
        style={style}
        testID={testID}
      />
    );
  }
  if ('component' in source) {
    return (
      <View style={style} testID={testID}>
        {source.component}
      </View>
    );
  }
  return null;
};

export default ImageOrComponent;
