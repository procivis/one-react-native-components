import React, { FC, useCallback, useState } from 'react';
import { Image, ImageSourcePropType, ImageStyle, LayoutChangeEvent, StyleSheet, View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { concatTestID, ContrastingStatusBar } from '../../utils';
import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import { NavigationHeader } from '../header';
import { CloseIcon } from '../icons';
import { useAppColorScheme } from '../theme';

export type ImagePreviewScreenProps = ViewProps & {
  image: ImageSourcePropType;
  onClose: () => void;
  title: string;
};

const ImagePreviewScreen: FC<ImagePreviewScreenProps> = ({ image, onClose, title, testID, style, ...viewProps }) => {
  const colorScheme = useAppColorScheme();
  const insets = useSafeAreaInsets();

  const [imageSize, setImageSize] = useState<ImageStyle>();
  const layoutHandler = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setImageSize({ height, width });
  }, []);

  return (
    <View
      style={[styles.screen, { backgroundColor: colorScheme.nerdView.background }, style]}
      testID={testID}
      {...viewProps}>
      <ContrastingStatusBar backgroundColor={colorScheme.nerdView.background} />
      <NavigationHeader
        backgroundColor="transparent"
        blurred={false}
        leftItem={
          <TouchableOpacity onPress={onClose} testID={concatTestID(testID, 'close')}>
            <CloseIcon color={colorScheme.white} />
          </TouchableOpacity>
        }
        style={{
          paddingTop: insets.top,
        }}
        title={title}
        titleColor={colorScheme.white}
        testID={concatTestID(testID, 'header')}
      />

      <View onLayout={layoutHandler} style={styles.imageContainer}>
        {imageSize && (
          <Image
            accessibilityLabel={title}
            accessibilityRole="image"
            accessible={true}
            resizeMethod="resize"
            resizeMode="contain"
            source={image}
            style={[styles.image, imageSize]}
            testID={concatTestID(testID, 'image')}
          />
        )}
      </View>
    </View>
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
    marginHorizontal: 18,
  },
  screen: {
    flex: 1,
  },
});

export default ImagePreviewScreen;
