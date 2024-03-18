/* eslint-disable react-native/no-unused-styles */
import React, { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';

import { BaseText, BaseTextProps } from './base';

const sizeStyles = StyleSheet.create({
  basic: {
    fontSize: 14,
    letterSpacing: 0.35,
    lineHeight: 22,
  },
  header: {
    fontSize: 20,
    lineHeight: 32,
  },
  small: {
    fontSize: 10,
    letterSpacing: 0.35,
    lineHeight: 14,
  },
});

type PProps = BaseTextProps & {
  size?: keyof typeof sizeStyles;
};

/**
 * Legacy typography component
 * @deprecated Use `Typography` component instead
 */
const P: FunctionComponent<PProps> = ({ size = 'basic', style, ...props }) => {
  return <BaseText style={[sizeStyles[size], style]} {...props} />;
};

export default P;
