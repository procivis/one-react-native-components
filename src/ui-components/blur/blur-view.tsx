import { BlurView as RNBlurView, BlurViewProps as RNBlurViewProps } from '@react-native-community/blur';
import React, { FC, PropsWithChildren, useMemo } from 'react';
import { ColorValue, Platform, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

import { colorWithAlphaComponent } from '../../utils/color';
import { useAppColorScheme } from '../theme';

export interface BlurViewProps extends ViewProps {
  blurAmount?: number;
  color?: ColorValue;
  darkMode?: boolean;
  blurStyle: 'soft' | 'strong' | 'header';
}

const BACKGROUND_COLOR = {
  light: 'rgba(255, 255, 255, 0.8)',
  dark: 'rgba(16, 12, 12, 0.8)',
  thickMaterialLight: 'rgba(255, 255, 255, 0.95)',
  thickMaterialDark: 'rgba(16, 12, 12, 0.95)',
  thinMaterialLight: 'rgba(255, 255, 255, 0.8)',
  thinMaterialDark: 'rgba(16, 12, 12, 0.8)',
};

const BlurView: FC<PropsWithChildren<BlurViewProps>> = ({
  blurAmount = 50,
  blurStyle,
  color,
  darkMode,
  children,
  style,
  ...props
}) => {
  const colorScheme = useAppColorScheme();
  const themeDarkMode = colorScheme.darkMode;
  const dark = darkMode ?? themeDarkMode;

  const blurType: RNBlurViewProps['blurType'] = useMemo(() => {
    if (blurStyle === 'header') {
      return dark ? 'dark' : 'light';
    } else if (blurStyle === 'soft') {
      return dark ? 'thinMaterialDark' : 'thinMaterialLight';
    } else {
      return dark ? 'thickMaterialDark' : 'thickMaterialLight';
    }
  }, [blurStyle, dark]);

  const backgroundStyle: ViewStyle | undefined = useMemo(() => {
    if (blurStyle === 'header' && color === colorScheme.background) {
      return { backgroundColor: '#00000005' };
    }
  }, [blurStyle, color, colorScheme.background]);

  if (Platform.OS === 'ios') {
    return (
      <View style={[styles.wrapper, backgroundStyle, style]} {...props}>
        <RNBlurView
          blurAmount={blurAmount}
          blurType={blurType}
          reducedTransparencyFallbackColor={color as string}
          style={StyleSheet.absoluteFill}
        />
        {children}
      </View>
    );
  }

  const backgroundColor = color ? colorWithAlphaComponent(color, 0.9) : BACKGROUND_COLOR[blurType];

  return (
    <View style={[{ backgroundColor }, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
  },
});

export default BlurView;
