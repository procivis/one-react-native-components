import React, { FC } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
import { useAppColorScheme } from '../theme';

export interface PinsProps extends ViewProps {
  enteredLength: number;
  maxLength: number;
}

export const Pins: FC<PinsProps> = ({ enteredLength, maxLength, style, ...props }) => {
  const t = useAccessibilityTranslation();
  const colorScheme = useAppColorScheme();
  return (
    <View
      style={[styles.pinsWrapper, style]}
      accessible={true}
      accessibilityRole="progressbar"
      accessibilityValue={{ text: t('accessibility.control.progress', { current: enteredLength, length: maxLength }) }}
      {...props}>
      {Array.from({ length: maxLength }).map((_, index) => (
        <View
          key={`pin${index}`}
          style={[
            styles.pin,
            {
              backgroundColor: enteredLength > index ? colorScheme.black : colorScheme.background,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  pin: {
    borderRadius: 3,
    borderWidth: 0,
    height: 10,
    width: 10,
  },
  pinsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});
