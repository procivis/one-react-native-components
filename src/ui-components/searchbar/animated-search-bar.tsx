import React, { ReactNode, useEffect, useState } from 'react';
import { Animated, StyleSheet, ViewStyle } from 'react-native';

import SearchBar, { SearchBarProps } from './search-bar';

export type AnimatedSearchBarProps = {
  collapsed: boolean;
  rightButtons?: ReactNode[];
  rightButtonAlwaysVisible?: boolean;
  searchBarProps: SearchBarProps;
};

// Animated search bar, according to
// https://www.figma.com/design/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=1143-40433&m=dev

const AnimatedSearchBar = ({
  collapsed,
  rightButtonAlwaysVisible = false,
  searchBarProps,
  rightButtons = [],
}: AnimatedSearchBarProps) => {
  const [rightIconFadeAnimation] = useState(
    () => new Animated.Value(rightButtons && rightButtonAlwaysVisible ? 1.5 : 0),
  );
  const [searchPaddingAnimation] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.timing(searchPaddingAnimation, {
      duration: 250,
      toValue: collapsed ? 1 : 0,
      useNativeDriver: false,
    }).start();
  }, [collapsed, searchPaddingAnimation]);

  useEffect(() => {
    if (rightButtonAlwaysVisible) {
      return;
    }

    Animated.timing(rightIconFadeAnimation, {
      duration: 250,
      toValue: collapsed && rightButtons ? 1.5 : 0,
      useNativeDriver: false,
    }).start();
  }, [rightButtonAlwaysVisible, rightIconFadeAnimation, rightButtons, collapsed]);

  const searchBarContainerAnimatedStyle = {
    paddingHorizontal: searchPaddingAnimation.interpolate({
      extrapolate: 'clamp',
      inputRange: [0, 1],
      outputRange: [16, 20],
    }),
  };

  const optionsIconAnimatedStyle: Animated.WithAnimatedObject<ViewStyle> = {
    opacity: rightIconFadeAnimation.interpolate({
      extrapolate: 'clamp',
      inputRange: [1, 1.5],
      outputRange: [0, 1],
    }),
  };

  const searchBarAnimatedStyle = {
    width: rightIconFadeAnimation.interpolate({
      extrapolate: 'clamp',
      inputRange: [0, 1],
      outputRange: ['100%', `${100 - 12 * rightButtons.length}%`],
    }),
  };

  const { style: searchBarStyle, ...searchProps } = searchBarProps;
  return (
    <Animated.View style={[styles.searchBarContainer, searchBarContainerAnimatedStyle, searchBarStyle]}>
      <Animated.View style={searchBarAnimatedStyle}>
        <SearchBar {...searchProps} />
      </Animated.View>
      {rightButtons && (
        <Animated.View style={[styles.rightButtonWrapper, optionsIconAnimatedStyle]}>{rightButtons}</Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  rightButtonWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: '16',
    justifyContent: 'center',
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
});

export default AnimatedSearchBar;
