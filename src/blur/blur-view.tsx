import { BlurView as RNBlurView, BlurViewProps as RNBlurViewProps } from '@react-native-community/blur';
import React, { FC, PropsWithChildren, useMemo } from 'react';
import { Platform, View, ViewProps } from 'react-native';

import { useAppColorScheme } from '../theme';

export interface BlurViewProps extends ViewProps {
  blurAmount?: number;
  blurStyle: 'soft' | 'strong';
}

const BlurView: FC<PropsWithChildren<BlurViewProps>> = ({ blurAmount = 50, blurStyle, children, style, ...props }) => {
  const { darkMode } = useAppColorScheme();

  const blurType: RNBlurViewProps['blurType'] = useMemo(() => {
    if (blurStyle === 'soft') {
      return darkMode ? 'thinMaterialDark' : 'thinMaterial';
    } else {
      return darkMode ? 'thickMaterialDark' : 'thickMaterial';
    }
  }, [blurStyle, darkMode]);

  if (Platform.OS === 'ios') {
    return (
      <RNBlurView blurAmount={blurAmount} blurType={blurType} style={style} {...props}>
        {children}
      </RNBlurView>
    );
  }

  const backgroundColors = {
    thickMaterial: 'rgba(255, 255, 255, 0.95)',
    thickMaterialDark: 'rgba(16, 12, 12, 0.95)',
    thinMaterial: 'rgba(255, 255, 255, 0.8)',
    thinMaterialDark: 'rgba(16, 12, 12, 0.8)',
  };

  const backgroundColor = backgroundColors[blurType];

  return (
    <View style={[{ backgroundColor }, style]} {...props}>
      {children}
    </View>
  );
};

export default BlurView;
