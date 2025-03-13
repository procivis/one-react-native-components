import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { concatTestID } from '../../../utils';
import { Button } from '../../buttons';
import { NoCredentialsIcon } from '../../icons';
import { Typography } from '../../text';
import { useAppColorScheme } from '../../theme';

type WalletEmptyListProps = {
  onScanPress: () => void;
  scanButtonTitle: string;
  subtitle: string;
  testID: string;
  title: string;
};

const WalletEmptyList: FC<WalletEmptyListProps> = ({ onScanPress, scanButtonTitle, subtitle, testID, title }) => {
  const safeAreaInsets = useSafeAreaInsets();
  const colorScheme = useAppColorScheme();

  return (
    <View style={styles.empty}>
      <Typography
        align="center"
        color={colorScheme.text}
        preset="l/line-height-large"
        style={styles.emptyTitle}
        testID={concatTestID(testID, 'title')}>
        {title}
      </Typography>
      <Typography
        align="center"
        color={colorScheme.text}
        style={styles.emptySubtitle}
        testID={concatTestID(testID, 'subtitle')}>
        {subtitle}
      </Typography>
      <NoCredentialsIcon style={styles.emptyIcon} />
      <Button
        onPress={onScanPress}
        style={[styles.emptyButton, { bottom: Math.max(24, safeAreaInsets.bottom) }]}
        testID={concatTestID(testID, 'scanQrCode')}
        title={scanButtonTitle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 16,
    marginTop: 224,
  },
  emptyButton: {
    marginBottom: 16,
    position: 'absolute',
    width: '100%',
  },
  emptyIcon: {
    marginTop: -30,
  },
  emptySubtitle: {
    opacity: 0.7,
  },
  emptyTitle: {
    marginBottom: 8,
    opacity: 0.7,
  },
});

export default WalletEmptyList;
