import React, { FunctionComponent, PropsWithChildren, useCallback, useState } from 'react';
import { Animated, LayoutChangeEvent, ScrollViewProps, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GradientBackground } from '../gradient';
import { Header, HeaderProps } from '../header';
import { useAppColorScheme } from '../theme';
import { concatTestID } from '../utils';
import ContrastingStatusBar from '../utils/contrasting-status-bar';

export type FeatureScreenProps = HeaderProps & {
  // prevent these props from the header component
  onLayout?: never;
  textColor?: never;

  /**
   * Style for the entire screen
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Style for the content area
   */
  contentStyle?: StyleProp<ViewStyle>;

  /**
   * Either a single color or a gradient background for the header
   * default: transparent
   */
  headerBackground?: string | readonly [string, string];

  headerTextColor?: HeaderProps['textColor'];

  /**
   * Override default props of the content scroll view
   */
  scrollViewProps?: Omit<ScrollViewProps, 'onScroll' | 'contentContainerStyle'>;
};

// iOS specific bouncing scroll area size
const SCROLL_OVERSHOOT = 300;

/**
 * Unified scrollable screen component with back-button
 *
 * Following the design: https://www.figma.com/file/lmgEMiodW9VjCHSFCsBKcC/Procivis-SSI%2B-%E2%80%93-App-(Base-File)?node-id=24%3A13490
 */
const FeatureScreen: FunctionComponent<PropsWithChildren<FeatureScreenProps>> = ({
  children,
  style,
  contentStyle,
  onBack,
  headerBackground,
  scrollViewProps = {},
  testID,
  headerTextColor,
  ...headerProps
}) => {
  const insets = useSafeAreaInsets();
  const colorScheme = useAppColorScheme();
  const bottomPadding = Math.max(insets.bottom, 24);

  const [layoutHeight, setLayoutHeight] = useState<number>();
  const layoutHandler = useCallback((event: LayoutChangeEvent) => {
    setLayoutHeight(event.nativeEvent.layout.height);
  }, []);

  const [headerHeight, setHeaderHeight] = useState<number>();
  const onHeaderLayout = useCallback((event: LayoutChangeEvent) => {
    setHeaderHeight(event.nativeEvent.layout.height);
  }, []);

  const [scrollY] = useState(() => new Animated.Value(0));

  return (
    <View
      testID={testID}
      onAccessibilityEscape={onBack}
      onLayout={layoutHandler}
      style={[styles.container, { paddingTop: insets.top, backgroundColor: colorScheme.white }, style]}>
      {headerBackground && headerHeight ? (
        <Animated.View
          style={{
            top: -insets.top,
            transform: [
              {
                scaleY: scrollY.interpolate({
                  inputRange: [0, headerHeight],
                  outputRange: [1, insets.top / (headerHeight + insets.top)],
                  extrapolate: 'clamp',
                }),
              },
              {
                translateY: scrollY.interpolate({
                  inputRange: [-1, 0],
                  outputRange: [1, 0],
                  extrapolateRight: 'clamp',
                }),
              },
            ],
          }}>
          <View
            style={[
              styles.topScrollOvershoot,
              {
                backgroundColor: typeof headerBackground === 'string' ? headerBackground : headerBackground[0],
              },
            ]}
          />
          {typeof headerBackground === 'string' ? (
            <>
              <ContrastingStatusBar backgroundColor={headerBackground} />
              <View
                style={[
                  styles.headerBackground,
                  { height: headerHeight + insets.top, backgroundColor: headerBackground },
                ]}
              />
            </>
          ) : (
            <>
              <ContrastingStatusBar backgroundColor={headerBackground[0]} />
              <GradientBackground height={headerHeight + insets.top} colors={headerBackground} />
            </>
          )}
        </Animated.View>
      ) : (
        <ContrastingStatusBar backgroundColor={StyleSheet.flatten(style)?.backgroundColor ?? colorScheme.white} />
      )}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        {...scrollViewProps}
        contentContainerStyle={{ minHeight: layoutHeight ? layoutHeight - insets.top : undefined }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}>
        <Header
          testID={concatTestID(testID, 'header')}
          {...headerProps}
          onBack={onBack}
          onLayout={onHeaderLayout}
          textColor={headerTextColor}
        />
        {layoutHeight ? (
          <View
            testID={concatTestID(testID, 'content')}
            style={[styles.contentWrapper, { paddingBottom: bottomPadding }, contentStyle]}>
            {children}
          </View>
        ) : null}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerBackground: {
    position: 'absolute',
    width: '100%',
  },
  topScrollOvershoot: {
    height: SCROLL_OVERSHOOT,
    position: 'absolute',
    top: -SCROLL_OVERSHOOT,
    width: '100%',
  },
});

export default FeatureScreen;
