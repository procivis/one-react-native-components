import { CredentialListQuery, CredentialStateEnum, InvitationResult, OneError } from '@procivis/react-native-one-core';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';

import { getQueryKeyFromCredentialListQueryParams } from '../../parsers/query';
import { Transport } from '../connectivity/connectivity';
import { useONECore } from './core-context';
import { CREDENTIAL_SCHEMA_LIST_QUERY_KEY } from './credential-schemas';
import { OneErrorCode } from './error-code';
import { HISTORY_LIST_QUERY_KEY } from './history';

const PAGE_SIZE = 20;
export const CREDENTIAL_LIST_QUERY_KEY = 'credential-list';
export const CREDENTIAL_LIST_PAGED_QUERY_KEY = 'credential-list-paged';
export const CREDENTIAL_DETAIL_QUERY_KEY = 'credential-detail';

export const useCredentials = (queryParams?: Partial<CredentialListQuery>) => {
  const { core, organisationId } = useONECore();

  return useQuery(
    [CREDENTIAL_LIST_QUERY_KEY, ...getQueryKeyFromCredentialListQueryParams(queryParams)],
    async () => {
      const { values } = await core.getCredentials({
        organisationId,
        page: 0,
        // TODO: workaround pagination for now, until it's supported by UI
        pageSize: 10000,
        status: [CredentialStateEnum.ACCEPTED, CredentialStateEnum.SUSPENDED, CredentialStateEnum.REVOKED],
        ...queryParams,
      });
      return values;
    },
    {
      keepPreviousData: true,
    },
  );
};

export const usePagedCredentials = (queryParams?: Partial<CredentialListQuery>) => {
  const { core, organisationId } = useONECore();

  return useInfiniteQuery(
    [
      CREDENTIAL_LIST_QUERY_KEY,
      CREDENTIAL_LIST_PAGED_QUERY_KEY,
      ...getQueryKeyFromCredentialListQueryParams(queryParams),
    ],
    ({ pageParam = 0 }) =>
      core.getCredentials({
        organisationId,
        page: pageParam,
        pageSize: PAGE_SIZE,
        status: [CredentialStateEnum.ACCEPTED, CredentialStateEnum.SUSPENDED, CredentialStateEnum.REVOKED],
        ...queryParams,
      }),
    {
      getNextPageParam: (lastPage, allPages) => (allPages.length < lastPage.totalPages ? allPages.length : undefined),
      keepPreviousData: true,
    },
  );
};

export const useCredentialDetail = (credentialId: string | undefined, active = true) => {
  const { core } = useONECore();

  return useQuery(
    [CREDENTIAL_DETAIL_QUERY_KEY, credentialId],
    () => (credentialId ? core.getCredential(credentialId) : undefined),
    {
      enabled: active && Boolean(credentialId),
      keepPreviousData: true,
    },
  );
};

export const useInvitationHandler = () => {
  const queryClient = useQueryClient();
  const { core, organisationId } = useONECore();

  return useMutation(
    async ({ invitationUrl, transport }: { invitationUrl: string; transport: Transport }) =>
      core.handleInvitation(invitationUrl, organisationId, [transport]),
    {
      onSuccess: async (result: InvitationResult) => {
        if ('credentialIds' in result) {
          await queryClient.invalidateQueries(CREDENTIAL_LIST_QUERY_KEY);
          await queryClient.invalidateQueries(CREDENTIAL_SCHEMA_LIST_QUERY_KEY);
        }
        await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
      },
    },
  );
};

export const useCredentialAccept = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  type CredentialAcceptHookParams = {
    didId?: string;
    identifierId?: string;
    interactionId: string;
    keyId?: string;
    txCode?: string;
  };

  return useMutation(
    async ({ interactionId, didId, identifierId, keyId, txCode }: CredentialAcceptHookParams) =>
      core.holderAcceptCredential(interactionId, didId, identifierId, keyId, txCode),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(CREDENTIAL_LIST_QUERY_KEY);
        await queryClient.invalidateQueries(CREDENTIAL_DETAIL_QUERY_KEY);
        await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
      },
    },
  );
};

export const useCredentialReject = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(
    async (interactionId: string) =>
      core.holderRejectCredential(interactionId).catch((e) => {
        if (e instanceof OneError && e.code === OneErrorCode.OperationNotSupported) {
          return;
        }
        throw e;
      }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(CREDENTIAL_LIST_QUERY_KEY);
        await queryClient.invalidateQueries(CREDENTIAL_DETAIL_QUERY_KEY);
        await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
      },
    },
  );
};

export const useCredentialRevocationCheck = (forceRefresh: boolean) => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(async (credentialIds: string[]) => core.checkRevocation(credentialIds, forceRefresh), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(CREDENTIAL_LIST_QUERY_KEY);
      await queryClient.invalidateQueries(CREDENTIAL_DETAIL_QUERY_KEY);
      await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
    },
  });
};

export const useCredentialDelete = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(async (credentialId: string) => core.deleteCredential(credentialId), {
    onSuccess: async (_, credentialId) => {
      await queryClient.invalidateQueries(CREDENTIAL_LIST_QUERY_KEY);
      await queryClient.removeQueries([CREDENTIAL_DETAIL_QUERY_KEY, credentialId]);
      await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
    },
  });
};

export const useInvalidateCredentialDetails = () => {
  const queryClient = useQueryClient();

  return (credentialId: string | undefined) =>
    queryClient.invalidateQueries([CREDENTIAL_DETAIL_QUERY_KEY, credentialId]);
};
