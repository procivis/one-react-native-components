import React, { FC, ReactNode, useCallback } from 'react';
import { StyleSheet, TouchableOpacityProps, View } from 'react-native';

import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import { useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
import { CheckedIcon } from '../icons/selector';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';

export interface CheckboxProps extends TouchableOpacityProps {
  value: boolean;
  text: ReactNode;
  onValueChanged: (value: boolean) => void;
  disabled?: boolean;
}

export const Checkbox: FC<CheckboxProps> = ({ style, text, value, disabled, onValueChanged, ...props }) => {
  const t = useAccessibilityTranslation();
  const colorScheme = useAppColorScheme();

  const onPress = useCallback(() => onValueChanged(!value), [onValueChanged, value]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      accessibilityRole="checkbox"
      accessibilityState={{ disabled }}
      accessibilityValue={
        disabled ? undefined : { text: t(value ? 'accessibility.control.checked' : 'accessibility.control.unchecked') }
      }
      disabled={disabled}
      style={[styles.container, { backgroundColor: colorScheme.background }, style]}
      onPress={onPress}
      {...props}>
      {value ? (
        <CheckedIcon style={disabled && styles.disabled} />
      ) : (
        <View
          style={[
            styles.unchecked,
            {
              borderColor: colorScheme.grayDark,
              backgroundColor: disabled ? colorScheme.background : colorScheme.white,
            },
          ]}
        />
      )}
      <View style={[styles.text, disabled && styles.disabled]}>
        {typeof text === 'string' ? (
          <Typography preset="xs/line-height-small" color={colorScheme.text}>
            {text}
          </Typography>
        ) : (
          text
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 0,
    flexDirection: 'row',
    padding: 12,
  },
  disabled: {
    opacity: 0.4,
  },
  text: {
    flex: 1,
    marginLeft: 12,
  },
  unchecked: {
    borderRadius: 12,
    borderWidth: 1,
    height: 24,
    width: 24,
  },
});
