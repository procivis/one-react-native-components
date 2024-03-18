import React from 'react';
import Svg, { Circle, Path, Rect, SvgProps } from 'react-native-svg';

import { useAppColorScheme } from '../theme';

// https://www.figma.com/file/S3WwgTMHuqxAsfu5zElCzq/App-Icon-Library-(Design)?node-id=6-39&t=4bgc2M8TuWckIFGT-0

export const BackupGoodIcon: React.FunctionComponent<SvgProps> = (svgProps) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...svgProps}>
      <Circle cx="12" cy="12" r="8" fill={colorScheme.successText} />
      <Path
        d="M9.96056 11.5934C9.90842 11.541 9.84646 11.4994 9.77822 11.4711C9.70997 11.4427 9.6368 11.4281 9.5629 11.4281C9.489 11.4281 9.41583 11.4427 9.34759 11.4711C9.27935 11.4994 9.21738 11.541 9.16525 11.5934C9.11287 11.6455 9.07131 11.7075 9.04296 11.7757C9.0146 11.8439 9 11.9171 9 11.991C9 12.0649 9.0146 12.1381 9.04296 12.2063C9.07131 12.2746 9.11287 12.3365 9.16525 12.3887L11.2199 14.4434C11.2692 14.4928 11.3278 14.532 11.3923 14.5587C11.4568 14.5855 11.5259 14.5992 11.5957 14.5992C11.6655 14.5992 11.7346 14.5855 11.7991 14.5587C11.8636 14.532 11.9222 14.4928 11.9715 14.4434L15.4637 10.9512C15.5131 10.9019 15.5523 10.8433 15.579 10.7788C15.6058 10.7143 15.6195 10.6452 15.6195 10.5754C15.6195 10.5056 15.6058 10.4365 15.579 10.372C15.5523 10.3075 15.5131 10.2489 15.4637 10.1996L15.4199 10.1559C15.3706 10.1065 15.312 10.0673 15.2476 10.0405C15.1831 10.0138 15.114 10 15.0442 10C14.9743 10 14.9052 10.0138 14.8407 10.0405C14.7763 10.0673 14.7177 10.1065 14.6684 10.1559L11.5949 13.2277L9.96056 11.5934Z"
        fill={colorScheme.white}
      />
    </Svg>
  );
};

export const BackupSyncIcon: React.FunctionComponent<SvgProps> = (svgProps) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...svgProps}>
      <Circle cx="12" cy="12" r="8" fill={colorScheme.textSecondary} />
      <Path
        d="M12 8.36364V7L10 8.81818L12 10.6364V9.27273C13.6575 9.27273 15 10.4932 15 12C15 12.4614 14.8725 12.8932 14.6525 13.275L15.3825 13.9386C15.77 13.375 16 12.7136 16 12C16 9.99091 14.21 8.36364 12 8.36364ZM12 14.7273C10.3425 14.7273 9 13.5068 9 12C9 11.5386 9.1275 11.1068 9.3475 10.725L8.6175 10.0614C8.23 10.625 8 11.2864 8 12C8 14.0091 9.79 15.6364 12 15.6364V17L14 15.1818L12 13.3636V14.7273Z"
        fill={colorScheme.accentText}
      />
    </Svg>
  );
};

export const BackupErrorIcon: React.FunctionComponent<SvgProps> = (svgProps) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...svgProps}>
      <Path
        fillRule="evenodd"
        d="M10.2148 6.07592C10.8005 5.12411 12.1841 5.12411 12.7698 6.07592L18.5778 15.5139C19.1928 16.5133 18.4738 17.8 17.3003 17.8H5.68435C4.51087 17.8 3.79184 16.5133 4.40686 15.5139L10.2148 6.07592Z"
        fill={colorScheme.alertText}
      />
      <Rect x="11" y="14.35" width="1.725" height="1.725" fill={colorScheme.white} />
      <Rect x="11" y="8.3125" width="1.725" height="4.3125" fill={colorScheme.white} />
    </Svg>
  );
};
