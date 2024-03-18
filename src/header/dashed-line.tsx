import React, { useState } from 'react';
import { LayoutRectangle, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Color, Path } from 'react-native-svg';

import { useAppColorScheme } from '../theme';

interface Props {
  style?: StyleProp<ViewStyle>;
  color?: Color;
}

// dashed/dotted border not properly supported on iOS, workaround using SVG Path component
export const DashedLine: React.FunctionComponent<Props> = ({ style, color }) => {
  const colorScheme = useAppColorScheme();
  const [layout, setLayout] = useState<LayoutRectangle>();
  const width = Math.floor(layout?.width || 0);
  return (
    <View style={[styles.container, style]} onLayout={(e) => setLayout(e.nativeEvent.layout)}>
      {layout ? (
        <Svg width={width} height={1} viewBox={`0 0 ${width} 1`} fill="none">
          <Path
            d={`M0.5 0.5 H${width} Z`}
            stroke={color ?? colorScheme.lighterGrey}
            strokeWidth={1}
            strokeDasharray={[0, 3, 2]}
          />
        </Svg>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 1,
    width: '100%',
  },
});
