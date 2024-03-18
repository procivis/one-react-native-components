import React, { FC, forwardRef } from 'react';
import { Insets, StyleSheet, TouchableOpacityProps, View } from 'react-native';
import { Color, Rect, Svg } from 'react-native-svg';

import { TouchableOpacity, TouchableOpacityRef } from '../accessibility/accessibilityHistoryWrappers';
import { useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
import { useAppColorScheme } from '../theme';

interface SvgProps {
  color: Color;
}

const FilterIcon: FC<SvgProps> = ({ color }) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Rect x="5" y="6" width="14" height="1" fill={color} stroke={color} stroke-width="0.5" />
      <Rect x="7" y="11" width="10" height="1" fill={color} stroke={color} stroke-width="0.5" />
      <Rect x="10" y="16" width="4" height="1" fill={color} stroke={color} stroke-width="0.5" />
    </Svg>
  );
};

export type FilterButtonProps = TouchableOpacityProps & {
  enabled?: boolean;
};

const hitSlop: Insets = { top: 10, left: 10, bottom: 10, right: 10 };

const FilterButton = forwardRef<TouchableOpacityRef, FilterButtonProps>(({ enabled, style, ...props }, ref) => {
  const t = useAccessibilityTranslation();
  const colorScheme = useAppColorScheme();

  return (
    <TouchableOpacity
      accessibilityLabel={t('accessibility.icon.filter')}
      accessibilityRole="button"
      hitSlop={hitSlop}
      ref={ref}
      style={[styles.button, style]}
      {...props}>
      <View style={[styles.circle, enabled && { backgroundColor: colorScheme.accent, borderColor: colorScheme.white }]}>
        <FilterIcon color={enabled ? colorScheme.accentText : colorScheme.accent} />
      </View>
    </TouchableOpacity>
  );
});

FilterButton.displayName = 'FilterButton';
export default FilterButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  circle: {
    alignItems: 'center',
    borderColor: 'transparent',
    borderRadius: 23,
    borderWidth: 1,
    height: 46,
    justifyContent: 'center',
    width: 46,
  },
});
