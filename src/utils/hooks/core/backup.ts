import { IdentifierStateBindingEnum, IdentifierTypeBindingEnum } from '@procivis/react-native-one-core';
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { reportException } from '../../reporting';
import { useONECore } from './core-context';
import {
  generateHwIdentifier,
  generateSwIdentifier,
  IdentifiersInitializationConfig,
  SW_DID_NAME_PREFIX,
} from './core-init';
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

/**
 * Finalize backup import and extract/prepare identifiers
 * @param {IdentifiersInitializationConfig} config Select desired keys/dids to be restored/created
 * @returns [hwIdentifierId, swIdentifierId]
 */
export const useBackupFinalizeImportProcedure = ({ generateHwKey, generateSwKey }: IdentifiersInitializationConfig) => {
  const { mutateAsync: finalizeImport } = useFinalizeImport();
  const { core, organisationId } = useONECore();

  return useCallback(async () => {
    await finalizeImport();

    // update wallet identifier references
    let swIdentifierId: string | undefined;
    if (generateSwKey) {
      const identifiers = await core.listIdentifiers({
        states: [IdentifierStateBindingEnum.ACTIVE],
        organisationId,
        page: 0,
        pageSize: 1,
        types: [IdentifierTypeBindingEnum.DID],
        isRemote: false,
      });
      swIdentifierId = identifiers.values.find((identifier) => identifier.name.startsWith(SW_DID_NAME_PREFIX))?.id;
    }

    return Promise.all([
      generateHwKey ? generateHwIdentifier(core, organisationId) : null,
      !swIdentifierId && generateSwKey ? generateSwIdentifier(core, organisationId) : swIdentifierId,
    ]).catch((err) => {
      reportException(err, 'Failed to create base identifiers');
      throw err;
    });
  }, [finalizeImport, generateSwKey, generateHwKey, core, organisationId]);
};
