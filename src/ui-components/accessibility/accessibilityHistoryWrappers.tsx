import React, {
  FC,
  ForwardedRef,
  forwardRef,
  MutableRefObject,
  PropsWithoutRef,
} from 'react';
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

const WithAccessibilityFocusHistory = <
  ComponentProps extends OnPressProps,
  RefType extends React.ElementType,
>(
  C: React.ComponentType<ComponentProps>,
  displayName: string,
) => {
  type ForwardedProps = PropsWithoutRef<ComponentProps> & {
    forwardedRef: ForwardedRef<RefType | null>;
  };

  const ComponentWithAccessibilityFocusHistory: FC<ForwardedProps> = ({
    forwardedRef,
    onPress: originalOnPress,
    ...props
  }) => {
    const { ref, onPress } = useAccessibilityFocusHistory<RefType, RNOnPress>(
      originalOnPress ?? undefined,
      forwardedRef as MutableRefObject<RefType | null>,
    );
    // @ts-ignore
    return <C onPress={onPress} ref={ref} {...props} />;
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
export const TouchableOpacity: React.ForwardRefExoticComponent<
  React.PropsWithoutRef<TouchableOpacityProps> &
    React.RefAttributes<typeof RNTouchableOpacity>
> = WithAccessibilityFocusHistory<
  TouchableOpacityProps,
  typeof RNTouchableOpacity
>(RNTouchableOpacity, 'TouchableOpacity');
export const TouchableWithoutFeedback = WithAccessibilityFocusHistory<
  TouchableWithoutFeedbackProps,
  typeof RNTouchableWithoutFeedback
>(RNTouchableWithoutFeedback, 'TouchableWithoutFeedback');
export const TouchableHighlight = WithAccessibilityFocusHistory<
  TouchableHighlightProps,
  typeof RNTouchableHighlight
>(RNTouchableHighlight, 'TouchableHighlight');
export const Pressable = WithAccessibilityFocusHistory<PressableProps, View>(
  RNPressable,
  'Pressable',
);

type WrapperRefType<
  C extends React.ForwardRefExoticComponent<React.RefAttributes<any>>,
> = C extends React.ForwardRefExoticComponent<React.RefAttributes<infer Ref>>
  ? Ref
  : never;

/**
 * Ref types to be used in forwardRef for the wrappers
 */
export type TouchableOpacityRef = WrapperRefType<typeof TouchableOpacity>;
export type TouchableWithoutFeedbackRef = WrapperRefType<
  typeof TouchableWithoutFeedback
>;
export type TouchableHighlightRef = WrapperRefType<typeof TouchableHighlight>;
export type PressableRef = WrapperRefType<typeof Pressable>;
