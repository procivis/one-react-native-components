import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const ArrowLeft = (props: SvgProps) => (
  <Svg width={25} height={24} fill="none" {...props}>
    <Path stroke="#141414" strokeWidth={2} d="M21 12H4.5M10 6.5 4.5 12l5.5 5.5" />
  </Svg>
);
export default ArrowLeft;
