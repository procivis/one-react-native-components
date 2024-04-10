import React, { FunctionComponent } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export interface CameraMaskProps {
  scannerSize?: number;
}

const CameraOverlay: FunctionComponent<CameraMaskProps> = ({ scannerSize }) => {
  const windowWidth = Dimensions.get('window').width;

  scannerSize = scannerSize ?? windowWidth * 0.6;
  const transformSize = scannerSize / 2;

  return (
    <View style={StyleSheet.absoluteFill}>
      <Svg
        style={[
          styles.scannerOutline,
          {
            width: scannerSize,
            height: scannerSize,
            transform: [{ translateX: -transformSize }, { translateY: -transformSize }],
          },
        ]}
        viewBox="0 0 245 245"
        fill="none"
        strokeWidth={4}
        strokeLinecap="round"
        stroke={'#FFFFFF'}>
        <Path d="M44.9348 2.5H40.9C27.4587 2.5 20.7381 2.5 15.6042 5.11584C11.0883 7.4168 7.4168 11.0883 5.11584 15.6042C2.5 20.7381 2.5 27.4587 2.5 40.9V44.9348" />
        <Path d="M242.5 44.9348L242.5 26.5C242.5 13.2452 231.755 2.5 218.5 2.5L200.065 2.5" />
        <Path d="M242.5 44.9348L242.5 40.9C242.5 27.4587 242.5 20.7381 239.884 15.6042C237.583 11.0883 233.912 7.4168 229.396 5.11584C224.262 2.5 217.541 2.5 204.1 2.5L200.065 2.5" />
        <Path d="M200.065 242.5L204.1 242.5C217.541 242.5 224.262 242.5 229.396 239.884C233.912 237.583 237.583 233.912 239.884 229.396C242.5 224.262 242.5 217.541 242.5 204.1L242.5 200.065" />
        <Path d="M2.5 200.065L2.5 204.1C2.5 217.541 2.5 224.262 5.11584 229.396C7.4168 233.912 11.0883 237.583 15.6042 239.884C20.7381 242.5 27.4587 242.5 40.9 242.5L44.9348 242.5" />
      </Svg>
    </View>
  );
};

export default CameraOverlay;

const styles = StyleSheet.create({
  scannerOutline: {
    left: '50%',
    top: '50%',
  },
});
