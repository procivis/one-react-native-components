import React, { useCallback, useMemo, useState } from 'react';
import {
  LayoutChangeEvent,
  LayoutRectangle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { concatTestID } from '../../utils/testID';
import { TouchableOpacity, TouchableOpacityRef } from '../accessibility';
import { useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
import {
  FaceIDIcon,
  FingerprintIcon,
  KeypadBackspaceIcon,
  KeypadClearIcon,
} from '../icons/keypad';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';

interface DigitKeyProps {
  digit: number;
  onPress?: (digit: number) => void;
  testID: string | undefined;
}

const DigitKey = React.forwardRef<TouchableOpacityRef, DigitKeyProps>(
  ({ onPress, testID, digit }, ref) => {
    const colorScheme = useAppColorScheme();
    return (
      <TouchableOpacity
        accessibilityRole="button"
        disabled={!onPress}
        onPress={() => onPress?.(digit)}
        ref={ref}
        style={[styles.key, { backgroundColor: colorScheme.background }]}
        testID={concatTestID(testID, String(digit))}
      >
        <Typography
          color={colorScheme.text}
          maxFontSizeMultiplier={1.5}
          preset="xl"
        >
          {digit}
        </Typography>
      </TouchableOpacity>
    );
  },
);

DigitKey.displayName = 'DigitKey';

export enum Biometry {
  FaceID = 'faceID',
  Other = 'other',
}

export interface KeypadProps {
  biometry?: Biometry | null;
  onBiometricPress?: () => void;
  onDeleteAll?: () => void;
  onPressDelete?: () => void;
  onPressDigit?: (digit: number) => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const MIN_HEIGHT = 360;
const MIN_WIDTH = 264;
const KEY_SIZE = 72;

export const Keypad = React.forwardRef<TouchableOpacityRef, KeypadProps>(
  (
    {
      testID,
      onPressDigit,
      onPressDelete,
      biometry,
      onBiometricPress,
      style,
      onDeleteAll,
    },
    ref,
  ) => {
    const t = useAccessibilityTranslation();
    const colorScheme = useAppColorScheme();

    const [layout, setLayout] = useState<LayoutRectangle>();
    const onLayout = useCallback(
      (event: LayoutChangeEvent) => setLayout(event.nativeEvent.layout),
      [],
    );

    const { width, height } = useMemo(() => {
      if (!layout) {
        return {};
      }

      const RATIO = MIN_WIDTH / MIN_HEIGHT;
      if (layout.width > layout.height * RATIO) {
        return { height: layout.height, width: layout.height * RATIO };
      } else {
        return { height: layout.width / RATIO, width: layout.width };
      }
    }, [layout]);

    const gap = width ? (width - 3 * KEY_SIZE) / 4 : undefined;
    const lineStyles = [styles.line, { marginBottom: gap, width }];

    return (
      <View onLayout={onLayout} style={[styles.cover, style]} testID={testID}>
        <View style={{ height }}>
          <View style={lineStyles}>
            <DigitKey
              digit={1}
              onPress={onPressDigit}
              ref={ref}
              testID={testID}
            />
            <DigitKey digit={2} onPress={onPressDigit} testID={testID} />
            <DigitKey digit={3} onPress={onPressDigit} testID={testID} />
          </View>
          <View style={lineStyles}>
            <DigitKey digit={4} onPress={onPressDigit} testID={testID} />
            <DigitKey digit={5} onPress={onPressDigit} testID={testID} />
            <DigitKey digit={6} onPress={onPressDigit} testID={testID} />
          </View>
          <View style={lineStyles}>
            <DigitKey digit={7} onPress={onPressDigit} testID={testID} />
            <DigitKey digit={8} onPress={onPressDigit} testID={testID} />
            <DigitKey digit={9} onPress={onPressDigit} testID={testID} />
          </View>
          <View style={lineStyles}>
            <TouchableOpacity
              accessibilityLabel={t('accessibility.control.clear')}
              accessibilityRole="button"
              disabled={!onDeleteAll}
              onPress={onDeleteAll}
              style={styles.key}
              testID={concatTestID(testID, 'delete-all')}
            >
              {onDeleteAll ? (
                <KeypadClearIcon color={colorScheme.text} />
              ) : null}
            </TouchableOpacity>
            <DigitKey digit={0} onPress={onPressDigit} testID={testID} />
            {biometry ? (
              <TouchableOpacity
                accessibilityLabel={t(
                  biometry === Biometry.FaceID
                    ? 'accessibility.key.faceId'
                    : 'accessibility.key.fingerprint',
                )}
                accessibilityRole="button"
                disabled={!onBiometricPress}
                onPress={onBiometricPress}
                style={styles.key}
                testID={concatTestID(testID, 'biometry')}
              >
                {biometry === Biometry.FaceID ? (
                  <FaceIDIcon color={colorScheme.text} />
                ) : (
                  <FingerprintIcon color={colorScheme.text} />
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                accessibilityLabel={t('accessibility.control.delete')}
                accessibilityRole="button"
                disabled={!onPressDelete}
                onPress={onPressDelete}
                style={styles.key}
                testID={concatTestID(testID, 'delete')}
              >
                {onPressDelete ? (
                  <KeypadBackspaceIcon color={colorScheme.text} />
                ) : null}
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
