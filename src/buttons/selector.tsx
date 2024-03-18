import React, { FunctionComponent, useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';

import { useAppColorScheme } from '../theme';

interface AttributeIconProps {
  error: boolean;
  locked: boolean;
}

const AttributeIcon: React.FunctionComponent<AttributeIconProps> = ({ error, locked }) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      {error ? (
        <Path
          d="M12.807 12.0012L16.6097 8.18723C16.6645 8.13574 16.6957 8.06384 16.6957 7.98859C16.6957 7.91334 16.6645 7.84144 16.6097 7.78994L16.2124 7.3813C16.0998 7.27882 15.9277 7.27882 15.8151 7.3813L12.0011 11.1953L8.18714 7.3813C8.07454 7.27882 7.90246 7.27882 7.78985 7.3813L7.38121 7.78994C7.27873 7.90255 7.27873 8.07463 7.38121 8.18723L11.1952 12.0012L7.38121 15.8152C7.27873 15.9278 7.27873 16.0999 7.38121 16.2125L7.78985 16.6098C7.84135 16.6646 7.91325 16.6957 7.9885 16.6957C8.06375 16.6957 8.13564 16.6646 8.18714 16.6098L12.0011 12.8071L15.8151 16.6098C15.8666 16.6646 15.9385 16.6957 16.0137 16.6957C16.089 16.6957 16.1609 16.6646 16.2124 16.6098L16.6097 16.2125C16.6645 16.161 16.6957 16.0891 16.6957 16.0138C16.6957 15.9386 16.6645 15.8667 16.6097 15.8152L12.807 12.0012Z"
          fill={colorScheme.alertText}
        />
      ) : (
        <Path
          d="M16.767 8.11a.432.432 0 0 0-.576 0l-6.013 5.941-3.109-3.149-.001-.001a.411.411 0 0 0-.576 0l-.375.364-.007.008a.432.432 0 0 0 0 .576l4.065 4.098 6.963-6.878.005-.005a.421.421 0 0 0 0-.568l-.368-.38-.008-.006Z"
          fill={locked ? colorScheme.text : colorScheme.accentText}
        />
      )}

      {locked ? (
        <G>
          <Path fill={colorScheme.textSecondary} d="M17 3h6v5h-6z" />
          <Rect x={18.5} y={0.5} width={3} height={5} rx={1.5} stroke={colorScheme.textSecondary} />
          <Circle cx={20} cy={5} r={1} fill={colorScheme.white} />
          <Path d="M20 5v1.5" stroke={colorScheme.white} strokeLinecap="round" strokeLinejoin="round" />
        </G>
      ) : undefined}
    </Svg>
  );
};

export enum SelectorStatus {
  Unselected = 'unselected',
  SelectedRadio = 'selectedRadio',
  SelectedCheck = 'selectedCheck',
  LockedSelected = 'lockedSelected',
  Disabled = 'disabled',
  LockedInvalid = 'lockedInvalid',
  Invalid = 'invalid',
}

interface SelectorProps {
  status: SelectorStatus;
  style?: StyleProp<ViewStyle>;
}

/**
 * Generic selector display
 *
 * Following the design: https://www.figma.com/file/S3WwgTMHuqxAsfu5zElCzq/App-Icon-Library-(Design)?node-id=9%3A9
 */
const Selector: FunctionComponent<SelectorProps> = ({ status, style }) => {
  const colorScheme = useAppColorScheme();

  const statusStyle = useMemo<StyleProp<ViewStyle>>(() => {
    switch (status) {
      case SelectorStatus.Unselected:
        return { backgroundColor: colorScheme.lighterGrey };
      case SelectorStatus.SelectedRadio:
        return [styles.selectedRadio, { backgroundColor: colorScheme.accentText, borderColor: colorScheme.accent }];
      case SelectorStatus.SelectedCheck:
        return { backgroundColor: colorScheme.accent };
      case SelectorStatus.Disabled:
        return [styles.disabled, { backgroundColor: colorScheme.background, borderColor: colorScheme.lighterGrey }];
      default:
        return undefined;
    }
  }, [colorScheme, status]);

  const checked = status === SelectorStatus.SelectedCheck || status === SelectorStatus.LockedSelected;
  const error = status === SelectorStatus.Invalid || status === SelectorStatus.LockedInvalid;

  return (
    <View style={[styles.wrapper, statusStyle, style]}>
      {checked || error ? (
        <AttributeIcon
          error={error}
          locked={status === SelectorStatus.LockedInvalid || status === SelectorStatus.LockedSelected}
        />
      ) : undefined}
    </View>
  );
};

const styles = StyleSheet.create({
  disabled: {
    borderWidth: 1,
  },
  selectedRadio: {
    borderWidth: 8,
  },
  wrapper: {
    alignItems: 'center',
    borderRadius: 12,
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
});

export default Selector;
