/* eslint-disable no-restricted-imports */
import React, { FC, ForwardedRef, forwardRef } from 'react';
import {
  GestureResponderEvent,
  Pressable as RNPressable,
  PressableProps,
  TouchableHighlight as RNTouchableHighlight,
  TouchableHighlightProps,
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps,
  TouchableWithoutFeedback as RNTouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  View,
} from 'react-native';

import { useAccessibilityFocusHistory } from './accessibilityHistory';

type RNOnPress = (event: GestureResponderEvent) => void;
interface OnPressProps {
  onPress?: RNOnPress | null;
}

const WithAccessibilityFocusHistory = <ComponentProps extends OnPressProps, RefType extends React.ElementType<any, any>>(
  C: React.ComponentType<ComponentProps>,
  displayName: string,
) => {
  type ForwardedProps = ComponentProps & {
    forwardedRef: ForwardedRef<RefType>;
  };

  const ComponentWithAccessibilityFocusHistory: FC<ForwardedProps> = ({
    forwardedRef,
    onPress: originalOnPress,
    ...props
  }) => {
    const { ref, onPress } = useAccessibilityFocusHistory<RefType, RNOnPress>(
      originalOnPress ?? undefined,
      forwardedRef,
    );
    // @ts-ignore
    return <C ref={ref} onPress={onPress} {...props} />;
  };

  const Forwarded = forwardRef<RefType, ComponentProps>((props, ref) => (
    <ComponentWithAccessibilityFocusHistory {...props} forwardedRef={ref} />
  ));
  Forwarded.displayName = displayName;

  return Forwarded;
};

/**
 * Wrappers of RN touchable components with accessibilty focus history support
 */
export const TouchableOpacity = WithAccessibilityFocusHistory<TouchableOpacityProps, typeof RNTouchableOpacity>(
  RNTouchableOpacity,
  'TouchableOpacity',
);
export const TouchableWithoutFeedback = WithAccessibilityFocusHistory<
  TouchableWithoutFeedbackProps,
  RNTouchableWithoutFeedback
>(RNTouchableWithoutFeedback, 'TouchableWithoutFeedback');
export const TouchableHighlight = WithAccessibilityFocusHistory<TouchableHighlightProps, typeof RNTouchableHighlight>(
  RNTouchableHighlight,
  'TouchableHighlight',
);
export const Pressable = WithAccessibilityFocusHistory<PressableProps, View>(RNPressable, 'Pressable');

type WrapperRefType<C extends React.ForwardRefExoticComponent<React.RefAttributes<any>>> =
  C extends React.ForwardRefExoticComponent<React.RefAttributes<infer Ref>> ? Ref : never;

/**
 * Ref types to be used in forwardRef for the wrappers
 */
export type TouchableOpacityRef = WrapperRefType<typeof TouchableOpacity>;
export type TouchableWithoutFeedbackRef = WrapperRefType<typeof TouchableWithoutFeedback>;
export type TouchableHighlightRef = WrapperRefType<typeof TouchableHighlight>;
export type PressableRef = WrapperRefType<typeof Pressable>;
