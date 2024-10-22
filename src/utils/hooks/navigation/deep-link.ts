import { useCallback, useEffect, useState } from 'react';
import { Linking } from 'react-native';

import { reportException, reportTraceInfo } from '../../reporting';

export const useRuntimeDeepLinkHandling = (enabled: boolean, handleInvitationUrl: (invitationUrl: string) => void) => {
  const [deepLinkURL, setDeepLinkURL] = useState<string>();
  useEffect(() => {
    const subscription = Linking.addEventListener('url', ({ url }) => {
      reportTraceInfo('Connection', 'Runtime deep link');
      setDeepLinkURL(url);
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (!enabled || !deepLinkURL) {
      return;
    }
    setDeepLinkURL(undefined);
    handleInvitationUrl(deepLinkURL);
  }, [deepLinkURL, enabled, handleInvitationUrl]);
};

let initialDeepLinkHandled = false;
export const useInitialDeepLinkHandling = (handleInvitationUrl: (invitationUrl: string) => void) => {
  return useCallback(() => {
    if (!initialDeepLinkHandled) {
      Linking.getInitialURL()
        .then((url) => {
          initialDeepLinkHandled = true;
          if (url) {
            reportTraceInfo('Connection', 'Initial deep link');
            handleInvitationUrl(url);
          }
        })
        .catch((e) => reportException(e, 'Failed to get initial deep link'));
    }
  }, [handleInvitationUrl]);
};
