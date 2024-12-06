import { ONECore } from '@procivis/react-native-one-core';
import { useCallback } from 'react';
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query';

import { DidListItem } from '../../../model/did';
import { ItemList } from '../../../model/query';
import {
  CreateRemoteTrustEntityRequest,
  CreateTrustAnchorRequest,
  CreateTrustEntityRequest,
  TrustAnchor,
  TrustAnchorListItem,
  TrustAnchorListQuery,
  TrustEntity,
} from '../../../model/trust-entity';
import { reportException } from '../../reporting';
import { useONECore } from './core-context';
import { HISTORY_LIST_QUERY_KEY } from './history';

const TRUST_ENTITY_DETAIL_QUERY_KEY = 'trust-entity-detail';

type GetTrustAnchorsFunction = (query: TrustAnchorListQuery) => Promise<ItemList<TrustAnchorListItem>>;
type CreateTrustAnchorFunction = (request: CreateTrustAnchorRequest) => Promise<TrustAnchor['id']>;
type GetTrustEntityByDidFunction = (didId: DidListItem['id']) => Promise<TrustEntity>;
type CreateTrustEntityFunction = (request: CreateTrustEntityRequest) => Promise<TrustEntity['id']>;
type CreateRemoteTrustEntityFunction = (request: CreateRemoteTrustEntityRequest) => Promise<TrustEntity['id']>;

export const useCreateTrustAnchor = (publisherReference: string) => {
  return useCallback(
    async (core: ONECore) => {
      if (!('getTrustAnchors' in core) || !('createTrustAnchor' in core)) {
        return Promise.reject();
      }
      const trustAnchors = await (core.getTrustAnchors as GetTrustAnchorsFunction)({
        page: 0,
        pageSize: 1,
      });
      if (trustAnchors.values.length > 0) {
        return;
      }
      await (core.createTrustAnchor as CreateTrustAnchorFunction)({
        isPublisher: false,
        name: 'Mobile trust list',
        publisherReference,
        type: 'SIMPLE_TRUST_LIST',
      }).catch((err) => {
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
    () =>
      didId && 'getTrustEntityByDid' in core
        ? (core.getTrustEntityByDid as GetTrustEntityByDidFunction)(didId)
        : Promise.reject(),
    {
      enabled: Boolean(didId),
      keepPreviousData: true,
    },
  );
};

export const useTrustEntities = (didIds: string[]) => {
  const { core } = useONECore();

  return useQueries(
    didIds.map((didId) => ({
      keepPreviousData: true,
      queryFn: () =>
        didId && 'getTrustEntityByDid' in core
          ? (core.getTrustEntityByDid as GetTrustEntityByDidFunction)(didId)
          : Promise.reject(),
      queryKey: [TRUST_ENTITY_DETAIL_QUERY_KEY, didId],
      enable: Boolean(didId),
    })),
  );
};

export const useCreateTrustEntity = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(
    async (request: CreateTrustEntityRequest) =>
      'createTrustEntity' in core ? (core.createTrustEntity as CreateTrustEntityFunction)(request) : Promise.reject(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
      },
    },
  );
};

export const useCreateRemoteTrustEntity = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(
    async (request: CreateRemoteTrustEntityRequest) =>
      'createRemoteTrustEntity' in core
        ? (core.createRemoteTrustEntity as CreateRemoteTrustEntityFunction)(request)
        : Promise.reject(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
      },
    },
  );
};
