import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { useAppColorScheme } from '../theme/color-scheme-context';
import HistoryListItem, { HistoryListItemProps } from './history-list-item';

// component used on the history section lists (Settings->History, CredentialDetail->History)
// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=1246-51813&mode=dev

export interface HistorySectionListItemProps extends HistoryListItemProps {
  first?: boolean;
}

const HistorySectionListItem: FC<HistorySectionListItemProps> = ({ first, last, ...props }) => {
  const colorScheme = useAppColorScheme();
  return (
    <View style={[styles.item, first && styles.first, last && styles.last, { backgroundColor: colorScheme.white }]}>
      <HistoryListItem last={last} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  first: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 8,
    paddingTop: 12,
  },
  item: {
    paddingHorizontal: 12,
  },
  last: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 12,
    paddingBottom: 12,
  },
});

export default HistorySectionListItem;
