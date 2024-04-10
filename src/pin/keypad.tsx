import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { TouchableOpacity, TouchableOpacityRef } from '../accessibility';
import { useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
import { FaceIDIcon, FingerprintIcon, KeypadBackspaceIcon, KeypadClearIcon } from '../icons/keypad';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';
import { concatTestID } from '../utils/testID';

interface DigitKeyProps {
  testID: string | undefined;
  digit: number;
  onPress?: (digit: number) => void;
}

const DigitKey = React.forwardRef<TouchableOpacityRef, DigitKeyProps>(({ onPress, testID, digit }, ref) => {
  const colorScheme = useAppColorScheme();
  return (
    <TouchableOpacity
      testID={concatTestID(testID, String(digit))}
      ref={ref}
      accessibilityRole="button"
      style={[styles.key, { backgroundColor: colorScheme.background }]}
      disabled={!onPress}
      onPress={() => onPress?.(digit)}>
      <Typography maxFontSizeMultiplier={1.5} color={colorScheme.text} preset="xl">
        {digit}
      </Typography>
    </TouchableOpacity>
  );
});

DigitKey.displayName = 'DigitKey';

export enum Biometry {
  FaceID = 'faceID',
  Other = 'other',
}

export interface KeypadProps {
  testID?: string;
  biometry?: Biometry | null;
  onBiometricPress?: () => void;
  onPressDigit?: (digit: number) => void;
  onPressDelete?: () => void;
  style?: StyleProp<ViewStyle>;
  onDeleteAll?: () => void;
}

export const Keypad = React.forwardRef<TouchableOpacityRef, KeypadProps>(
  ({ testID, onPressDigit, onPressDelete, biometry, onBiometricPress, style, onDeleteAll }, ref) => {
    const t = useAccessibilityTranslation();
    const colorScheme = useAppColorScheme();
    return (
      <View testID={testID} style={[styles.keyboardWrapper, style]}>
        <View style={styles.keyboardLine}>
          <DigitKey testID={testID} ref={ref} digit={1} onPress={onPressDigit} />
          <DigitKey testID={testID} digit={2} onPress={onPressDigit} />
          <DigitKey testID={testID} digit={3} onPress={onPressDigit} />
        </View>
        <View style={styles.keyboardLine}>
          <DigitKey testID={testID} digit={4} onPress={onPressDigit} />
          <DigitKey testID={testID} digit={5} onPress={onPressDigit} />
          <DigitKey testID={testID} digit={6} onPress={onPressDigit} />
        </View>
        <View style={styles.keyboardLine}>
          <DigitKey testID={testID} digit={7} onPress={onPressDigit} />
          <DigitKey testID={testID} digit={8} onPress={onPressDigit} />
          <DigitKey testID={testID} digit={9} onPress={onPressDigit} />
        </View>
        <View style={styles.keyboardLine}>
          <TouchableOpacity
            testID={concatTestID(testID, 'delete-all')}
            accessibilityRole="button"
            accessibilityLabel={t('accessibility.control.clear')}
            style={styles.key}
            disabled={!onDeleteAll}
            onPress={onDeleteAll}>
            {onDeleteAll ? <KeypadClearIcon color={colorScheme.text} /> : null}
          </TouchableOpacity>
          <DigitKey testID={testID} digit={0} onPress={onPressDigit} />
          {biometry ? (
            <TouchableOpacity
              testID={concatTestID(testID, 'biometry')}
              accessibilityRole="button"
              accessibilityLabel={t(
                biometry === Biometry.FaceID ? 'accessibility.key.faceId' : 'accessibility.key.fingerprint',
              )}
              style={styles.key}
              disabled={!onBiometricPress}
              onPress={onBiometricPress}>
              {biometry === Biometry.FaceID ? (
                <FaceIDIcon color={colorScheme.text} />
              ) : (
                <FingerprintIcon color={colorScheme.text} />
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              testID={concatTestID(testID, 'delete')}
              accessibilityRole="button"
              accessibilityLabel={t('accessibility.control.delete')}
              style={styles.key}
              disabled={!onPressDelete}
              onPress={onPressDelete}>
              {onPressDelete ? <KeypadBackspaceIcon color={colorScheme.text} /> : null}
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  },
);

Keypad.displayName = 'Keypad';

const styles = StyleSheet.create({
  key: {
    alignItems: 'center',
    borderRadius: 36,
    height: 72,
    justifyContent: 'center',
    width: 72,
  },
  keyboardLine: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 264,
  },
  keyboardWrapper: {
    height: 360,
    justifyContent: 'space-evenly',
  },
});
