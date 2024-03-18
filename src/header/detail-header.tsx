import React, { FunctionComponent, ReactNode } from 'react';
import { Insets, StyleSheet, useWindowDimensions, View, ViewProps, ViewStyle } from 'react-native';

import { BackButton, BackButtonIcon } from '../buttons';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';
import { concatTestID } from '../utils/testID';

const styles = StyleSheet.create({
  columnEnd: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 24,
  },
  columnMiddle: {
    flex: 10,
    paddingHorizontal: 12,
  },
  columnStart: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 12,
  },
  container: {
    borderBottomWidth: 1,
    justifyContent: 'center',
    minHeight: 56,
    paddingVertical: 8,
    width: '100%',
  },
  navigatorRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 6,
    width: '100%',
  },
  navigatorRowMultiline: {
    alignItems: 'flex-start',
  },
});

export interface DetailHeaderProps extends ViewProps {
  onBack: () => void;
  rightButton?: ReactNode;
  title: string;
  backIcon?: BackButtonIcon;
}

const backButtonHitSlop: Insets = { top: 8, bottom: 12, left: 24, right: 12 };

/**
 * Detail screen header
 * @see https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=9%3A1968
 */
const DetailHeader: FunctionComponent<DetailHeaderProps> = ({
  onBack,
  rightButton,
  title,
  backIcon,
  style,
  testID,
  ...viewProps
}) => {
  const colorScheme = useAppColorScheme();

  // Multi-line layout if fontScaling is set to more than 100%
  const { fontScale } = useWindowDimensions();
  const fontScalingEnabled = fontScale >= 1.001;

  const buttonsPaddingStyle: ViewStyle | undefined = fontScalingEnabled
    ? {
        paddingVertical: Math.ceil((fontScale - 1) * 10),
      }
    : undefined;

  const middle = (
    <View style={styles.columnMiddle}>
      <Typography
        testID={concatTestID(testID, 'title')}
        color={colorScheme.text}
        accessible={Boolean(title)}
        accessibilityRole="header"
        numberOfLines={fontScalingEnabled ? undefined : 1}
        ellipsizeMode="tail"
        align="center"
        bold={true}>
        {title}
      </Typography>
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: colorScheme.white, borderColor: colorScheme.lighterGrey }, style]}
      {...viewProps}>
      <View style={[styles.navigatorRow, fontScalingEnabled ? styles.navigatorRowMultiline : undefined]}>
        <View style={[styles.columnStart, buttonsPaddingStyle]}>
          <BackButton
            onPress={onBack}
            icon={backIcon}
            hitSlop={backButtonHitSlop}
            testID={concatTestID(testID, 'back')}
          />
        </View>
        {middle}
        <View style={[styles.columnEnd, buttonsPaddingStyle]}>{rightButton}</View>
      </View>
    </View>
  );
};

export default DetailHeader;
