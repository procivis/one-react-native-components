import {
  Config,
  CreateProofRequest,
  DidListQuery,
  OneError,
  PresentationSubmitCredentialRequest,
  ProofListQuery,
  ProofSchema,
  ProofStateEnum,
  ShareProofRequest,
} from '@procivis/react-native-one-core';
import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { getQueryKeyFromProofListQueryParams } from '../../parsers/query';
import { Transport } from '../connectivity/connectivity';
import { useCoreConfig } from './core-config';
import { useONECore } from './core-context';
import { useDids } from './dids';
import { OneErrorCode } from './error-code';
import { HISTORY_LIST_QUERY_KEY } from './history';
import { useProofSchemaDetail } from './proof-schemas';

const PAGE_SIZE = 10;
export const PROOF_DETAIL_QUERY_KEY = 'proof-detail';
export const PROOF_STATE_QUERY_KEY = 'proof-state';
export const PROOF_LIST_QUERY_KEY = 'proof-list';

export const useProofDetail = (proofId: string | undefined) => {
  const { core } = useONECore();

  return useQuery([PROOF_DETAIL_QUERY_KEY, proofId], () => (proofId ? core.getProof(proofId) : undefined), {
    enabled: Boolean(proofId),
    keepPreviousData: true,
  });
};

export const useProofState = (proofId: string | undefined, isPolling: boolean) => {
  const { core } = useONECore();

  return useQuery([PROOF_STATE_QUERY_KEY, proofId], () => core.getProof(proofId!).then((proof) => proof.state), {
    enabled: Boolean(proofId),
    refetchInterval: isPolling ? 1000 : false,
  });
};

type ProofUrlHookParams = { proofId: string; request?: ShareProofRequest };

export const useProofUrl = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(
    async ({ proofId, request }: ProofUrlHookParams) =>
      core.shareProof(proofId, request ?? {}).then((proof) => proof.url),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(PROOF_DETAIL_QUERY_KEY);
        await queryClient.invalidateQueries(PROOF_STATE_QUERY_KEY);
      },
    },
  );
};

export const useProofAccept = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(
    async ({
      interactionId,
      credentials,
      didId,
      keyId,
    }: {
      credentials: Record<string, PresentationSubmitCredentialRequest>;
      didId: string;
      interactionId: string;
      keyId?: string;
    }) => core.holderSubmitProof(interactionId, credentials, didId, keyId),
    {
      onError: async () => {
        await queryClient.invalidateQueries(PROOF_DETAIL_QUERY_KEY);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(PROOF_DETAIL_QUERY_KEY);
        await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
      },
    },
  );
};

export const useProofReject = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(
    async (interactionId: string) =>
      core.holderRejectProof(interactionId).catch((e) => {
        if (e instanceof OneError && e.code === OneErrorCode.OperationNotSupported) {
          return;
        }
        throw e;
      }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(PROOF_DETAIL_QUERY_KEY);
        await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
      },
    },
  );
};

export enum ExchangeProtocol {
  ISO_MDL = 'ISO_MDL',
  OPENID4VC = 'OPENID4VC',
  PROCIVIS = 'PROCIVIS_TEMPORARY',
}

export const useProposeProof = () => {
  const queryClient = useQueryClient();
  const { core, organisationId } = useONECore();

  return useMutation(async (exchange: ExchangeProtocol) => core.proposeProof(exchange, organisationId), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
    },
  });
};

export const useProofRetract = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(
    async (proofId: string) => {
      return core.retractProof(proofId).catch((e) => {
        if (e instanceof OneError && e.code === OneErrorCode.OperationNotSupported) {
          return;
        }
        throw e;
      });
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(PROOF_LIST_QUERY_KEY);
        await queryClient.invalidateQueries(PROOF_STATE_QUERY_KEY);
        await queryClient.invalidateQueries(PROOF_DETAIL_QUERY_KEY);
        await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
      },
    },
  );
};

export const useProofs = (queryParams?: Partial<ProofListQuery>) => {
  const { core, organisationId } = useONECore();

  const queryKey = [PROOF_LIST_QUERY_KEY, ...getQueryKeyFromProofListQueryParams(queryParams)];

  return useQuery(
    queryKey,
    ({ pageParam = 0 }) =>
      core.getProofs({
        organisationId,
        page: pageParam,
        pageSize: PAGE_SIZE,
        ...queryParams,
      }),
    {
      keepPreviousData: false,
    },
  );
};

export const useProofCreate = () => {
  const queryClient = useQueryClient();

  const { core } = useONECore();

  return useMutation(async (data: CreateProofRequest) => core.createProof(data), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(PROOF_LIST_QUERY_KEY);
      await queryClient.invalidateQueries(PROOF_STATE_QUERY_KEY);
      await queryClient.invalidateQueries(PROOF_DETAIL_QUERY_KEY);
    },
  });
};

const getDidFilterForProofSchema = (proofSchema: ProofSchema, config: Config): Partial<DidListQuery> => {
  const requestedFormats = proofSchema.proofInputSchemas.map((schema) => schema.credentialSchema.format);
  const requestedFormatsCapabilities = requestedFormats
    .map((format) => config.format[format]?.capabilities)
    .filter((x) => x);

  // key algorithms must be supported by all requested formats
  const keyAlgorithms = requestedFormatsCapabilities.reduce<string[] | undefined>((others, capabilities) => {
    const current = capabilities.verificationKeyAlgorithms;
    return others?.filter((item) => current.includes(item)) ?? current;
  }, undefined);

  // key storages must be supported by all requested formats
  const keyStorages = requestedFormatsCapabilities.reduce<string[] | undefined>((others, capabilities) => {
    const current = capabilities.verificationKeyStorages;
    return others?.filter((item) => current.includes(item)) ?? current;
  }, undefined);

  return { keyAlgorithms, keyStorages };
};

export const useProofCreateOrReuse = (proofSchemaId: string, transport: Transport[] | undefined, enabled: boolean) => {
  const { data: proofSchema } = useProofSchemaDetail(proofSchemaId, enabled);
  const { data: config } = useCoreConfig();

  const didFilter = useMemo(
    () => (proofSchema && config ? getDidFilterForProofSchema(proofSchema, config) : undefined),
    [config, proofSchema],
  );

  const { data: dids } = useDids(didFilter);
  const { mutateAsync: createProof } = useProofCreate();
  const { data: proofs } = useProofs({
    page: 0,
    pageSize: 100,
    proofSchemaIds: [proofSchemaId],
    proofStates: [ProofStateEnum.CREATED, ProofStateEnum.PENDING],
  });

  const [proofId, setProofId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!dids || !didFilter || !dids.values.length || !proofs || !transport || transport.length === 0) {
      return;
    }

    const transportFilter = transport.length === 2 ? '' : transport[0];
    const filteredProofs = proofs.values.filter(
      (p) => p.exchange === ExchangeProtocol.OPENID4VC && p.transport === transportFilter,
    );
    const proof =
      filteredProofs.length > 0
        ? filteredProofs.find((p) => p.state === ProofStateEnum.PENDING) ?? filteredProofs[0]
        : undefined;

    const reusableProof = proof?.id;

    if (!enabled) {
      if (!reusableProof) {
        setProofId(undefined);
      }
      return;
    }

    if (reusableProof) {
      setProofId(reusableProof);
    } else {
      createProof({
        exchange: ExchangeProtocol.OPENID4VC,
        proofSchemaId,
        transport,
        verifierDidId: dids.values[0].id,
      }).catch(() => {});
    }
  }, [proofSchemaId, proofs, dids, didFilter, createProof, enabled, transport]);

  return proofId;
};

export const useShareProof = (proofUrlProps: ProofUrlHookParams | undefined, enabled: boolean) => {
  const { mutateAsync: shareProof } = useProofUrl();
  const { data: proofState } = useProofState(proofUrlProps?.proofId, enabled);

  const [sharedProof, setSharedProof] = useState<{
    bleAdapterDisabled: boolean;
    url?: string;
  }>();

  // reset when proofId changes or the proof was retracted
  useEffect(() => {
    if (!proofUrlProps?.proofId || proofState === ProofStateEnum.CREATED) {
      setSharedProof(undefined);
    }
  }, [proofUrlProps?.proofId, proofState]);

  useEffect(() => {
    if (!proofUrlProps || !enabled || sharedProof) {
      return;
    }

    shareProof(proofUrlProps)
      .then((url) => {
        setSharedProof({
          bleAdapterDisabled: false,
          url,
        });
      })
      .catch((err: unknown) => {
        // TODO emit error with specific error code from core.
        if (err instanceof OneError && err.cause?.includes('BLE adapter not enabled')) {
          setSharedProof({
            bleAdapterDisabled: true,
          });
        }
      });
  }, [enabled, proofUrlProps, shareProof, sharedProof]);

  return sharedProof;
};

export const useRetainProofCheck = () => {
  const { core } = useONECore();

  return useMutation(async () => core.runTask('RETAIN_PROOF_CHECK'));
};

export const useDeleteProofData = (proofId: string) => {
  const queryClient = useQueryClient();

  const { core } = useONECore();

  return useMutation(async () => core.deleteProofClaims(proofId), {
    onSuccess: async () => {
      await queryClient.invalidateQueries([PROOF_DETAIL_QUERY_KEY, proofId]);
      await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
    },
  });
};

export const useDeleteAllProofsData = (schemaId: string) => {
  const queryClient = useQueryClient();

  const { core, organisationId } = useONECore();

  return useMutation(
    async () =>
      core
        .getProofs({
          organisationId,
          page: 0,
          pageSize: 1000,
          proofSchemaIds: [schemaId],
          proofStates: [ProofStateEnum.ACCEPTED],
        })
        .then((result) => Promise.all(result.values.reverse().map((proof) => core.deleteProofClaims(proof.id)))),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(PROOF_DETAIL_QUERY_KEY);
        await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
      },
    },
  );
};
