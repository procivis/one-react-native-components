import { CacheType } from '@procivis/react-native-one-core';
import { useMutation, useQueryClient } from 'react-query';

import { useONECore } from './core-context';
import { CREDENTIAL_DETAIL_QUERY_KEY, CREDENTIAL_LIST_PAGED_QUERY_KEY, CREDENTIAL_LIST_QUERY_KEY } from './credentials';
import { REMOTE_TRUST_ENTITY_DETAIL_QUERY_KEY, TRUST_ENTITY_DETAIL_QUERY_KEY } from './trust-entity';

const CREDENTIAL_QUERY_KEYS = [CREDENTIAL_LIST_QUERY_KEY, CREDENTIAL_LIST_PAGED_QUERY_KEY, CREDENTIAL_DETAIL_QUERY_KEY];
const TRUST_ENTITY_QUERY_KEYS = [TRUST_ENTITY_DETAIL_QUERY_KEY, REMOTE_TRUST_ENTITY_DETAIL_QUERY_KEY];

// Map each CacheType to the query keys that should be invalidated when that cache is cleared.
const cacheTypeToQueryKeys: Record<CacheType, string[]> = {
  [CacheType.DID_DOCUMENT]: CREDENTIAL_QUERY_KEYS,
  [CacheType.JSON_LD_CONTEXT]: CREDENTIAL_QUERY_KEYS,
  [CacheType.STATUS_LIST_CREDENTIAL]: CREDENTIAL_QUERY_KEYS,
  [CacheType.VCT_METADATA]: CREDENTIAL_QUERY_KEYS,
  [CacheType.JSON_SCHEMA]: CREDENTIAL_QUERY_KEYS,
  [CacheType.TRUST_LIST]: [...TRUST_ENTITY_QUERY_KEYS, ...CREDENTIAL_QUERY_KEYS],
};

export const useCacheClear = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(
    async (cacheTypes: CacheType[]) => {
      await core.deleteCache(cacheTypes);
      return cacheTypes;
    },
    {
      onSuccess: async (_, cacheTypes) => {
        const queryKeysToInvalidate = new Set<string>();

        cacheTypes.forEach((cacheType) => {
          const keys = cacheTypeToQueryKeys[cacheType] || [];
          keys.forEach((key) => queryKeysToInvalidate.add(key));
        });

        await Promise.all([...queryKeysToInvalidate].map((queryKey) => queryClient.invalidateQueries(queryKey)));
      },
    },
  );
};
