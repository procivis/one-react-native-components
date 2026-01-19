import React, { FC } from 'react';
import { Insets, StyleSheet, TouchableOpacityProps } from 'react-native';

import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import { FilterIcon } from '../icons/icons';
import { useAppColorScheme } from '../theme/color-scheme-context';

export type FilterButtonProps = TouchableOpacityProps & {
  active: boolean;
};

const hitslop: Insets = { bottom: 10, left: 10, right: 10, top: 10 };

const FilterButton: FC<FilterButtonProps> = ({ active, style, ...props }) => {
  const colorScheme = useAppColorScheme();
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      hitSlop={hitslop}
      style={[styles.button, { backgroundColor: active ? colorScheme.accent : undefined }, style]}
      {...props}>
      <FilterIcon color={active ? colorScheme.white : colorScheme.accent} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 0,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
});

export default FilterButton;
