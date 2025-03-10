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
import { getEnabledTrustManagement } from './core-config';
import { TrustManagementEnum, useCreateTrustAnchor } from './trust-entity';

interface ContextValue {
  core: ONECore;
  organisationId: string;
  initialize: (force?: boolean) => Promise<ONECore>;
}

const defaultContextValue: ContextValue = {
  core: {} as ONECore,
  organisationId: '11111111-2222-3333-a444-ffffffffffff',
  initialize: () => Promise.reject(),
};

export type ONECoreContextProviderProps = {
  config?: Record<string, unknown>;
  organisationId?: string;
  publisherReference: string;
};

const ONECoreContext = createContext<ContextValue>(defaultContextValue);

export const ONECoreContextProvider: FC<PropsWithChildren<ONECoreContextProviderProps>> = ({
  children,
  organisationId = '11111111-2222-3333-a444-ffffffffffff',
  publisherReference,
  config,
}) => {
  const [core, setCore] = useState<ONECore>();
  const createTrustAnchor = useCreateTrustAnchor(publisherReference);

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

  useEffect(() => {
    if (!core) {
      return;
    }

    core
      .getConfig()
      .then((coreConfig) => {
        const trustManagementEnabled = getEnabledTrustManagement(coreConfig).includes(
          TrustManagementEnum.SimpleTrustList,
        );

        if (trustManagementEnabled) {
          createTrustAnchor(core).catch(() => {});
        }
      })
      .catch(() => {});
  }, [core, createTrustAnchor]);

  const contextValue = useMemo(
    () => ({
      core: core ?? defaultContextValue.core,
      organisationId,
      initialize,
    }),
    [core, initialize, organisationId],
  );

  if (!core) {
    return null;
  }

  return <ONECoreContext.Provider value={contextValue}>{children}</ONECoreContext.Provider>;
};

export const useONECore = () => useContext(ONECoreContext);
