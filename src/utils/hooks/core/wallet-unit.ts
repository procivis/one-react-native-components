import {
  HolderWalletUnit,
  HolderWalletUnitUpdateRequest,
  WalletProvider,
  WalletUnitStatus,
} from '@procivis/react-native-one-core';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { reportException } from '../../reporting';
import { useONECore } from './core-context';

export const WALLET_UNIT_QUERY_KEY = 'wallet-unit';
export const WALLET_UNIT_TRUST_COLLECTIONS_QUERY_KEY = 'wallet-unit-trust-collections';

export const useWalletUnitDetail = (walletUnitId: HolderWalletUnit['id'] | undefined, active = true) => {
  const { core } = useONECore();

  return useQuery(
    [WALLET_UNIT_QUERY_KEY, walletUnitId],
    () => (walletUnitId ? core.holderGetWalletUnit(walletUnitId) : undefined),
    {
      enabled: active && Boolean(walletUnitId),
      keepPreviousData: true,
    },
  );
};

export const useWalletUnitTrustCollections = (walletUnitId: HolderWalletUnit['id'] | undefined, active = true) => {
  const { core } = useONECore();

  return useQuery(
    [WALLET_UNIT_TRUST_COLLECTIONS_QUERY_KEY, walletUnitId],
    () => (walletUnitId ? core.holderGetWalletUnitTrustCollections(walletUnitId) : undefined),
    {
      enabled: active && Boolean(walletUnitId),
      keepPreviousData: true,
    },
  );
};

export const useRegisterWalletUnit = () => {
  const queryClient = useQueryClient();
  const { core, organisationId } = useONECore();

  return useMutation(
    async (walletProvider: WalletProvider) =>
      core.holderRegisterWalletUnit({
        keyType: 'ECDSA',
        organisationId,
        walletProvider,
      }),

    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(WALLET_UNIT_QUERY_KEY);
        await queryClient.invalidateQueries(WALLET_UNIT_TRUST_COLLECTIONS_QUERY_KEY);
      },
    },
  );
};

export const useWalletUnitStatus = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(async (walletUnitId: HolderWalletUnit['id']) => core.holderWalletUnitStatus(walletUnitId), {
    onError: async (err) => {
      reportException(err, 'Refresh wallet unit failure');
      await queryClient.invalidateQueries(WALLET_UNIT_QUERY_KEY);
    },
    onSuccess: () => queryClient.invalidateQueries(WALLET_UNIT_QUERY_KEY),
  });
};

export const useWalletUnitUpdate = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(
    async ({ walletUnitId, update }: { walletUnitId: HolderWalletUnit['id']; update: HolderWalletUnitUpdateRequest }) =>
      core.holderWalletUnitUpdate(walletUnitId, update),
    {
      onError: async (err) => {
        reportException(err, 'Update wallet unit failure');
        await queryClient.invalidateQueries(WALLET_UNIT_QUERY_KEY);
        await queryClient.invalidateQueries(WALLET_UNIT_TRUST_COLLECTIONS_QUERY_KEY);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(WALLET_UNIT_QUERY_KEY);
        await queryClient.invalidateQueries(WALLET_UNIT_TRUST_COLLECTIONS_QUERY_KEY);
      },
    },
  );
};

export const useWalletUnitCheck = (walletUnitId: HolderWalletUnit['id'] | undefined) => {
  const { data: walletUnitDetail, isLoading } = useWalletUnitDetail(walletUnitId);
  const { mutateAsync: refreshWalletUnit, isLoading: isRefreshing, status: refreshStatus } = useWalletUnitStatus();

  useEffect(() => {
    if (isLoading || refreshStatus !== 'idle') {
      return;
    }
    if (walletUnitId && walletUnitDetail?.status === WalletUnitStatus.ACTIVE) {
      void refreshWalletUnit(walletUnitId);
    }
  }, [isLoading, refreshStatus, walletUnitDetail, refreshWalletUnit, walletUnitId]);

  return {
    isLoading: isLoading || isRefreshing,
    walletUnitDetail: isLoading || isRefreshing ? undefined : walletUnitDetail,
  };
};
