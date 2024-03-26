import { BlurView as RNBlurView, BlurViewProps as RNBlurViewProps } from '@react-native-community/blur';
import React, { FC, PropsWithChildren, useMemo } from 'react';
import { Platform, StyleProp, useColorScheme, View, ViewStyle } from 'react-native';

export type BlurViewProps = {
  blurAmount?: number;
  blurStyle: 'soft' | 'strong';
  reversedColorScheme?: boolean;
  style: StyleProp<ViewStyle>;
  testID?: string;
};

const BlurView: FC<PropsWithChildren<BlurViewProps>> = ({
  blurAmount = 50,
  blurStyle,
  children,
  reversedColorScheme,
  style,
  testID,
}) => {
  const darkBlur = useColorScheme() === (reversedColorScheme ? 'light' : 'dark');

  const blurType: RNBlurViewProps['blurType'] = useMemo(() => {
    if (blurStyle === 'soft') {
      return darkBlur ? 'thinMaterialDark' : 'thinMaterial';
    } else {
      return darkBlur ? 'thickMaterialDark' : 'thickMaterial';
    }
  }, [blurStyle, darkBlur]);

  if (Platform.OS === 'ios') {
    return (
      <RNBlurView blurAmount={blurAmount} blurType={blurType} style={style} testID={testID}>
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
