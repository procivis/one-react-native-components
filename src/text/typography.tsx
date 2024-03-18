import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { useAppColorScheme } from '../theme';
import { BaseText, BaseTextProps } from './base';

const sizeStyles = {
  h1: {
    fontSize: 26,
    letterSpacing: 0.2,
    lineHeight: 36,
  },
  h2: {
    fontSize: 20,
    letterSpacing: 0.1,
    lineHeight: 32,
  },
  default: {
    fontSize: 14,
    letterSpacing: 0.2,
    lineHeight: 22,
  },
  sml: {
    fontSize: 12,
    letterSpacing: 0.3,
    lineHeight: 18,
  },
  xs: {
    fontSize: 10,
    letterSpacing: 0.35,
    lineHeight: 14,
  },
} as const;

export type TypographyProps = BaseTextProps & {
  size?: keyof typeof sizeStyles;
  caps?: boolean;
};

/**
 * General text component
 * @see https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=1%3A4
 */
const Typography = React.forwardRef<Text, TypographyProps>(
  ({ size = 'default', color, caps, style, ...props }, ref) => {
    const colorScheme = useAppColorScheme();
    return (
      <BaseText
        ref={ref}
        style={[sizeStyles[size], caps && styles.caps, style]}
        color={color ?? colorScheme.text}
        {...props}
      />
    );
  },
);

Typography.displayName = 'Typography';

const styles = StyleSheet.create({
  caps: {
    textTransform: 'uppercase',
  },
});

export default Typography;
