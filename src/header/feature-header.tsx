import React, { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import { Insets, StyleSheet, View, ViewProps } from 'react-native';

import { BackButton } from '../buttons';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';

export interface FeatureHeaderProps extends PropsWithChildren<ViewProps> {
  title: string | ReactNode;
  onBack: () => void;
  rightButton?: ReactNode;

  /**
   * Optional additional control on the bottom of the header
   */
  children?: ReactNode;
}

const backButtonHitSlop: Insets = { top: 8, bottom: 12, left: 24, right: 24 };

/**
 * Feature screen header
 *
 * Following the design: https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=9-1783&t=HqvTPGjK9LbFbzBW-4
 *
 * This component does not cover the [Browser]{@link https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=9-1784&t=iL6wEbuECmYIQZgI-4} case, for that one can use the `DetailHeader`
 */
const FeatureHeader: FunctionComponent<FeatureHeaderProps> = ({
  title,
  style,
  onBack,
  rightButton,
  children,
  ...viewProps
}) => {
  const colorScheme = useAppColorScheme();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme.accent },
        children ? undefined : styles.bareContainer,
        style,
      ]}
      {...viewProps}>
      <View style={styles.backButtonWrapper}>
        <BackButton type="white" onPress={onBack} hitSlop={backButtonHitSlop} />
        <View />
        {rightButton}
      </View>
      <View style={styles.titleWrapper}>
        {typeof title === 'string' ? (
          <Typography color={colorScheme.accentText} bold={true} size="h1" accessibilityRole="header">
            {title}
          </Typography>
        ) : (
          title
        )}
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 38,
    paddingHorizontal: 24,
    paddingTop: 8,
    width: '100%',
  },
  bareContainer: {
    paddingBottom: 12,
  },
  container: {
    width: '100%',
  },
  titleWrapper: {
    marginBottom: 12,
    marginTop: 6,
    paddingHorizontal: 24,
    width: '100%',
  },
});

export default FeatureHeader;
