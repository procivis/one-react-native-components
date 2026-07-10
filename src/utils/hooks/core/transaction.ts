import { useQuery } from 'react-query';

import { useONECore } from './core-context';

export const TRANSACTION_DATA_QUERY_KEY = 'proof-detail';

export const useTransactionData = (proofId: string | undefined, transactionDataId: string | undefined) => {
  const { core } = useONECore();

  return useQuery(
    [TRANSACTION_DATA_QUERY_KEY, proofId],
    () => (proofId && transactionDataId ? core.holderGetTransactionData(proofId, transactionDataId) : undefined),
    {
      enabled: Boolean(proofId && transactionDataId),
      keepPreviousData: true,
    },
  );
};
