import {
  CredentialListQuery,
  CredentialState,
  CredentialType,
  HandleInvitationRequest,
  HandleInvitationResponse,
  HolderAcceptCredentialRequest,
  InitiateIssuanceRequest,
  OneError,
} from '@procivis/react-native-one-core';
import { useInfiniteQuery, useMutation, useQueries, useQuery, useQueryClient } from 'react-query';

import { getQueryKeyFromCredentialListQueryParams } from '../../parsers/query';
import { useONECore } from './core-context';
import { CREDENTIAL_SCHEMA_DETAIL_QUERY_KEY, CREDENTIAL_SCHEMA_LIST_QUERY_KEY } from './credential-schemas';
import { OneErrorCode } from './error-code';
import { HISTORY_LIST_QUERY_KEY } from './history';
import { PROOF_LIST_QUERY_KEY } from './proofs';

const PAGE_SIZE = 20;
export const CREDENTIAL_LIST_QUERY_KEY = 'credential-list';
export const CREDENTIAL_LIST_PAGED_QUERY_KEY = 'credential-list-paged';
export const CREDENTIAL_DETAIL_QUERY_KEY = 'credential-detail';
export const CREDENTIAL_TRUST_INFORMATION_QUERY_KEY = 'credential-trust-information';

export const useCredentials = (queryParams?: Partial<CredentialListQuery>, enabled = true) => {
  const { core, organisationId } = useONECore();

  return useQuery(
    [CREDENTIAL_LIST_QUERY_KEY, ...getQueryKeyFromCredentialListQueryParams(queryParams)],
    async () => {
      const { values } = await core.listCredentials({
        organisationId,
        page: 0,
        // TODO: workaround pagination for now, until it's supported by UI
        pageSize: 10000,
        states: [CredentialState.ACCEPTED, CredentialState.SUSPENDED, CredentialState.REVOKED, CredentialState.EXPIRED],
        ...queryParams,
      });
      return values;
    },
    {
      enabled,
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
    ({ pageParam = 0 }: { pageParam?: number }) =>
      core.listCredentials({
        organisationId,
        page: pageParam,
        pageSize: PAGE_SIZE,
        states: [CredentialState.ACCEPTED, CredentialState.SUSPENDED, CredentialState.REVOKED, CredentialState.EXPIRED],
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
    async (request: Omit<HandleInvitationRequest, 'organisationId'>) =>
      core.handleInvitation({ organisationId, ...request }),
    {
      onSuccess: async (result: HandleInvitationResponse) => {
        if (result.type_ === 'PROOF_REQUEST') {
          await queryClient.invalidateQueries(PROOF_LIST_QUERY_KEY);
        } else {
          await queryClient.invalidateQueries(CREDENTIAL_LIST_QUERY_KEY);
          await queryClient.invalidateQueries(CREDENTIAL_SCHEMA_LIST_QUERY_KEY);
          await queryClient.invalidateQueries(CREDENTIAL_SCHEMA_DETAIL_QUERY_KEY);
        }
        await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
      },
    },
  );
};

export const useCredentialAccept = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(
    async (credentialAcceptHookParams: HolderAcceptCredentialRequest) =>
      core.holderAcceptCredential(credentialAcceptHookParams),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(CREDENTIAL_LIST_QUERY_KEY);
        await queryClient.invalidateQueries(CREDENTIAL_SCHEMA_LIST_QUERY_KEY);
        await queryClient.invalidateQueries(CREDENTIAL_SCHEMA_DETAIL_QUERY_KEY);
        await queryClient.invalidateQueries(CREDENTIAL_DETAIL_QUERY_KEY);
        await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
      },
    },
  );
};

export const useCredentialsOffer = (interactionId: string, ids: string[] | undefined) => {
  const { core, organisationId } = useONECore();

  return useQuery(
    ['credential-offer', interactionId],
    async () => {
      if (!ids) {
        return undefined;
      }
      const batches: Record<string, Record<string, string>> = {};
      const singles: string[] = [];
      const accepted = await core.listCredentials({ ids, organisationId, page: 0, pageSize: 1000 });
      accepted.values.forEach((credential) => {
        if (credential.type === CredentialType.BATCH_PARENT) {
          batches[credential.id] = {};
        } else {
          singles.push(credential.id);
        }
      });
      await Promise.all(Object.keys(batches).map(async (parentId) => {
        const credentialForFormat: Record<string, string> = {};
        const children = await core.listCredentials({ organisationId, page: 0, pageSize: 1000, parentId });
        children.values.forEach((credential) => {
          if (!credential.format || credentialForFormat[credential.format]) {
            return;
          }
          credentialForFormat[credential.format] = credential.id;
        });
        batches[parentId] = Object.entries(credentialForFormat).reduce<Record<string, string>>((acc, [format, id]) => {
          acc[id] = format;
          return acc;
        }, {});
      }));
      return { batches, singles };
    },
    {
      enabled: ids !== undefined,
    },
  );
};

export const useCredentialReject = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(
    async ({ credentialIds, interactionId }: { credentialIds?: string[], interactionId: string }) =>
      core.holderRejectCredential(interactionId, credentialIds).catch((e) => {
        if (e instanceof OneError && e.code === OneErrorCode.OperationNotSupported.toString()) {
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

export const useCredentialRejectFormat = () => {
  const queryClient = useQueryClient();
  const { core, organisationId } = useONECore();

  return useMutation(
    async ({ formats, interactionId, parentId }: { formats: string[], interactionId: string, parentId?: string }) => {
      const credentials = await core.listCredentials({
        formats,
        organisationId,
        page: 0,
        pageSize: 1000,
        parentId,
      });
      const credentialIds = credentials.values.map((c) => c.id);
      core.holderRejectCredential(interactionId, credentialIds).catch((e) => {
        if (e instanceof OneError && e.code === OneErrorCode.OperationNotSupported.toString()) {
          return;
        }
        throw e;
      });
    },
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
      queryClient.removeQueries([CREDENTIAL_DETAIL_QUERY_KEY, credentialId]);
      await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
    },
  });
};

export const useCredentialRefresh = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(async (interactionId: string) => core.holderRefreshCredential(interactionId), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(CREDENTIAL_LIST_QUERY_KEY);
      await queryClient.invalidateQueries(CREDENTIAL_DETAIL_QUERY_KEY);
      await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
    },
  });
};

export const useInvalidateCredentialDetails = () => {
  const queryClient = useQueryClient();

  return (credentialId: string | undefined) =>
    queryClient.invalidateQueries([CREDENTIAL_DETAIL_QUERY_KEY, credentialId]);
};

export const useInitiateIssuance = () => {
  const queryClient = useQueryClient();
  const { core, organisationId } = useONECore();

  return useMutation(
    async (request: Omit<InitiateIssuanceRequest, 'organisationId'>) =>
      core.initiateIssuance({ organisationId, ...request }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
      },
    },
  );
};

export const useContinueIssuance = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(async (url: string) => core.continueIssuance(url), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(CREDENTIAL_LIST_QUERY_KEY);
      await queryClient.invalidateQueries(CREDENTIAL_SCHEMA_LIST_QUERY_KEY);
      await queryClient.invalidateQueries(CREDENTIAL_SCHEMA_DETAIL_QUERY_KEY);
      await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
    },
  });
};

export const useCredentialTrustInformation = (credentialId: string | undefined) => {
  const { core } = useONECore();

  return useQuery(
    [CREDENTIAL_TRUST_INFORMATION_QUERY_KEY, credentialId],
    () => (credentialId ? core.getCredentialTrustInformation(credentialId) : undefined),
    {
      enabled: Boolean(credentialId),
      keepPreviousData: true,
    },
  );
};

export const useCredentialsTrustInformation = (credentialIds: string[]) => {
  const { core } = useONECore();

  return useQueries(
    credentialIds.map((id) => ({
      keepPreviousData: true,
      meta: {
        id,
      },
      queryFn: () => core.getCredentialTrustInformation(id),
      queryKey: [CREDENTIAL_TRUST_INFORMATION_QUERY_KEY, id],
    })),
  );
};
