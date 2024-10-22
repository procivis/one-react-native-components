import { CredentialListQuery, HistoryListQuery } from '@procivis/react-native-one-core';

export const getQueryKeyFromCredentialListQueryParams = (queryParams?: Partial<CredentialListQuery>) => {
  if (!queryParams) {
    return [];
  }
  const { name, sort, sortDirection, exact, role, ids, status, include } = queryParams;
  return [name, sort, sortDirection, exact, role, ids, status, include];
};

export const getQueryKeyFromHistoryListQueryParams = (queryParams?: Partial<HistoryListQuery>) => {
  if (!queryParams) {
    return [];
  }

  const {
    entityId,
    action,
    entityTypes,
    createdDateFrom,
    createdDateTo,
    didId,
    credentialId,
    credentialSchemaId,
    searchText,
    searchType,
  } = queryParams;
  return [
    entityId,
    action,
    entityTypes,
    createdDateFrom,
    createdDateTo,
    didId,
    credentialId,
    credentialSchemaId,
    searchText,
    searchType,
  ];
};
