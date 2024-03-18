import LottieView from 'lottie-react-native';
import React, { FunctionComponent, useEffect, useRef } from 'react';
import { View } from 'react-native';

const styles: any = {
  outer: {
    justifySelf: 'center',
  },
  inner: {
    alignSelf: 'center',
    width: 160,
    height: 160,
  },
};

interface LoadingAnimationProps {
  testID?: string;
  animation: any;
  finished: boolean;
  onDone: () => void;
}

const LoadingAnimation: FunctionComponent<LoadingAnimationProps> = ({ testID, animation, finished, onDone }) => {
  const lottieView = useRef<LottieView | null>(null);

  useEffect(() => {
    lottieView.current?.play();
  }, [lottieView, animation]);

  return (
    <View testID={testID} style={styles.outer}>
      <LottieView
        ref={lottieView}
        loop={!finished}
        resizeMode="cover"
        source={animation}
        style={styles.inner}
        onAnimationFinish={onDone}
      />
    </View>
  );
};

export default LoadingAnimation;
