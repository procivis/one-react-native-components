import { useMutation, useQueryClient } from 'react-query';

import { reportException } from '../../reporting';
import { useONECore } from './core-context';
import { VERIFIER_INSTANCE_TRUST_COLLECTIONS_QUERY_KEY } from './verifier-instance';
import { WALLET_UNIT_TRUST_COLLECTIONS_QUERY_KEY } from './wallet-unit';

export const useTrustCollectionSync = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(async () => core.runTask('TRUST_COLLECTION_SYNC', undefined), {
    onError: async (err) => {
      reportException(err, 'TRUST_COLLECTION_SYNC error');
      await queryClient.invalidateQueries(WALLET_UNIT_TRUST_COLLECTIONS_QUERY_KEY);
      await queryClient.invalidateQueries(VERIFIER_INSTANCE_TRUST_COLLECTIONS_QUERY_KEY);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(WALLET_UNIT_TRUST_COLLECTIONS_QUERY_KEY);
      await queryClient.invalidateQueries(VERIFIER_INSTANCE_TRUST_COLLECTIONS_QUERY_KEY);
    },
  });
};

export const useTrustListSubscriptionUpdate = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(async () => core.runTask('TRUST_LIST_SUBSCRIPTION_UPDATE', undefined), {
    onError: async (err) => {
      reportException(err, 'TRUST_LIST_SUBSCRIPTION_UPDATE error');
      await queryClient.invalidateQueries(WALLET_UNIT_TRUST_COLLECTIONS_QUERY_KEY);
      await queryClient.invalidateQueries(VERIFIER_INSTANCE_TRUST_COLLECTIONS_QUERY_KEY);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(WALLET_UNIT_TRUST_COLLECTIONS_QUERY_KEY);
      await queryClient.invalidateQueries(VERIFIER_INSTANCE_TRUST_COLLECTIONS_QUERY_KEY);
    },
  });
};
