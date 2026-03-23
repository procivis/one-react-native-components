import { useMutation } from 'react-query';

import { reportException } from '../../reporting';
import { useONECore } from './core-context';

export const useTrustCollectionSync = () => {
  const { core } = useONECore();

  return useMutation(async () => core.runTask('TRUST_COLLECTION_SYNC'), {
    onError: (err) => {
      reportException(err, 'TRUST_COLLECTION_SYNC error');
    },
  });
};

export const useTrustListSubscriptionUpdate = () => {
  const { core } = useONECore();

  return useMutation(async () => core.runTask('TRUST_LIST_SUBSCRIPTION_UPDATE'), {
    onError: (err) => {
      reportException(err, 'TRUST_LIST_SUBSCRIPTION_UPDATE error');
    },
  });
};
