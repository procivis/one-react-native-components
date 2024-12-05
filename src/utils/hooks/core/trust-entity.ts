import { useQueries, useQuery } from 'react-query';

import { useONECore } from './core-context';

const TRUST_ENTITY_DETAIL_QUERY_KEY = 'trust-entity-detail';

export const useTrustEntity = (didId: string | undefined) => {
  const { core } = useONECore();

  return useQuery(
    [TRUST_ENTITY_DETAIL_QUERY_KEY, didId],
    () => (didId && 'getTrustEntityByDid' in core ? (core.getTrustEntityByDid as any)(didId) : Promise.reject()),
    {
      enabled: Boolean(didId),
      keepPreviousData: true,
    },
  );
};

export const useTrustEntities = (didIds: string[]) => {
  const { core } = useONECore();

  return useQueries(
    didIds.map((didId) => ({
      keepPreviousData: true,
      queryFn: () =>
        didId && 'getTrustEntityByDid' in core ? (core.getTrustEntityByDid as any)(didId) : Promise.reject(),
      queryKey: [TRUST_ENTITY_DETAIL_QUERY_KEY, didId],
      enable: Boolean(didId),
    })),
  );
};
