import { DidTypeEnum, OneError } from '@procivis/react-native-one-core';
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { generateUUID } from '../../uuid';
import { useONECore } from './core-context';
import { HW_DID_NAME_PREFIX, IdentifiersInitializationConfig, SW_DID_NAME_PREFIX } from './core-init';
import { OneErrorCode } from './error-code';
import { HISTORY_LIST_QUERY_KEY } from './history';

const BACKUP_INFO_QUERY_KEY = 'backup-info';

export const useBackupInfo = () => {
  const { core } = useONECore();

  return useQuery([BACKUP_INFO_QUERY_KEY], () => core.backupInfo(), {
    keepPreviousData: true,
  });
};

export const useCreateBackup = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(
    async ({ password, outputPath }: { outputPath: string; password: string }) =>
      core.createBackup(password, outputPath),
    {
      onSuccess: () => queryClient.invalidateQueries(HISTORY_LIST_QUERY_KEY),
    },
  );
};

export const useUnpackBackup = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(
    async ({ password, inputPath }: { inputPath: string; password: string }) => core.unpackBackup(password, inputPath),
    {
      onSuccess: () => queryClient.resetQueries(),
    },
  );
};

export const useFinalizeImport = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(async () => core.finalizeImport(), {
    onSuccess: () => queryClient.resetQueries(),
  });
};

export const useRollbackImport = () => {
  const queryClient = useQueryClient();
  const { core } = useONECore();

  return useMutation(async () => core.rollbackImport(), {
    onSuccess: () => queryClient.resetQueries(),
  });
};

export const useBackupFinalizeImportProcedure = ({ generateHwKey, generateSwKey }: IdentifiersInitializationConfig) => {
  const { mutateAsync: finalizeImport } = useFinalizeImport();
  const { core, organisationId } = useONECore();

  return useCallback(async () => {
    await finalizeImport();

    // update wallet did references
    const dids = await core.getDids({
      deactivated: false,
      organisationId,
      page: 0,
      pageSize: 1,
      type: DidTypeEnum.LOCAL,
    });
    let swDidId = dids.values.find((did) => did.name.startsWith(SW_DID_NAME_PREFIX))?.id;

    if (!swDidId && generateSwKey) {
      const swKeyId = await core.generateKey({
        keyParams: {},
        keyType: 'EDDSA',
        name: `holder-key-sw-${generateUUID()}`,
        organisationId,
        storageParams: {},
        storageType: 'INTERNAL',
      });
      swDidId = await core.createDid({
        didMethod: 'KEY',
        keys: {
          assertionMethod: [swKeyId],
          authentication: [swKeyId],
          capabilityDelegation: [swKeyId],
          capabilityInvocation: [swKeyId],
          keyAgreement: [swKeyId],
        },
        name: `${SW_DID_NAME_PREFIX}-${generateUUID()}`,
        organisationId,
        params: {},
      });
    }

    let hwKeyId: string | null = null;
    if (generateHwKey) {
      hwKeyId = await core
        .generateKey({
          keyParams: {},
          keyType: 'ES256',
          name: `holder-key-hw-${generateUUID()}`,
          organisationId,
          storageParams: {},
          storageType: 'SECURE_ELEMENT',
        })
        .catch((e) => {
          // ignore if HW keys not supported by device
          if (e instanceof OneError && e.code === OneErrorCode.KeyStorageNotSupported) {
            return null;
          }
          throw e;
        });
    }

    let hwDidId: string | null = null;
    if (hwKeyId) {
      hwDidId = await core.createDid({
        didMethod: 'KEY',
        keys: {
          assertionMethod: [hwKeyId],
          authentication: [hwKeyId],
          capabilityDelegation: [hwKeyId],
          capabilityInvocation: [hwKeyId],
          keyAgreement: [hwKeyId],
        },
        name: `${HW_DID_NAME_PREFIX}-${generateUUID()}`,
        organisationId,
        params: {},
      });
    }

    return [hwDidId, swDidId] as [string | null, string | undefined];
  }, [core, organisationId, finalizeImport, generateHwKey, generateSwKey]);
};
