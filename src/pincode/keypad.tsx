import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { TouchableOpacity, TouchableOpacityRef } from '../accessibility';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';
import { concatTestID } from '../utils/testID';
import ArrowLeft from './ArrowLeftIcon';
import DeleteIcon from './DeleteIcon';
import FaceIDIcon from './FaceIDIcon';
import FingerprintIcon from './FingerprintIcon';

interface DigitKeyProps {
  testID: string | undefined;
  digit: number;
  onPress?: (digit: number) => void;
  color: string;
}

const DigitKey = React.forwardRef<TouchableOpacityRef, DigitKeyProps>(({ onPress, testID, digit, color }, ref) => {
  return (
    <TouchableOpacity
      testID={concatTestID(testID, String(digit))}
      ref={ref}
      accessibilityRole="button"
      style={styles.key}
      disabled={!onPress}
      onPress={() => onPress?.(digit)}>
      <Typography allowFontScaling={true} maxFontSizeMultiplier={1.5} color={color} size="h1">
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
  accessibilityLabelDelete?: string;
  accessibilityLabelDeleteAll?: string;
  accessibilityLabelFaceID?: string;
  accessibilityLabelFingerprint?: string;
  onDeleteAll?: () => void;
}

export const Keypad = React.forwardRef<TouchableOpacityRef, KeypadProps>(
  (
    {
      testID,
      onPressDigit,
      onPressDelete,
      biometry,
      onBiometricPress,
      style,
      accessibilityLabelDelete,
      accessibilityLabelDeleteAll,
      accessibilityLabelFaceID,
      accessibilityLabelFingerprint,
      onDeleteAll,
    },
    ref,
  ) => {
    const colorScheme = useAppColorScheme();
    return (
      <View testID={testID} style={[styles.keyboardWrapper, style]}>
        <View style={styles.keyboardLine}>
          <DigitKey testID={testID} ref={ref} digit={1} onPress={onPressDigit} color={colorScheme.text} />
          <DigitKey testID={testID} digit={2} onPress={onPressDigit} color={colorScheme.text} />
          <DigitKey testID={testID} digit={3} onPress={onPressDigit} color={colorScheme.text} />
        </View>
        <View style={styles.keyboardLine}>
          <DigitKey testID={testID} digit={4} onPress={onPressDigit} color={colorScheme.text} />
          <DigitKey testID={testID} digit={5} onPress={onPressDigit} color={colorScheme.text} />
          <DigitKey testID={testID} digit={6} onPress={onPressDigit} color={colorScheme.text} />
        </View>
        <View style={styles.keyboardLine}>
          <DigitKey testID={testID} digit={7} onPress={onPressDigit} color={colorScheme.text} />
          <DigitKey testID={testID} digit={8} onPress={onPressDigit} color={colorScheme.text} />
          <DigitKey testID={testID} digit={9} onPress={onPressDigit} color={colorScheme.text} />
        </View>
        <View style={styles.keyboardLine}>
          <TouchableOpacity
            testID={concatTestID(testID, 'delete-all')}
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabelDeleteAll}
            style={styles.key}
            disabled={!onDeleteAll}
            onPress={onDeleteAll}>
            {onDeleteAll ? <DeleteIcon width={20} height={20} foregroundColor={colorScheme.text} /> : null}
          </TouchableOpacity>
          <DigitKey testID={testID} digit={0} onPress={onPressDigit} color={colorScheme.text} />
          {biometry ? (
            <TouchableOpacity
              testID={concatTestID(testID, 'biometry')}
              accessibilityRole="button"
              accessibilityLabel={
                biometry === Biometry.FaceID ? accessibilityLabelFaceID : accessibilityLabelFingerprint
              }
              style={styles.key}
              disabled={!onBiometricPress}
              onPress={onBiometricPress}>
              {biometry === Biometry.FaceID ? (
                <FaceIDIcon width={20} height={20} foregroundColor={colorScheme.text} />
              ) : (
                <FingerprintIcon width={20} height={20} foregroundColor={colorScheme.text} />
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              testID={concatTestID(testID, 'delete')}
              accessibilityRole="button"
              accessibilityLabel={accessibilityLabelDelete}
              style={styles.key}
              disabled={!onPressDelete}
              onPress={onPressDelete}>
              {onPressDelete ? <ArrowLeft width={20} height={20} /> : null}
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
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  keyboardLine: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  keyboardWrapper: {
    flex: 1,
    justifyContent: 'space-evenly',
    width: '100%',
  },
});
