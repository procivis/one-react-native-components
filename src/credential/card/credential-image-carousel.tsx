import React, { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Svg, { Circle } from 'react-native-svg';

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
};

const CarouselComponent: FC<CarouselProps> = ({ carouselSize, imagesToRender }) => {
  const [selectedDot, setSelectedDot] = useState(0);

  if (!carouselSize.width || !carouselSize.height) {
    return null;
  }

  if (!imagesToRender.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Carousel
        width={carouselSize.width}
        onSnapToItem={setSelectedDot}
        height={carouselSize.height}
        data={imagesToRender}
        renderItem={({ item: { type, element } }) => (
          <View style={styles.carouselItem}>
            <View style={[styles[type]]}>{element}</View>
          </View>
        )}
      />
      <View style={styles.pageDotContainer}>
        {imagesToRender.map((_, index) => (
          <Svg key={index} width="8" height="8" viewBox="0 0 8 8" fill="none">
            <Circle cx="4.5" cy="4" r="4" fill="white" fillOpacity={selectedDot === index ? 0.8 : 0.3} />
          </Svg>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  Barcode: { borderRadius: 4, height: '50%', width: '80%' },
  // eslint-disable-next-line react-native/no-unused-styles
  MRZ: {
    height: '40%',
    width: '100%',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  Photo: { aspectRatio: 1, borderRadius: 100, height: '50%', overflow: 'hidden' },
  // eslint-disable-next-line react-native/no-unused-styles
  QrCode: { aspectRatio: 1, borderRadius: 4, height: '50%' },
  carouselItem: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  pageDotContainer: {
    alignSelf: 'center',
    bottom: 10,
    columnGap: 8,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
  },
});

export default CarouselComponent;
