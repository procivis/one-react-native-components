import {
  HolderActivateInstanceRequest,
  HolderInstance,
  HolderRegisterInstanceRequest,
  InstanceStatus,
} from '@procivis/react-native-one-core';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { reportException } from '../../reporting';
import { useONECore } from './core-context';
import { ORGANISATION_DETAIL_QUERY_KEY, VERIFIER_INSTANCE_QUERY_KEY, WALLET_INSTANCE_QUERY_KEY } from './organisation';

const INSTANCE_KEY_TYPE = 'ECDSA';

export const useRegisterInstance = () => {
  const queryClient = useQueryClient();
  const { core, organisationId } = useONECore();

  return useMutation(
    async (request: Omit<HolderRegisterInstanceRequest, 'organisationId' | 'keyType'>) =>
      core.holderRegisterInstance({
        keyType: INSTANCE_KEY_TYPE,
        organisationId,
        ...request,
      }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(ORGANISATION_DETAIL_QUERY_KEY);
        await queryClient.invalidateQueries(VERIFIER_INSTANCE_QUERY_KEY);
        await queryClient.invalidateQueries(WALLET_INSTANCE_QUERY_KEY);
      },
    },
  );
};

export const useInstanceDetail = (id: HolderInstance['id'] | undefined, active = true) => {
  const { core } = useONECore();

  return useQuery(
    [ORGANISATION_DETAIL_QUERY_KEY, 'instance', id],
    () => (id ? core.holderGetInstance(id) : undefined),
    {
      enabled: active && Boolean(id),
      keepPreviousData: true,
    },
  );
};

export const useActivateInstance = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(
    async ({
      id,
      ...request
    }: {
      id: HolderInstance['id'];
    } & Omit<HolderActivateInstanceRequest, 'keyType'>) =>
      core.holderActivateInstance(id, {
        keyType: INSTANCE_KEY_TYPE,
        ...request,
      }),
    {
      onError: async (err) => {
        reportException(err, 'Activate instance failure');
        await queryClient.invalidateQueries(ORGANISATION_DETAIL_QUERY_KEY);
        await queryClient.invalidateQueries(VERIFIER_INSTANCE_QUERY_KEY);
        await queryClient.invalidateQueries(WALLET_INSTANCE_QUERY_KEY);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(ORGANISATION_DETAIL_QUERY_KEY);
        await queryClient.invalidateQueries(VERIFIER_INSTANCE_QUERY_KEY);
        await queryClient.invalidateQueries(WALLET_INSTANCE_QUERY_KEY);
      },
    },
  );
};

export const useInstanceStatus = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(async (instanceId: HolderInstance['id']) => core.holderInstanceStatus(instanceId), {
    onError: async (err) => {
      reportException(err, 'Refresh instance failure');
      await queryClient.invalidateQueries(ORGANISATION_DETAIL_QUERY_KEY);
    },
    onSuccess: () => queryClient.invalidateQueries(ORGANISATION_DETAIL_QUERY_KEY),
  });
};

export const useInstanceCheck = (instanceId: HolderInstance['id'] | undefined) => {
  const { data: instanceDetail, isLoading } = useInstanceDetail(instanceId);
  const { mutateAsync: refresh, isLoading: isRefreshing, status: refreshStatus } = useInstanceStatus();

  useEffect(() => {
    if (isLoading || refreshStatus !== 'idle') {
      return;
    }
    if (instanceId && instanceDetail?.status === InstanceStatus.ACTIVE) {
      void refresh(instanceId);
    }
  }, [isLoading, refreshStatus, instanceDetail, refresh, instanceId]);

  return {
    instanceDetail: isLoading || isRefreshing ? undefined : instanceDetail,
    isLoading: isLoading || isRefreshing,
  };
};
