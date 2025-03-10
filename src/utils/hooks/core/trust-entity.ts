import {
  CreateRemoteTrustEntityRequest,
  ONECore,
  OneError,
  TrustAnchor,
  UpdateRemoteTrustEntityRequest,
} from '@procivis/react-native-one-core';
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { reportException } from '../../reporting';
import { useHTTPClient } from '../http/client';
import { useONECore } from './core-context';
import { OneErrorCode } from './error-code';
import { HISTORY_LIST_QUERY_KEY } from './history';

export const TRUST_ENTITY_DETAIL_QUERY_KEY = 'trust-entity-detail';
export const REMOTE_TRUST_ENTITY_DETAIL_QUERY_KEY = 'remote-trust-entity-detail';

export const useCreateTrustAnchor = (publisherReference: string) => {
  const httpClient = useHTTPClient();

  return useCallback(
    async (core: ONECore) => {
      const trustAnchors = await core.getTrustAnchors({
        page: 0,
        pageSize: 1,
      });
      if (trustAnchors.values.length > 0) {
        return;
      }
      const response = await httpClient.get<TrustAnchor>(publisherReference);
      if (!response.ok || !response.data) {
        return;
      }
      const trustAnchor = response.data;
      await core
        .createTrustAnchor({
          isPublisher: false,
          name: trustAnchor.name,
          publisherReference,
          type: TrustManagementEnum.SimpleTrustList,
        })
        .catch((err) => {
          reportException(err, 'Failed to create trust anchor');
          throw err;
        });
    },
    [publisherReference, httpClient],
  );
};

export const useTrustEntity = (didId: string | undefined) => {
  const { core } = useONECore();

  return useQuery(
    [TRUST_ENTITY_DETAIL_QUERY_KEY, didId],
    () =>
      didId
        ? core.getTrustEntityByDid(didId).catch((e) => {
            if (e instanceof OneError && e.code === OneErrorCode.NoTrustEntityFound) {
              return null;
            }
            throw e;
          })
        : undefined,
    {
      enabled: Boolean(didId),
      keepPreviousData: true,
    },
  );
};

export const useRemoteTrustEntity = (did: string | undefined) => {
  const { core } = useONECore();

  return useQuery(
    [REMOTE_TRUST_ENTITY_DETAIL_QUERY_KEY, did],
    () => (did ? core.getRemoteTrustEntity(did) : undefined),
    {
      enabled: Boolean(did),
      keepPreviousData: true,
    },
  );
};

export const useCreateRemoteTrustEntity = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(async (request: CreateRemoteTrustEntityRequest) => core.createRemoteTrustEntity(request), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(REMOTE_TRUST_ENTITY_DETAIL_QUERY_KEY);
      await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
    },
  });
};

export const useUpdateRemoteTrustEntity = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(async (request: UpdateRemoteTrustEntityRequest) => core.updateRemoteTrustEntity(request), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(REMOTE_TRUST_ENTITY_DETAIL_QUERY_KEY);
      await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
    },
  });
};

export enum TrustManagementEnum {
  SimpleTrustList = 'SIMPLE_TRUST_LIST',
}
