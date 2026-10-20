import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ColorValue,
  LayoutChangeEvent,
  StyleSheet,
  TouchableWithoutFeedbackProps,
  View,
} from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {
  TouchableOpacity,
  TouchableOpacityRef,
} from '../accessibility/accessibilityHistoryWrappers';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';

export interface HoldButtonProps
  extends Omit<
    TouchableWithoutFeedbackProps,
    | 'children'
    | 'onLayout'
    | 'onPress'
    | 'onLongPress'
    | 'onPressIn'
    | 'onPressOut'
  > {
  holdTimeoutSecs?: number;
  onFinished: () => void;
  subtitlePrefix: string;
  subtitleSuffix: string;
  title: string;
}

interface ContentProps {
  disabled?: boolean;
  height: number;
  holdTimeoutSecs: number;
  progress: SharedValue<number>;
  subtitlePrefix: string;
  subtitleSuffix: string;
  textColor: ColorValue;
  title: string;
  width: number;
}

const Content = ({
  title,
  subtitlePrefix,
  subtitleSuffix,
  width,
  height,
  textColor,
  progress,
  holdTimeoutSecs,
  disabled,
}: ContentProps) => {
  const nums = useMemo(
    () =>
      Array.from({ length: holdTimeoutSecs + 1 }).map(
        (_, index) => holdTimeoutSecs - index,
      ),
    [holdTimeoutSecs],
  );

  const [subtitleHeight, setSubtitleHeight] = useState<number>(0);
  const onSubtitleLayout = useCallback(({ nativeEvent }: LayoutChangeEvent) => {
    setSubtitleHeight(nativeEvent.layout.height);
  }, []);

  const translateY = useDerivedValue(
    () => progress.value * subtitleHeight * holdTimeoutSecs,
    [subtitleHeight, holdTimeoutSecs],
  );
  const movingUpStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateY: -translateY.value }],
    }),
    [translateY],
  );

  return (
    <View
      pointerEvents="none"
      style={[
        styles.contentWrapper,
        disabled && styles.contentDisabled,
        { height, width },
      ]}
    >
      <Typography color={textColor} numberOfLines={1}>
        {title}
      </Typography>

      <View style={[styles.subtitle, disabled && styles.subtitleDisabled]}>
        <Typography
          color={textColor}
          numberOfLines={1}
          onLayout={onSubtitleLayout}
          preset="s/line-height-capped"
        >
          {subtitlePrefix}
        </Typography>
        <View style={[styles.subtitleSecsWrapper, { height: subtitleHeight }]}>
          <Animated.View style={[styles.subtitleSecs, movingUpStyle]}>
            {nums.map((val) => (
              <Typography
                color={textColor}
                key={val}
                numberOfLines={1}
                preset="s/line-height-capped"
              >
                {val}
              </Typography>
            ))}
          </Animated.View>
        </View>
        <Typography
          color={textColor}
          numberOfLines={1}
          preset="s/line-height-capped"
        >
          {subtitleSuffix}
        </Typography>
      </View>
    </View>
  );
};

interface HoldButtonLayoutedProps extends Omit<HoldButtonProps, 'style'> {
  height: number;
  ref: React.ForwardedRef<TouchableOpacityRef>;
  width: number;
}

const HoldButtonLayouted = ({
  title,
  subtitlePrefix,
  subtitleSuffix,
  onFinished,
  holdTimeoutSecs = 3,
  width,
  height,
  disabled,
  ref,
  ...props
}: HoldButtonLayoutedProps) => {
  const colorScheme = useAppColorScheme();

  const [isFinished, setFinished] = useState(false);
  useEffect(() => {
    if (isFinished) {
      onFinished();
    }
  }, [isFinished, onFinished]);

  const progress = useSharedValue(0);

  const onLongPress = useCallback(() => {
    // Fix for detox bug https://github.com/wix/Detox/issues/4754
    if (isFinished || progress.value !== 0) {
      return;
    }
    setFinished(true);
  }, [progress, isFinished]);

  const onPressIn = useCallback(() => {
    const holdTimeout = holdTimeoutSecs * 1000;

    // start moving forward
    progress.value = withTiming(
      1,
      {
        duration: (1 - progress.value) * holdTimeout,
        easing: Easing.linear,
      },
      (finished) => {
        if (finished) {
          runOnJS(setFinished)(true);
        } else {
          // start moving back
          progress.value = withTiming(0, {
            duration: progress.value * holdTimeout,
            easing: Easing.linear,
          });
        }
      },
    );
  }, [holdTimeoutSecs, progress]);

  const onPressOut = useCallback(() => cancelAnimation(progress), [progress]);

  const translateX = useDerivedValue(() => progress.value * width, [width]);
  const movingRightStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: translateX.value }],
    }),
    [translateX],
  );
  const movingLeftStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: -translateX.value }],
    }),
    [translateX],
  );

  const contentProps = useMemo(
    () => ({
      height,
      holdTimeoutSecs,
      progress,
      subtitlePrefix,
      subtitleSuffix,
      title,
      width,
    }),
    [
      title,
      subtitlePrefix,
      subtitleSuffix,
      progress,
      holdTimeoutSecs,
      width,
      height,
    ],
  );

  return (
    <>
      <Content
        disabled={disabled}
        textColor={colorScheme.accent}
        {...contentProps}
      />
      {!disabled && (
        <Animated.View
          style={[
            styles.movingLayer,
            { backgroundColor: colorScheme.accent },
            movingRightStyle,
          ]}
        >
          <Animated.View style={movingLeftStyle}>
            <Content textColor={colorScheme.accentText} {...contentProps} />
          </Animated.View>
        </Animated.View>
      )}
      <View style={styles.pressableLayer}>
        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={1}
          disabled={isFinished || disabled}
          onLongPress={onLongPress}
          onPressIn={isFinished ? undefined : onPressIn}
          onPressOut={isFinished ? undefined : onPressOut}
          ref={ref}
          {...props}
        >
          <View style={{ height, width }} />
        </TouchableOpacity>
      </View>
    </>
  );
};

/**
 * Press and hold button component
 *
 * follows design: https://www.figma.com/design/cCmAyBQrQWCQZuDi85pJfe/Procivis-One-Wallet-Developments-2025?node-id=1-871
 */
const HoldButton = React.forwardRef<TouchableOpacityRef, HoldButtonProps>(
  ({ style, disabled, ...props }, ref) => {
    const colorScheme = useAppColorScheme();

    const [layout, setLayout] = useState<{ height: number; width: number }>();
    const onContainerLayout = useCallback(
      ({ nativeEvent }: LayoutChangeEvent) => {
        setLayout({
          height: nativeEvent.layout.height,
          width: nativeEvent.layout.width,
        });
      },
      [],
    );

    return (
      <View
        onLayout={onContainerLayout}
        style={[
          styles.container,
          disabled && styles.disabled,
          {
            backgroundColor: disabled
              ? colorScheme.white
              : colorScheme.background,
            borderColor: colorScheme.background,
          },
          style,
        ]}
      >
        {layout && (
          <HoldButtonLayouted
            disabled={disabled}
            ref={ref}
            {...props}
            {...layout}
          />
        )}
      </View>
    );
  },
);

HoldButton.displayName = 'HoldButton';

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 0,
    height: 68,
    overflow: 'hidden',
  },
  contentDisabled: {
    opacity: 0.4,
  },
  contentWrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  disabled: {
    borderWidth: 1,
  },
  movingLayer: {
    overflow: 'hidden',
    position: 'absolute',
  },
  pressableLayer: {
    position: 'absolute',
  },
  subtitle: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    opacity: 0.8,
  },
  subtitleDisabled: {
    opacity: 1,
  },
  subtitleSecs: {
    alignItems: 'center',
  },
  subtitleSecsWrapper: {
    overflow: 'hidden',
  },
});

export default HoldButton;
