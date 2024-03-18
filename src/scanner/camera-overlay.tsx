import React, { FunctionComponent } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Svg, { Defs, Mask, Rect } from 'react-native-svg';

import { useAppColorScheme } from '../theme';

export interface CameraMaskProps {
  scannerSize?: number;
}

const CameraOverlay: FunctionComponent<CameraMaskProps> = ({ scannerSize }) => {
  const colorScheme = useAppColorScheme();
  scannerSize = scannerSize ?? Dimensions.get('screen').width * 0.8;
  const transformSize = scannerSize / 2;
  return (
    <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
      <Defs>
        <Mask id="mask" x="0" y="0" height="100%" width="100%">
          <Rect height="100%" width="100%" fill="#fff" />
          <Rect
            width={scannerSize}
            height={scannerSize}
            fill="#000"
            x="50%"
            y="50%"
            transform={`translate(-${transformSize},-${transformSize})`}
            rx="25"
          />
        </Mask>
      </Defs>
      <Rect height="100%" width="100%" fill={colorScheme.overlay} mask="url(#mask)" />
      <Rect
        width={scannerSize}
        height={scannerSize}
        stroke={colorScheme.white}
        fill="transparent"
        x="50%"
        y="50%"
        transform={`translate(-${transformSize},-${transformSize})`}
        rx="25"
      />
    </Svg>
  );
};

export default CameraOverlay;
