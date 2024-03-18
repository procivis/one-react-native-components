import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { AccessibilityProps, Animated, StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

import { TouchableHighlight } from '../accessibility/accessibilityHistoryWrappers';
import { useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';

const SLOP_VALUE = 10;

const hitSlop = {
  top: SLOP_VALUE,
  bottom: SLOP_VALUE,
  left: SLOP_VALUE,
  right: SLOP_VALUE,
};

export interface HorizontalTabSwitchTab extends AccessibilityProps {
  key: React.Key;
  label: string;
  iconComponent: React.ComponentType<{
    selected: boolean;
  }>;
}

const TabButton: React.FunctionComponent<
  ViewProps &
    Omit<HorizontalTabSwitchTab, 'key'> & {
      selected: boolean;
      onPress: () => void;
      index: number;
      length: number;
    }
> = ({ selected, onPress, label, iconComponent: Icon, index, length, ...props }) => {
  const colorScheme = useAppColorScheme();
  const t = useAccessibilityTranslation();
  return (
    <TouchableHighlight
      onPress={onPress}
      hitSlop={hitSlop}
      underlayColor={colorScheme.lighterGrey}
      style={styles.button}
      accessibilityRole="tab"
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      accessibilityValue={{ text: t('accessibility.control.order', { current: index + 1, length }) }}
      {...props}>
      <View style={styles.buttonContent}>
        <View style={styles.iconWrapper}>
          <Icon selected={selected} />
        </View>
        <Typography color={selected ? colorScheme.text : colorScheme.textSecondary}>{label}</Typography>
      </View>
    </TouchableHighlight>
  );
};

const ARC_RADIUS = 16;
const PADDING = 2;

const Indicator: React.FunctionComponent<{
  left: number;
  width: number;
  height: number;
  totalWidth: number;
}> = ({ left, width, height, totalWidth }) => {
  const colorScheme = useAppColorScheme();
  const [l] = useState<Animated.Value>(() => new Animated.Value(left));
  const [w] = useState<Animated.Value>(() => new Animated.Value(width));
  useEffect(() => {
    Animated.timing(l, { toValue: left, duration: 200, useNativeDriver: true }).start();
    Animated.timing(w, { toValue: width, duration: 200, useNativeDriver: true }).start();
  }, [l, left, w, width]);

  const borderStyle = { height, borderColor: colorScheme.accent };
  const wrapperStyle = { height };
  const rightPartStyle = { width: totalWidth };

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.indicator,
        wrapperStyle,
        {
          transform: [{ translateX: l }],
        },
      ]}>
      <View style={[styles.indicatorLeft, wrapperStyle]}>
        <View style={[styles.indicatorCircle, borderStyle]} />
      </View>
      <View style={[styles.indicatorRight, rightPartStyle, wrapperStyle]}>
        <Animated.View
          style={[
            styles.indicatorCircle,
            rightPartStyle,
            borderStyle,
            {
              transform: [
                {
                  translateX: w.interpolate({
                    inputRange: [0, totalWidth],
                    outputRange: [-totalWidth - ARC_RADIUS, -ARC_RADIUS],
                    extrapolate: 'extend',
                  }),
                },
              ],
            },
          ]}
        />
      </View>
    </Animated.View>
  );
};

export interface HorizontalTabSwitchProps {
  values: HorizontalTabSwitchTab[];
  selectedKey: React.Key;
  onSelected: (key: React.Key, value: HorizontalTabSwitchTab, index: number) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Animated tab switch component
 * @see https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=22%3A1527&t=YzONI8GYQhQiMmLw-4
 */
const HorizontalTabSwitch: FunctionComponent<HorizontalTabSwitchProps> = ({
  style,
  values,
  selectedKey,
  onSelected,
}) => {
  const colorScheme = useAppColorScheme();
  const [height, setHeight] = useState<number>();
  const [sizes, setSizes] = useState<number[]>(() => Array.from({ length: values.length }));
  const onLayout = useCallback((index: number, width: number) => {
    setSizes((prev) => {
      const newSizes = [...prev];
      newSizes[index] = Math.max(1, width);
      return newSizes;
    });
  }, []);

  useEffect(() => {
    setSizes((prev) => {
      if (prev.length < values.length) {
        return [...prev].concat(Array.from({ length: values.length - prev.length }));
      }
      if (prev.length > values.length) {
        return prev.slice(0, values.length);
      }
      return prev;
    });
  }, [values.length]);

  const allSizesGathered = height && sizes.length && sizes.every(Boolean);
  const allSizesSum = sizes.reduce((aggr, curr) => aggr + curr, 0);
  const selectedIndex = useMemo(() => {
    const index = values.findIndex(({ key }) => key === selectedKey);
    return index === -1 ? 0 : index;
  }, [selectedKey, values]);

  return (
    <View
      style={[styles.container, { backgroundColor: colorScheme.white }, style]}
      onLayout={(event) => setHeight(event.nativeEvent.layout.height)}>
      {values.map((value, index) => (
        <TabButton
          {...value}
          onLayout={(event) => onLayout(index, event.nativeEvent.layout.width)}
          onPress={() => onSelected(value.key, value, index)}
          selected={index === selectedIndex}
          index={index}
          length={values.length}
        />
      ))}
      {allSizesGathered ? (
        <Indicator
          left={sizes.slice(0, selectedIndex).reduce((aggr, curr) => aggr + curr + PADDING, PADDING)}
          width={sizes[selectedIndex]}
          height={height - 2 * PADDING}
          totalWidth={allSizesSum}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: ARC_RADIUS,
    marginLeft: PADDING,
    paddingLeft: 8,
    paddingRight: 16,
    paddingVertical: 4,
  },
  buttonContent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    alignItems: 'center',
    borderRadius: 17,
    flexDirection: 'row',
    paddingRight: PADDING,
    paddingVertical: PADDING,
  },
  iconWrapper: {
    alignItems: 'center',
    height: 24,
    justifyContent: 'center',
    marginRight: 4,
    width: 24,
  },
  indicator: {
    flexDirection: 'row',
    position: 'absolute',
    top: PADDING,
  },
  indicatorCircle: {
    borderRadius: ARC_RADIUS,
    borderWidth: 2,
    width: 2 * ARC_RADIUS,
  },
  indicatorLeft: {
    overflow: 'hidden',
    width: ARC_RADIUS,
  },
  indicatorRight: {
    overflow: 'hidden',
  },
});

export default HorizontalTabSwitch;
