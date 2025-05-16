import { useQuery } from "react-query";

import { useONECore } from "./core-context";

export const IDENTIFIER_DETAIL_QUERY_KEY = 'identifier-detail';

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
}