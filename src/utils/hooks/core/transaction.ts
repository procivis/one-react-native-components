import { useQuery } from 'react-query';

import { useONECore } from './core-context';

export const TRANSACTION_DATA_QUERY_KEY = 'transaction-data';

export const useTransactionData = (
  proofId: string | undefined,
  transactionDataId: string | undefined,
) => {
  const { core } = useONECore();

  return useQuery(
    [TRANSACTION_DATA_QUERY_KEY, proofId, transactionDataId],
    () =>
      proofId && transactionDataId
        ? core.holderGetTransactionData(proofId, transactionDataId)
        : undefined,
    {
      enabled: Boolean(proofId && transactionDataId),
      keepPreviousData: true,
    },
  );
};
