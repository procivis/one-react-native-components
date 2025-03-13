import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Typography } from '../../text';
import { useAppColorScheme } from '../../theme';

type WalletEmptySearchResultProps = {
  subtitle: string;
  title: string;
};

const WalletEmptySearchResult: FC<WalletEmptySearchResultProps> = ({ subtitle, title }) => {
  const colorScheme = useAppColorScheme();

  return (
    <View style={styles.emptySearch}>
      <Typography align="center" color={colorScheme.text} preset="l/line-height-large" style={styles.emptyTitle}>
        {title}
      </Typography>
      <Typography align="center" color={colorScheme.text}>
        {subtitle}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  emptySearch: {
    alignItems: 'center',
    flex: 1,
    marginTop: 224,
  },
  emptyTitle: {
    marginBottom: 8,
    opacity: 0.7,
  },
});

export default WalletEmptySearchResult;
