import React, { forwardRef, Ref, useImperativeHandle, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { concatTestID } from '../../utils';
import ContrastingStatusBar from '../../utils/contrasting-status-bar';
import type { TouchableOpacityRef } from '../accessibility';
import { BackButton } from '../buttons';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';
import { Biometry, Keypad } from './keypad';
import { Pins } from './pins';

export type PinCodeScreenProps = {
  biometry?: Biometry | null;

  enteredLength: number;
  error?: string;
  keypadRef?: Ref<TouchableOpacityRef>;
  length: number;
  onBack?: () => void;

  onBiometricPress?: () => void;
  onDeleteAll: () => void;
  onPressDelete: () => void;
  onPressDigit: (digit: number) => void;

  testID?: string;
  title: string;
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
  shakeKeypad: (params?: {
    amount?: number;
    duration?: number;
  }) => Promise<{ finished: boolean }>;
}
const SHAKE_ITERATIONS = 4;
const animationConfig = {
  easing: (t: number) => Easing.linear(t),
  useNativeDriver: true,
};

export const PinCodeScreen = forwardRef<
  PinCodeScreenActions,
  PinCodeScreenProps
>(
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
                Animated.timing(shakePosition, {
                  ...animationConfig,
                  duration: partialDuration,
                  toValue: -amount,
                }),
                Animated.timing(shakePosition, {
                  ...animationConfig,
                  duration: 2 * partialDuration,
                  toValue: amount,
                }),
                Animated.timing(shakePosition, {
                  ...animationConfig,
                  duration: partialDuration,
                  toValue: 0,
                }),
              ]),
              { iterations: SHAKE_ITERATIONS },
            ).start(resolve),
          );
        },
      }),
      [shakePosition],
    );

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colorScheme.white }]}
        testID={testID}
      >
        <ContrastingStatusBar backgroundColor={colorScheme.white} />
        <View style={styles.backButton}>
          {onBack && (
            <BackButton
              onPress={onBack}
              testID={concatTestID(testID, 'back')}
            />
          )}
        </View>
        <View style={styles.content}>
          <View style={styles.upperContent}>
            <Typography
              accessible={false}
              align="center"
              color={colorScheme.text}
              preset="l"
              style={styles.title}
              testID={concatTestID(testID, 'title')}
            >
              {title}
            </Typography>
            <Pins
              enteredLength={enteredLength}
              maxLength={length}
              style={styles.pins}
            />
            {instruction ? (
              <Typography
                align="center"
                announcementActive={true}
                color={colorScheme.text}
                onAnnouncementFinished={props.onAccessibilityAnnounced}
                style={styles.instruction}
                testID={concatTestID(testID, 'instruction')}
              >
                {instruction}
              </Typography>
            ) : null}
            <Typography
              accessible={Boolean(error)}
              announcementActive={true}
              color={colorScheme.error}
              testID={concatTestID(testID, 'error')}
            >
              {error ?? '' /* always displayed to keep the same layout */}
            </Typography>
          </View>
          <Animated.View
            style={[
              styles.keyboard,
              {
                transform: [{ translateX: shakePosition }],
              },
            ]}
          >
            <Keypad
              biometry={!enteredLength ? biometry : undefined}
              onBiometricPress={onBiometricPress}
              onDeleteAll={
                enteredLength && enteredLength < length
                  ? onDeleteAll
                  : undefined
              }
              onPressDelete={
                enteredLength && enteredLength < length
                  ? onPressDelete
                  : undefined
              }
              onPressDigit={enteredLength < length ? onPressDigit : undefined}
              ref={keypadRef}
              testID={concatTestID(testID, 'keypad')}
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
    opacity: 0.7,
  },
  keyboard: {
    alignItems: 'center',
    flex: 5,
    justifyContent: 'center',
    marginVertical: 24,
  },
  pins: {
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 24,
  },
  upperContent: {
    alignItems: 'center',
    flex: 3,
    marginTop: 12,
    paddingHorizontal: 20,
  },
});

PinCodeScreen.displayName = 'PinCodeScreen';
