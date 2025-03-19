import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';

/**
 * Prevent OS back navigation
 * * iOS: block back swipe gesture
 * * Android: block back button from system task bar
 * @param block Whether to prevent the default behavior (default: true)
 * @param onAndroidBack (Android only) Custom callback triggered when OS back button is pressed while blocked
 *   * return `false` to allow back navigation, return `true` to block back navigation
 */
export const useBlockOSBackNavigation = (block: boolean = true, onAndroidBack?: () => boolean) => {
  const navigation = useNavigation<NavigationProp<{}>>();
  const isFocused = useIsFocused();

  // iOS: block back swipe (via screen options)
  useEffect(() => {
    if (block) {
      navigation.setOptions({ gestureEnabled: false });
      return () => navigation.setOptions({ gestureEnabled: true });
    }
    return undefined;
  }, [block, navigation]);

  // Anroid: block system back button
  useEffect(() => {
    if (block && isFocused) {
      const handler = () => {
        return onAndroidBack?.() ?? true;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', handler);
      return () => {
        subscription.remove();
      };
    }
    return undefined;
  }, [block, isFocused, onAndroidBack]);
};
