import React, { FunctionComponent } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
import { useAppColorScheme } from '../theme';

export interface PinsProps {
  enteredLength: number;
  maxLength: number;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export const Pins: FunctionComponent<PinsProps> = ({ enteredLength, maxLength, style, accessibilityLabel }) => {
  const t = useAccessibilityTranslation();
  const colorScheme = useAppColorScheme();
  return (
    <View
      style={[styles.pinsWrapper, style]}
      accessible={true}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="progressbar"
      accessibilityValue={{ text: t('accessibility.control.progress', { current: enteredLength, length: maxLength }) }}>
      {Array.from({ length: maxLength }).map((_, index) => (
        <View
          key={`pin${index}`}
          style={[
            styles.pin,
            {
              backgroundColor:
                enteredLength > index
                  ? enteredLength === index + 1
                    ? colorScheme.accent
                    : colorScheme.accentSecondary
                  : colorScheme.lighterGrey,
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
    height: 10,
    width: 10,
  },
  pinsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});
