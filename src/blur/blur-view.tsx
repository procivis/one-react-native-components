import { BlurView as RNBlurView, BlurViewProps as RNBlurViewProps } from '@react-native-community/blur';
import React, { FC, PropsWithChildren, useMemo } from 'react';
import { Platform, StyleSheet, View, ViewProps } from 'react-native';

import { useAppColorScheme } from '../theme';

export interface BlurViewProps extends ViewProps {
  blurAmount?: number;
  darkMode?: boolean;
  blurStyle: 'soft' | 'strong' | 'header';
}

const BlurView: FC<PropsWithChildren<BlurViewProps>> = ({
  blurAmount = 50,
  blurStyle,
  darkMode,
  children,
  style,
  ...props
}) => {
  const themeDarkMode = useAppColorScheme().darkMode;
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

  if (Platform.OS === 'ios') {
    return (
      <View style={style} {...props}>
        <RNBlurView blurAmount={blurAmount} blurType={blurType} style={styles.blur} />
        {children}
      </View>
    );
  }

  const backgroundColors = {
    dark: 'rgba(16, 12, 12, 0.8)',
    light: 'rgba(255, 255, 255, 0.8)',
    thickMaterialLight: 'rgba(255, 255, 255, 0.95)',
    thickMaterialDark: 'rgba(16, 12, 12, 0.95)',
    thinMaterialLight: 'rgba(255, 255, 255, 0.8)',
    thinMaterialDark: 'rgba(16, 12, 12, 0.8)',
  };

  const backgroundColor = backgroundColors[blurType];

  return (
    <View style={[{ backgroundColor }, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  blur: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

export default BlurView;
