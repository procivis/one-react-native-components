import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import type { ColorValue, Insets } from 'react-native';
import { StyleProp, StyleSheet, TouchableHighlightProps, View, ViewStyle } from 'react-native';

import { TouchableHighlight, TouchableHighlightRef } from '../accessibility/accessibilityHistoryWrappers';
import { Typography, TypographyProps } from '../text';
import { useAppColorScheme } from '../theme';
import { concatTestID } from '../utils';

const styles = StyleSheet.create({
  itemsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  root: {
    alignSelf: 'stretch',
    borderRadius: 6,
    borderWidth: 1,
    justifyContent: 'center',
    margiVertical: 8,
    padding: 12,
    paddingVertical: 10,
  },
});

const SLOP_VALUE = 10;

const hitSlop: Insets = {
  top: SLOP_VALUE,
  bottom: SLOP_VALUE,
  left: SLOP_VALUE,
  right: SLOP_VALUE,
};

export type ButtonProps = TouchableHighlightProps & {
  type?: 'default' | 'light' | 'lightBorderless';
  /** overrides of the implicit style */
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  testID?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  /** overrides of the implicit label style */
  textStyle?: Partial<TypographyProps>;
};

const Button = React.forwardRef<TouchableHighlightRef, PropsWithChildren<ButtonProps>>(
  ({ type = 'default', style, disabled, onPress, icon, children, textStyle, testID, ...props }, ref) => {
    const colorScheme = useAppColorScheme();
    const colorStyles = useMemo(() => {
      const createColorStyle = (textColor: ColorValue, background: ColorValue, border?: ColorValue) => ({
        container: {
          ...styles.root,
          backgroundColor: background,
          borderColor: border || background,
        } as ViewStyle,
        text: textColor,
      });

      return {
        default: createColorStyle(colorScheme.accentText, colorScheme.accent, colorScheme.white),
        light: createColorStyle(colorScheme.text, colorScheme.white, colorScheme.lighterGrey),
        lightBorderless: createColorStyle(colorScheme.text, colorScheme.white),
        disabled: createColorStyle(colorScheme.lightGrey, colorScheme.background, colorScheme.lighterGrey),
      };
    }, [colorScheme]);

    const colorStyle = disabled ? colorStyles.disabled : colorStyles[type];

    const pressHandler = useCallback(() => {
      requestAnimationFrame(() => onPress?.());
    }, [onPress]);

    return (
      <TouchableHighlight
        ref={ref}
        testID={testID}
        onPress={pressHandler}
        hitSlop={hitSlop}
        underlayColor={colorScheme.accentTextSecondary}
        style={[colorStyle.container, style]}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        {...props}>
        <View
          // this marks the button state for detox
          testID={concatTestID(testID, disabled ? 'disabled' : 'enabled')}
          style={styles.itemsContainer}>
          {icon}
          <Typography bold={type === 'default'} color={colorStyle.text} align="center" {...textStyle}>
            {children}
          </Typography>
        </View>
      </TouchableHighlight>
    );
  },
);

Button.displayName = 'Button';
export default Button;
