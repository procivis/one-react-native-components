import {
  IdentifierListQueryBindingDto,
  IdentifierStateBindingEnum,
  IdentifierTypeBindingEnum,
} from '@procivis/react-native-one-core';
import { useQuery } from 'react-query';

import { getQueryKeyFromIdentifierListQueryParams } from '../../parsers';
import { useONECore } from './core-context';

export const IDENTIFIER_DETAIL_QUERY_KEY = 'identifier-detail';
export const IDENTIFIER_LIST_QUERY_KEY = 'identifier-list';
const PAGE_SIZE = 20;

export const useIdentifierDetails = (identifierId: string | undefined) => {
  const { core } = useONECore();

  return useQuery(
    [IDENTIFIER_DETAIL_QUERY_KEY, identifierId],
    () => (identifierId ? core.getIdentifier(identifierId) : undefined),
    {
      enabled: Boolean(identifierId),
      keepPreviousData: true,
    },
  );
};

export const useIdentifiers = (identifierFilter?: Partial<IdentifierListQueryBindingDto>) => {
  const { core, organisationId } = useONECore();

  return useQuery(
    [IDENTIFIER_LIST_QUERY_KEY, ...getQueryKeyFromIdentifierListQueryParams(identifierFilter)],
    ({ pageParam = 0 }) =>
      core.listIdentifiers({
        types: [IdentifierTypeBindingEnum.DID],
        isRemote: false,
        page: pageParam,
        states: [IdentifierStateBindingEnum.ACTIVE],
        organisationId: organisationId,
        pageSize: PAGE_SIZE,
        ...identifierFilter,
      }),
  );
};
