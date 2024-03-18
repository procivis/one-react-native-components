import React, { FunctionComponent } from 'react';
import type { StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native';
import Svg, { Path, SvgProps } from 'react-native-svg';

import { useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
import RoundButton from './round-button';

const BackIcon: FunctionComponent<SvgProps> = ({ color, ...props }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M14.3705 17.8993C14.305 17.9635 14.2135 18 14.1177 18C14.022 18 13.9305 17.9635 13.8649 17.8993L8 12.5146L13.8649 7.09003C14.0082 6.96999 14.2272 6.96999 14.3705 7.09003L14.8906 7.56866C14.9604 7.62898 15 7.7132 15 7.80134C15 7.88947 14.9604 7.97369 14.8906 8.03401L10.0513 12.488L14.8906 16.9686C14.9604 17.0289 15 17.1131 15 17.2013C15 17.2894 14.9604 17.3736 14.8906 17.4339L14.3705 17.8993Z"
      fill={color}
    />
  </Svg>
);
const CloseIcon: FunctionComponent<SvgProps> = ({ color, ...props }) => (
  <Svg width="10" height="10" viewBox="0 0 10 10" fill="none" {...props}>
    <Path
      d="M5.80701 5.0012L9.60963 1.18723C9.6645 1.13574 9.69563 1.06384 9.69563 0.988587C9.69563 0.913337 9.6645 0.841439 9.60963 0.789943L9.21234 0.381303C9.09974 0.278823 8.92766 0.278823 8.81505 0.381303L5.00108 4.19527L1.18711 0.381303C1.07451 0.278823 0.902425 0.278823 0.789821 0.381303L0.381181 0.789943C0.278701 0.902547 0.278701 1.07463 0.381181 1.18723L4.19515 5.0012L0.381181 8.81518C0.278701 8.92778 0.278701 9.09986 0.381181 9.21246L0.789821 9.60975C0.841317 9.66462 0.913215 9.69575 0.988465 9.69575C1.06371 9.69575 1.13561 9.66462 1.18711 9.60975L5.00108 5.80713L8.81505 9.60975C8.86655 9.66462 8.93845 9.69575 9.0137 9.69575C9.08895 9.69575 9.16084 9.66462 9.21234 9.60975L9.60963 9.21246C9.6645 9.16097 9.69563 9.08907 9.69563 9.01382C9.69563 8.93857 9.6645 8.86667 9.60963 8.81518L5.80701 5.0012Z"
      fill={color}
    />
  </Svg>
);

export enum BackButtonIcon {
  Back = 'back',
  Close = 'close',
}

export type BackButtonProps = TouchableOpacityProps & {
  style?: StyleProp<ViewStyle>;
  type?: 'white' | 'default';
  icon?: BackButtonIcon;
  onPress: () => void;
};

const BackButton: FunctionComponent<BackButtonProps> = ({
  style,
  icon = BackButtonIcon.Back,
  type = 'default',
  onPress,
  ...props
}) => {
  const t = useAccessibilityTranslation();

  const Icon = icon === BackButtonIcon.Close ? CloseIcon : BackIcon;

  return (
    <RoundButton
      style={style}
      type={type}
      icon={Icon}
      accessibilityLabel={t(icon === BackButtonIcon.Close ? 'accessibility.nav.close' : 'accessibility.nav.back')}
      onPress={onPress}
      {...props}
    />
  );
};

export default BackButton;
