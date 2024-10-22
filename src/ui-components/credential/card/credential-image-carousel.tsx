import React, { FC, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Svg, { Circle } from 'react-native-svg';

import { concatTestID } from '../../../utils';

export enum CarouselImageType {
  Barcode = 'Barcode',
  QrCode = 'QrCode',
  MRZ = 'MRZ',
  Photo = 'Photo',
}

export type CarouselImage = {
  type: CarouselImageType;
  element: React.ReactElement;
};

type CarouselProps = {
  carouselSize: { width: number; height: number };
  imagesToRender: CarouselImage[];
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const CarouselComponent: FC<CarouselProps> = ({ carouselSize, imagesToRender, style, testID }) => {
  const [selectedDot, setSelectedDot] = useState(0);

  if (!carouselSize.width || !carouselSize.height) {
    return null;
  }

  const numberOfSlides = imagesToRender.length;

  if (!numberOfSlides) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <Carousel
        width={carouselSize.width}
        onSnapToItem={setSelectedDot}
        height={carouselSize.height}
        enabled={numberOfSlides >= 2}
        data={imagesToRender}
        testID={testID}
        renderItem={({ item: { type, element } }) => (
          <View style={styles.carouselItem}>
            <View style={[styles[type]]}>{element}</View>
          </View>
        )}
      />
      {numberOfSlides >= 2 ? (
        <View style={styles.pageDotContainer}>
          {imagesToRender.map((_, index) => (
            <Svg key={index} width="8" height="8" viewBox="0 0 8 8" fill="none">
              <Circle
                testID={concatTestID(testID, 'dot', index.toString())}
                cx="4.5"
                cy="4"
                r="4"
                fill="white"
                fillOpacity={selectedDot === index ? 0.8 : 0.2}
              />
            </Svg>
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  Barcode: { borderRadius: 4, height: '50%', width: '80%' },
  // eslint-disable-next-line react-native/no-unused-styles
  MRZ: {
    height: '50%',
    width: '100%',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  Photo: {
    aspectRatio: 1,
    borderColor: '#FFFFFF',
    borderRadius: 100,
    borderWidth: 2,
    height: '70%',
    overflow: 'hidden',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  QrCode: { aspectRatio: 1, borderRadius: 4, height: '70%' },
  carouselItem: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
  },
  pageDotContainer: {
    bottom: 15,
    columnGap: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default CarouselComponent;
