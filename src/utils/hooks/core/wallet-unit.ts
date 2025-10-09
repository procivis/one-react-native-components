import { WalletProvider, WalletUnitStatusEnum } from '@procivis/react-native-one-core';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { useONECore } from './core-context';

export const ATTESTATION_QUERY_KEY = 'wallet-unit-attestation';

export const useWalletUnitAttestation = (active = true) => {
  const { core, organisationId } = useONECore();

  return useQuery(
    [ATTESTATION_QUERY_KEY, organisationId],
    () => core.holderGetWalletUnitAttestation(organisationId),
    {
      enabled: active,
      keepPreviousData: true,
    },
  );
};

export const useRegisterWalletUnit = () => {
  const queryClient = useQueryClient();
  const { core, organisationId } = useONECore();

  return useMutation(
    async (walletProvider: WalletProvider) => {
      const result = await core.holderRegisterWalletUnit({
        keyType: 'ECDSA',
        organisationId,
        walletProvider,
      });

      return result;
    },
    {
      onSuccess: () =>
        queryClient.invalidateQueries([ATTESTATION_QUERY_KEY, organisationId]),
    },
  );
};

export const useRefreshWalletUnit = () => {
  const queryClient = useQueryClient();
  const { core, organisationId } = useONECore();

  return useMutation(
    async (appIntegrityCheckRequired: boolean) =>
      core.holderRefreshWalletUnit({
        appIntegrityCheckRequired,
        organisationId,
      }),
    {
      onError: () =>
        queryClient.invalidateQueries([ATTESTATION_QUERY_KEY, organisationId]),
      onSuccess: () =>
        queryClient.invalidateQueries([ATTESTATION_QUERY_KEY, organisationId]),
    },
  );
};

export const useWalletUnitCheck = (appIntegrityCheckRequired: boolean) => {
  const { data: walletUnitAttestation, isLoading } = useWalletUnitAttestation();
  const {
    mutateAsync: refreshWalletUnit,
    isLoading: isRefreshing,
    status: refreshStatus,
  } = useRefreshWalletUnit();

  useEffect(() => {
    if (isLoading || refreshStatus !== 'idle') {
      return;
    }
    if (walletUnitAttestation?.status === WalletUnitStatusEnum.ACTIVE) {
      void refreshWalletUnit(appIntegrityCheckRequired);
    }
  }, [isLoading, refreshStatus, walletUnitAttestation, refreshWalletUnit, appIntegrityCheckRequired]);

  return {
    isLoading: isLoading || isRefreshing,
    walletUnitAttestation:
      isLoading || isRefreshing ? undefined : walletUnitAttestation,
  };
};
