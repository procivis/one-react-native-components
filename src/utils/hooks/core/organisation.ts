import { UpsertOrganisationRequest } from '@procivis/react-native-one-core';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { reportException } from '../../reporting';
import { useONECore } from './core-context';

export const ORGANISATION_DETAIL_QUERY_KEY = 'organisation-detail';
export const ORGANISATION_TRUST_COLLECTIONS_QUERY_KEY = 'organisation-trust-collections';

export const useOrganisationDetail = (active = true) => {
  const { core, organisationId } = useONECore();

  return useQuery([ORGANISATION_DETAIL_QUERY_KEY], () => core.getOrganisation(organisationId), {
    enabled: active,
    keepPreviousData: true,
  });
};

export const useOrganisationTrustCollections = (active = true) => {
  const { core, organisationId } = useONECore();

  return useQuery([ORGANISATION_TRUST_COLLECTIONS_QUERY_KEY], () => core.getOrganisationEcosystems(organisationId), {
    enabled: active,
    keepPreviousData: true,
  });
};

export const useOrganisationUpdate = () => {
  const queryClient = useQueryClient();
  const { core, organisationId } = useONECore();

  return useMutation(
    async (request: Omit<UpsertOrganisationRequest, 'id'>) =>
      core.upsertOrganisation({ id: organisationId, ...request }),
    {
      onError: async (err) => {
        reportException(err, 'Update organisation failure');
        await queryClient.invalidateQueries(ORGANISATION_DETAIL_QUERY_KEY);
        await queryClient.invalidateQueries(ORGANISATION_TRUST_COLLECTIONS_QUERY_KEY);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(ORGANISATION_DETAIL_QUERY_KEY);
        await queryClient.invalidateQueries(ORGANISATION_TRUST_COLLECTIONS_QUERY_KEY);
      },
    },
  );
};

export const useVerifierInstance = (active = true) => {
  const { core, organisationId } = useONECore();

  return useQuery(
    [ORGANISATION_DETAIL_QUERY_KEY],
    () => core.getOrganisation(organisationId).then((org) => org.verifierInstance),
    {
      enabled: active,
      keepPreviousData: true,
    },
  );
};

export const useWalletInstance = (active = true) => {
  const { core, organisationId } = useONECore();

  return useQuery(
    [ORGANISATION_DETAIL_QUERY_KEY],
    () => core.getOrganisation(organisationId).then((org) => org.walletInstance),
    {
      enabled: active,
      keepPreviousData: true,
    },
  );
};
