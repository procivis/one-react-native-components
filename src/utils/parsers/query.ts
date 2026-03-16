import {
  CredentialListQuery,
  CredentialSchemaListQuery,
  DidListQuery,
  HistoryListQuery,
  IdentifierListQuery,
  ProofListQuery,
  ProofSchemaListQuery,
} from '@procivis/react-native-one-core';

type QueryKey<ListQuery, ParamList> = ParamList extends ReadonlyArray<keyof ListQuery> // all params are inside the ListQuery
  ? keyof ListQuery extends ParamList[number] // all ListQuery fields are in the params
    ? Array<ListQuery[keyof ListQuery]>
    : void
  : void; // otherwise produce a wrong return type which should trigger compilation error

/** Typecheck that all query params are included in the query key */
function getQueryKey<ListQuery extends {}, ParamList extends ReadonlyArray<keyof ListQuery>>(
  queryParams: ListQuery,
  params: ParamList,
): QueryKey<ListQuery, ParamList> {
  return params.map((param) => queryParams[param]) as QueryKey<ListQuery, ParamList>;
}

export const getQueryKeyFromCredentialListQueryParams = (queryParams: Partial<CredentialListQuery> = {}) => {
  return getQueryKey(queryParams, [
    'page',
    'pageSize',
    'organisationId',
    'name',
    'searchText',
    'searchType',
    'sort',
    'sortDirection',
    'exact',
    'roles',
    'ids',
    'states',
    'include',
    'profiles',
    'credentialSchemaIds',
    'createdDateAfter',
    'createdDateBefore',
    'lastModifiedAfter',
    'lastModifiedBefore',
    'issuanceDateAfter',
    'issuanceDateBefore',
    'revocationDateAfter',
    'revocationDateBefore',
  ]);
};

export const getQueryKeyFromHistoryListQueryParams = (queryParams: Partial<HistoryListQuery> = {}) => {
  return getQueryKey(queryParams, [
    'page',
    'pageSize',
    'organisationId',
    'entityIds',
    'actions',
    'entityTypes',
    'createdDateAfter',
    'createdDateBefore',
    'identifierId',
    'credentialId',
    'credentialSchemaId',
    'proofSchemaId',
    'search',
    'users',
  ]);
};

export const getQueryKeyFromCredentialSchemaListQueryParams = (
  queryParams: Partial<CredentialSchemaListQuery> = {},
) => {
  return getQueryKey(queryParams, [
    'page',
    'pageSize',
    'organisationId',
    'name',
    'sort',
    'sortDirection',
    'exact',
    'ids',
    'include',
    'schemaId',
    'formats',
    'createdDateAfter',
    'createdDateBefore',
    'lastModifiedAfter',
    'lastModifiedBefore',
  ]);
};

export const getQueryKeyFromProofSchemaListQueryParams = (queryParams: Partial<ProofSchemaListQuery> = {}) => {
  return getQueryKey(queryParams, [
    'page',
    'pageSize',
    'organisationId',
    'name',
    'sort',
    'sortDirection',
    'exact',
    'ids',
    'formats',
    'createdDateAfter',
    'createdDateBefore',
    'lastModifiedAfter',
    'lastModifiedBefore',
  ]);
};

export const getQueryKeyFromProofListQueryParams = (queryParams: Partial<ProofListQuery> = {}) => {
  return getQueryKey(queryParams, [
    'page',
    'pageSize',
    'organisationId',
    'sort',
    'sortDirection',
    'name',
    'ids',
    'proofStates',
    'proofRoles',
    'proofSchemaIds',
    'exact',
    'profiles',
    'createdDateAfter',
    'createdDateBefore',
    'lastModifiedAfter',
    'lastModifiedBefore',
    'requestedDateAfter',
    'requestedDateBefore',
    'completedDateAfter',
    'completedDateBefore',
  ]);
};

export const getQueryKeyFromDidListQueryParams = (queryParams: Partial<DidListQuery> = {}) => {
  return getQueryKey(queryParams, [
    'page',
    'pageSize',
    'organisationId',
    'sort',
    'sortDirection',
    'name',
    'did',
    'type',
    'deactivated',
    'exact',
    'keyAlgorithms',
    'keyRoles',
    'keyStorages',
    'keyIds',
    'didMethods',
  ]);
};

export const getQueryKeyFromIdentifierListQueryParams = (queryParams: Partial<IdentifierListQuery> = {}) => {
  return getQueryKey(queryParams, [
    'page',
    'pageSize',
    'organisationId',
    'sort',
    'sortDirection',
    'name',
    'types',
    'states',
    'exact',
    'didMethods',
    'isRemote',
    'keyAlgorithms',
    'keyRoles',
    'keyStorages',
    'createdDateAfter',
    'createdDateBefore',
    'lastModifiedAfter',
    'lastModifiedBefore',
  ]);
};
