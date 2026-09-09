import { useCallback, useState } from 'react';

export const useCredentialCardExpanded = () => {
  const [expanded, setExpanded] = useState(true);

  const onHeaderPress = useCallback(() => {
    setExpanded((oldValue) => !oldValue);
  }, []);

  return { expanded, onHeaderPress };
};

export const useCredentialListExpandedCard = () => {
  const [expandedCredential, setExpandedCredential] = useState<string>();
  const [initialized, setInitialized] = useState(false);

  const onHeaderPress = useCallback((credentialId?: string) => {
    if (!credentialId) {
      return;
    }
    setInitialized(true);
    setExpandedCredential((oldValue) => {
      if (credentialId === oldValue) {
        return undefined;
      }
      return credentialId;
    });
  }, []);

  const setInitialCredential = useCallback(
    (credentialId: string) => {
      if (!initialized) {
        setExpandedCredential(credentialId);
      }
      setInitialized(true);
    },
    [initialized],
  );

  const foldCards = useCallback(() => {
    setExpandedCredential(undefined);
  }, []);

  return { expandedCredential, foldCards, onHeaderPress, setInitialCredential };
};

export const useCredentialOfferSelectedCards = () => {
  const [selectedCredentials, setSelectedCredentials] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);

  const onHeaderPress = useCallback((credentialId?: string) => {
    if (!credentialId) {
      return;
    }
    setInitialized(true);
    setSelectedCredentials((oldValue) => {
      if (oldValue.includes(credentialId)) {
        return oldValue.filter((id) => id !== credentialId);
      }
      return [
        ...oldValue,
        credentialId,
      ];
    });
  }, []);

  const setInitialSelection = useCallback(
    (credentialIds: string[]) => {
      if (!initialized) {
        setSelectedCredentials(credentialIds);
      }
      setInitialized(true);
    },
    [initialized],
  );

  return { onHeaderPress, selectedCredentials, setInitialSelection };
};
