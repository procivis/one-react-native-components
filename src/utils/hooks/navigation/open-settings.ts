import { useCallback } from 'react';
import { Linking, Platform } from 'react-native';
import { openSettings } from 'react-native-bluetooth-state-manager';

export const useOpenSettings = () => {
  const openBleSettings = useCallback(() => {
    if (Platform.OS === 'ios') {
      Linking.openURL('App-prefs:root=Bluetooth');
    } else {
      Linking.sendIntent('android.settings.BLUETOOTH_SETTINGS');
    }
  }, []);

  const openMobileNetworkSettings = useCallback(() => {
    if (Platform.OS === 'ios') {
      Linking.openURL('App-prefs:root=MOBILE_DATA_SETTINGS_ID');
    } else {
      Linking.sendIntent('android.settings.WIRELESS_SETTINGS');
    }
  }, []);

  const openWiFiSettings = useCallback(() => {
    if (Platform.OS === 'ios') {
      Linking.openURL('App-prefs:root=WIFI');
    } else {
      Linking.sendIntent('android.settings.WIFI_SETTINGS');
    }
  }, []);

  const openAppPermissionSettings = useCallback(() => {
    openSettings();
  }, []);

  return {
    openAppPermissionSettings,
    openBleSettings,
    openMobileNetworkSettings,
    openWiFiSettings,
  };
};
