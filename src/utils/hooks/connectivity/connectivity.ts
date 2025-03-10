import {
  addEventListener as onNetworkStateChange,
  NetInfoStateType,
  NetInfoSubscription,
} from '@react-native-community/netinfo';
import parseUrl from 'parse-url';
import { useEffect, useMemo, useState } from 'react';
import { EventSubscription } from 'react-native';
import BTStateManager from 'react-native-bluetooth-state-manager';

import { getEnabledTransports, useCoreConfig } from '../core/core-config';

export enum InternetState {
  Available,
  Unreachable,
  Disabled,
}

export type InternetError = Exclude<InternetState, InternetState.Available>;

export enum BluetoothState {
  Available,
  Unauthorized,
  Disabled,
  Unavailable,
}

export type BluetoothError = Exclude<BluetoothState, BluetoothState.Available>;

export enum Transport {
  Bluetooth = 'BLE',
  HTTP = 'HTTP',
  MQTT = 'MQTT',
}

export type TransportError = {
  ble?: BluetoothError;
  internet?: InternetError;
};

export const useAvailableTransports = (
  possibleTransports: Transport[],
): {
  availableTransport: Transport[] | undefined;
  transportError: TransportError;
} => {
  const [internetState, setInternetState] = useState<InternetState>();
  const [bluetoothState, setBluetoothState] = useState<BluetoothState>();

  const { data: coreConfig } = useCoreConfig();

  const supportedTransports = useMemo(() => {
    if (!coreConfig) {
      return;
    }
    const enabledTransports = getEnabledTransports(coreConfig);

    return possibleTransports.filter((t) => enabledTransports.includes(t));
  }, [possibleTransports, coreConfig]);

  useEffect(() => {
    if (!supportedTransports) {
      return;
    }

    let btSubscription: EventSubscription | undefined;
    if (supportedTransports.includes(Transport.Bluetooth)) {
      btSubscription = BTStateManager.onStateChange((state) => {
        switch (state) {
          case 'PoweredOn':
            setBluetoothState(BluetoothState.Available);
            break;
          case 'PoweredOff':
            setBluetoothState(BluetoothState.Disabled);
            break;
          case 'Unauthorized':
            setBluetoothState(BluetoothState.Unauthorized);
            break;
          default:
            setBluetoothState(BluetoothState.Unavailable);
        }
      }, true);
    }
    let netSubscription: NetInfoSubscription | undefined;
    if (supportedTransports.includes(Transport.HTTP) || supportedTransports.includes(Transport.MQTT)) {
      netSubscription = onNetworkStateChange((state) => {
        if (state.type === NetInfoStateType.none) {
          setInternetState(InternetState.Disabled);
          return;
        }
        if (state.isInternetReachable === null) {
          return;
        }
        if (state.isInternetReachable) {
          setInternetState(InternetState.Available);
        } else {
          setInternetState(InternetState.Unreachable);
        }
      });
    }
    return () => {
      btSubscription?.remove();
      netSubscription?.();
    };
  }, [supportedTransports]);

  const transportStatus = useMemo(() => {
    if (!supportedTransports) {
      return {
        availableTransport: undefined,
        transportError: {},
      };
    }

    const waitingForInternetState =
      (supportedTransports.includes(Transport.HTTP) || supportedTransports.includes(Transport.MQTT)) &&
      internetState === undefined;
    const waitingForBluetoothState = supportedTransports.includes(Transport.Bluetooth) && bluetoothState === undefined;
    if (waitingForInternetState || waitingForBluetoothState) {
      return {
        availableTransport: undefined,
        transportError: {},
      };
    }
    const availableTransport: Transport[] = [];
    const transportError: TransportError = {};
    if (internetState === InternetState.Available) {
      supportedTransports.includes(Transport.MQTT) && availableTransport.push(Transport.MQTT);
      supportedTransports.includes(Transport.HTTP) && availableTransport.push(Transport.HTTP);
    } else {
      transportError.internet = internetState;
    }
    if (bluetoothState === BluetoothState.Available) {
      availableTransport.push(Transport.Bluetooth);
    } else {
      transportError.ble = bluetoothState;
    }
    return { availableTransport, transportError };
  }, [bluetoothState, internetState, supportedTransports]);

  return transportStatus;
};

export const getInvitationUrlTransports = (url: string, customOpenIdUrlScheme?: string): Transport[] => {
  let parsedUrl: parseUrl.ParsedUrl;
  try {
    parsedUrl = parseUrl(url);
  } catch (e) {
    return [];
  }

  if (parsedUrl.parse_failed) {
    return [];
  }
  const protocol = parsedUrl.protocol as string;
  if (protocol !== 'openid4vp' && protocol !== customOpenIdUrlScheme?.toLowerCase()) {
    return [Transport.HTTP];
  }

  const query = parsedUrl.query as Record<string, string>;
  const hasAllParameters = (...params: string[]): boolean => {
    return params.every((param) => param in query);
  };

  const transports: Transport[] = [];
  // BLE/MQTT
  if (parsedUrl.host === 'connect') {
    if (hasAllParameters('name', 'key')) {
      transports.push(Transport.Bluetooth);
    }
    if (hasAllParameters('brokerUrl', 'topicId')) {
      transports.push(Transport.MQTT);
    }

    return transports;
  }
  // HTTP
  if (
    hasAllParameters('response_type', 'state', 'nonce', 'presentation_definition_uri') ||
    hasAllParameters('client_id', 'request_uri')
  ) {
    transports.push(Transport.HTTP);
  }

  return transports;
};
