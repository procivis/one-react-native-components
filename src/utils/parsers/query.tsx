import {
  CredentialListQuery,
  CredentialSchemaListQuery,
  DidListQuery,
  HistoryListQuery,
 IdentifierListQuery,  ProofListQuery,
  ProofSchemaListQuery } from '@procivis/react-native-one-core';

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
    identifierId,
    credentialId,
    credentialSchemaId,
    searchText,
    searchType,
    proofSchemaId,
  } = queryParams;
  return [
    entityId,
    action,
    entityTypes,
    createdDateFrom,
    createdDateTo,
    identifierId,
    credentialId,
    credentialSchemaId,
    searchText,
    searchType,
    proofSchemaId,
  ];
};

export const getQueryKeyFromCredentialSchemaListQueryParams = (queryParams?: Partial<CredentialSchemaListQuery>) => {
  if (!queryParams) {
    return [];
  }
  const { name, sort, sortDirection, exact, ids, include } = queryParams;
  return [name, sort, sortDirection, exact, ids, include];
};

export const getQueryKeyFromProofSchemaListQueryParams = (queryParams?: Partial<ProofSchemaListQuery>) => {
  if (!queryParams) {
    return [];
  }
  const { name, sort, sortDirection, exact, ids } = queryParams;
  return [name, sort, sortDirection, exact, ids];
};

export const getQueryKeyFromProofListQueryParams = (queryParams?: Partial<ProofListQuery>) => {
  if (!queryParams) {
    return [];
  }
  const { name, sort, sortDirection, exact, ids, proofStates, proofSchemaIds } = queryParams;
  return [name, sort, sortDirection, exact, ids, proofStates, proofSchemaIds];
};

export const getQueryKeyFromDidListQueryParams = (queryParams?: Partial<DidListQuery>) => {
  if (!queryParams) {
    return [];
  }

  const { name, did, type, deactivated, keyAlgorithms, keyRoles } = queryParams;
  return [name, did, type, deactivated, keyAlgorithms, keyRoles];
};

export const getQueryKeyFromIdentifierListQueryParams = (queryParams?: Partial<IdentifierListQuery>) => {
  if (!queryParams) {
    return [];
  }

  const { isRemote, didMethods, state, keyStorages, keyAlgorithms, exact, keyRoles, type, name, } = queryParams;
  return [name, type, state, isRemote, didMethods, keyStorages, keyAlgorithms, exact, keyRoles];
};
