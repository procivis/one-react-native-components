import { HistoryListQuery } from '@procivis/react-native-one-core';
import { useInfiniteQuery } from 'react-query';

import { getQueryKeyFromHistoryListQueryParams } from '../../parsers/query';
import { useONECore } from './core-context';

const PAGE_SIZE = 20;
export const HISTORY_LIST_QUERY_KEY = 'history-list';

export const useHistory = (queryParams?: Partial<HistoryListQuery>) => {
  const { core, organisationId } = useONECore();

  return useInfiniteQuery(
    [HISTORY_LIST_QUERY_KEY, ...getQueryKeyFromHistoryListQueryParams(queryParams)],
    async ({ pageParam = 0 }) => {
      const historyPage = await core.getHistory({
        organisationId,
        page: pageParam,
        pageSize: PAGE_SIZE,
        ...queryParams,
      });

      return historyPage;
    },
    {
      getNextPageParam: (lastPage, allPages) => (allPages.length < lastPage.totalPages ? allPages.length : undefined),
      keepPreviousData: true,
    },
  );
};
