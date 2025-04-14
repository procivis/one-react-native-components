import { useCallback } from 'react';
import { Linking, Platform } from 'react-native';

export const useOpenSettings = () => {
  const openBleSettings = useCallback(() => {
    if (Platform.OS === 'ios') {
      Linking.openURL('App-prefs:root=Bluetooth').catch(() => {});
    } else {
      Linking.sendIntent('android.settings.BLUETOOTH_SETTINGS').catch(() => {});
    }
  }, []);

  const openMobileNetworkSettings = useCallback(() => {
    if (Platform.OS === 'ios') {
      Linking.openURL('App-prefs:root=MOBILE_DATA_SETTINGS_ID').catch(() => {});
    } else {
      Linking.sendIntent('android.settings.WIRELESS_SETTINGS').catch(() => {});
    }
  }, []);

  const openWiFiSettings = useCallback(() => {
    if (Platform.OS === 'ios') {
      Linking.openURL('App-prefs:root=WIFI').catch(() => {});
    } else {
      Linking.sendIntent('android.settings.WIFI_SETTINGS').catch(() => {});
    }
  }, []);
  
  const openAppPermissionSettings = useCallback(() => {
    Linking.openSettings();
  }, []);

  return {
    openAppPermissionSettings,
    openBleSettings,
    openMobileNetworkSettings,
    openWiFiSettings,
  };
};
