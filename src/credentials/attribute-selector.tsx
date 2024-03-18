import React, { FunctionComponent, useCallback, useMemo } from 'react';
import {
  AccessibilityProps,
  AccessibilityState,
  Insets,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import Selector, { SelectorStatus } from '../buttons/selector';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';

export interface AttributeSelectorProps {
  label: string;
  labelAlert?: string;
  value: string | { alert: string } | { Component: React.ComponentType };
  valueAccessibilityLabel?: string;
  selectorStatusAccessibilityLabel?: string;
  accessibilityState?: AccessibilityState;
  status: SelectorStatus;
  onSelected?: (selected: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

const hitSlop: Insets = {
  left: 20,
  top: 20,
  bottom: 20,
};

/**
 * Sharing screen attribute selector
 *
 * Following the design: https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=8%3A13152
 */
const AttributeSelector: FunctionComponent<AttributeSelectorProps> = ({
  label,
  labelAlert,
  value,
  valueAccessibilityLabel,
  selectorStatusAccessibilityLabel,
  accessibilityState,
  status,
  onSelected,
  style,
}) => {
  const colorScheme = useAppColorScheme();

  const CustomValueComponent = useMemo(() => {
    const withCustomValueComponent = typeof value !== 'string' && 'Component' in value;
    if (withCustomValueComponent) return value.Component;
    return null;
  }, [value]);

  const valueDisplay = CustomValueComponent ? (
    <CustomValueComponent />
  ) : typeof value === 'string' ? (
    <Typography color={colorScheme.text} numberOfLines={1} ellipsizeMode="tail">
      {value}
    </Typography>
  ) : 'alert' in value ? (
    <Typography color={colorScheme.alertText} numberOfLines={1} ellipsizeMode="tail">
      {value.alert}
    </Typography>
  ) : null;
  const valueLabel = typeof value === 'string' ? value : 'alert' in value ? value.alert : '';

  const selectable =
    status === SelectorStatus.Unselected ||
    status === SelectorStatus.SelectedCheck ||
    status === SelectorStatus.SelectedRadio;

  const onPress = useCallback(
    () => selectable && onSelected?.(status === SelectorStatus.Unselected),
    [onSelected, status, selectable],
  );

  const accessibilityProps = Object.assign<AccessibilityProps, AccessibilityProps>(
    {
      accessibilityRole: 'checkbox',
      accessible: selectable,
      accessibilityState,
    },
    selectorStatusAccessibilityLabel
      ? {
          accessibilityValue: { text: selectorStatusAccessibilityLabel },
        }
      : {
          accessibilityState: accessibilityState ?? {
            checked: status === SelectorStatus.SelectedCheck,
            selected: status === SelectorStatus.SelectedRadio,
          },
        },
  );

  const isWholeTouchable = selectable && !CustomValueComponent;
  const TouchableWrapper: React.ComponentType<ViewProps> = (props) =>
    isWholeTouchable ? (
      // The whole component is pressable if there is not a custom value component (text only)
      <TouchableOpacity
        {...accessibilityProps}
        accessibilityLabel={`${label}: ${valueAccessibilityLabel ?? valueLabel}${labelAlert ? `, ${labelAlert}` : ''}`}
        onPress={onPress}
        {...props}
      />
    ) : (
      // otherwise it's split into two pressable areas (value and selector)
      <View {...props} />
    );

  return (
    <View style={[styles.wrapper, { borderColor: colorScheme.lighterGrey }, style]}>
      <TouchableWrapper style={styles.touchableWrapper}>
        <View style={styles.left}>
          <View style={styles.label}>
            <Typography size="sml" color={colorScheme.textSecondary} numberOfLines={1} ellipsizeMode="tail">
              {label}
            </Typography>
            {labelAlert ? (
              <Typography
                size="sml"
                style={styles.labelAlert}
                color={colorScheme.alertText}
                numberOfLines={1}
                ellipsizeMode="tail">
                {labelAlert}
              </Typography>
            ) : undefined}
          </View>
          <View
            accessible={Boolean(valueAccessibilityLabel)}
            accessibilityLabel={valueAccessibilityLabel}
            style={styles.value}>
            {valueDisplay}
          </View>
        </View>
        <TouchableOpacity
          {...accessibilityProps}
          accessibilityLabel={label}
          style={styles.checkbox}
          disabled={!selectable || isWholeTouchable}
          hitSlop={hitSlop}
          onPress={onPress}>
          <Selector status={status} />
        </TouchableOpacity>
      </TouchableWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    paddingLeft: 4,
  },
  label: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  labelAlert: {
    marginLeft: 4,
  },
  left: {
    flex: 1,
    paddingVertical: 12,
  },
  touchableWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  value: {
    minHeight: 24,
  },
  wrapper: {
    borderBottomWidth: 1,
  },
});

export default AttributeSelector;
