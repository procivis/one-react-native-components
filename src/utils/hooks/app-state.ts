import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

/**
 * Returns current app state
 */
export function useAppState() {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', setAppState);
    return () => subscription.remove();
  }, []);

  return appState;
}

export function useIsAppActive(): boolean | undefined {
  switch (useAppState()) {
    case 'active':
    case 'extension':
      return true;
    case 'inactive':
    case 'background':
      return false;
    default:
      return undefined;
  }
}
