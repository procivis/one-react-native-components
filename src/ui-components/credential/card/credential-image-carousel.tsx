import React, { FC, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Carousel } from 'react-native-reanimated-carousel';
import Svg, { Circle } from 'react-native-svg';

import { concatTestID } from '../../../utils/testID';

export enum CarouselImageType {
  Barcode = 'Barcode',
  MRZ = 'MRZ',
  Photo = 'Photo',
  QrCode = 'QrCode'
}

export type CarouselImage = {
  element: React.ReactElement;
  type: CarouselImageType;
};

type CarouselProps = {
  carouselSize: { height: number, width: number; };
  imagesToRender: CarouselImage[];
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const itemStyle = (type: CarouselImageType): StyleProp<ViewStyle> => {
  switch (type) {
    case CarouselImageType.Barcode:
      return styles.Barcode;
    case CarouselImageType.MRZ:
      return styles.MRZ;
    case CarouselImageType.Photo: {
      const borderStyle = {
        borderColor: '#FFFFFF',
      }
      return [styles.Photo, borderStyle];
    }
    case CarouselImageType.QrCode:
      return styles.QrCode;
  };
}

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
        data={imagesToRender}
        onConfigurePanGesture={(gesture) => {
          gesture.activeOffsetX([-10, 10]);
          gesture.failOffsetY([-10, 10]);
        }}
        onSnapToItem={setSelectedDot}
        renderItem={({ item: { type, element } }) => (
          <View style={styles.carouselItem}>
            <View style={itemStyle(type)}>{element}</View>
          </View>
        )}
        scrollEnabled={numberOfSlides >= 2}
        style={carouselSize}
        testID={testID}
      />
      {numberOfSlides >= 2 ? (
        <View style={styles.pageDotContainer}>
          {imagesToRender.map((_, index) => (
            <Svg fill="none" height="8" key={index} viewBox="0 0 8 8" width="8">
              <Circle
                cx="4.5"
                cy="4"
                fill="white"
                fillOpacity={selectedDot === index ? 0.8 : 0.2}
                r="4"
                testID={concatTestID(testID, 'dot', index.toString())}
              />
            </Svg>
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  Barcode: { borderRadius: 4, borderWidth: 0, height: '50%', width: '80%' },
  MRZ: {
    height: '50%',
    width: '100%',
  },
  Photo: {
    aspectRatio: 1,
    borderRadius: 100,
    borderWidth: 2,
    height: '70%',
    overflow: 'hidden',
  },
  QrCode: { aspectRatio: 1, borderRadius: 4, borderWidth: 0, height: '70%' },
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
