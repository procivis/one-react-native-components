import React, { useCallback, useMemo, useState } from 'react';
import { GestureResponderEvent, Insets, StyleSheet, TouchableOpacityProps, View } from 'react-native';

import { TouchableOpacity, TouchableOpacityRef } from '../accessibility/accessibilityHistoryWrappers';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';
import { concatTestID } from '../utils';

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  SmallTech = 'small-tech',
}

export interface ButtonProps extends TouchableOpacityProps {
  type?: ButtonType;
  title: string;
  subtitle?: string;
  disabled?: boolean;
}

const SLOP_VALUE = 10;
const hitSlop: Insets = {
  top: SLOP_VALUE,
  bottom: SLOP_VALUE,
  left: SLOP_VALUE,
  right: SLOP_VALUE,
};

const ACTIVE_OPACITY: Record<ButtonType, number> = {
  [ButtonType.Primary]: 0.8,
  [ButtonType.Secondary]: 1,
  [ButtonType.SmallTech]: 0.5,
};

/**
 * Common button component
 *
 * follows design: https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=419-18389
 *
 * for bordered style just override `borderColor` in style
 */
export const Button = React.forwardRef<TouchableOpacityRef, ButtonProps>(
  ({ style, type = ButtonType.Primary, disabled, title, subtitle, onPressIn, onPressOut, testID, ...props }, ref) => {
    const colorScheme = useAppColorScheme();
    const [secondaryPressed, setSecondaryPressed] = useState(false);

    const textColor = useMemo(() => {
      switch (type) {
        case ButtonType.Primary:
          return colorScheme.accentText;
        case ButtonType.Secondary:
          return colorScheme.text;
        case ButtonType.SmallTech:
          return colorScheme.codeAccent;
      }
    }, [type, colorScheme]);

    const bgColor = useMemo(() => {
      switch (type) {
        case ButtonType.Primary:
          return colorScheme.accent;
        case ButtonType.Secondary:
          return secondaryPressed ? colorScheme.background : colorScheme.white;
        case ButtonType.SmallTech:
          return 'rgba(255, 255, 255, 0.05)';
      }
    }, [type, colorScheme, secondaryPressed]);

    const secondaryPressIn = useCallback(
      (event: GestureResponderEvent) => {
        setSecondaryPressed(true);
        onPressIn?.(event);
      },
      [onPressIn],
    );

    const secondaryPressOut = useCallback(
      (event: GestureResponderEvent) => {
        setSecondaryPressed(false);
        onPressOut?.(event);
      },
      [onPressOut],
    );

    return (
      <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={ACTIVE_OPACITY[type]}
        hitSlop={hitSlop}
        ref={ref}
        style={[
          styles.button,
          subtitle ? styles.withSubtitle : undefined,
          { backgroundColor: bgColor, borderColor: bgColor },
          type === ButtonType.SmallTech && styles.techSmall,
          style,
        ]}
        disabled={disabled}
        onPressIn={type === ButtonType.Secondary ? secondaryPressIn : onPressIn}
        onPressOut={type === ButtonType.Secondary ? secondaryPressOut : onPressOut}
        testID={testID}
        {...props}>
        <View
          style={[secondaryPressed && styles.secondaryPressedLabel, disabled && styles.disabled]}
          testID={concatTestID(testID, disabled ? 'disabled' : 'enabled')}>
          <Typography
            preset={type === ButtonType.SmallTech ? 's' : 'regular'}
            color={textColor}
            align="center"
            numberOfLines={1}>
            {title}
          </Typography>
          {subtitle ? (
            <Typography
              preset="s/line-height-capped"
              style={styles.subtitle}
              color={textColor}
              align="center"
              numberOfLines={1}>
              {subtitle}
            </Typography>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  },
);

Button.displayName = 'Button';

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  disabled: {
    opacity: 0.4,
  },
  secondaryPressedLabel: {
    opacity: 0.5,
  },
  subtitle: {
    opacity: 0.8,
    paddingTop: 6,
  },
  techSmall: {
    borderRadius: 4,
    paddingVertical: 12,
  },
  withSubtitle: {
    paddingBottom: 16,
    paddingTop: 12,
  },
});
