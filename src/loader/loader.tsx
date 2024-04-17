import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, InteractionManager, StyleSheet, View, ViewStyle } from 'react-native';

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
  const [rotationAnimation, setRotationAnimation] = useState<Animated.CompositeAnimation>();
  const rotationIsAnimating = useRef(false);
  const [rotation] = useState(() => new Animated.Value(0));
  const [opacity] = useState(() => new Animated.Value(state === LoaderViewState.InProgress ? 0 : 1));

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
    if (!rotationAnimation) {
      return;
    }
    const animation = Animated.loop(
      Animated.timing(rotation, {
        duration: 1000,
        easing: Easing.linear,
        toValue: 1,
        useNativeDriver: false,
      }),
    );
    if (animate) {
      animation.start();
      rotationIsAnimating.current = true;
    }
    setRotationAnimation(animation);

    return () => {
      animation.stop();
    };
  }, [animate, rotation, rotationAnimation]);

  const handleRotationAnimation = useCallback(() => {
    if (finished || !animate) {
      InteractionManager.runAfterInteractions(() => {
        rotationIsAnimating.current = false;
        rotationAnimation?.stop();
      });
    } else if (!rotationIsAnimating.current) {
      rotationIsAnimating.current = true;
      rotationAnimation?.start();
    }
  }, [finished, animate, rotationAnimation]);

  useEffect(() => {
    handleRotationAnimation();
  }, [animate, handleRotationAnimation]);

  useEffect(() => {
    if (!initialDelayPassed) {
      return;
    }
    if (animate) {
      Animated.timing(opacity, {
        duration: 300,
        easing: Easing.ease,
        toValue: finished ? 1 : 0,
        useNativeDriver: false,
      }).start(() => {
        handleRotationAnimation();
      });
    } else {
      opacity.setValue(finished ? 1 : 0);
      handleRotationAnimation();
    }
  }, [opacity, finished, initialDelayPassed, animate, handleRotationAnimation]);

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
