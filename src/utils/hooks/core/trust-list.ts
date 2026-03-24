import { useMutation } from 'react-query';

import { reportException } from '../../reporting';
import { useONECore } from './core-context';
import { HolderWalletUnit } from '@procivis/react-native-one-core';

export const useTrustCollectionSync = () => {
  const { core } = useONECore();

  return useMutation(
    async (params: { holderWalletUnitId?: HolderWalletUnit['id']; verifierInstanceId?: string }) =>
      core.runTask('TRUST_COLLECTION_SYNC', JSON.stringify(params)),
    {
      onError: (err) => {
        reportException(err, 'TRUST_COLLECTION_SYNC error');
      },
    },
  );
};

export const useTrustListSubscriptionUpdate = () => {
  const { core } = useONECore();

  return useMutation(async () => core.runTask('TRUST_LIST_SUBSCRIPTION_UPDATE', undefined), {
    onError: (err) => {
      reportException(err, 'TRUST_LIST_SUBSCRIPTION_UPDATE error');
    },
  });
};
