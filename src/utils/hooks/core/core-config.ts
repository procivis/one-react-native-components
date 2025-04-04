import { Config, ConfigEntities } from '@procivis/react-native-one-core';
import { useQuery } from 'react-query';

import { useONECore } from './core-context';

const CONFIG_QUERY_KEY = 'config';

export const useCoreConfig = () => {
  const { core } = useONECore();

  return useQuery([CONFIG_QUERY_KEY], () => core?.getConfig(), {
    keepPreviousData: true,
  });
};

export const getEnabledTransports = (config: Config): string[] => {
  return Object.values(config?.transport ?? {})
    .filter((t) => t.enabled)
    .map((transport) => transport.type);
};

export const getEnabledExchangeProtocols = (exchangeProtocol: ConfigEntities): string[] => {
  return Object.values(exchangeProtocol ?? {})
    .filter((t) => t.enabled)
    .map((exchange) => exchange.type);
};

export const getEnabledTrustManagement = (config: Config): string[] => {
  return Object.values(config?.trustManagement ?? {})
    .filter((t) => t.enabled)
    .map((trustManagement) => trustManagement.type);
};
