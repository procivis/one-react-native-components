import { ApisauceInstance, create } from 'apisauce';
import { useMemo } from 'react';

export const useHTTPClient = () => {
  return useMemo<ApisauceInstance>(() => {
    return create({
      headers: {
        Accept: 'application/json',
      },
      baseURL: undefined,
    });
  }, []);
};
