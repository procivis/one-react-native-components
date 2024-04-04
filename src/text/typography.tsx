import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { useAppColorScheme } from '../theme';
import { BaseText, BaseTextProps } from './base';
import font from './font';

const presets = {
  xl: {
    ...font.regular,
    fontSize: 26,
    lineHeight: 36,
    letterSpacing: 0.2,
  },
  l: {
    ...font.medium,
    fontSize: 24,
    // TODO: figure out how to support line-height 22
  },
  'l/line-height-large': {
    ...font.medium,
    fontSize: 24,
    lineHeight: 28,
  },
  regular: {
    ...font.regular,
    fontSize: 17,
    lineHeight: 24,
  },
  m: {
    ...font.medium,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  s: {
    ...font.regular,
    fontSize: 14,
    lineHeight: 22,
  },
  's/line-height-capped': {
    ...font.regular,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.2,
    // TODO: vertical trim: cap height
  },
  's/line-height-small': {
    ...font.regular,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.3,
  },
  's/code': {
    ...font.code,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  xs: {
    ...font.regular,
    fontSize: 12,
    lineHeight: 22,
    letterSpacing: -0.1,
  },
  'xs/line-height-small': {
    ...font.regular,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.3,
  },
  'xs/code': {
    ...font.code,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.3,
  },
} as const;

export type TypographyProps = BaseTextProps & {
  preset?: keyof typeof presets;
  caps?: boolean;
};

/**
 * General text component
 * @see https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=1045-30326
 */
const Typography = React.forwardRef<Text, TypographyProps>(
  ({ preset = 'regular', color, caps, style, ...props }, ref) => {
    const colorScheme = useAppColorScheme();
    return (
      <BaseText
        ref={ref}
        style={[presets[preset], caps && styles.caps, style]}
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
