import { initializeCore, ONECore } from '@procivis/react-native-one-core';
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { reportException } from '../../reporting';

interface ContextValue {
  core: ONECore;
  initialize: (force?: boolean) => Promise<ONECore>;
  organisationId: string;
}

const defaultContextValue: ContextValue = {
  core: {} as ONECore,
  initialize: () => Promise.reject(new Error()),
  organisationId: '11111111-2222-3333-a444-ffffffffffff',
};

export type ONECoreContextProviderProps = {
  config?: Record<string, unknown>;
  organisationId?: string;
};

const ONECoreContext = createContext<ContextValue>(defaultContextValue);

export const ONECoreContextProvider: FC<PropsWithChildren<ONECoreContextProviderProps>> = ({
  children,
  organisationId = defaultContextValue.organisationId,
  config,
}) => {
  const [core, setCore] = useState<ONECore>();

  const initialize = useCallback(
    async (force?: boolean) => {
      if (core && !force) {
        return core;
      }

      try {
        const coreInstance = await initializeCore(config);
        setCore(coreInstance);
        return coreInstance;
      } catch (e) {
        reportException(e, 'Failed to initialize core');
        throw e;
      }
    },
    [core, config],
  );

  useEffect(
    () => {
      const corePromise = initialize();
      return () => {
        corePromise
          .then((c) => c?.uninitialize(false))
          .catch((e) => {
            reportException(e, 'Core uninitialization error');
          });
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const contextValue = useMemo(
    () => ({
      core: core ?? defaultContextValue.core,
      initialize,
      organisationId,
    }),
    [core, initialize, organisationId],
  );

  if (!core) {
    return null;
  }

  return <ONECoreContext.Provider value={contextValue}>{children}</ONECoreContext.Provider>;
};

export const useONECore = () => useContext(ONECoreContext);
