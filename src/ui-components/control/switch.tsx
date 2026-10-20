import React, { FC, forwardRef } from 'react';
import {
  Insets,
  Platform,
  StyleSheet,
  Switch as RNSwitch,
  SwitchInstance as RNSwitchInstance,
  SwitchProps as RNSwitchProps,
  View,
} from 'react-native';

import { useAppColorScheme } from '../theme';

export interface SwitchProps
  extends Omit<RNSwitchProps, 'value' | 'onChange' | 'onValueChange'> {
  onChange: (newValue: boolean) => void;
  value: boolean;
}

const hitSlop: Insets = { bottom: 10, left: 10, right: 10, top: 10 };

// https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=8%3A744&t=xeivYJN0RLNSObzn-4
// https://www.figma.com/file/tNPSTYXGCjaVCK9z8Yvy0e/Procivis-SSI%2B-%E2%80%93-App-(Base-File)-(Copy)?node-id=156%3A13826&t=sDAfSW7cmQKmaWNG-4
export const Switch: FC<SwitchProps> = forwardRef<
  RNSwitchInstance,
  SwitchProps
>(({ value, disabled, style, onChange, ...props }, ref) => {
  const colorScheme = useAppColorScheme();
  return (
    <View>
      <RNSwitch
        // @ts-ignore: web only prop
        activeThumbColor={colorScheme.accent}
        disabled={disabled}
        hitSlop={hitSlop}
        ios_backgroundColor={colorScheme.grayDark}
        onValueChange={onChange}
        ref={ref}
        style={[disabled && styles.disabled, style]}
        thumbColor={Platform.select({
          default: value
            ? colorScheme.accent
            : disabled
            ? colorScheme.background
            : colorScheme.white,
          ios: colorScheme.white,
        })}
        trackColor={Platform.select({
          default: { false: colorScheme.grayDark, true: colorScheme.grayDark },
          ios: { false: colorScheme.grayDark, true: colorScheme.accent },
        })}
        value={value}
        {...props}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.38,
  },
});

Switch.displayName = 'Switch';
