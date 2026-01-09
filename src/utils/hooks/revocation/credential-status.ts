import { CredentialStateBindingEnum } from '@procivis/react-native-one-core';
import { useIsFocused } from '@react-navigation/native';
import { useCallback, useRef } from 'react';

import { reportException } from '../../reporting';
import { useCredentialRevocationCheck, useCredentials } from '../core/credentials';

/**
 * Runs revocation check on background for all potential updates
 *
 * Navigates to the result page if some credential states were updated
 * @param {string[]} credentialIds if specified only those credentials get checked, otherwise all potentially eligible credentials
 * @param {boolean} forceRefresh revocation check forces cache refresh
 */
export const useCredentialStatusCheck = (credentialIds?: string[], forceRefresh = false) => {
  const isFocused = useIsFocused();
  const checkDone = useRef(false);
  const { mutateAsync: check } = useCredentialRevocationCheck(forceRefresh);
  const { data: credentials } = useCredentials({
    ids: credentialIds,
    states: [CredentialStateBindingEnum.ACCEPTED, CredentialStateBindingEnum.SUSPENDED],
  });

  const checkCredentialsStatus = useCallback(async () => {
    if (!credentials || !credentials.length || checkDone.current || !isFocused) {
      return [];
    }

    const results = await check(credentials.map(({ id }) => id)).catch((e) => {
      reportException(e, 'Revocation check failed');
      return [];
    });

    const updatedCredentialIds = results
      .filter(
        ({ credentialId, status: newStatus, success }) =>
          success && credentials.find(({ id }) => id === credentialId)?.state !== newStatus,
      )
      .map(({ credentialId }) => credentialId);

    return updatedCredentialIds;
  }, [check, credentials, isFocused]);

  return checkCredentialsStatus;
};
