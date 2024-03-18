import React, { forwardRef, FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Animated,
  Insets,
  LayoutChangeEvent,
  LayoutRectangle,
  NativeSyntheticEvent,
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextInputSubmitEditingEventData,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import { ClearIcon } from '../icon/icon';
import Typography from '../text/typography';
import { font, useAppColorScheme } from '../theme';

const Dropdown: FunctionComponent = () => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 10.8707L11.9994 15L16 10.8707L15.1555 10L11.9994 13.2586L8.84211 10L8 10.8707Z"
        fill={colorScheme.lightGrey}
      />
    </Svg>
  );
};

// difference between font sizes
const LABEL_SCALE_RATIO = 14 / 12;

export enum InputAccessory {
  Dropdown = 'dropdown',
  Clear = 'clear',
}

const hitSlop: Insets = { top: 10, left: 10, bottom: 10, right: 10 };

export interface InputProps extends Omit<TextInputProps, 'editable' | 'onSubmitEditing' | 'style'> {
  label: string;
  accessory?: InputAccessory;
  accessoryAccessibilityLabel?: string;
  onAccessoryPress?: () => void;
  disabled?: boolean;
  onSubmit?: (value: string) => void;
  error?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Generic text input component
 * @see https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=3%3A824&t=r7HhHF1rsNLmOBL2-4
 */
const Input = forwardRef<TextInput, InputProps>(
  (
    {
      value,
      label,
      accessory = InputAccessory.Clear,
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
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(true);
        onFocus?.(e);
      },
      [onFocus],
    );
    const onBlurAction = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    const onSubmitEditing = useCallback(
      (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => onSubmit?.(e.nativeEvent.text),
      [onSubmit],
    );

    const accessoryIcon = useMemo(() => {
      switch (accessory) {
        case InputAccessory.Dropdown:
          return <Dropdown />;
        case InputAccessory.Clear:
          return value && !disabled ? <ClearIcon /> : undefined;
      }
    }, [accessory, disabled, value]);

    const accessoryComponent = accessoryIcon ? (
      <TouchableOpacity
        accessible={!disabled}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={accessoryAccessibilityLabel}
        onPress={onAccessoryPress}
        hitSlop={hitSlop}>
        {accessoryIcon}
      </TouchableOpacity>
    ) : null;

    const labelPosition = focused || value ? 0 : 1;
    const [labelAnimation] = useState<Animated.Value>(() => new Animated.Value(labelPosition));
    useEffect(() => {
      Animated.timing(labelAnimation, { toValue: labelPosition, duration: 200, useNativeDriver: true }).start();
    }, [labelAnimation, labelPosition]);

    const [labelLayout, setLabelLayout] = useState<LayoutRectangle>();
    const onLabelLayout = useCallback((event: LayoutChangeEvent) => setLabelLayout(event.nativeEvent.layout), []);

    const accessibilityLabel = disabled ? undefined : error ? `${label}, ${error}` : label;
    const inputStyle = { height: Math.min(2, fontScale) * 24 };

    const input = (
      <TextInput
        ref={ref}
        accessibilityLabel={accessibilityLabel}
        style={[
          font.normal,
          styles.inputText,
          Platform.OS === 'android' ? styles.inputAndroid : styles.inputIOS,
          { color: error && !focused ? colorScheme.alertText : colorScheme.text },
        ]}
        onSubmitEditing={onSubmitEditing}
        onFocus={onFocusAction}
        onBlur={onBlurAction}
        defaultValue={value || ''}
        value={value}
        editable={!disabled}
        returnKeyType="next"
        numberOfLines={1}
        maxFontSizeMultiplier={2}
        textAlignVertical="center"
        hitSlop={hitSlop}
        // https://github.com/facebook/react-native/issues/17530
        underlineColorAndroid="#00000000"
        placeholder={focused ? placeholder : undefined}
        {...props}
      />
    );
    return (
      <View style={style}>
        <Animated.View
          onLayout={onLabelLayout}
          style={[
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
              : undefined,
          ]}>
          <Typography accessible={false} size="sml" color={colorScheme.textSecondary}>
            {label}
          </Typography>
        </Animated.View>
        <View
          style={[
            styles.inputRow,
            { borderColor: error ? colorScheme.alertText : focused ? colorScheme.accent : colorScheme.lighterGrey },
          ]}>
          {Platform.OS === 'android' ? <View style={[styles.inputWrapperAndroid, inputStyle]}>{input}</View> : input}
          {accessoryComponent}
        </View>
        <Typography accessible={false} size="sml" color={colorScheme.alertText} style={styles.errorText}>
          {error || ' '}
        </Typography>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  errorText: {
    marginBottom: 4,
  },
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

Input.displayName = 'Input';

export default Input;
