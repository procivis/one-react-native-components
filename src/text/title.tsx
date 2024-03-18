/* eslint-disable react-native/no-unused-styles */
import React, { FunctionComponent } from 'react';
import { Platform, StyleSheet } from 'react-native';

import { BaseText, BaseTextProps } from './base';

const sizeStyles = StyleSheet.create({
  big: {
    fontSize: 26,
    lineHeight: 36,
  },
  medium: {
    fontSize: 17,
    lineHeight: 25,
  },
  normal: {
    fontSize: 20,
    lineHeight: 32,
  },
  small: {
    fontSize: 12,
    lineHeight: Platform.OS === 'ios' ? 18 : 21,
  },
});

type TitleProps = BaseTextProps & {
  size?: keyof typeof sizeStyles;
};

/**
 * Legacy typography component
 * @deprecated Use `Typography` component instead
 */
const Title: FunctionComponent<TitleProps> = ({ size = 'normal', style, ...props }) => {
  return <BaseText style={[sizeStyles[size], style]} allowFontScaling={size !== 'big'} {...props} />;
};

export default Title;
