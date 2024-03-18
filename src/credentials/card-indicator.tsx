import React, { FunctionComponent } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Path, SvgProps } from 'react-native-svg';

import { useAppColorScheme } from '../theme';

const IndicatorIcon: FunctionComponent<SvgProps> = ({ color, ...props }) => (
  <Svg width={13} height={9} viewBox="0 0 13 9" fill="none" {...props}>
    <Path d="M12.1569 1.65687L6.5 7.31372L0.843145 1.65687" stroke={color} strokeWidth={2} />
  </Svg>
);
interface CardIndicatorProps {
  style?: StyleProp<ViewStyle>;
}

const CardIndicator: FunctionComponent<CardIndicatorProps> = ({ style }) => {
  const colorScheme = useAppColorScheme();
  const indicatorColorStyle: ViewStyle = {
    backgroundColor: colorScheme.accent,
    borderColor: colorScheme.glow,
  };

  return (
    <View style={[styles.indicator, indicatorColorStyle, style]}>
      <IndicatorIcon color={colorScheme.accentText} />
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    height: 36,
    justifyContent: 'center',
    width: 37,
  },
});

export default CardIndicator;
