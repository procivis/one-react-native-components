import React from 'react';
import Svg, { Color, Path, SvgProps } from 'react-native-svg';

type Props = SvgProps & {
  foregroundColor: Color;
};

const FaceIDIcon = (props: Props) => (
  <Svg fill="none" viewBox="0 0 12 12" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.129 1.5v-1H11.5v3.37h-1V1.5H8.129Zm-.132 5.883.37.37c.07.08.08.22 0 .31a3.557 3.557 0 0 1-2.37.9c-.51 0-1.029-.11-1.5-.34-.279-.12-.55-.28-.79-.49l-.05-.04c-.01-.01-.019-.02-.019-.03a.24.24 0 0 1 0-.31l.37-.37c.009-.01.019-.02.029-.02.08-.07.19-.07.28-.01.005.005.013.01.02.015l.02.015.02.01.011.01c.209.17.439.3.679.38.6.23 1.27.24 1.861.01l.009-.01c.25-.09.48-.22.69-.39l.02-.01c.005-.005.012-.01.02-.015l.02-.015c.09-.06.201-.06.281.01.009 0 .019.01.029.02ZM10.5 10.47H8.129v1H11.5V8.1h-1v2.37ZM.5 8.1h1v2.37h2.37v1H.5V8.1Zm7.196-3.065h1v-1.21h-1v1.21Zm-3.391 0h-1v-1.21h1v1.21Zm2.435-1.21h-1v2.079h-.411v1H6.74V3.826ZM3.87 1.5H1.5v2.37h-1V.5h3.37v1Z"
      fill={props.foregroundColor}
    />
  </Svg>
);

export default FaceIDIcon;
