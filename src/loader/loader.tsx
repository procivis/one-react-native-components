import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { InteractionManager, StyleSheet, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { LoaderProgressSpinner, LoaderSuccess, LoaderWarning } from '../icons/loader';
import { concatTestID } from '../utils';

export enum LoaderViewState {
  InProgress = 'inProgress',
  Success = 'success',
  Warning = 'warning',
}

export type LoaderViewProps = {
  animate: boolean;
  state?: LoaderViewState;
  testID?: string;
};

const LoaderView: FC<LoaderViewProps> = ({ animate, state, testID }) => {
  const [initialDelayPassed, setInitialDelayPassed] = useState(false);
  const rotationIsAnimating = useRef(false);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(state === LoaderViewState.InProgress ? 0 : 1);

  const finished = state !== LoaderViewState.InProgress;
  const success = state === LoaderViewState.Success;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setInitialDelayPassed(true);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    return () => {
      cancelAnimation(rotation);
    };
  }, [rotation]);

  const startRotationAnimation = useCallback(() => {
    if (rotationIsAnimating.current) {
      return;
    }
    rotationIsAnimating.current = true;
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
    );
  }, [rotationIsAnimating, rotation]);

  const stopRotationAnimation = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      rotationIsAnimating.current = false;
      cancelAnimation(rotation);
      rotation.value = 0;
    });
  }, [rotationIsAnimating, rotation]);

  useEffect(() => {
    if (animate) {
      startRotationAnimation();
    } else {
      stopRotationAnimation();
    }
  }, [animate, startRotationAnimation, stopRotationAnimation]);

  useEffect(() => {
    if (!initialDelayPassed) {
      return;
    }
    const toValue = finished ? 1 : 0;
    if (opacity.value === toValue) {
      return;
    }
    if (animate) {
      if (!finished) {
        startRotationAnimation();
      }
      opacity.value = withTiming(
        toValue,
        {
          duration: 300,
          easing: Easing.ease,
        },
        () => {
          if (finished) {
            stopRotationAnimation();
          }
        },
      );
    } else {
      opacity.value = toValue;
      stopRotationAnimation();
    }
  }, [opacity, finished, initialDelayPassed, animate, stopRotationAnimation, startRotationAnimation]);

  const spinnerAnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: 1 - opacity.value,
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    }),
    [opacity, rotation],
  );

  const resultAnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: opacity.value,
    }),
    [opacity],
  );

  return (
    <View style={styles.loader} testID={concatTestID(testID, state)}>
      <Animated.View style={[styles.loaderElement, spinnerAnimatedStyle]}>
        <LoaderProgressSpinner />
      </Animated.View>
      <Animated.View style={[styles.loaderElement, resultAnimatedStyle]}>
        {success ? <LoaderSuccess /> : <LoaderWarning />}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    height: 64,
    width: 64,
  },
  loaderElement: {
    height: 64,
    left: 0,
    position: 'absolute',
    top: 0,
    width: 64,
  },
});

export default LoaderView;
