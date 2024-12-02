import { CredentialListQuery, InvitationResult, ONECore } from '@procivis/react-native-one-core';

type HolderAcceptCredentialParams = Parameters<ONECore['holderAcceptCredential']>;
type CredentialAcceptHookParams = HolderAcceptCredentialParams extends [
  interactionId: string,
  didId: string,
  keyId: string | undefined,
  txCode: string | undefined,
]
  ? { didId: string; interactionId: string; keyId?: string; txCode: string | null }
  : { didId: string; interactionId: string; keyId?: string; txCode?: never };

export declare const useCredentials: (
  queryParams?: Partial<CredentialListQuery>,
) => import('react-query').UseQueryResult<import('@procivis/react-native-one-core').CredentialListItem[], unknown>;
export declare const usePagedCredentials: (
  queryParams?: Partial<CredentialListQuery>,
) => import('react-query').UseInfiniteQueryResult<
  import('@procivis/react-native-one-core').ItemList<import('@procivis/react-native-one-core').CredentialListItem>,
  unknown
>;
export declare const useCredentialDetail: (
  credentialId: string | undefined,
  active?: boolean,
) => import('react-query').UseQueryResult<
  import('@procivis/react-native-one-core').CredentialDetail | undefined,
  unknown
>;
export declare const useInvitationHandler: () => import('react-query').UseMutationResult<
  InvitationResult,
  unknown,
  {
    invitationUrl: string;
    transport: 'HTTP' | 'MQTT' | 'BLE';
  },
  unknown
>;
export declare const useCredentialAccept: () => import('react-query').UseMutationResult<
  void,
  unknown,
  CredentialAcceptHookParams,
  unknown
>;
export declare const useCredentialReject: () => import('react-query').UseMutationResult<void, unknown, string, unknown>;
export declare const useCredentialRevocationCheck: () => import('react-query').UseMutationResult<
  import('@procivis/react-native-one-core').CredentialRevocationCheckResponse[],
  unknown,
  string[],
  unknown
>;
export declare const useCredentialDelete: () => import('react-query').UseMutationResult<void, unknown, string, unknown>;
export declare const useInvalidateCredentialDetails: () => (credentialId: string | undefined) => Promise<void>;
