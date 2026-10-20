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
  All = 'All',
  Bluetooth = 'Bluetooth',
  Internet = 'Internet',
}

export type ConnectivityButtonProps = {
  available: boolean;
  disabled?: boolean;
  onPress?: () => void;
  status?: boolean;
  testID?: string;
  title?: string;
  transport: ConnectivityTransport;
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

  const backgroundColor =
    status === undefined ? colorScheme.grayDark : colorScheme.white;
  const opacity = disabled ? 0.7 : 1.0;
  const icons = (
    <View style={styles.icons}>
      {transport !== ConnectivityTransport.Bluetooth &&
        (available ? (
          <ConnectivityInternetOnIcon
            testID={concatTestID(testID, 'icon.on')}
          />
        ) : (
          <ConnectivityInternetOffIcon
            testID={concatTestID(testID, 'icon.off')}
          />
        ))}
      {transport !== ConnectivityTransport.Internet &&
        (available ? (
          <ConnectivityBluetoothOnIcon
            testID={concatTestID(testID, 'icon.on')}
          />
        ) : (
          <ConnectivityBluetoothOffIcon
            testID={concatTestID(testID, 'icon.off')}
          />
        ))}
    </View>
  );
  return (
    <TouchableHighlight onPress={onPress} style={styles.button} testID={testID}>
      <View style={[styles.container, { backgroundColor, opacity }]}>
        {icons}
        {title && (
          <Typography
            color={colorScheme.text}
            preset="s"
            testID={concatTestID(testID, 'title')}
          >
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
    borderWidth: 0,
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
