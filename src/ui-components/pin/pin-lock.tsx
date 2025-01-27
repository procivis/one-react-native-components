import { useIsFocused } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { FC, useEffect, useRef } from 'react';
import { Modal, StatusBar, StyleSheet, View } from 'react-native';

import { Typography } from '../text';
import { useAppColorScheme } from '../theme';
import pinLockAnimation from './pin-lock-animation';

const styles = StyleSheet.create({
  icon: {
    height: 70,
    marginBottom: 20,
    width: 70,
  },
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export type PinLockModalLabels = {
  title: (attempts: number) => string;
  subtitle: (minutes: number, seconds: number) => string;
};

interface PinLockModalProps {
  attempts: number;
  labels: PinLockModalLabels;
  open: boolean;
  seconds: number;
}

const PinLockModal: FC<PinLockModalProps> = ({ attempts, labels, seconds, open }) => {
  const colorScheme = useAppColorScheme();
  const lottie = useRef<LottieView>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const currentLottie = lottie.current;
    if (!currentLottie) {
      return;
    }
    if (isFocused) {
      currentLottie.play();
    } else {
      currentLottie.pause();
    }
    return () => {
      currentLottie.reset();
    };
  }, [isFocused]);

  const content = (
    <LottieView
      autoPlay={true}
      loop={true}
      ref={lottie}
      resizeMode="cover"
      source={pinLockAnimation(colorScheme.accent)}
      style={styles.icon}
    />
  );

  return (
    <Modal animationType="slide" statusBarTranslucent={true} transparent={true} visible={open}>
      <View style={styles.overlay}>
        <StatusBar backgroundColor={'#00000000'} barStyle={'dark-content'} translucent={true} />
        {content}
        <Typography color={colorScheme.text} preset="m/heading">
          {labels.title(attempts)}
        </Typography>
        <Typography color={colorScheme.text}>{labels.subtitle(Math.floor(seconds / 60), seconds % 60)}</Typography>
      </View>
    </Modal>
  );
};

export default PinLockModal;
