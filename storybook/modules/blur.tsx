import React, { FunctionComponent, PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useAppColorScheme } from '../../lib/commonjs/theme/color-scheme-context';

export type BlurViewProps = {
  blurAmount: number;
  blurType?:
    | (
        | 'dark'
        | 'light'
        | 'xlight'
        | 'prominent'
        | 'regular'
        | 'extraDark'
        | 'chromeMaterial'
        | 'material'
        | 'thickMaterial'
        | 'thinMaterial'
        | 'ultraThinMaterial'
        | 'chromeMaterialDark'
        | 'materialDark'
        | 'thickMaterialDark'
        | 'thinMaterialDark'
        | 'ultraThinMaterialDark'
        | 'chromeMaterialLight'
        | 'materialLight'
        | 'thickMaterialLight'
        | 'thinMaterialLight'
        | 'ultraThinMaterialLight'
      )
    | undefined;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

/**
 * Replacement for `@react-native-community/blur` which is not available in web storybook.
 */
export const BlurView: FunctionComponent<PropsWithChildren<BlurViewProps>> = ({ children, style, testID }) => {
  const colorScheme = useAppColorScheme();
  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={[styles.background, { backgroundColor: colorScheme.white }]} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
    left: 0,
    opacity: 0.5,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  container: {
    overflow: 'hidden',
  },
});
