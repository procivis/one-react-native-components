import { useRoute } from '@react-navigation/native';
import React, { FC, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useRef } from 'react';

import { useForwardedRef } from '../../utils/ref';
import { focusAccessibility, useAccessibleAfterTransition } from './accessibility';

type AccessibilityRefComponent = React.ElementType | null;
interface AccessibilityRefContextValue {
  getRef: (route: string) => AccessibilityRefComponent;
  setRef: (route: string, ref: AccessibilityRefComponent) => void;
}

const accessibilityFocusHistoryContext = React.createContext<AccessibilityRefContextValue>({
  getRef: () => null,
  setRef: () => {},
});

/**
 * Adds app support for accessibility focus history
 */
export const AccessibilityFocusHistoryProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const Provider = accessibilityFocusHistoryContext.Provider;
  const refs = useRef<Record<string, AccessibilityRefComponent>>({});
  const setRef = useCallback((route: string, ref: AccessibilityRefComponent) => {
    refs.current[route] = ref;
  }, []);
  const getRef = useCallback((route: string) => {
    return refs.current[route] ?? null;
  }, []);
  const value = useMemo(() => ({ getRef, setRef }), [getRef, setRef]);
  return <Provider value={value}>{children}</Provider>;
};

/**
 * Wraps `onPress` handler and `ref` to support automatic accessibility focus on back navigation
 * @note This needs to be used inside {@link AccessibilityFocusHistoryProvider} and navigation context
 */
export const useAccessibilityFocusHistory = <
  Component extends React.ElementType,
  OnPress extends (...args: never[]) => void = () => void,
>(
  pressHandler: OnPress | undefined,
  passedRef?: React.MutableRefObject<Component | null>,
) => {
  const [forwardedRef, refObject] = useForwardedRef<Component>(passedRef);

  const historyContext = useContext(accessibilityFocusHistoryContext);
  const routeKey = useRoute().key;

  const previouslyPressed = useRef(false);
  const outsideTransition = useAccessibleAfterTransition();

  useEffect(() => {
    const isStoredInHistory = historyContext.getRef(routeKey) === refObject.current;
    if (outsideTransition && isStoredInHistory && previouslyPressed.current) {
      focusAccessibility(refObject.current);
    }
  }, [historyContext, outsideTransition, refObject, routeKey]);

  useEffect(() => {
    if (outsideTransition) {
      previouslyPressed.current = false;
    }
  }, [outsideTransition]);

  const onPress = useCallback(
    ((...args) => {
      previouslyPressed.current = true;
      historyContext.setRef(routeKey, refObject.current);
      return pressHandler?.(...args);
    }) as OnPress,
    [historyContext, routeKey, refObject, pressHandler],
  );

  return { onPress, ref: forwardedRef };
};
