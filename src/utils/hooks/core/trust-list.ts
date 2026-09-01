import { useMutation, useQueryClient } from 'react-query';

import { reportException } from '../../reporting';
import { useONECore } from './core-context';
import { ORGANISATION_ECOSYSTEMS_QUERY_KEY } from './organisation';

export const useTrustCollectionSync = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(async () => core.runTask('ECOSYSTEM_SYNC', undefined), {
    onError: async (err) => {
      reportException(err, 'ECOSYSTEM_SYNC error');
      await queryClient.invalidateQueries(ORGANISATION_ECOSYSTEMS_QUERY_KEY);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(ORGANISATION_ECOSYSTEMS_QUERY_KEY);
    },
  });
};

export const useTrustListSubscriptionUpdate = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(async () => core.runTask('TRUST_LIST_SUBSCRIPTION_UPDATE', undefined), {
    onError: async (err) => {
      reportException(err, 'TRUST_LIST_SUBSCRIPTION_UPDATE error');
      await queryClient.invalidateQueries(ORGANISATION_ECOSYSTEMS_QUERY_KEY);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(ORGANISATION_ECOSYSTEMS_QUERY_KEY);
    },
  });
};
