import { useCallback, useEffect, useState } from 'react';
import NfcManager from 'react-native-nfc-manager';

export const useNFCStatus = () => {
  const [isNFCEnabled, setIsNFCEnabled] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<unknown>();

  const checkNFCStatus = useCallback(async () => {
    try {
      setIsLoading(true);
      const isEnabled = await NfcManager.isEnabled();
      setIsNFCEnabled(isEnabled);
      setIsLoading(false);
    } catch (e) {
      setError(e);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    checkNFCStatus();
  }, [checkNFCStatus]);

  const recheck = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    checkNFCStatus();
  }, [checkNFCStatus]);

  return { error, isLoading, isNFCEnabled, recheck };
};
