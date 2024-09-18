import { useIsFocused } from '@react-navigation/core';
import LottieView, { AnimatedLottieViewProps } from 'lottie-react-native';
import React, { FunctionComponent, useEffect, useRef } from 'react';
import { View } from 'react-native';

import { useAppColorScheme } from '../theme';
import { activityIndicator } from './activity-indicator-animation';

const styles: any = {
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    alignSelf: 'center',
    width: 96,
    height: 96,
  },
};

interface ActivityIndicatorProps {
  testID?: string;
  animation?: AnimatedLottieViewProps['source'];
}

const ActivityIndicator: FunctionComponent<ActivityIndicatorProps> = ({ testID, animation }) => {
  const colorScheme = useAppColorScheme();
  const lottieView = useRef<LottieView | null>(null);
  const isFocused = useIsFocused();

  if (!animation) {
    animation = activityIndicator(colorScheme.accent);
  }

  useEffect(() => {
    if (isFocused) {
      lottieView.current?.play();
    } else {
      lottieView.current?.reset();
    }
  }, [isFocused]);

  return (
    <View testID={testID} style={styles.wrapper}>
      <LottieView
        ref={lottieView}
        loop={true}
        resizeMode="cover"
        source={animation}
        autoPlay={isFocused}
        style={styles.inner}
      />
    </View>
  );
};

export default ActivityIndicator;
