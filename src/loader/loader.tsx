import React, { FC, useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, View, ViewStyle } from 'react-native';

import { LoaderProgressSpinner, LoaderSuccess, LoaderWarning } from '../icons/loader';

export enum LoaderViewState {
  InProgress = 'inProgress',
  Success = 'success',
  Warning = 'warning',
}

export type LoaderViewProps = {
  state?: LoaderViewState;
};

const LoaderView: FC<LoaderViewProps> = ({ state }) => {
  const [initialDelayPassed, setInitialDelayPassed] = useState(false);
  const [rotation] = useState(() => new Animated.Value(0));
  const [opacity] = useState(() => new Animated.Value(0));

  const finished = state !== LoaderViewState.InProgress;
  const success = state === LoaderViewState.Success;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        duration: 1000,
        easing: Easing.linear,
        toValue: 1,
        useNativeDriver: true,
      }),
    ).start();

    const timetout = setTimeout(() => {
      setInitialDelayPassed(true);
    }, 1000);

    return () => {
      clearTimeout(timetout);
    };
  }, [rotation]);

  useEffect(() => {
    if (!initialDelayPassed) {
      return;
    }
    Animated.timing(opacity, {
      duration: 300,
      easing: Easing.ease,
      toValue: finished ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [opacity, finished, initialDelayPassed]);

  const spinnerAnimatedStyle: Animated.WithAnimatedObject<ViewStyle> = {
    opacity: opacity.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    }),
    transform: [
      {
        rotate: rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  const resultAnimatedStyle: Animated.WithAnimatedObject<ViewStyle> = {
    opacity: opacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  return (
    <View style={styles.loader}>
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
