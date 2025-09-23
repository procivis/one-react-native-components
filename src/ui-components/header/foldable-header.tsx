import React, { FunctionComponent, ReactElement, useCallback, useEffect, useState } from 'react';
import { Animated, LayoutChangeEvent, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BlurView from '../blur/blur-view';
import AnimatedSearchBar, { AnimatedSearchBarProps } from '../searchbar/animated-search-bar';
import { useAppColorScheme } from '../theme/color-scheme-context';

export type FoldableHeaderProps = {
  header: ReactElement;
  scrollOffset: Animated.Value;
  searchBar?: Omit<AnimatedSearchBarProps, 'collapsed'>;
  // if true, the header won't fold / fade out on scroll
  staticHeader?: boolean;
  withNotice?: boolean;
};

const FoldableSearchHeader: FunctionComponent<FoldableHeaderProps> = ({
  staticHeader = false,
  scrollOffset,
  searchBar,
  header,
  withNotice,
}) => {
  const safeAreaInsets = useSafeAreaInsets();
  const colorScheme = useAppColorScheme();
  const [collapsed, setCollapsed] = useState(header ? false : true);
  const [headerHeight, setHeaderHeight] = useState<number>();

  const containerPaddingStyle = {
    paddingTop: withNotice ? 15 : safeAreaInsets.top,
  };

  useEffect(() => {
    const id = scrollOffset.addListener(({ value }) => {
      if (!headerHeight) {
        return;
      }

      if (value > headerHeight) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    });
    return () => {
      scrollOffset.removeListener(id);
    };
  }, [scrollOffset, searchBar, headerHeight]);

  const playHeaderFoldAnimation = !staticHeader && headerHeight;

  const scrollHeaderAnimatedStyle: Animated.WithAnimatedObject<ViewStyle> | undefined = playHeaderFoldAnimation
    ? {
        paddingTop: scrollOffset.interpolate({
          extrapolate: 'clamp',
          inputRange: [0, headerHeight],
          outputRange: [headerHeight, 0]
        })
      }
    : undefined;

  const fadeHeaderOutAnimatedStyle: Animated.WithAnimatedObject<ViewStyle> | undefined = playHeaderFoldAnimation
    ? {
        opacity: scrollOffset.interpolate({
          extrapolate: 'clamp',
          inputRange: [0, headerHeight / 2],
          outputRange: [1, 0],
        }),
      }
    : undefined;

  const onHeaderLayout = useCallback(
    (event: LayoutChangeEvent) => {
      setHeaderHeight(event.nativeEvent.layout.height);
    },
    [setHeaderHeight],
  );

  return (
    <Animated.View
      style={[
        styles.headerContainer,
        containerPaddingStyle,
        withNotice ? styles.noticeBorderRadius : undefined,
      ]}>
      <View style={[styles.blurWrapper, StyleSheet.absoluteFill]}>
        <BlurView blurStyle={'header'} color={colorScheme.background} style={[
          StyleSheet.absoluteFill,
          withNotice ? styles.noticeBorderRadius : undefined,
        ]} />
      </View>
      <View>
        <Animated.View style={scrollHeaderAnimatedStyle}>
          {searchBar && <AnimatedSearchBar {...searchBar} collapsed={collapsed} />}
        </Animated.View>
        {header && (
          <Animated.View onLayout={onHeaderLayout} style={[styles.headerContainer, fadeHeaderOutAnimatedStyle]}>
            {header}
          </Animated.View>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  blurWrapper: {
    overflow: 'hidden',
  },
  headerContainer: {
    position: 'absolute',
    width: '100%',
  },
  noticeBorderRadius: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
});

export default FoldableSearchHeader;
