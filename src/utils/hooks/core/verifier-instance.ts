import { UpdateVerifierInstanceRequest } from '@procivis/react-native-one-core';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { reportException } from '../../reporting';
import { useONECore } from './core-context';

export const VERIFIER_INSTANCE_TRUST_COLLECTIONS_QUERY_KEY = 'verifier-instance-trust-collections';

export const useVerifierInstanceTrustCollections = (verifierInstanceId: string | undefined, active = true) => {
  const { core } = useONECore();

  return useQuery(
    [VERIFIER_INSTANCE_TRUST_COLLECTIONS_QUERY_KEY, verifierInstanceId],
    () => (verifierInstanceId ? core.getVerifierInstanceTrustCollections(verifierInstanceId) : undefined),
    {
      enabled: active && Boolean(verifierInstanceId),
      keepPreviousData: true,
    },
  );
};

export const useRegisterVerifierInstance = () => {
  const queryClient = useQueryClient();
  const { core, organisationId } = useONECore();

  return useMutation(
    async ({ verifierProviderUrl, type }: { verifierProviderUrl: string; type: string }) =>
      core.registerVerifierInstance({
        organisationId,
        verifierProviderUrl,
        type,
      }),

    {
      onSuccess: () => queryClient.invalidateQueries(VERIFIER_INSTANCE_TRUST_COLLECTIONS_QUERY_KEY),
    },
  );
};

export const useVerifierInstanceUpdate = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(
    async ({ verifierInstanceId, update }: { verifierInstanceId: string; update: UpdateVerifierInstanceRequest }) =>
      core.updateVerifierInstance(verifierInstanceId, update),
    {
      onError: async (err) => {
        reportException(err, 'Update verifier instance failure');
        await queryClient.invalidateQueries(VERIFIER_INSTANCE_TRUST_COLLECTIONS_QUERY_KEY);
      },
      onSuccess: () => queryClient.invalidateQueries(VERIFIER_INSTANCE_TRUST_COLLECTIONS_QUERY_KEY),
    },
  );
};
