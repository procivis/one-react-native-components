import { DidListQueryBindingDto, DidTypeBindingEnum } from '@procivis/react-native-one-core';
import { useQuery } from 'react-query';

import { getQueryKeyFromDidListQueryParams } from '../../parsers/query';
import { useONECore } from './core-context';

const PAGE_SIZE = 20;
export const DID_LIST_QUERY_KEY = 'did-list';

export const useDids = (queryParams?: Partial<DidListQueryBindingDto>) => {
  const { core, organisationId } = useONECore();

  return useQuery(
    [DID_LIST_QUERY_KEY, ...getQueryKeyFromDidListQueryParams(queryParams)],
    async ({ pageParam = 0 }) => {
      const dids = await core.getDids({
        deactivated: false,
        organisationId,
        page: pageParam,
        pageSize: PAGE_SIZE,
        type: DidTypeBindingEnum.LOCAL,
        ...queryParams,
      });

      return dids;
    },
  );
};
