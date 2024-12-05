import {
  CreateProofRequest,
  ONECore,
  PresentationSubmitCredentialRequest,
  ProofListQuery,
  ProofStateEnum,
} from '@procivis/react-native-one-core';

import { Transport } from '../connectivity/connectivity';

type ShareProofRequestProps = {
  params?: {
    clientIdSchema?: 'REDIRECT_URI' | 'VERIFIER_ATTESTATION';
  };
};
type ShareProofParams = Parameters<ONECore['shareProof']>;
type ProofUrlHookParams = ShareProofParams extends [proofId: string, request: ShareProofRequestProps]
  ? { proofId: string; request: ShareProofRequestProps | null }
  : { proofId: string; request?: never };

export declare const PROOF_DETAIL_QUERY_KEY = 'proof-detail';
export declare const PROOF_STATE_QUERY_KEY = 'proof-state';
export declare const PROOF_LIST_QUERY_KEY = 'proof-list';
export declare const useProofDetail: (
  proofId: string | undefined,
) => import('react-query').UseQueryResult<import('@procivis/react-native-one-core').ProofDetail | undefined, unknown>;
export declare const useProofState: (
  proofId: string | undefined,
  isPolling: boolean,
) => import('react-query').UseQueryResult<ProofStateEnum, unknown>;
export declare const useProofUrl: () => import('react-query').UseMutationResult<
  string,
  unknown,
  ProofUrlHookParams,
  unknown
>;
export declare const useProofAccept: () => import('react-query').UseMutationResult<
  void,
  unknown,
  {
    credentials: Record<string, PresentationSubmitCredentialRequest>;
    didId: string;
    interactionId: string;
    keyId?: string | undefined;
  },
  unknown
>;
export declare const useProofReject: () => import('react-query').UseMutationResult<void, unknown, string, unknown>;
export declare enum ExchangeProtocol {
  ISO_MDL = 'ISO_MDL',
  OPENID4VC = 'OPENID4VC',
  PROCIVIS = 'PROCIVIS_TEMPORARY',
}
export declare const useProposeProof: () => import('react-query').UseMutationResult<
  import('@procivis/react-native-one-core').ProposeProofResponse,
  unknown,
  ExchangeProtocol,
  unknown
>;
export declare const useProofRetract: () => import('react-query').UseMutationResult<
  string | void,
  unknown,
  string,
  unknown
>;
export declare const useProofs: (
  queryParams?: Partial<ProofListQuery>,
) => import('react-query').UseQueryResult<
  import('@procivis/react-native-one-core').ItemList<import('@procivis/react-native-one-core').ProofListItem>,
  unknown
>;
export declare const useProofCreate: () => import('react-query').UseMutationResult<
  string,
  unknown,
  CreateProofRequest,
  unknown
>;
export declare const useProofCreateOrReuse: (
  proofSchemaId: string,
  transport: Transport[] | undefined,
  enabled: boolean,
) => string | undefined;
export declare const useShareProof: (
  proofUrlProps: ProofUrlHookParams | undefined,
  enabled: boolean,
) =>
  | {
      bleAdapterDisabled: boolean;
      url?: string | undefined;
    }
  | undefined;
export declare const useRetainProofCheck: () => import('react-query').UseMutationResult<string, unknown, void, unknown>;
export declare const useDeleteProofData: (
  proofId: string,
) => import('react-query').UseMutationResult<void, unknown, void, unknown>;
export declare const useDeleteAllProofsData: (
  schemaId: string,
) => import('react-query').UseMutationResult<void, unknown, void, unknown>;
