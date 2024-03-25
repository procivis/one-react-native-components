import { BlurView, BlurViewProps } from '@react-native-community/blur';
import React from 'react';
import { Insets, Platform, StyleSheet, TouchableOpacityProps, useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TouchableOpacity, TouchableOpacityRef } from '../accessibility/accessibilityHistoryWrappers';
import { useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
import { ScanIcon } from '../icons';
import { useAppColorScheme } from '../theme';

export type ScanButtonProps = TouchableOpacityProps;

const hitSlop: Insets = { top: 10, left: 10, bottom: 10, right: 10 };

const ScanButton = React.forwardRef<TouchableOpacityRef, ScanButtonProps>(({ style, ...props }, ref) => {
  const t = useAccessibilityTranslation();
  const darkMode = useColorScheme() === 'dark';
  const colorScheme = useAppColorScheme();
  const insets = useSafeAreaInsets();

  let blurType: BlurViewProps['blurType'];
  if (Platform.OS === 'ios') {
    blurType = darkMode ? 'thinMaterialDark' : 'thinMaterial';
  } else {
    blurType = darkMode ? 'dark' : 'light';
  }

  return (
    <TouchableOpacity
      accessibilityLabel={t('accessibility.icon.scan')}
      accessibilityRole="button"
      hitSlop={hitSlop}
      ref={ref}
      style={[styles.button, { bottom: Math.max(24, insets.bottom) }, style]}
      {...props}>
      <BlurView blurType={blurType} reducedTransparencyFallbackColor={colorScheme.white} style={styles.blurWrapper}>
        <View style={[styles.iconWrapper, { backgroundColor: colorScheme.accent }]}>
          <ScanIcon color={colorScheme.white} />
        </View>
      </BlurView>
    </TouchableOpacity>
  );
});

ScanButton.displayName = 'ScanButton';
export default ScanButton;

const styles = StyleSheet.create({
  blurWrapper: {
    borderRadius: 28,
    height: 80,
    padding: 8,
    width: 104,
  },
  button: {
    borderRadius: 28,
    height: 80,
    left: '50%',
    marginLeft: -52,
    position: 'absolute',
    shadowColor: '#000000',
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    width: 104,
  },
  iconWrapper: {
    alignItems: 'center',
    borderRadius: 20,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
});
