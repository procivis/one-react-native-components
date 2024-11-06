import { useInfiniteQuery } from 'react-query';

import { useONECore } from './core-context';

const PAGE_SIZE = 10;
export const CREDENTIAL_SCHEMA_LIST_QUERY_KEY = 'credential-schema-list';

export const useCredentialSchemas = () => {
  const { core, organisationId } = useONECore();

  return useInfiniteQuery(
    [CREDENTIAL_SCHEMA_LIST_QUERY_KEY],
    ({ pageParam = 0 }) =>
      core
        .getCredentialSchemas({
          organisationId,
          page: pageParam,
          pageSize: PAGE_SIZE,
        })
        .then(({ values }) => values),
    {
      getNextPageParam: (lastPage, allPages) => (lastPage.length === PAGE_SIZE ? allPages.length : undefined),
      keepPreviousData: true,
    },
  );
};
