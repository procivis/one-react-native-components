import React, { FC } from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

import { useAppColorScheme } from '../theme/color-scheme-context';

export const ClearInputIcon: FC = () => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg fill="none" height={24} viewBox="0 0 24 24" width={24}>
      <Circle cx="12" cy="12" fill={colorScheme.background} r="6" />
      <Path
        d="M12.6487 11.9359L14.7939 9.79069C14.843 9.74457 14.8709 9.68017 14.8709 9.61277C14.8709 9.54537 14.843 9.48097 14.7939 9.43485L14.438 9.06884C14.3355 8.98155 14.1847 8.98155 14.0822 9.06884L11.937 11.2141L9.79175 9.06884C9.6909 8.97705 9.53677 8.97705 9.43591 9.06884L9.0699 9.43485C8.97811 9.53571 8.97811 9.68984 9.0699 9.79069L11.2151 11.9359L9.0699 14.0811C8.9767 14.1853 8.9767 14.3429 9.0699 14.4471L9.43591 14.803C9.48203 14.8521 9.54643 14.88 9.61383 14.88C9.68123 14.88 9.74563 14.8521 9.79175 14.803L11.937 12.6476L14.0822 14.7928C14.1301 14.8425 14.1962 14.8706 14.2652 14.8706C14.3342 14.8706 14.4003 14.8425 14.4482 14.7928L14.804 14.437C14.8981 14.3354 14.8936 14.1772 14.7939 14.0811L12.6487 11.9359Z"
        fill={colorScheme.text}
      />
    </Svg>
  );
};

export const DropdownInputIcon: FC = () => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 10.8707L11.9994 15L16 10.8707L15.1555 10L11.9994 13.2586L8.84211 10L8 10.8707Z"
        fill={colorScheme.text}
      />
    </Svg>
  );
};
