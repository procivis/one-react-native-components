import React from 'react';
import Svg, { Path, Rect, SvgProps } from 'react-native-svg';

import { useAppColorScheme } from '../theme';

// https://www.figma.com/file/S3WwgTMHuqxAsfu5zElCzq/App-Icon-Library-(Design)?node-id=125-106&t=4bgc2M8TuWckIFGT-4

export const TrustedBadgeIcon: React.FunctionComponent<SvgProps> = (svgProps) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...svgProps}>
      <Path
        d="M12 5L6 7V13C6 16.3141 8.68594 19 12 19C15.3141 19 18 16.3141 18 13V7L12 5Z"
        fill={colorScheme.successText}
      />
      <Path
        d="M9.81798 11.3326C9.76584 11.2802 9.70388 11.2387 9.63564 11.2103C9.5674 11.182 9.49422 11.1674 9.42033 11.1674C9.34643 11.1674 9.27325 11.182 9.20501 11.2103C9.13677 11.2387 9.0748 11.2802 9.02267 11.3326C8.97029 11.3848 8.92874 11.4467 8.90038 11.515C8.87202 11.5832 8.85742 11.6564 8.85742 11.7303C8.85742 11.8042 8.87202 11.8773 8.90038 11.9456C8.92874 12.0138 8.97029 12.0758 9.02267 12.1279L11.0774 14.1826C11.1267 14.232 11.1852 14.2712 11.2497 14.298C11.3142 14.3247 11.3833 14.3385 11.4531 14.3385C11.5229 14.3385 11.5921 14.3247 11.6565 14.298C11.721 14.2712 11.7796 14.232 11.8289 14.1826L15.3211 10.6904C15.3705 10.6411 15.4097 10.5825 15.4365 10.5181C15.4632 10.4536 15.477 10.3845 15.477 10.3146C15.477 10.2448 15.4632 10.1757 15.4365 10.1112C15.4097 10.0468 15.3705 9.98818 15.3211 9.93887L15.2774 9.89512C15.228 9.84571 15.1695 9.80651 15.105 9.77977C15.0405 9.75302 14.9714 9.73926 14.9016 9.73926C14.8318 9.73926 14.7626 9.75302 14.6982 9.77977C14.6337 9.80651 14.5751 9.84571 14.5258 9.89512L11.4524 12.967L9.81798 11.3326Z"
        fill={colorScheme.white}
      />
    </Svg>
  );
};

export const SafeBadgeIcon: React.FunctionComponent<SvgProps> = (svgProps) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...svgProps}>
      <Path
        d="M12 5L6 7V13C6 16.3141 8.68594 19 12 19C15.3141 19 18 16.3141 18 13V7L12 5Z"
        fill={colorScheme.textSecondary}
      />
      <Rect x="11" y="14.3501" width="1.725" height="1.725" fill={colorScheme.white} />
      <Rect x="11" y="8.3125" width="1.725" height="4.3125" fill={colorScheme.white} />
    </Svg>
  );
};

export const WarningBadgeIcon: React.FunctionComponent<SvgProps> = (svgProps) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...svgProps}>
      <Path
        d="M10.2148 6.07592C10.8005 5.12411 12.1841 5.12411 12.7698 6.07592L18.5778 15.5139C19.1928 16.5133 18.4738 17.8 17.3003 17.8H5.68435C4.51087 17.8 3.79184 16.5133 4.40686 15.5139L10.2148 6.07592Z"
        fill={colorScheme.alertText}
      />
      <Rect x="11" y="14.35" width="1.725" height="1.725" fill={colorScheme.white} />
      <Rect x="11" y="8.3125" width="1.725" height="4.3125" fill={colorScheme.white} />
    </Svg>
  );
};
