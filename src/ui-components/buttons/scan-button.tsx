import React from 'react';
import { Insets, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TouchableOpacity, TouchableOpacityRef } from '../accessibility/accessibilityHistoryWrappers';
import { useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
import BlurView from '../blur/blur-view';
import { IssueIcon, ScanIcon, SignIcon } from '../icons';
import { useAppColorScheme } from '../theme';

export type ScanButtonProps = {
  onSignPress?: () => void;
  onIssuePress?: () => void;
  onScanPress: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
};

const hitSlop: Insets = { top: 10, left: 10, bottom: 10, right: 10 };

const SCAN_WIDTH = 104;
const SCAN_HEIGHT = 80;
const SIDE_WIDTH = 94;
const SIDE_HEIGHT = 64;
const OVERLAP = 30;

const ScanButton = React.forwardRef<TouchableOpacityRef, ScanButtonProps>(
  ({ style, onSignPress, onIssuePress, onScanPress, testID }, ref) => {
    const t = useAccessibilityTranslation();
    const colorScheme = useAppColorScheme();
    const insets = useSafeAreaInsets();
    const showLeftButton = onSignPress !== undefined;
    const showRightButton = onIssuePress !== undefined;
    const leftButtonOpacity = showLeftButton ? 1 : 0;
    const rightButtonOpacity = showRightButton ? 1 : 0;

    const bottomOffset = Math.max(24, insets.bottom);

    return (
      <View style={[styles.wrapper, { bottom: bottomOffset }, style as object]}>
        <BlurView blurStyle="soft" style={styles.pillBlur} />

        <View
          pointerEvents={showLeftButton ? 'auto' : 'none'}
          style={[styles.sideButtonContainer, { opacity: leftButtonOpacity }]}>
          <TouchableOpacity
            accessibilityRole="button"
            hitSlop={hitSlop}
            testID={`${testID}.sign`}
            onPress={onSignPress}
            style={styles.sideButton}>
            <View style={[styles.sideInnerLeft, { backgroundColor: colorScheme.white }]}>
              <SignIcon color={colorScheme.black} />
              <Text style={[styles.sideLabel, { color: colorScheme.black }]}>Sign</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          accessibilityLabel={t('accessibility.icon.scan')}
          accessibilityRole="button"
          hitSlop={hitSlop}
          ref={ref}
          style={styles.scanButton}
          testID={`${testID}.scan`}
          onPress={onScanPress}>
          <BlurView blurStyle="soft" style={styles.scanBlurWrapper}>
            <View style={[styles.scanInner, { backgroundColor: colorScheme.accent }]}>
              <ScanIcon color={colorScheme.white} />
            </View>
          </BlurView>
        </TouchableOpacity>

        <View
          pointerEvents={showRightButton ? 'auto' : 'none'}
          style={[styles.sideButtonContainer, { opacity: rightButtonOpacity }]}>
          <TouchableOpacity
            accessibilityRole="button"
            testID={`${testID}.issue`}
            hitSlop={hitSlop}
            onPress={onIssuePress}
            style={styles.sideButton}>
            <View style={[styles.sideInnerRight, { backgroundColor: colorScheme.white }]}>
              <IssueIcon color={colorScheme.black} />
              <Text style={[styles.sideLabel, { color: colorScheme.black }]}>Issue</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

ScanButton.displayName = 'ScanButton';
export default ScanButton;

const styles = StyleSheet.create({
  pillBlur: {
    borderRadius: 32,
    bottom: 0,
    left: '50%',
    marginLeft: -(SIDE_WIDTH * 2 + SCAN_WIDTH - OVERLAP * 2) / 2,
    position: 'absolute',
    top: (SCAN_HEIGHT - SIDE_HEIGHT) / 2,
    width: SIDE_WIDTH * 2 + SCAN_WIDTH - OVERLAP * 2,
  },
  scanBlurWrapper: {
    borderRadius: 28,
    flex: 1,
    padding: 8,
  },
  scanButton: {
    borderRadius: 28,
    height: SCAN_HEIGHT,
    shadowColor: '#000000',
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    width: SCAN_WIDTH,
    zIndex: 1,
  },
  scanInner: {
    alignItems: 'center',
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
  },
  sideButton: {
    borderRadius: 24,
    flex: 1,
  },
  sideButtonContainer: {
    height: SIDE_HEIGHT,
    marginHorizontal: -OVERLAP / 2,
    width: SIDE_WIDTH,
    zIndex: 0,
  },
  sideInnerLeft: {
    alignItems: 'center',
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 0,
    flex: 1,
    justifyContent: 'center',
  },
  sideInnerRight: {
    alignItems: 'center',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 22,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 22,
    flex: 1,
    justifyContent: 'center',
  },
  sideLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 6,
  },
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    height: SCAN_HEIGHT,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
  },
});
