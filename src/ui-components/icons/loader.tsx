import React, { FC } from 'react';
import Svg, { Circle, Defs, G, LinearGradient, Path, RadialGradient, Stop, SvgProps } from 'react-native-svg';

import { useAppColorScheme } from '../theme/color-scheme-context';

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=444-45709&mode=design&t=YI1oD2BfBie5HcvJ-0
export const LoaderProgressSpinner: FC<SvgProps> = (props) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg color={colorScheme.accent} fill="none" height={64} viewBox="0 0 64 64" width={64} {...props}>
      <Defs>
        <LinearGradient id="a">
          <Stop offset="0%" stopColor={colorScheme.accent} stopOpacity={0} />
          <Stop offset="100%" stopColor={colorScheme.accent} stopOpacity={0.5} />
        </LinearGradient>
        <LinearGradient id="b">
          <Stop offset="0%" stopColor={colorScheme.accent} />
          <Stop offset="100%" stopColor={colorScheme.accent} stopOpacity={0.5} />
        </LinearGradient>
      </Defs>
      <G strokeWidth={6}>
        <Path d="M3 32a29 29 0 0158 0" stroke="url(#a)" />
        <Path d="M61 32a29 29 0 01-58 0" stroke="url(#b)" />
        <Path d="M4 100a96 96 0 010-2" stroke={colorScheme.accent} strokeLinecap="round" />
      </G>
    </Svg>
  );
};

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=444-48609&mode=design&t=YI1oD2BfBie5HcvJ-0
export const LoaderSuccess: FC<SvgProps> = (props) => (
  <Svg fill="none" height={64} viewBox="0 0 65 64" width={65} {...props}>
    <Path
      d="M58.5 32c0-14.36-11.64-26-26-26s-26 11.64-26 26 11.64 26 26 26 26-11.64 26-26z"
      fill="url(#paint0_angular_1381_17086)"
    />
    <Circle cx={32.5} cy={32} fill="url(#paint1_linear_1381_17086)" r={32} />
    <Path
      d="M41.636 25.194a.772.772 0 00-1.023 0L29.925 35.66l-5.524-5.548-.003-.003a.735.735 0 00-1.023 0l-.667.643-.012.013a.756.756 0 000 1.015L29.92 39l12.374-12.116.01-.01a.737.737 0 000-1l-.655-.668-.014-.012z"
      fill="#fff"
    />
    <Defs>
      <RadialGradient
        cx={0}
        cy={0}
        gradientTransform="matrix(0 -26 26 0 32.5 32)"
        gradientUnits="userSpaceOnUse"
        id="paint0_angular_1381_17086"
        r={1}>
        <Stop stopColor="#0F151A" />
        <Stop offset={0.715} stopColor="#3F7BA6" stopOpacity={0.11} />
        <Stop offset={1} stopColor="#3F7BA6" stopOpacity={0} />
      </RadialGradient>
      <LinearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1381_17086" x1={32.5} x2={32.5} y1={0} y2={64}>
        <Stop stopColor="#00D066" />
        <Stop offset={1} stopColor="#2EEF8D" />
      </LinearGradient>
    </Defs>
  </Svg>
);

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=444-48595&mode=design&t=YI1oD2BfBie5HcvJ-0
export const LoaderWarning: FC<SvgProps> = (props) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg fill="none" height={64} viewBox="0 0 65 64" width={65} {...props}>
      <Path
        d="M16.751 51.233c-1.165 0-2.175-.255-3.032-.763a5.31 5.31 0 01-1.988-2.049c-.455-.856-.683-1.807-.683-2.851 0-1.018.268-1.988.803-2.912l15.543-27.09c.522-.95 1.225-1.667 2.109-2.149a5.709 5.709 0 012.771-.723c.964 0 1.881.242 2.751.723.87.469 1.58 1.185 2.129 2.15l15.543 27.089a5.775 5.775 0 01.803 2.912c0 1.044-.234 1.995-.703 2.851a5.31 5.31 0 01-1.988 2.049c-.843.508-1.847.763-3.012.763H16.75z"
        fill={colorScheme.warning}
      />
      <Path
        d="M10.848 48.89h0l.005.011a6.31 6.31 0 002.355 2.428c1.036.615 2.23.904 3.543.904h31.046c1.312 0 2.5-.288 3.525-.905a6.31 6.31 0 002.353-2.427c.554-1.014.825-2.131.825-3.331a6.774 6.774 0 00-.938-3.414l-.003-.005-15.536-27.078-.001-.001c-.629-1.104-1.465-1.962-2.517-2.53a6.596 6.596 0 00-3.231-.845 6.709 6.709 0 00-3.25.845c-1.062.579-1.895 1.436-2.502 2.536L10.986 42.156l-.001.002c-.619 1.068-.937 2.21-.937 3.412 0 1.195.262 2.308.8 3.32z"
        stroke="#fff"
        strokeOpacity={0.2}
        strokeWidth={2}
      />
      <Path
        d="M34.121 35.61c-.026 1.245-.635 1.867-1.827 1.867-1.218 0-1.847-.616-1.887-1.847l-.282-10.122c-.026-.602.161-1.097.563-1.485.401-.402.93-.603 1.586-.603.643 0 1.171.2 1.587.602.415.389.609.89.582 1.507l-.322 10.08zM34.021 43.742c-.482.429-1.057.643-1.727.643-.67 0-1.252-.214-1.747-.643-.482-.428-.723-.977-.723-1.646 0-.656.241-1.205.723-1.647.482-.442 1.064-.663 1.747-.663.67 0 1.245.221 1.727.663.482.442.723.99.723 1.647 0 .67-.24 1.218-.723 1.646z"
        fill="#000"
      />
    </Svg>
  );
};

// https://www.figma.com/design/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=2942-29465&t=CZt3ManJltJXW5nT-0
export const LoaderError: FC<SvgProps> = (props) => {
  return (
    <Svg width={65} height={64} viewBox="0 0 65 64" fill="none" {...props}>
      <Path
        d="M58.5 32c0-14.36-11.64-26-26-26s-26 11.64-26 26 11.64 26 26 26 26-11.64 26-26z"
        fill="url(#paint0_angular_2140_7619)"
      />
      <Circle cx={32.5} cy={32} r={32} fill="url(#paint1_linear_2140_7619)" />
      <Path
        d="M28.21 38.552c-.319.299-.704.448-1.156.448-.43 0-.8-.15-1.108-.448a1.548 1.548 0 01-.446-1.111c0-.431.154-.797.463-1.095L30.277 32l-4.314-4.313c-.309-.32-.463-.685-.463-1.095 0-.453.149-.823.446-1.111a1.537 1.537 0 011.108-.448c.43 0 .799.144 1.107.431l4.33 4.33 4.348-4.33c.308-.31.678-.464 1.107-.464.43 0 .794.155 1.091.465.309.298.463.663.463 1.094 0 .42-.154.79-.463 1.112L34.707 32l4.314 4.33c.308.287.462.657.462 1.11 0 .432-.154.803-.462 1.112a1.501 1.501 0 01-1.108.448c-.452 0-.826-.15-1.124-.448l-4.297-4.33-4.281 4.33z"
        fill="#fff"
      />
      <Defs>
        <RadialGradient
          id="paint0_angular_2140_7619"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 -26 26 0 32.5 32)">
          <Stop stopColor="#0F151A" />
          <Stop offset={0.715} stopColor="#3F7BA6" stopOpacity={0.11} />
          <Stop offset={1} stopColor="#3F7BA6" stopOpacity={0} />
        </RadialGradient>
        <LinearGradient id="paint1_linear_2140_7619" x1={32.5} y1={0} x2={32.5} y2={64} gradientUnits="userSpaceOnUse">
          <Stop stopColor="red" />
          <Stop offset={1} stopColor="#C60505" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};
