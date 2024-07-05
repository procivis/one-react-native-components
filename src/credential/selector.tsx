import React, { FC, useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { concatTestID } from '../../lib/module';
import { SelectorIcon } from '../icons/selector';
import { useAppColorScheme } from '../theme';
import { SelectorStatus } from './selector-status';

interface SelectorProps {
  status: SelectorStatus;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * Generic selector display
 *
 * Following the design: https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=433-28352&mode=design&t=91K8am4RSNRB8qgZ-0
 */
const Selector: FC<SelectorProps> = ({ status, style, testID }) => {
  const colorScheme = useAppColorScheme();

  const statusStyle = useMemo<StyleProp<ViewStyle>>(() => {
    switch (status) {
      case SelectorStatus.Empty:
        return [styles.bordered, { backgroundColor: colorScheme.white, borderColor: colorScheme.grayDark }];
      case SelectorStatus.SelectedRadio:
        return [styles.selectedRadio, { backgroundColor: colorScheme.white, borderColor: colorScheme.accent }];
      case SelectorStatus.SelectedCheckmark:
        return { backgroundColor: colorScheme.accent };
      case SelectorStatus.Disabled:
        return [styles.bordered, { backgroundColor: colorScheme.background, borderColor: colorScheme.grayDark }];
      default:
        return undefined;
    }
  }, [colorScheme, status]);

  const checked = status === SelectorStatus.SelectedCheckmark || status === SelectorStatus.Required;
  const rejected = status === SelectorStatus.Rejected;

  return (
    <View testID={testID} style={[styles.wrapper, statusStyle, style]}>
      {(checked || rejected) && <SelectorIcon testID={concatTestID(testID, 'status', status)} status={status} />}
    </View>
  );
};

const styles = StyleSheet.create({
  bordered: {
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
