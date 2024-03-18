import React, { FunctionComponent, ReactNode } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import { useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';
import Selector, { SelectorStatus } from './selector';

export enum CheckboxAlignment {
  top = 'Top',
  centered = 'Centered',
}

export interface CheckboxProps {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  alignment?: CheckboxAlignment;
  text?: ReactNode;
  value: boolean;
  disabled?: boolean;
  onValueChanged: (value: boolean) => void;
}

const Checkbox: FunctionComponent<CheckboxProps> = ({
  testID,
  style,
  alignment = CheckboxAlignment.centered,
  text,
  value,
  disabled,
  onValueChanged,
}) => {
  const t = useAccessibilityTranslation();
  const colorScheme = useAppColorScheme();
  const alignmentStyle =
    alignment === CheckboxAlignment.top ? styles.containerTopAlignment : styles.containerCenterAlignment;

  return (
    <TouchableOpacity
      testID={testID}
      accessibilityRole="checkbox"
      accessibilityState={{ disabled }}
      accessibilityValue={
        disabled ? undefined : { text: t(value ? 'accessibility.control.checked' : 'accessibility.control.unchecked') }
      }
      disabled={disabled}
      style={[styles.container, alignmentStyle, style]}
      onPress={() => onValueChanged(!value)}>
      <Selector
        status={disabled ? SelectorStatus.Disabled : value ? SelectorStatus.SelectedCheck : SelectorStatus.Unselected}
      />
      {typeof text === 'string' ? (
        <Typography style={styles.text} color={disabled ? colorScheme.lightGrey : colorScheme.text}>
          {text}
        </Typography>
      ) : (
        text
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  containerCenterAlignment: {
    alignItems: 'center',
  },
  containerTopAlignment: {
    alignItems: 'flex-start',
  },
  text: {
    flex: 1,
    marginLeft: 8,
  },
});

export default Checkbox;
