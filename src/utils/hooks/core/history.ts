import { HistoryEntityTypeEnum, HistoryListItem, HistoryListQuery, ItemList } from '@procivis/react-native-one-core';
import { useInfiniteQuery } from 'react-query';

import { getQueryKeyFromHistoryListQueryParams } from '../../parsers/query';
import { useONECore } from './core-context';

export type HistoryListItemWithDid = HistoryListItem & {
  did?: string;
};

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

      const credentialIds = Array.from(
        new Set(
          historyPage.values
            .filter((historyItem) => historyItem.entityType === HistoryEntityTypeEnum.CREDENTIAL)
            .map((historyItem) => historyItem.entityId!),
        ),
      );
      const proofIds = Array.from(
        new Set(
          historyPage.values
            .filter((historyItem) => historyItem.entityType === HistoryEntityTypeEnum.PROOF)
            .map((historyItem) => historyItem.entityId!),
        ),
      );

      const credentials = await core.getCredentials({
        ids: credentialIds,
        organisationId,
        page: 0,
        pageSize: credentialIds.length,
      });
      const credentialDidsMap: Record<string, string> = Object.assign(
        {},
        ...credentials.values.map((credential) => ({
          [credential.id]: credential.issuerDid,
        })),
      );

      const proofs = await Promise.all(proofIds.map((id) => core.getProof(id)));
      const proofDidsMap: Record<string, string> = Object.assign(
        {},
        ...proofs.map((proof) => ({
          [proof.id]: proof.verifierDid?.did,
        })),
      );

      const result: ItemList<HistoryListItemWithDid> = {
        totalItems: historyPage.totalItems,
        totalPages: historyPage.totalPages,
        values: historyPage.values.map((item) => {
          const did =
            item.entityType === HistoryEntityTypeEnum.CREDENTIAL
              ? credentialDidsMap[item.entityId!]
              : proofDidsMap[item.entityId!];
          return {
            ...item,
            did,
          };
        }),
      };

      return result;
    },
    {
      getNextPageParam: (lastPage, allPages) => (allPages.length < lastPage.totalPages ? allPages.length : undefined),
      keepPreviousData: true,
    },
  );
};
