import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useRunAfterTransition = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const actionsQueue = useRef<Array<() => void>>([]);

  useEffect(() => {
    const startListener = navigation.addListener('transitionStart', () => {
      setIsTransitioning(true);
    });
    const endListener = navigation.addListener('transitionEnd', () => {
      setIsTransitioning(false);
      actionsQueue.current.forEach((action) => action());
      actionsQueue.current = [];
    });

    return () => {
      startListener();
      endListener();
    };
  }, [navigation]);

  const runAfterTransition = useCallback(
    (action: () => void) => {
      if (!isTransitioning) {
        action();
        return;
      }
      actionsQueue.current.push(action);
    },
    [isTransitioning],
  );

  return runAfterTransition;
};
