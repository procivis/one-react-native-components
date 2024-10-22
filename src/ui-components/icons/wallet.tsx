import React from 'react';
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop, SvgProps } from 'react-native-svg';

// Icons for the wallet dashboard: https://www.figma.com/file/Mj9Nm9CUtauth6jt49UL7t/OTS-Developments-2023?type=design&node-id=135-32814&t=GXsNdBzYheEWxZvG-4

// https://www.figma.com/file/S3WwgTMHuqxAsfu5zElCzq/App-Icon-Library-(Design)?type=design&node-id=89-86&t=4mzTEO913aBKgW7w-4
export const NextIcon: React.FunctionComponent<SvgProps> = ({ color, ...props }) => (
  <Svg fill="none" height={24} viewBox="0 0 24 24" width={24} {...props}>
    <Path
      d="M8.62948 6.10988C8.69502 6.03977 8.78652 6 8.88228 6C8.97805 6 9.06954 6.03977 9.13508 6.10988L15 11.9841L9.13508 17.9018C8.99178 18.0327 8.77278 18.0327 8.62948 17.9018L8.10944 17.3796C8.03961 17.3138 8 17.222 8 17.1258C8 17.0297 8.03961 16.9378 8.10944 16.872L12.9487 12.0131L8.10944 7.12517C8.03961 7.05937 8 6.9675 8 6.87135C8 6.7752 8.03961 6.68333 8.10944 6.61753L8.62948 6.10988Z"
      fill={color}
    />
  </Svg>
);

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=426-19996&t=m7aYCyqnFetWyDBt-4
export const NoCredentialsIcon: React.FunctionComponent<SvgProps> = (props) => (
  <Svg fill="none" height="381" viewBox="0 0 257 381" width="257" {...props}>
    <Circle cx="128.5" cy="191.5" fill="url(#paint0_linear_2399_11695)" opacity="0.1" r="128" />
    <Rect fill="white" height="118.725" rx="10.4757" width="178.087" x="39.4565" y="132.138" />
    <Rect
      fill="url(#paint1_linear_2399_11695)"
      height="118.725"
      rx="10.4757"
      transform="rotate(-180 217.543 119.152)"
      width="178.087"
      x="217.543"
      y="119.152"
    />
    <Rect fill="url(#paint2_linear_2399_11695)" height="118.725" rx="10.4757" width="178.087" x="39.4565" y="261.993" />
    <Rect fill="#0F151A" height="1.85507" width="44.5217" x="108.094" y="189.645" />
    <Rect
      fill="#0F151A"
      height="1.85507"
      transform="rotate(90 131.283 168.312)"
      width="44.5217"
      x="131.283"
      y="168.312"
    />
    <Defs>
      <LinearGradient
        gradientUnits="userSpaceOnUse"
        id="paint0_linear_2399_11695"
        x1="128.5"
        x2="128.5"
        y1="63.5"
        y2="319.5">
        <Stop stopColor="#21353A" />
        <Stop offset="1" stopColor="#21353A" stopOpacity="0" />
      </LinearGradient>
      <LinearGradient
        gradientUnits="userSpaceOnUse"
        id="paint1_linear_2399_11695"
        x1="306.587"
        x2="306.587"
        y1="119.152"
        y2="237.877">
        <Stop stopColor="white" />
        <Stop offset="1" stopColor="white" stopOpacity="0" />
      </LinearGradient>
      <LinearGradient
        gradientUnits="userSpaceOnUse"
        id="paint2_linear_2399_11695"
        x1="128.5"
        x2="128.5"
        y1="261.993"
        y2="380.717">
        <Stop stopColor="white" />
        <Stop offset="1" stopColor="white" stopOpacity="0" />
      </LinearGradient>
    </Defs>
  </Svg>
);
