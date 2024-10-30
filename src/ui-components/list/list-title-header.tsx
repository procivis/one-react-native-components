import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

import Typography from '../text/typography';
import { useAppColorScheme } from '../theme/color-scheme-context';

export type ListTitleHeaderProps = {
  title: string;
  testID?: string;
};

const ListTitleHeader: FC<ListTitleHeaderProps> = ({ title, testID }) => {
  const colorScheme = useAppColorScheme();

  return (
    <Typography testID={testID} accessibilityRole="header" color={colorScheme.text} preset="l" style={styles.listTitle}>
      {title}
    </Typography>
  );
};

const styles = StyleSheet.create({
  listTitle: {
    marginBottom: 20,
    marginHorizontal: 20,
    marginTop: 9,
  },
});

export default ListTitleHeader;
