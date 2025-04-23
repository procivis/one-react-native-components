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
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

  return useQuery(
    [PROOF_STATE_QUERY_KEY, proofId],
    () => (proofId ? core.getProof(proofId).then((proof) => proof.state) : undefined),
    {
      enabled: Boolean(proofId),
      refetchInterval: isPolling ? 1000 : false,
    },
  );
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

export enum IssuanceProtocol {
  OPENID4VCI_DRAFT13 = 'OPENID4VCI_DRAFT13',
}

export enum VerificationProtocol {
  ISO_MDL = 'ISO_MDL',
  OPENID4VP_DRAFT20 = 'OPENID4VP_DRAFT20',
  OPENID4VP_DRAFT25 = 'OPENID4VP_DRAFT25',
  OPENID4VP_PROXIMITY_DRAFT00 = 'OPENID4VP_PROXIMITY_DRAFT00',
  SCAN_TO_VERIFY = 'SCAN_TO_VERIFY',
}

export const useProposeProof = () => {
  const queryClient = useQueryClient();
  const { core, organisationId } = useONECore();

  return useMutation(async (exchange: VerificationProtocol) => core.proposeProof(exchange, organisationId), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
    },
  });
};

export const useProofDelete = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(
    async (proofId: string) => {
      return core.deleteProof(proofId).catch((e) => {
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

export const useProofForSchemaIdWithTransport = (
  proofSchemaId: string,
  transport: Transport[] | undefined,
  enabled: boolean,
) => {
  const { data: proofSchema } = useProofSchemaDetail(proofSchemaId, enabled);
  const { data: config } = useCoreConfig();

  const didFilter = useMemo(
    () => (proofSchema && config ? getDidFilterForProofSchema(proofSchema, config) : undefined),
    [config, proofSchema],
  );

  const { data: dids } = useDids(didFilter);
  const { mutateAsync: createProof } = useProofCreate();
  const { mutateAsync: deleteProof } = useProofDelete();

  const [deleting, setDeleting] = useState(false);
  const [proofId, setProofIdState] = useState<string | undefined>(undefined);
  const proofIdRef = useRef<string>();

  const { data: proofState } = useProofState(deleting ? undefined : proofId, enabled);

  const setProofId = useCallback((id: string | undefined) => {
    proofIdRef.current = id;
    setProofIdState(id);
  }, []);

  useEffect(() => {
    if (!proofIdRef.current) {
      return;
    }
    setDeleting(true);
    deleteProof(proofIdRef.current)
      .then(() => {
        setProofId(undefined);
        setDeleting(false);
      })
      .catch(() => {});
  }, [proofIdRef, deleteProof, proofSchemaId, transport, setProofId]);

  useEffect(() => {
    if (enabled) {
      return;
    }
    if (proofState !== ProofStateEnum.CREATED && proofState !== ProofStateEnum.PENDING) {
      setProofId(undefined);
    }
  }, [enabled, proofState, setProofId]);

  useEffect(() => {
    if (
      deleting ||
      !enabled ||
      proofId ||
      !dids ||
      !didFilter ||
      !dids.values.length ||
      !transport ||
      transport.length === 0
    ) {
      return;
    }

    createProof({
      exchange: VerificationProtocol.OPENID4VP_PROXIMITY_DRAFT00,
      proofSchemaId,
      transport,
      verifierDidId: dids.values[0].id,
    })
      .then((id) => {
        setProofId(id);
      })
      .catch(() => {});
  }, [proofSchemaId, dids, didFilter, createProof, enabled, transport, proofId, setProofId, deleting]);

  return deleting ? undefined : proofId;
};

export const useCleanupUnusedProofs = () => {
  const { mutateAsync: deleteProof } = useProofDelete();
  const { data: proofs } = useProofs({
    page: 0,
    pageSize: 100,
    proofStates: [ProofStateEnum.CREATED, ProofStateEnum.PENDING],
  });
  const [cleaned, setCleaned] = useState(false);

  useEffect(() => {
    if (cleaned || !proofs) {
      return;
    }
    setCleaned(true);
    proofs.values.forEach((proof) => deleteProof(proof.id));
  }, [cleaned, deleteProof, proofs]);
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

export const useRetainProofCheck = (proofId?: string) => {
  const queryClient = useQueryClient();

  const { core } = useONECore();

  return useMutation(async () => core.runTask('RETAIN_PROOF_CHECK'), {
    onSuccess: async () => {
      if (proofId) {
        await queryClient.removeQueries([PROOF_DETAIL_QUERY_KEY, proofId]);
        await queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY);
      }
    },
  });
};

export const useDeleteProofData = (proofId: string) => {
  const queryClient = useQueryClient();

  const { core } = useONECore();

  return useMutation(async () => core.deleteProofClaims(proofId), {
    onSuccess: async () => {
      await queryClient.removeQueries([PROOF_DETAIL_QUERY_KEY, proofId]);
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
