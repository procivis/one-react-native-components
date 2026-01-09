import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { concatTestID } from '../../utils/testID';
import Typography from '../text/typography';
import { useAppColorScheme } from '../theme/color-scheme-context';

// component used on the history section lists (Settings->History, CredentialDetailBindingDto->History)
// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=1246-51813&mode=dev

const HistorySectionHeaderView: FC<{
  day: string;
  testID?: string;
  year?: string;
}> = ({ day, year, testID }) => {
  const colorScheme = useAppColorScheme();

  return (
    <View style={styles.header}>
      <Typography accessibilityRole="header" color={colorScheme.text} preset="m" testID={concatTestID(testID, 'title')}>
        {day}
      </Typography>
      {year && (
        <Typography color={colorScheme.accent} preset="s/line-height-small" style={styles.year}>
          {year}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    paddingHorizontal: 4,
  },
  year: {
    opacity: 0.7,
  },
});

export default HistorySectionHeaderView;
