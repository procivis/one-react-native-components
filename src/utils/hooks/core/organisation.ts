import { UpdateOrganisationRequest } from '@procivis/react-native-one-core';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { reportException } from '../../reporting';
import { useONECore } from './core-context';

export const ORGANISATION_DETAIL_QUERY_KEY = 'organisation-detail';
export const ORGANISATION_ECOSYSTEMS_QUERY_KEY = 'organisation-ecosystems';
export const VERIFIER_INSTANCE_QUERY_KEY = 'verifier-instance';
export const WALLET_INSTANCE_QUERY_KEY = 'wallet-instance';

export const useOrganisationDetail = (active = true) => {
  const { core, organisationId } = useONECore();

  return useQuery(
    [ORGANISATION_DETAIL_QUERY_KEY],
    () => core.getOrganisation(organisationId),
    {
      enabled: active,
      keepPreviousData: true,
    },
  );
};

export const useOrganisationEcosystems = (
  enabled = true,
  keepPreviousData = false,
) => {
  const { core, organisationId } = useONECore();

  return useQuery(
    [ORGANISATION_ECOSYSTEMS_QUERY_KEY],
    async () => {
      const ecosystems = await core
        .getOrganisation(organisationId)
        .then((organisation) => organisation.ecosystems);
      return ecosystems;
    },
    {
      enabled,
      keepPreviousData,
    },
  );
};

export const useOrganisationUpdate = () => {
  const queryClient = useQueryClient();
  const { core, organisationId } = useONECore();

  return useMutation(
    async (request: Omit<UpdateOrganisationRequest, 'id'>) =>
      core.updateOrganisation({ id: organisationId, ...request }),
    {
      onError: async (err) => {
        reportException(err, 'Update organisation failure');
        await queryClient.invalidateQueries(ORGANISATION_DETAIL_QUERY_KEY);
        queryClient.removeQueries(ORGANISATION_ECOSYSTEMS_QUERY_KEY);
        await queryClient.invalidateQueries(VERIFIER_INSTANCE_QUERY_KEY);
        await queryClient.invalidateQueries(WALLET_INSTANCE_QUERY_KEY);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(ORGANISATION_DETAIL_QUERY_KEY);
        queryClient.removeQueries(ORGANISATION_ECOSYSTEMS_QUERY_KEY);
        await queryClient.invalidateQueries(VERIFIER_INSTANCE_QUERY_KEY);
        await queryClient.invalidateQueries(WALLET_INSTANCE_QUERY_KEY);
      },
    },
  );
};

export const useVerifierInstance = (active = true) => {
  const { core, organisationId } = useONECore();

  return useQuery(
    [VERIFIER_INSTANCE_QUERY_KEY],
    () =>
      core.getOrganisation(organisationId).then((org) => org.verifierInstance),
    {
      enabled: active,
      keepPreviousData: true,
    },
  );
};

export const useWalletInstance = (active = true) => {
  const { core, organisationId } = useONECore();

  return useQuery(
    [WALLET_INSTANCE_QUERY_KEY],
    () =>
      core.getOrganisation(organisationId).then((org) => org.walletInstance),
    {
      enabled: active,
      keepPreviousData: true,
    },
  );
};
