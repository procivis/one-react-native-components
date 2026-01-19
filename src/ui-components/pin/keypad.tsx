import React, { useCallback, useMemo, useState } from 'react';
import { LayoutChangeEvent, LayoutRectangle, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { concatTestID } from '../../utils/testID';
import { TouchableOpacity, TouchableOpacityRef } from '../accessibility';
import { useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
import { FaceIDIcon, FingerprintIcon, KeypadBackspaceIcon, KeypadClearIcon } from '../icons/keypad';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';

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

const MIN_HEIGHT = 360;
const MIN_WIDTH = 264;
const KEY_SIZE = 72;

export const Keypad = React.forwardRef<TouchableOpacityRef, KeypadProps>(
  ({ testID, onPressDigit, onPressDelete, biometry, onBiometricPress, style, onDeleteAll }, ref) => {
    const t = useAccessibilityTranslation();
    const colorScheme = useAppColorScheme();

    const [layout, setLayout] = useState<LayoutRectangle>();
    const onLayout = useCallback((event: LayoutChangeEvent) => setLayout(event.nativeEvent.layout), []);

    const { width, height } = useMemo(() => {
      if (!layout) {
        return {};
      }

      const RATIO = MIN_WIDTH / MIN_HEIGHT;
      if (layout.width > layout.height * RATIO) {
        return { height: layout.height, width: layout.height * RATIO };
      } else {
        return { width: layout.width, height: layout.width / RATIO };
      }
    }, [layout]);

    const gap = width ? (width - 3 * KEY_SIZE) / 4 : undefined;
    const lineStyles = [styles.line, { width, marginBottom: gap }];

    return (
      <View testID={testID} style={[styles.cover, style]} onLayout={onLayout}>
        <View style={{ height }}>
          <View style={lineStyles}>
            <DigitKey testID={testID} ref={ref} digit={1} onPress={onPressDigit} />
            <DigitKey testID={testID} digit={2} onPress={onPressDigit} />
            <DigitKey testID={testID} digit={3} onPress={onPressDigit} />
          </View>
          <View style={lineStyles}>
            <DigitKey testID={testID} digit={4} onPress={onPressDigit} />
            <DigitKey testID={testID} digit={5} onPress={onPressDigit} />
            <DigitKey testID={testID} digit={6} onPress={onPressDigit} />
          </View>
          <View style={lineStyles}>
            <DigitKey testID={testID} digit={7} onPress={onPressDigit} />
            <DigitKey testID={testID} digit={8} onPress={onPressDigit} />
            <DigitKey testID={testID} digit={9} onPress={onPressDigit} />
          </View>
          <View style={lineStyles}>
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
      </View>
    );
  },
);

Keypad.displayName = 'Keypad';

const styles = StyleSheet.create({
  cover: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    maxHeight: 2 * MIN_HEIGHT,
    maxWidth: 2 * MIN_WIDTH,
    minHeight: MIN_HEIGHT,
    minWidth: MIN_WIDTH,
    width: '100%',
  },
  key: {
    alignItems: 'center',
    borderRadius: KEY_SIZE / 2,
    borderWidth: 0,
    height: KEY_SIZE,
    justifyContent: 'center',
    width: KEY_SIZE,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
