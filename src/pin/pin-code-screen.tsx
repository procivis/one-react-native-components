import React, { forwardRef, Ref, useImperativeHandle, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { TouchableOpacityRef } from '../accessibility';
import { BackButton } from '../buttons';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';
import { concatTestID } from '../utils';
import ContrastingStatusBar from '../utils/contrasting-status-bar';
import { Biometry, Keypad } from './keypad';
import { Pins } from './pins';

export type PinCodeScreenProps = {
  title: string;

  testID?: string;
  length: number;
  enteredLength: number;
  onBack?: () => void;
  error?: string;

  keypadRef?: Ref<TouchableOpacityRef>;
  onPressDigit: (digit: number) => void;
  onPressDelete: () => void;
  onDeleteAll: () => void;

  biometry?: Biometry | null;
  onBiometricPress?: () => void;
} & (
  | {
      instruction: string;
      onAccessibilityAnnounced?: (finished: boolean) => void;
    }
  | {
      instruction?: undefined;
      onAccessibilityAnnounced?: undefined;
    }
);

export interface PinCodeScreenActions {
  shakeKeypad: (params?: { amount?: number; duration?: number }) => Promise<{ finished: boolean }>;
}
const SHAKE_ITERATIONS = 4;
const animationConfig = {
  useNativeDriver: true,
  easing: Easing.linear,
};

export const PinCodeScreen = forwardRef<PinCodeScreenActions, PinCodeScreenProps>(
  (
    {
      testID,
      length,
      instruction,
      title,
      onBack,
      enteredLength,
      error,
      onPressDigit,
      onPressDelete,
      biometry,
      onBiometricPress,
      keypadRef,
      onDeleteAll,
      ...props
    },
    ref,
  ) => {
    const colorScheme = useAppColorScheme();
    const [shakePosition] = useState(() => new Animated.Value(0));
    useImperativeHandle(
      ref,
      () => ({
        shakeKeypad: (params) => {
          const { amount = 10, duration = 300 } = params ?? {};
          const partialDuration = duration / SHAKE_ITERATIONS / 4;
          return new Promise((resolve) =>
            Animated.loop(
              Animated.sequence([
                Animated.timing(shakePosition, { ...animationConfig, toValue: -amount, duration: partialDuration }),
                Animated.timing(shakePosition, {
                  ...animationConfig,
                  toValue: amount,
                  duration: 2 * partialDuration,
                }),
                Animated.timing(shakePosition, { ...animationConfig, toValue: 0, duration: partialDuration }),
              ]),
              { iterations: SHAKE_ITERATIONS },
            ).start(resolve),
          );
        },
      }),
      [shakePosition],
    );

    return (
      <SafeAreaView testID={testID} style={[styles.container, { backgroundColor: colorScheme.white }]}>
        <ContrastingStatusBar backgroundColor={colorScheme.white} />
        <View style={styles.backButton}>
          {onBack && <BackButton testID={concatTestID(testID, 'back')} onPress={onBack} />}
        </View>
        <View style={styles.content}>
          <View style={styles.upperContent}>
            <Typography
              testID={concatTestID(testID, 'title')}
              accessible={false}
              color={colorScheme.text}
              align="center"
              preset="l"
              style={styles.title}>
              {title}
            </Typography>
            <Pins style={styles.pins} enteredLength={enteredLength} maxLength={length} />
            {instruction ? (
              <Typography
                testID={concatTestID(testID, 'instruction')}
                align="center"
                announcementActive={true}
                onAnnouncementFinished={props.onAccessibilityAnnounced}
                color={colorScheme.text}
                style={styles.instruction}>
                {instruction}
              </Typography>
            ) : null}
            <Typography
              testID={concatTestID(testID, 'error')}
              announcementActive={true}
              accessible={Boolean(error)}
              color={colorScheme.error}>
              {error ?? '' /* always displayed to keep the same layout */}
            </Typography>
          </View>
          <Animated.View
            style={[
              styles.keyboard,
              {
                transform: [{ translateX: shakePosition }],
              },
            ]}>
            <Keypad
              testID={concatTestID(testID, 'keypad')}
              ref={keypadRef}
              onPressDigit={enteredLength < length ? onPressDigit : undefined}
              onPressDelete={enteredLength && enteredLength < length ? onPressDelete : undefined}
              biometry={!enteredLength ? biometry : undefined}
              onBiometricPress={onBiometricPress}
              onDeleteAll={enteredLength && enteredLength < length ? onDeleteAll : undefined}
            />
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  },
);

const styles = StyleSheet.create({
  backButton: {
    minHeight: 24,
    paddingHorizontal: 24,
  },
  container: {
    flex: 1,
    paddingTop: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  instruction: {
    marginVertical: 24,
  },
  keyboard: {
    alignItems: 'center',
    flex: 5,
    justifyContent: 'center',
    marginVertical: 24,
  },
  pins: {
    paddingHorizontal: 40,
  },
  title: {
    marginBottom: 24,
  },
  upperContent: {
    alignItems: 'center',
    flex: 3,
    marginTop: 12,
  },
});

PinCodeScreen.displayName = 'PinCodeScreen';
