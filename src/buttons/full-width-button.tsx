import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, TouchableHighlightProps, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { TouchableHighlightRef } from '../accessibility/accessibilityHistoryWrappers';
import Button from './button';

const styles = StyleSheet.create({
  container: {
    borderRadius: 0,
    borderWidth: 0,
    left: 0,
    marginBottom: 0,
    marginTop: 0,
    paddingVertical: 0,
    right: 0,
    shadowRadius: 0,
  },
});

export type FullWidthButtonProps = TouchableHighlightProps & {
  /** overrides of the implicit style */
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  testID?: string;
  onPress?: () => void;
};

/**
 * Generic full-width bottom-screen button component
 * @see https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=391%3A9393&t=dwvoHA9gGaxRSQZN-4
 */
const FullWidthButton = React.forwardRef<TouchableHighlightRef, PropsWithChildren<FullWidthButtonProps>>(
  ({ style, ...props }, ref) => {
    const insets = useSafeAreaInsets();
    return (
      <Button
        ref={ref}
        style={[styles.container, { height: insets.bottom + 80, paddingBottom: insets.bottom }, style]}
        {...props}
      />
    );
  },
);
FullWidthButton.displayName = 'FullWidthButton';

export default FullWidthButton;
