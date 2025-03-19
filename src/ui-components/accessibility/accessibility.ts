import { NavigationProp, NavigationState, useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, EmitterSubscription, findNodeHandle, Platform } from 'react-native';

/**
 * Global transformer of text for Voice-Over
 * @param {string} text (Visible) text to be announced
 * @returns {string} Text to be read-out by Voice-Over
 */
export type AccessibilityTextTransformer = (text: string) => string;
let textTransformer: AccessibilityTextTransformer | null = null;
export function setAccessibilityTextTransformer(transformer: AccessibilityTextTransformer | null) {
  textTransformer = transformer;
}
export function transformAccessibilityText(text: string) {
  return textTransformer && text ? textTransformer(text) : text;
}

/**
 * Make element accessible after navigation transition is done
 * @returns {boolean} flag to be used as `accessible` prop on the target component(s)
 */
export function useAccessibleAfterTransition<
  TNavigationProp extends NavigationProp<
    Record<string, any>,
    string,
    NavigationState<Record<string, any>>,
    {},
    { transitionEnd: {} }
  >,
>() {
  const navigation = useNavigation<TNavigationProp>();
  const [accessible, setAccessible] = useState(false);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) {
      setAccessible(false);
      return undefined;
    }
    const unsubscribe = navigation.addListener('transitionEnd', () => setAccessible(true));
    // fallback for cases when transition doesn't happen (e.g. forceful screen re-render)
    const timeout = setTimeout(() => setAccessible(true), 500);
    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [navigation, isFocused]);

  return isFocused && accessible;
}

/**
 * Query whether the current screen is NOT transitioning
 * @returns {boolean} flag signifying whether the current screen is NOT in a transition (either entering or leaving)
 */
export function useIsOutsideTransition<
  TNavigationProp extends NavigationProp<
    Record<string, any>,
    string,
    NavigationState<Record<string, any>>,
    {},
    { transitionStart: {}; transitionEnd: {} }
  >,
>() {
  const navigation = useNavigation<TNavigationProp>();
  const [inTransition, setInTransition] = useState<boolean>(true);

  const isFocused = useIsFocused();
  const focused = useRef(isFocused);
  focused.current = isFocused;

  useEffect(() => {
    const unsubscribeStart = navigation.addListener('transitionStart', () => setInTransition(true));
    const unsubscribeEnd = navigation.addListener('transitionEnd', () => {
      if (focused.current) {
        setInTransition(false);
      }
    });
    return () => {
      unsubscribeStart();
      unsubscribeEnd();
    };
  }, [navigation]);

  useEffect(() => {
    if (!isFocused) {
      return undefined;
    }

    setInTransition(true);
    // fallback for cases when transition callback doesn't happen (e.g. forceful screen re-render)
    const timeout = setTimeout(() => setInTransition(false), 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [isFocused]);

  return isFocused && !inTransition;
}

/**
 * Focuses an element for accessibility
 * @param component component ref
 * @note Disabled on android as it is not reliable
 */
export const focusAccessibility = (component?: React.ElementType<any, any> | null) => {
  if (Platform.OS === 'ios' && component) {
    const nodeHandle = findNodeHandle(component);
    if (nodeHandle) {
      AccessibilityInfo.setAccessibilityFocus(nodeHandle);
    }
  }
};

/**
 * Focuses an element for accessibility
 * @param {boolean} focused Focusing happens when this changes to `true`
 * @returns reference to be used with the target element
 */
export const useAccessibilityFocus = <T extends React.Component | React.ComponentClass>(focused: boolean = true) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (focused) {
      focusAccessibility(ref.current);
    }
  }, [focused]);

  return ref;
};

/**
 * Posts a screen-reader/voice-over announcement
 * @param {string} message Announcement message
 * * if `null` passed, it resets the cached announcement and the same message can be re-announced again
 * @returns {boolean} When the announcement is successfully finished (only supported on iOS), false otherwise
 * @note Use {@link setAccessibilityTextTransformer} to apply text transformation for the read-out text
 */
export const useAccessibilityAnnouncement = (message?: string | null): boolean => {
  const announcement = message ? transformAccessibilityText(message) : message;
  const [announcementFinished, setAnnouncementFinished] = useState<string>();
  useEffect(() => {
    if (announcement === null) {
      // explicitly clearing cached state
      setAnnouncementFinished(undefined);
    }

    if (!announcement) {
      return undefined;
    }

    let subscription: EmitterSubscription;
    const unsubscribe = () => subscription?.remove();
    if (Platform.OS === 'ios') {
      let retries = 0;
      subscription = AccessibilityInfo.addEventListener(
        'announcementFinished',
        ({ announcement: finished, success }) => {
          if (finished === announcement) {
            if (success) {
              setAnnouncementFinished(announcement);
              unsubscribe();
            } else if (retries++ < 2) {
              // when the automatic voice-over cancels the first try (e.g. after screen transition), let's attempt again one more time
              AccessibilityInfo.announceForAccessibility(announcement);
            } else {
              unsubscribe();
            }
          }
        },
      );
    }

    AccessibilityInfo.announceForAccessibility(announcement);
    return unsubscribe;
  }, [announcement]);

  return Boolean(announcement && announcementFinished === announcement);
};

/**
 * Posts a screen-reader/voice-over announcement
 * @param {string} message Announcement message
 * @param {boolean} waitForPreviousAnnouncement When a new message appears before the previous announcement if finished:
 *   - `true`: postpone the new message to be announced after the previous message(s)
 *   - `false` (default): cancel the previous announcement and start the new message
 * @returns {boolean} When all announcements are finished (only supported on iOS), false otherwise
 * @see {@link useAccessibilityAnnouncement} for further info
 */
export const useAccessibilityAnnouncementCumulative = (
  message?: string,
  waitForPreviousAnnouncement?: boolean,
): boolean => {
  // waiting only possible on iOS
  const wait = Platform.OS === 'ios' && waitForPreviousAnnouncement;

  const [announcements, setAnnouncements] = useState<string[]>([]);
  useEffect(() => {
    if (message) {
      setAnnouncements((prev) => [...prev, message]);
    }
  }, [message]);

  const nextAnnouncement = wait ? announcements[0] : message;
  const finished = useAccessibilityAnnouncement(nextAnnouncement);

  useEffect(() => {
    if (finished) {
      setAnnouncements((prev) => prev.filter((m) => m !== nextAnnouncement));
    }
  }, [nextAnnouncement, finished]);

  return wait ? !announcements.length : finished;
};
