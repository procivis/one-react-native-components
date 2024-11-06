import {
  CredentialListQuery,
  CredentialStateEnum,
  InvitationResult,
  OneError,
  OneErrorCode,
} from '@procivis/react-native-one-core';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';

import { getQueryKeyFromCredentialListQueryParams } from '../../parsers/query';
import { useONECore } from './core-context';
import { CREDENTIAL_SCHEMA_LIST_QUERY_KEY } from './credential-schemas';
import { HISTORY_LIST_QUERY_KEY } from './history';

const PAGE_SIZE = 20;
const CREDENTIAL_LIST_QUERY_KEY = 'credential-list';
const CREDENTIAL_LIST_PAGED_QUERY_KEY = 'credential-list-paged';
const CREDENTIAL_DETAIL_QUERY_KEY = 'credential-detail';

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

  type HandleInvitationParams = Parameters<typeof core.handleInvitation>;
  type InvitationHandlerHookParams = HandleInvitationParams extends [
    url: string,
    organisationType: string,
    transport: string[] | undefined,
  ]
    ? { invitationUrl: string; transport: 'HTTP' | 'MQTT' | 'BLE' }
    : { invitationUrl: string; transport?: never };
  return useMutation(
    async ({ invitationUrl, transport }: InvitationHandlerHookParams) => {
      const params = transport
        ? ([invitationUrl, organisationId, [transport]] as unknown as HandleInvitationParams)
        : ([invitationUrl, organisationId] as unknown as HandleInvitationParams);
      return core.handleInvitation.apply(core.handleInvitation, params);
    },
    {
      onSuccess: (result: InvitationResult) => {
        if ('credentialIds' in result) {
          queryClient.invalidateQueries(CREDENTIAL_LIST_QUERY_KEY);
          queryClient.invalidateQueries(CREDENTIAL_SCHEMA_LIST_QUERY_KEY);
        }
        queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
      },
    },
  );
};

export const useCredentialAccept = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  type HolderAcceptCredentialParams = Parameters<typeof core.holderAcceptCredential>;
  type CredentialAcceptHookParams = HolderAcceptCredentialParams extends [
    interactionId: string,
    didId: string,
    keyId: string | undefined,
    txCode: string | undefined,
  ]
    ? { didId: string; interactionId: string; keyId?: string; txCode: string | null }
    : { didId: string; interactionId: string; keyId?: string; txCode?: never };

  return useMutation(
    async ({ interactionId, didId, keyId, txCode }: CredentialAcceptHookParams) => {
      const params =
        txCode || txCode === null
          ? ([interactionId, didId, keyId, txCode ?? undefined] as unknown as HolderAcceptCredentialParams)
          : ([interactionId, didId, keyId] as unknown as HolderAcceptCredentialParams);
      return core.holderAcceptCredential.apply(core.holderAcceptCredential, params);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CREDENTIAL_LIST_QUERY_KEY);
        queryClient.invalidateQueries(CREDENTIAL_DETAIL_QUERY_KEY);
        queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
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
        if (e instanceof OneError && e.code === OneErrorCode.NotSupported) {
          return;
        }
        throw e;
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CREDENTIAL_LIST_QUERY_KEY);
        queryClient.invalidateQueries(CREDENTIAL_DETAIL_QUERY_KEY);
        queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
      },
    },
  );
};

export const useCredentialRevocationCheck = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(async (credentialIds: string[]) => core.checkRevocation(credentialIds), {
    onSuccess: () => {
      queryClient.invalidateQueries(CREDENTIAL_LIST_QUERY_KEY);
      queryClient.invalidateQueries(CREDENTIAL_DETAIL_QUERY_KEY);
      queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
    },
  });
};

export const useCredentialDelete = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(async (credentialId: string) => core.deleteCredential(credentialId), {
    onSuccess: (_, credentialId) => {
      queryClient.invalidateQueries(CREDENTIAL_LIST_QUERY_KEY);
      queryClient.invalidateQueries([CREDENTIAL_DETAIL_QUERY_KEY, credentialId]);
      queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
    },
  });
};

export const useInvalidateCredentialDetails = () => {
  const queryClient = useQueryClient();

  return (credentialId: string | undefined) =>
    queryClient.invalidateQueries([CREDENTIAL_DETAIL_QUERY_KEY, credentialId]);
};
