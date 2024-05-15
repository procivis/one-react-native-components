import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Animated, Easing, LayoutChangeEvent, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

import BlurView from '../blur/blur-view';
import Typography from '../text/typography';
import { useAppColorScheme } from '../theme/color-scheme-context';
import { concatTestID } from '../utils';

export type NavigationHeaderProps = ViewProps & {
  animate?: boolean;
  blurred?: boolean;
  leftItem?: React.ComponentType<any> | React.ReactElement;
  modalHandleVisible?: boolean;
  rightItem?: React.ComponentType<any> | React.ReactElement;
  title?: string;
  titleColor?: string;
  titleVisible?: boolean;
};

const NavigationHeader: FC<NavigationHeaderProps> = ({
  animate = false,
  blurred = false,
  leftItem,
  modalHandleVisible,
  rightItem,
  style,
  testID,
  title,
  titleVisible = true,
  titleColor,
  ...props
}) => {
  const colorScheme = useAppColorScheme();
  const [titleOpacity] = useState(() => new Animated.Value(titleVisible ? 1 : 0));

  const [sideItemWidth, setSideItemWidth] = useState<number>();
  const onSideItemLayout = useCallback(
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => setSideItemWidth((prev) => Math.max(layout.width, prev ?? 0)),
    [],
  );

  const leftItemView: React.ReactElement | undefined = useMemo(() => {
    if (!leftItem) {
      return undefined;
    }
    if (React.isValidElement(leftItem)) {
      return leftItem;
    } else {
      const LeftItemComponent = leftItem as React.ComponentType<any>;
      return <LeftItemComponent />;
    }
  }, [leftItem]);

  useEffect(() => {
    if (animate) {
      Animated.timing(titleOpacity, {
        duration: 150,
        easing: Easing.ease,
        toValue: titleVisible ? 1 : 0,
        useNativeDriver: true,
      }).start();
    } else {
      titleOpacity.setValue(titleVisible ? 1 : 0);
    }
  }, [animate, titleOpacity, titleVisible]);

  const rightItemView: React.ReactElement | undefined = useMemo(() => {
    if (!rightItem) {
      return undefined;
    }
    if (React.isValidElement(rightItem)) {
      return rightItem;
    } else {
      const RightItemComponent = rightItem as React.ComponentType<any>;
      return <RightItemComponent />;
    }
  }, [rightItem]);

  const titleAnimatedStyle: Animated.WithAnimatedObject<ViewStyle> = {
    opacity: titleOpacity,
  };

  return (
    <View
      {...props}
      style={[styles.headerContainer, !blurred ? { backgroundColor: colorScheme.background } : undefined, style]}
      testID={testID}>
      {blurred && <BlurView blurAmount={20} blurStyle="header" style={styles.blur} />}
      {modalHandleVisible && <View style={[styles.modalHandle, { backgroundColor: colorScheme.grayDark }]} />}
      <View style={styles.header}>
        <View onLayout={onSideItemLayout} style={[styles.sideItem, { minWidth: sideItemWidth }]}>
          {leftItemView}
        </View>
        <Animated.View style={[styles.title, titleAnimatedStyle]}>
          <Typography
            color={titleColor ?? colorScheme.text}
            preset="m/heading"
            align="center"
            numberOfLines={1}
            testID={concatTestID(testID, 'title')}>
            {title}
          </Typography>
        </Animated.View>
        <View onLayout={onSideItemLayout} style={[styles.sideItem, styles.rightSideItem, { minWidth: sideItemWidth }]}>
          {rightItemView}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  blur: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 48,
    width: '100%',
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: 8,
  },
  modalHandle: {
    borderRadius: 2.5,
    height: 5,
    marginVertical: 5,
    width: 36,
  },
  rightSideItem: {
    alignItems: 'flex-end',
  },
  sideItem: {
    padding: 12,
  },
  title: {
    flex: 1,
  },
});

export default NavigationHeader;
