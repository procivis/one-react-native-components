import { BlurView as RNBlurView, BlurViewProps as RNBlurViewProps } from '@react-native-community/blur';
import React, { FC, PropsWithChildren, useMemo } from 'react';
import { Platform, StyleProp, useColorScheme, View, ViewStyle } from 'react-native';

export type BlurViewProps = {
  blurStyle: 'soft' | 'strong';
  style: StyleProp<ViewStyle>;
  testID?: string;
};

const BlurView: FC<PropsWithChildren<BlurViewProps>> = ({ blurStyle, children, style, testID }) => {
  const darkMode = useColorScheme() === 'dark';

  const blurType: RNBlurViewProps['blurType'] = useMemo(() => {
    if (blurStyle === 'soft') {
      return darkMode ? 'thinMaterialDark' : 'thinMaterial';
    } else {
      return darkMode ? 'thickMaterialDark' : 'thickMaterial';
    }
  }, [blurStyle, darkMode]);

  if (Platform.OS === 'ios') {
    return (
      <RNBlurView blurAmount={50} blurType={blurType} style={style} testID={testID}>
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
    <View style={[{ backgroundColor }, style]} testID={testID}>
      {children}
    </View>
  );
};

export default BlurView;
