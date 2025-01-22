import React, { FC } from 'react';
import Svg, { Mask, Path, SvgProps } from 'react-native-svg';

import { useAppColorScheme } from '../theme/color-scheme-context';

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=415-5402&mode=design&t=YI1oD2BfBie5HcvJ-0
export const EntityTrustedIcon: FC<SvgProps> = ({ ...props }) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg width={16} height={19} viewBox="0 0 16 19" fill="none" {...props}>
      <Mask id="a" maskUnits="userSpaceOnUse" x={0} y={0.0496979} width={18} height={21} fill={colorScheme.black}>
        <Path fill={colorScheme.white} d="M0 0.0496979H18V21.0496979H0z" />
        <Path d="M10.265 2.255a4 4 0 00-2.53 0l-3 1A4 4 0 002 7.05v4.117a7 7 0 007 7 7 7 0 007-7V7.05a4 4 0 00-2.735-3.795l-3-1z" />
      </Mask>
      <Path
        d="M10.265 2.255a4 4 0 00-2.53 0l-3 1A4 4 0 002 7.05v4.117a7 7 0 007 7 7 7 0 007-7V7.05a4 4 0 00-2.735-3.795l-3-1z"
        fill={colorScheme.success}
      />
      <Path
        d="M4.735 3.255l-.632-1.897.632 1.897zm8.53 0l.632-1.897-.632 1.897zm-5.53-1l.633 1.897-.633-1.897zm2.53 0l-.633 1.897.633-1.897zM7.103.358l-3 1 1.265 3.794 3-1L7.103.358zM0 7.05v4.117h4V7.05H0zm0 4.117a9 9 0 009 9v-4a5 5 0 01-5-5H0zm9 9a9 9 0 009-9h-4a5 5 0 01-5 5v4zm9-9V7.05h-4v4.117h4zm-4.103-9.81l-3-1-1.265 3.795 3 1 1.265-3.794zm-9.794 0A6 6 0 000 7.05h4a2 2 0 011.368-1.898L4.103 1.358zM18 7.05a6 6 0 00-4.103-5.692l-1.264 3.794A2 2 0 0114 7.05h4zM8.368 4.152a2 2 0 011.264 0L10.897.358a6 6 0 00-3.794 0l1.265 3.794z"
        fill={colorScheme.white}
        fillOpacity={0.2}
        mask="url(#a)"
      />
      <Path
        d="M7.914 13.383c.156 0 .3-.037.43-.11a1.06 1.06 0 00.344-.32l3.648-5.64c.057-.089.104-.183.14-.282a.761.761 0 00.063-.297.652.652 0 00-.25-.53.839.839 0 00-.555-.204c-.276 0-.507.148-.695.445l-3.148 5.032-1.446-1.813a.98.98 0 00-.312-.273.717.717 0 00-.352-.086.742.742 0 00-.554.234.754.754 0 00-.227.555c0 .104.018.206.055.304.041.094.099.19.172.29l1.882 2.265c.115.146.237.255.368.328.13.068.276.102.437.102z"
        fill={colorScheme.white}
      />
    </Svg>
  );
};
