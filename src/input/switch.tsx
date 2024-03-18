import React, { forwardRef } from 'react';
import { Insets, Platform, StyleSheet, Switch as RNSwitch, SwitchProps as RNSwitchProps } from 'react-native';

import { useAppColorScheme } from '../theme';

export interface SwitchProps extends Omit<RNSwitchProps, 'value' | 'onChange' | 'onValueChange'> {
  value: boolean;
  onChange: (newValue: boolean) => void;
}

const hitSlop: Insets = { top: 10, bottom: 10, left: 10, right: 10 };

// https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=8%3A744&t=xeivYJN0RLNSObzn-4
// https://www.figma.com/file/tNPSTYXGCjaVCK9z8Yvy0e/Procivis-SSI%2B-%E2%80%93-App-(Base-File)-(Copy)?node-id=156%3A13826&t=sDAfSW7cmQKmaWNG-4
const Switch = forwardRef<RNSwitch, SwitchProps>(({ value, disabled, style, onChange, ...props }, ref) => {
  const colorScheme = useAppColorScheme();
  return (
    <RNSwitch
      ref={ref}
      value={value}
      disabled={disabled}
      hitSlop={hitSlop}
      style={[disabled && styles.disabled, style]}
      onValueChange={onChange}
      trackColor={Platform.select({
        default: { true: colorScheme.accentSecondary, false: colorScheme.lightGrey },
        ios: { true: colorScheme.accent, false: colorScheme.lightGrey },
      })}
      thumbColor={Platform.select({
        default: value ? colorScheme.accent : disabled ? colorScheme.lighterGrey : colorScheme.white,
        ios: value ? colorScheme.accentText : colorScheme.white,
      })}
      ios_backgroundColor={colorScheme.lightGrey}
      // @ts-ignore: web only prop
      activeThumbColor={colorScheme.accent}
      {...props}
    />
  );
});

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.38,
  },
});

Switch.displayName = 'Switch';

export default Switch;
