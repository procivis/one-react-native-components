/* eslint-disable @typescript-eslint/naming-convention */
import React, { FC } from 'react';
import { StyleSheet, TextInstance } from 'react-native';

import { useAppColorScheme } from '../theme';
import { BaseText, BaseTextProps } from './base';
import font from './font';

const presets = {
  l: {
    ...font.heading,
    fontSize: 24,
    lineHeight: 33,
  },
  'l/line-height-large': {
    ...font.heading,
    fontSize: 24,
    lineHeight: 28,
  },
  m: {
    ...font.medium,
    fontSize: 17,
    letterSpacing: -0.2,
    lineHeight: 22,
  },
  'm/heading': {
    ...font.heading,
    fontSize: 17,
    letterSpacing: -0.2,
    lineHeight: 22,
  },
  regular: {
    ...font.regular,
    fontSize: 17,
    lineHeight: 24,
  },
  s: {
    ...font.regular,
    fontSize: 14,
    lineHeight: 22,
  },
  's/code': {
    ...font.code,
    fontSize: 14,
    letterSpacing: 0.2,
    lineHeight: 22,
  },
  's/line-height-capped': {
    ...font.regular,
    fontSize: 14,
    letterSpacing: -0.2,
    lineHeight: 22,
    // TODO: vertical trim: cap height
  },
  's/line-height-small': {
    ...font.regular,
    fontSize: 14,
    letterSpacing: 0.3,
    lineHeight: 18,
  },
  xl: {
    ...font.heading,
    fontSize: 26,
    letterSpacing: 0.2,
    lineHeight: 36,
  },
  xs: {
    ...font.regular,
    fontSize: 12,
    letterSpacing: -0.1,
    lineHeight: 22,
  },
  'xs/code': {
    ...font.code,
    fontSize: 12,
    letterSpacing: 0.3,
    lineHeight: 18,
  },
  'xs/line-height-small': {
    ...font.regular,
    fontSize: 12,
    letterSpacing: 0.3,
    lineHeight: 18,
  },
} as const;

export type TypographyProps = BaseTextProps & {
  caps?: boolean;
  preset?: keyof typeof presets;
};

/**
 * General text component
 * @see https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=1045-30326
 */
const Typography: FC<TypographyProps> = React.forwardRef<
  TextInstance,
  TypographyProps
>(({ preset = 'regular', color, caps, style, ...props }, ref) => {
  const colorScheme = useAppColorScheme();
  return (
    <BaseText
      color={color ?? colorScheme.text}
      ref={ref}
      style={[presets[preset], caps && styles.caps, style]}
      {...props}
    />
  );
});

Typography.displayName = 'Typography';

const styles = StyleSheet.create({
  caps: {
    textTransform: 'uppercase',
  },
});

export default Typography;
