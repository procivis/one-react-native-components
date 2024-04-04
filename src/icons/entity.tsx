import React, { FC } from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

import { useAppColorScheme } from '../theme/color-scheme-context';

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=415-5402&mode=design&t=YI1oD2BfBie5HcvJ-0
export const EntityTrustedIcon: FC<SvgProps> = ({ ...props }) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg width={16} height={19} viewBox="0 0 16 19" fill="none" {...props}>
      <Path
        d="M9.265 1.255a4 4 0 00-2.53 0l-3 1A4 4 0 001 6.05v4.117a7 7 0 007 7 7 7 0 007-7V6.05a4 4 0 00-2.735-3.795l-3-1z"
        fill={colorScheme.success}
      />
      <Path
        d="M9.265 1.255l-.316.949.316-.949zm-2.53 0l.316.949-.316-.949zm-3 1l-.316-.949.316.949zm8.53 0l.316-.949-.316.949zM9.58.306a5 5 0 00-3.162 0l.632 1.898a3 3 0 011.898 0L9.58.306zm-3.162 0l-3 1 .632 1.898 3-1L6.42.306zm-3 1A5 5 0 000 6.05h2a3 3 0 012.051-2.846L3.42 1.306zM0 6.05v4.117h2V6.05H0zm0 4.117a8 8 0 008 8v-2a6 6 0 01-6-6H0zm8 8a8 8 0 008-8h-2a6 6 0 01-6 6v2zm8-8V6.05h-2v4.117h2zm0-4.117a5 5 0 00-3.419-4.744l-.632 1.898A3 3 0 0114 6.05h2zm-3.419-4.744l-3-1-.632 1.898 3 1 .632-1.898zM6.914 12.383c.156 0 .3-.037.43-.11a1.06 1.06 0 00.343-.32l3.649-5.64c.057-.089.104-.183.14-.282a.761.761 0 00.063-.297.652.652 0 00-.25-.53.839.839 0 00-.555-.204c-.276 0-.507.148-.695.445l-3.148 5.032-1.446-1.813a.98.98 0 00-.312-.273.717.717 0 00-.352-.086.742.742 0 00-.554.234.754.754 0 00-.227.555c0 .104.018.205.055.304.041.094.099.19.172.29l1.882 2.265c.115.146.237.255.368.328.13.068.276.102.437.102z"
        fill={colorScheme.white}
      />
    </Svg>
  );
};
