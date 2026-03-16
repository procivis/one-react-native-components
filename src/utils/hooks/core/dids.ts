import { DidListQuery, DidType } from '@procivis/react-native-one-core';
import { useQuery } from 'react-query';

import { getQueryKeyFromDidListQueryParams } from '../../parsers/query';
import { useONECore } from './core-context';

const PAGE_SIZE = 20;
export const DID_LIST_QUERY_KEY = 'did-list';

export const useDids = (queryParams?: Partial<DidListQuery>) => {
  const { core, organisationId } = useONECore();

  return useQuery(
    [DID_LIST_QUERY_KEY, ...getQueryKeyFromDidListQueryParams(queryParams)],
    async ({ pageParam = 0 }) => {
      const dids = await core.listDids({
        deactivated: false,
        organisationId,
        page: pageParam,
        pageSize: PAGE_SIZE,
        type: DidType.LOCAL,
        ...queryParams,
      });

      return dids;
    },
  );
};
