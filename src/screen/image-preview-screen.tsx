import React, { FunctionComponent, PropsWithChildren, ReactNode, useCallback, useState } from 'react';
import { Image, ImageSourcePropType, ImageStyle, LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { DetailHeaderProps } from '../header';
import { useAppColorScheme } from '../theme';
import { concatTestID } from '../utils/testID';
import DetailScreen from './detail-screen';

export interface ImagePreviewScreenProps extends PropsWithChildren<DetailHeaderProps> {
  title: string;
  image: ImageSourcePropType;

  /** optional footer */
  children?: ReactNode;
}

/**
 * Image preview screen
 *
 * Following the design: https://www.figma.com/file/aIHcwVfjAur4Vptsh4cjKt/Procivis-Wallet-%E2%80%93-Design?node-id=2663%3A528072
 */
const ImagePreviewScreen: FunctionComponent<ImagePreviewScreenProps> = ({
  testID,
  title,
  image,
  children,
  ...headerProps
}) => {
  const colorScheme = useAppColorScheme();
  const insets = useSafeAreaInsets();

  const [imageSize, setImageSize] = useState<ImageStyle>();
  const layoutHandler = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setImageSize({ width, height });
  }, []);

  return (
    <DetailScreen
      testID={testID}
      title={title}
      staticContent={true}
      style={{
        backgroundColor: colorScheme.background,
        paddingBottom: children ? undefined : Math.max(24, insets.bottom),
      }}
      {...headerProps}>
      <View onLayout={layoutHandler} style={styles.imageContainer}>
        {imageSize && (
          <Image
            testID={concatTestID(testID, 'image')}
            accessible={true}
            accessibilityRole="image"
            accessibilityLabel={title}
            style={[styles.image, imageSize]}
            source={image}
            resizeMode="contain"
            resizeMethod="resize"
          />
        )}
      </View>
      {children}
    </DetailScreen>
  );
};

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
  },
  imageContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default ImagePreviewScreen;
