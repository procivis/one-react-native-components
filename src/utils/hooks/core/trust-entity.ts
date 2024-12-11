import {
  CreateRemoteTrustEntityRequest,
  ONECore,
  UpdateRemoteTrustEntityRequest,
} from '@procivis/react-native-one-core';
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { reportException } from '../../reporting';
import { useONECore } from './core-context';
import { HISTORY_LIST_QUERY_KEY } from './history';

const TRUST_ENTITY_DETAIL_QUERY_KEY = 'trust-entity-detail';
const REMOTE_TRUST_ENTITY_DETAIL_QUERY_KEY = 'remote-trust-entity-detail';

export const useCreateTrustAnchor = (publisherReference: string) => {
  return useCallback(
    async (core: ONECore) => {
      const trustAnchors = await core.getTrustAnchors({
        page: 0,
        pageSize: 1,
      });
      if (trustAnchors.values.length > 0) {
        return;
      }
      await core
        .createTrustAnchor({
          isPublisher: false,
          name: 'Mobile trust list',
          publisherReference,
          type: 'SIMPLE_TRUST_LIST',
        })
        .catch((err) => {
          reportException(err, 'Failed to create trust anchor');
          throw err;
        });
    },
    [publisherReference],
  );
};

export const useTrustEntity = (didId: string | undefined) => {
  const { core } = useONECore();

  return useQuery(
    [TRUST_ENTITY_DETAIL_QUERY_KEY, didId],
    () => (didId ? core.getTrustEntityByDid(didId) : Promise.reject()),
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
    () => (did ? core.getRemoteTrustEntity(did) : Promise.reject()),
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
    onSuccess: () => {
      queryClient.invalidateQueries(REMOTE_TRUST_ENTITY_DETAIL_QUERY_KEY);
      queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
    },
  });
};

export const useUpdateRemoteTrustEntity = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(async (request: UpdateRemoteTrustEntityRequest) => core.updateRemoteTrustEntity(request), {
    onSuccess: () => {
      queryClient.invalidateQueries(REMOTE_TRUST_ENTITY_DETAIL_QUERY_KEY);
      queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
    },
  });
};
