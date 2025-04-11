import { CredentialSchemaListQuery, ImportCredentialSchemaRequestSchema } from '@procivis/react-native-one-core';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';

import { getQueryKeyFromCredentialSchemaListQueryParams } from '../../parsers/query';
import { useHTTPClient } from '../http/client';
import { useONECore } from './core-context';
import { HISTORY_LIST_QUERY_KEY } from './history';

const PAGE_SIZE = 10;
export const CREDENTIAL_SCHEMA_LIST_QUERY_KEY = 'credential-schema-list';
export const CREDENTIAL_SCHEMA_DETAIL_QUERY_KEY = 'credential-schema-detail';
export const CREDENTIAL_SCHEMA_PREVIEW_QUERY_KEY = 'credential-schema-preview';
export const CREDENTIAL_SCHEMA_SHARE_QUERY_KEY = 'credential-schema-share';

export const useCredentialSchemas = (queryParams?: Partial<CredentialSchemaListQuery>) => {
  const { core, organisationId } = useONECore();

  return useInfiniteQuery(
    [CREDENTIAL_SCHEMA_LIST_QUERY_KEY, ...getQueryKeyFromCredentialSchemaListQueryParams(queryParams)],
    ({ pageParam = 0 }) =>
      core
        .getCredentialSchemas({
          organisationId,
          page: pageParam,
          pageSize: PAGE_SIZE,
          ...queryParams,
        })
        .then(({ values }) => values),
    {
      getNextPageParam: (lastPage, allPages) => (lastPage.length === PAGE_SIZE ? allPages.length : undefined),
      keepPreviousData: true,
    },
  );
};

export const useCredentialSchemaPreview = (url: string) => {
  const httpClient = useHTTPClient();

  return useQuery(
    [CREDENTIAL_SCHEMA_PREVIEW_QUERY_KEY, url],
    () =>
      httpClient.get(url).then((response) => {
        if (!response.ok) {
          throw response.originalError;
        }
        return response.data as ImportCredentialSchemaRequestSchema;
      }),
    {
      keepPreviousData: true,
    },
  );
};

export const useCredentialSchemaAccept = () => {
  const queryClient = useQueryClient();
  const { core, organisationId } = useONECore();

  return useMutation(
    async (schema: ImportCredentialSchemaRequestSchema) =>
      core.importCredentialSchema({
        organisationId,
        schema,
      }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(CREDENTIAL_SCHEMA_LIST_QUERY_KEY);
        await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
      },
    },
  );
};

export const useCredentialSchemaDetail = (credentialId: string | undefined, active = true) => {
  const { core } = useONECore();

  return useQuery(
    [CREDENTIAL_SCHEMA_DETAIL_QUERY_KEY, credentialId],
    () => (credentialId ? core.getCredentialSchema(credentialId) : undefined),
    {
      enabled: active && Boolean(credentialId),
      keepPreviousData: true,
    },
  );
};

export const useCredentialSchemaDelete = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(async (credentialSchemaId: string) => core.deleteCredentialSchema(credentialSchemaId), {
    onSuccess: async (_, credentialId) => {
      await queryClient.invalidateQueries(CREDENTIAL_SCHEMA_LIST_QUERY_KEY);
      await queryClient.removeQueries([CREDENTIAL_SCHEMA_DETAIL_QUERY_KEY, credentialId]);
      await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
    },
  });
};

export const useShareCredentialSchema = (schemaId?: string) => {
  const { core } = useONECore();

  return useQuery(
    [CREDENTIAL_SCHEMA_SHARE_QUERY_KEY, schemaId],
    () => (schemaId ? core.shareCredentialSchema(schemaId) : Promise.reject()),
    {
      enabled: Boolean(schemaId),
      keepPreviousData: true,
    },
  );
};
