import React, { FunctionComponent, ReactElement, ReactNode, useState } from 'react';
import { Insets, StyleProp, StyleSheet, TouchableOpacityProps, ViewStyle } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import { useAccessibleAfterTransition } from '../accessibility';
import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import { useAppColorScheme } from '../theme';

export type RoundButtonProps = TouchableOpacityProps & {
  style?: StyleProp<ViewStyle>;
  type?: 'white' | 'default';
  icon?: FunctionComponent<SvgProps> | ReactNode;
  accessibilityLabel: string;
  onPress: () => void;
};

const hitSlop: Insets = { top: 10, left: 10, bottom: 10, right: 10 };

const RoundButton: FunctionComponent<RoundButtonProps> = ({
  style,
  icon,
  type = 'default',
  onPress,
  accessibilityLabel,
  ...props
}) => {
  const colorScheme = useAppColorScheme();
  const [pressed, setPressed] = useState(false);

  const colorStyle: ViewStyle = {
    backgroundColor: pressed ? colorScheme.lightGrey : type === 'default' ? colorScheme.background : colorScheme.white,
  };

  const accessible = useAccessibleAfterTransition();

  var iconElement: ReactElement | undefined;
  if (icon) {
    if (React.isValidElement(icon)) {
      iconElement = icon;
    } else {
      const Icon = icon as FunctionComponent<SvgProps>;
      iconElement = <Icon color={colorScheme.text} />;
    }
  }

  return (
    <TouchableOpacity
      style={[styles.button, colorStyle, style]}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      hitSlop={hitSlop}
      accessible={accessible}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      {...props}>
      {iconElement}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 12,
    height: 24,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 24,
  },
});

export default RoundButton;
