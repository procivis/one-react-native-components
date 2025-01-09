import {
  addEventListener as onNetworkStateChange,
  NetInfoStateType,
  NetInfoSubscription,
} from '@react-native-community/netinfo';
import parseUrl from 'parse-url';
import { useEffect, useMemo, useState } from 'react';
import { EventSubscription } from 'react-native';
import BTStateManager from 'react-native-bluetooth-state-manager';

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
  supportedTransports: Transport[],
): {
  availableTransport: Transport[] | undefined;
  transportError: TransportError;
} => {
  const [internetState, setInternetState] = useState<InternetState>();
  const [bluetoothState, setBluetoothState] = useState<BluetoothState>();

  useEffect(() => {
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
      availableTransport.push(Transport.MQTT);
      availableTransport.push(Transport.HTTP);
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
  const parsedUrl = parseUrl(url);
  if (parsedUrl.parse_failed) {
    return [];
  }
  const protocol = parsedUrl.protocol as string;
  if (protocol !== 'openid4vp' && protocol !== customOpenIdUrlScheme) {
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
    if (hasAllParameters('key', 'brokerUrl', 'topicId')) {
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
