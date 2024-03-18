import React from 'react';
import Svg, { Color, Path, SvgProps } from 'react-native-svg';

type Props = SvgProps & {
  foregroundColor: Color;
};

const DeleteIcon = (props: Props) => (
  <Svg fill="none" viewBox="0 0 12 12" {...props}>
    <Path
      d="m7.003 6.197 3.802-3.814a.272.272 0 0 0 0-.397l-.397-.41a.295.295 0 0 0-.397 0L6.197 5.392 2.383 1.577a.295.295 0 0 0-.397 0l-.41.409a.295.295 0 0 0 0 .397l3.815 3.814-3.814 3.814a.295.295 0 0 0 0 .397l.409.397a.272.272 0 0 0 .397 0l3.814-3.802 3.814 3.802a.272.272 0 0 0 .397 0l.397-.397a.272.272 0 0 0 0-.397L7.003 6.197Z"
      fill={props.foregroundColor}
    />
  </Svg>
);

export default DeleteIcon;
