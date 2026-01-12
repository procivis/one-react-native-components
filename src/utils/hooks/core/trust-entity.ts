import {
  CreateRemoteTrustEntityRequestBindingDto,
  GetTrustAnchorResponseBindingDto,
  IdentifierTypeBindingEnum,
  ONECore,
  OneError,
  UpdateRemoteTrustEntityFromDidRequestBindingDto,
} from '@procivis/react-native-one-core';
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { reportException } from '../../reporting';
import { useHTTPClient } from '../http/client';
import { useONECore } from './core-context';
import { OneErrorCode } from './error-code';
import { HISTORY_LIST_QUERY_KEY } from './history';
import { useIdentifierDetails } from './identifiers';

export const TRUST_ENTITY_DETAIL_QUERY_KEY = 'trust-entity-detail';
export const REMOTE_TRUST_ENTITY_DETAIL_QUERY_KEY = 'remote-trust-entity-detail';

export const useCreateTrustAnchor = () => {
  const httpClient = useHTTPClient();

  return useCallback(
    async (core: ONECore, publisherReference: string) => {
      const trustAnchors = await core.listTrustAnchors({
        page: 0,
        pageSize: 1,
      });
      if (trustAnchors.values.length > 0) {
        return;
      }
      const response = await httpClient.get<GetTrustAnchorResponseBindingDto>(publisherReference);
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
    [httpClient],
  );
};

export const useTrustEntity = (identifierId: string | undefined) => {
  const { core } = useONECore();

  const { data: identifierDetail } = useIdentifierDetails(identifierId);

  return useQuery(
    [TRUST_ENTITY_DETAIL_QUERY_KEY, identifierId],
    () =>
      identifierId && identifierDetail
        ? core
            .resolveTrustEntityByIdentifier({
              identifiers: [
                {
                  certificateId:
                    identifierDetail?.type === IdentifierTypeBindingEnum.CERTIFICATE
                      ? identifierDetail.certificates?.[0]?.id
                      : undefined,
                  id: identifierId,
                },
              ],
            })
            .then((result) => {
              return result[identifierId]?.[0]?.trustEntity ?? null;
            })
            .catch((e) => {
              if (e instanceof OneError && e.code === OneErrorCode.NoTrustEntityFound) {
                return null;
              }
              throw e;
            })
        : undefined,
    {
      enabled: Boolean(identifierDetail),
      keepPreviousData: true,
    },
  );
};

export const useRemoteTrustEntity = (identifierId: string | undefined) => {
  const { core } = useONECore();

  const { data: identifierDetail } = useIdentifierDetails(identifierId);

  return useQuery(
    [REMOTE_TRUST_ENTITY_DETAIL_QUERY_KEY, identifierId],
    () => (identifierDetail?.did ? core.getRemoteTrustEntity(identifierDetail.did.id) : undefined),
    {
      enabled: Boolean(identifierDetail?.did),
      keepPreviousData: true,
    },
  );
};

export const useCreateRemoteTrustEntity = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(
    async (
      request: Omit<CreateRemoteTrustEntityRequestBindingDto, 'didId'> & { identifierId?: string; didId?: string },
    ) => {
      const { identifierId, didId } = request;

      let entityDidId = didId;

      if (identifierId) {
        const identifierDetail = await core.getIdentifier(identifierId);
        entityDidId = identifierDetail?.did?.id;
      }

      return core.createRemoteTrustEntity({
        ...request,
        didId: entityDidId!,
      });
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(REMOTE_TRUST_ENTITY_DETAIL_QUERY_KEY);
        await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
      },
    },
  );
};

export const useUpdateRemoteTrustEntity = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(
    async (
      request: Omit<UpdateRemoteTrustEntityFromDidRequestBindingDto, 'didId'> & {
        identifierId?: string;
        didId?: string;
      },
    ) => {
      const { identifierId, didId } = request;

      let entityDidId = didId;
      if (identifierId) {
        const identifierDetail = await core.getIdentifier(identifierId);
        entityDidId = identifierDetail?.did?.id;
      }

      return core.updateRemoteTrustEntity({
        ...request,
        didId: entityDidId!,
      });
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(REMOTE_TRUST_ENTITY_DETAIL_QUERY_KEY);
        await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
      },
    },
  );
};

export enum TrustManagementEnum {
  SimpleTrustList = 'SIMPLE_TRUST_LIST',
}
