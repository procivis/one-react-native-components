import {
  CreateProofSchemaRequest,
  ImportProofSchema,
  ProofSchema,
  ProofSchemaListItem,
  ProofSchemaListQuery,
} from '@procivis/react-native-one-core';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';

import { getQueryKeyFromProofSchemaListQueryParams } from '../../parsers/query';
import { useHTTPClient } from '../http/client';
import { useONECore } from './core-context';
import { CREDENTIAL_SCHEMA_LIST_QUERY_KEY } from './credential-schemas';
import { HISTORY_LIST_QUERY_KEY } from './history';

const PAGE_SIZE = 10;
export const PROOF_SCHEMA_LIST_QUERY_KEY = 'proof-schema-list';
export const PROOF_SCHEMA_IMPORT_DETAIL_QUERY_KEY = 'proof-schema-import';
export const PROOF_SCHEMA_DETAIL_QUERY_KEY = 'proof-schema-detail';
export const PROOF_SCHEMA_SHARE_QUERY_KEY = 'proof-schema-share';

export const useProofSchemas = (queryParams?: Partial<ProofSchemaListQuery>, keepPreviousData = true) => {
  const { core, organisationId } = useONECore();

  return useInfiniteQuery(
    [PROOF_SCHEMA_LIST_QUERY_KEY, ...getQueryKeyFromProofSchemaListQueryParams(queryParams)],
    ({ pageParam = 0 }) =>
      core
        .getProofSchemas({
          organisationId,
          page: pageParam,
          pageSize: PAGE_SIZE,
          ...queryParams,
        })
        .then(({ values }) => values),
    {
      getNextPageParam: (lastPage, allPages) => (lastPage.length === PAGE_SIZE ? allPages.length : undefined),
      keepPreviousData,
    },
  );
};

export const useProofSchemaDetail = (proofSchemaId: ProofSchemaListItem['id'] | undefined, active = true) => {
  const { core } = useONECore();

  return useQuery(
    [PROOF_SCHEMA_DETAIL_QUERY_KEY, proofSchemaId],
    () => (proofSchemaId ? core.getProofSchema(proofSchemaId) : undefined),
    {
      enabled: active && Boolean(proofSchemaId),
      keepPreviousData: true,
    },
  );
};

export const useProofSchemaImportDetail = (url: string) => {
  const httpClient = useHTTPClient();

  return useQuery(
    [PROOF_SCHEMA_IMPORT_DETAIL_QUERY_KEY, url],
    () =>
      httpClient.get(url).then((response) => {
        if (!response.ok) {
          throw response.originalError;
        }
        return response.data as ImportProofSchema;
      }),
    {
      keepPreviousData: true,
    },
  );
};

export const useProofSchemaAccept = () => {
  const queryClient = useQueryClient();
  const { core, organisationId } = useONECore();

  return useMutation(
    async ({ schema }: { schema: ImportProofSchema }) =>
      core.importProofSchema({
        organisationId,
        schema,
      }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(PROOF_SCHEMA_LIST_QUERY_KEY);
        await queryClient.invalidateQueries(CREDENTIAL_SCHEMA_LIST_QUERY_KEY);
        await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
      },
    },
  );
};

export const useProofSchemaCreate = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(async (proofSchema: CreateProofSchemaRequest) => core.createProofSchema(proofSchema), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(PROOF_SCHEMA_LIST_QUERY_KEY);
      await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
    },
  });
};

export const useProofSchemaDelete = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(async (proofSchemaId: ProofSchema['id']) => core.deleteProofSchema(proofSchemaId), {
    onSuccess: async (_, proofSchemaId) => {
      await queryClient.invalidateQueries(PROOF_SCHEMA_LIST_QUERY_KEY);
      await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
      await queryClient.invalidateQueries([PROOF_SCHEMA_DETAIL_QUERY_KEY, proofSchemaId]);
    },
  });
};

export const useShareProofSchema = (schemaId?: string) => {
  const { core } = useONECore();

  return useQuery(
    [PROOF_SCHEMA_SHARE_QUERY_KEY, schemaId],
    () => (schemaId ? core.shareProofSchema(schemaId) : Promise.reject()),
    {
      enabled: Boolean(schemaId),
      keepPreviousData: true,
    },
  );
};
