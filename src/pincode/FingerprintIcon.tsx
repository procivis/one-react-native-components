import React from 'react';
import Svg, { Color, Path, SvgProps } from 'react-native-svg';

type Props = SvgProps & {
  foregroundColor: Color;
};

const FingerprintIcon = (props: Props) => (
  <Svg fill="none" viewBox="0 0 12 12" {...props}>
    <Path
      d="M2.5 8.1c0 1.675 1.567 3.033 3.5 3.033S9.5 9.775 9.5 8.1V3.9C9.5 2.225 7.933.867 6 .867S2.5 2.225 2.5 3.9v1.6a.5.5 0 0 1-1 0V3.9C1.5 1.746 3.515 0 6 0s4.5 1.746 4.5 3.9v4.2c0 2.154-2.015 3.9-4.5 3.9s-4.5-1.746-4.5-3.9v-.6a.5.5 0 0 1 1 0v.6Z"
      fill={props.foregroundColor}
    />
    <Path
      d="M7.5 7.5v-1a.5.5 0 0 1 1 0v1a2.5 2.5 0 0 1-5 0v-3a2.5 2.5 0 0 1 5 0 .5.5 0 0 1-1 0 1.5 1.5 0 1 0-3 0v3a1.5 1.5 0 1 0 3 0Z"
      fill={props.foregroundColor}
    />
    <Path d="M5.5 4.5a.5.5 0 0 1 1 0v3a.5.5 0 0 1-1 0v-3Z" fill={props.foregroundColor} />
  </Svg>
);

export default FingerprintIcon;
