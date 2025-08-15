import React, { FC, ReactNode } from 'react';
import { Insets, StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

import { concatTestID } from '../../utils';
import { BackButton } from '../buttons';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';

export interface HeaderProps extends ViewProps {
  onBack?: () => void;
  rightButtons?: ReactNode[];
  style?: StyleProp<ViewStyle>;
  titleRowStyle?: StyleProp<ViewStyle>;
  title: ReactNode;
}

const backButtonHitSlop: Insets = { top: 12, bottom: 12, left: 20, right: 20 };

/**
 * Unified screen header
 *
 * Following the design: https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=425-18624
 * states (Default + Dashboard)
 */
const Header: FC<HeaderProps> = ({ onBack, rightButtons, style, titleRowStyle, testID, title, ...viewProps }) => {
  const colorScheme = useAppColorScheme();

  return (
    <View style={[styles.container, style]} testID={testID} {...viewProps}>
      {onBack && (
        <View style={styles.backButtonRow}>
          <BackButton hitSlop={backButtonHitSlop} onPress={onBack} testID={concatTestID(testID, 'back')} />
          <View />
          {rightButtons}
        </View>
      )}

      <View
        style={[
          styles.titleRow,
          onBack ? styles.titleRow2nd : styles.titleRowNoBackButton,
          (onBack || !rightButtons) && styles.titleRowNoRightButton,
          titleRowStyle,
        ]}>
        {typeof title === 'string' ? (
          <Typography
            accessibilityRole="header"
            color={colorScheme.text}
            preset="l"
            style={styles.title}
            testID={concatTestID(testID, 'title')}>
            {title}
          </Typography>
        ) : (
          <View style={styles.title}>{title}</View>
        )}

        {!onBack && rightButtons && <View style={styles.rightButtonWrapper}>{rightButtons}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 48,
    paddingHorizontal: 20,
    width: '100%',
  },
  container: {
    width: '100%',
  },
  rightButtonWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: '16',
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingTop: 2,
  },
  title: {
    flex: 1,
    paddingBottom: 8, // to compensate "l" font line-height difference
    paddingTop: 9,
  },
  titleRow: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 8,
    width: '100%',
  },
  titleRow2nd: {
    marginBottom: 12,
  },
  titleRowNoBackButton: {
    marginTop: 12,
  },
  titleRowNoRightButton: {
    paddingRight: 20,
  },
});

export default Header;
