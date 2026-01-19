import React, { FC, ReactNode, useMemo } from 'react';
import { Insets, StyleProp, StyleSheet, TouchableOpacityProps, ViewStyle } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import { useAccessibleAfterTransition } from '../accessibility';
import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import { useAppColorScheme } from '../theme';

export type GhostButtonProps = TouchableOpacityProps & {
  accessibilityLabel: string;
  icon?: FC<SvgProps> | ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const hitSlop: Insets = { top: 10, left: 10, bottom: 10, right: 10 };

const GhostButton: FC<GhostButtonProps> = ({ accessibilityLabel, icon, onPress, style, ...props }) => {
  const colorScheme = useAppColorScheme();
  const accessible = useAccessibleAfterTransition();

  const iconElement = useMemo(() => {
    if (React.isValidElement(icon)) {
      return icon;
    }
    const Icon = icon as FC<SvgProps>;
    return <Icon color={colorScheme.text} />;
  }, [colorScheme.text, icon]);

  return (
    <TouchableOpacity
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessible={accessible}
      hitSlop={hitSlop}
      onPress={onPress}
      style={[styles.button, style]}
      {...props}>
      {iconElement}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 12,
    borderWidth: 0,
    height: 24,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 24,
  },
});

export default GhostButton;
