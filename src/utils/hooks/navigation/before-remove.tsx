import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef } from 'react';

export const useBeforeRemove = (callback: () => void) => {
  const navigation = useNavigation();
  const removed = useRef<boolean>();

  useEffect(() => {
    if (removed.current) {
      return;
    }
    return navigation.addListener('beforeRemove', (e) => {
      if (removed.current) {
        return;
      }
      removed.current = true;
      e.preventDefault();
      callback();
      navigation.dispatch(e.data.action);
    });
  }, [callback, navigation]);
};
