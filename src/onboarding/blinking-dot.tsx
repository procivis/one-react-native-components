import LottieView from 'lottie-react-native';
import React, { FunctionComponent } from 'react';
import type { ColorValue, StyleProp, ViewStyle } from 'react-native';

import { blinkingDot } from './blinking-dot-animation';

interface BlinkingDotProps {
  color?: ColorValue;
  style?: StyleProp<ViewStyle>;
}

const BlinkingDot: FunctionComponent<BlinkingDotProps> = ({ color, style }) => {
  return <LottieView style={style} autoPlay={true} source={blinkingDot(color)} />;
};

export default BlinkingDot;
