import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Animated,
  Insets,
  LayoutChangeEvent,
  LayoutRectangle,
  NativeSyntheticEvent,
  Platform,
  StyleProp,
  StyleSheet,
  TextInput as RNTextInput,
  TextInputFocusEventData as RNTextInputFocusEventData,
  TextInputProps as RNTextInputProps,
  TextInputSubmitEditingEventData as RNTextInputSubmitEditingEventData,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';

import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import { ClearInputIcon } from '../icons/input';
import font from '../text/font';
import Typography from '../text/typography';
import { useAppColorScheme } from '../theme/color-scheme-context';
import { concatTestID } from '../utils/testID';

// difference between font sizes
const LABEL_SCALE_RATIO = 14 / 12;

export enum TextInputAccessory {
  Clear = 'clear',
}

const hitSlop: Insets = { bottom: 10, left: 10, right: 10, top: 10 };

export type TextInputProps = Omit<RNTextInputProps, 'editable' | 'onSubmitEditing' | 'style'> & {
  accessory?: TextInputAccessory;
  accessoryAccessibilityLabel?: string;
  disabled?: boolean;
  error?: string;
  label: string;
  onAccessoryPress?: () => void;
  onSubmit?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};

/**
 * Generic text input component
 * @see https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=3%3A824&t=r7HhHF1rsNLmOBL2-4
 */
const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      value,
      label,
      accessory = TextInputAccessory.Clear,
      accessoryAccessibilityLabel,
      onAccessoryPress,
      onSubmit,
      onFocus,
      onBlur,
      disabled,
      error,
      style,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const colorScheme = useAppColorScheme();
    const { fontScale } = useWindowDimensions();

    const [focused, setFocused] = useState(false);
    const onFocusAction = useCallback(
      (e: NativeSyntheticEvent<RNTextInputFocusEventData>) => {
        setFocused(true);
        onFocus?.(e);
      },
      [onFocus],
    );
    const onBlurAction = useCallback(
      (e: NativeSyntheticEvent<RNTextInputFocusEventData>) => {
        setFocused(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    const onSubmitEditing = useCallback(
      (e: NativeSyntheticEvent<RNTextInputSubmitEditingEventData>) => onSubmit?.(e.nativeEvent.text),
      [onSubmit],
    );

    const accessoryIcon = useMemo(() => {
      switch (accessory) {
        case TextInputAccessory.Clear:
          return value && !disabled ? <ClearInputIcon /> : undefined;
      }
    }, [accessory, disabled, value]);

    const accessoryComponent = accessoryIcon ? (
      <TouchableOpacity
        accessibilityLabel={accessoryAccessibilityLabel}
        accessibilityRole="button"
        accessible={!disabled}
        disabled={disabled}
        hitSlop={hitSlop}
        onPress={onAccessoryPress}
        testID={concatTestID(props.testID, 'accessoryButton')}>
        {accessoryIcon}
      </TouchableOpacity>
    ) : null;

    const labelPosition = focused || value ? 0 : 1;
    const [labelAnimation] = useState<Animated.Value>(() => new Animated.Value(labelPosition));
    useEffect(() => {
      Animated.timing(labelAnimation, {
        duration: 200,
        toValue: labelPosition,
        useNativeDriver: true,
      }).start();
    }, [labelAnimation, labelPosition]);

    const [labelLayout, setLabelLayout] = useState<LayoutRectangle>();
    const onLabelLayout = useCallback((event: LayoutChangeEvent) => setLabelLayout(event.nativeEvent.layout), []);

    const accessibilityLabel = disabled ? undefined : label;
    const inputStyle = { height: Math.min(2, fontScale) * 24 };

    const input = (
      <RNTextInput
        accessibilityLabel={accessibilityLabel}
        defaultValue={value || ''}
        editable={!disabled}
        hitSlop={hitSlop}
        maxFontSizeMultiplier={2}
        numberOfLines={1}
        onBlur={onBlurAction}
        onFocus={onFocusAction}
        onSubmitEditing={onSubmitEditing}
        placeholder={focused ? placeholder : undefined}
        ref={ref}
        returnKeyType="next"
        style={[
          font.regular,
          styles.inputText,
          Platform.OS === 'android' ? styles.inputAndroid : styles.inputIOS,
          {
            color: colorScheme.text,
          },
        ]}
        textAlignVertical="center"
        // https://github.com/facebook/react-native/issues/17530
        underlineColorAndroid="#00000000"
        value={value}
        {...props}
      />
    );
    return (
      <View style={style}>
        <Animated.View
          onLayout={onLabelLayout}
          style={
            labelLayout
              ? {
                  transform: [
                    {
                      // move label into the position of placeholder
                      translateY: labelAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, labelLayout.height + 4],
                      }),
                    },
                    {
                      // compensate scale position in X direction
                      translateX: labelAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, (labelLayout.width * (LABEL_SCALE_RATIO - 1)) / 2],
                      }),
                    },
                    {
                      // scale label into the size of placeholder
                      scale: labelAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, LABEL_SCALE_RATIO],
                      }),
                    },
                  ],
                }
              : undefined
          }>
          <Typography accessible={false} color={'rgba(0, 0, 0, 0.50)'} preset="s">
            {label}
          </Typography>
        </Animated.View>
        <View
          style={[
            styles.inputRow,
            {
              borderColor: focused ? colorScheme.accent : colorScheme.grayDark,
            },
          ]}>
          {Platform.OS === 'android' ? <View style={[styles.inputWrapperAndroid, inputStyle]}>{input}</View> : input}
          {accessoryComponent}
        </View>
        {error ? (
          <Typography color={colorScheme.error} preset="s">
            {error}
          </Typography>
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  inputAndroid: {
    fontSize: 14,
    left: 0,
    letterSpacing: 0.2,
    lineHeight: 22,
    position: 'absolute',
    right: 0,
  },
  inputIOS: {
    flex: 1,
  },
  inputRow: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginBottom: 4,
    paddingVertical: 4,
  },
  inputText: {
    fontSize: 14,
    letterSpacing: 0.2,
    lineHeight: Platform.OS === 'android' ? 22 : 20,
    minHeight: 24,
  },
  inputWrapperAndroid: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'visible',
  },
});

TextInput.displayName = 'Input';

export default TextInput;
