import { initializeHolderCore, initializeVerifierCore, ONECore } from '@procivis/react-native-one-core';
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
import { useCreateTrustAnchor } from './trust-entity';

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

export enum ONECoreUseType {
  holder = 'holder',
  verifier = 'verifier',
}

export type ONECoreContextProviderProps = {
  type: ONECoreUseType;
  organisationId?: string;
  publisherReference: string;
};

const ONECoreContext = createContext<ContextValue>(defaultContextValue);

export const ONECoreContextProvider: FC<PropsWithChildren<ONECoreContextProviderProps>> = ({
  children,
  organisationId = '11111111-2222-3333-a444-ffffffffffff',
  publisherReference,
  type,
}) => {
  const [core, setCore] = useState<ONECore>();
  const createTrustAnchor = useCreateTrustAnchor(publisherReference);

  const initialize = useCallback(
    async (force?: boolean) => {
      if (core && !force) {
        return core;
      }

      try {
        const coreInstance =
          type === ONECoreUseType.holder ? await initializeHolderCore() : await initializeVerifierCore();
        setCore(coreInstance);
        return coreInstance;
      } catch (e) {
        reportException(e, 'Failed to initialize core');
        throw e;
      }
    },
    [core, type],
  );

  useEffect(
    () => {
      const corePromise = initialize();
      return () => {
        corePromise.then((c) => c?.uninitialize(false));
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    if (!core) {
      return;
    }
    createTrustAnchor(core);
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
