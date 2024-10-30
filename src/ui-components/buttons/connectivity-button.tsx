import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { concatTestID } from '../../utils';
import { TouchableHighlight } from '../accessibility';
import {
  ConnectivityBluetoothOffIcon,
  ConnectivityBluetoothOnIcon,
  ConnectivityInternetOffIcon,
  ConnectivityInternetOnIcon,
  ConnectivityStatusIcon,
} from '../icons/connectivity';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';

export enum ConnectivityTransport {
  Internet = 'Internet',
  Bluetooth = 'Bluetooth',
  All = 'All',
}

export type ConnectivityButtonProps = {
  available: boolean;
  disabled?: boolean;
  onPress?: () => void;
  status?: boolean;
  title?: string;
  transport: ConnectivityTransport;
  testID?: string;
};

const ConnectivityButton: FC<ConnectivityButtonProps> = ({
  available,
  disabled,
  onPress,
  status,
  title,
  transport,
  testID,
}) => {
  const colorScheme = useAppColorScheme();

  const backgroundColor = status === undefined ? colorScheme.grayDark : colorScheme.white;
  const opacity = disabled ? 0.7 : 1.0;
  const icons = (
    <View style={styles.icons}>
      {transport !== ConnectivityTransport.Bluetooth &&
        (available ? (
          <ConnectivityInternetOnIcon testID={concatTestID(testID, 'icon.on')} />
        ) : (
          <ConnectivityInternetOffIcon testID={concatTestID(testID, 'icon.off')} />
        ))}
      {transport !== ConnectivityTransport.Internet &&
        (available ? (
          <ConnectivityBluetoothOnIcon testID={concatTestID(testID, 'icon.on')} />
        ) : (
          <ConnectivityBluetoothOffIcon testID={concatTestID(testID, 'icon.off')} />
        ))}
    </View>
  );
  return (
    <TouchableHighlight onPress={onPress} style={styles.button}>
      <View style={[styles.container, { backgroundColor, opacity }]}>
        {icons}
        {title && (
          <Typography testID={concatTestID(testID, 'title')} color={colorScheme.text} preset="s">
            {title}
          </Typography>
        )}
        {status !== undefined && <ConnectivityStatusIcon status={status} />}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  icons: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
});

export default ConnectivityButton;
