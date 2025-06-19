import { ONECore, OneError } from '@procivis/react-native-one-core';
import { useCallback } from 'react';

import { reportException } from '../../reporting';
import { useONECore } from './core-context';
import { OneErrorCode } from './error-code';

export const SW_DID_NAME_PREFIX = 'holder-did-sw-key';
export const HW_DID_NAME_PREFIX = 'holder-did-hw-key';

export const generateHwIdentifier = async (core: ONECore, organisationId: string) => {
  const hwKeyId = await core
    .generateKey({
      keyParams: {},
      keyType: 'ECDSA',
      name: 'holder-key-hw',
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

  if (hwKeyId) {
    return core.createIdentifier({
      did: {
        method: 'KEY',
        name: HW_DID_NAME_PREFIX,
        keys: {
          assertionMethod: [hwKeyId],
          authentication: [hwKeyId],
          capabilityDelegation: [hwKeyId],
          capabilityInvocation: [hwKeyId],
          keyAgreement: [hwKeyId],
        },
        params: {},
      },
      name: HW_DID_NAME_PREFIX,
      organisationId,
    });
  }

  return null;
};

export const generateSwIdentifier = async (core: ONECore, organisationId: string) => {
  const swKeyId = await core.generateKey({
    keyParams: {},
    keyType: 'ECDSA',
    name: 'holder-key-sw',
    organisationId,
    storageParams: {},
    storageType: 'INTERNAL',
  });

  return core.createIdentifier({
    did: {
      method: 'KEY',
      name: SW_DID_NAME_PREFIX,
      keys: {
        assertionMethod: [swKeyId],
        authentication: [swKeyId],
        capabilityDelegation: [swKeyId],
        capabilityInvocation: [swKeyId],
        keyAgreement: [swKeyId],
      },
      params: {},
    },
    name: SW_DID_NAME_PREFIX,
    organisationId,
  });
};

export interface IdentifiersInitializationConfig {
  generateHwKey: boolean;
  generateSwKey: boolean;
}

/**
 * Create base local identifiers
 * @param {IdentifiersInitializationConfig} config Select desired keys/dids to be created
 * @returns [hwIdentifierId, swIdentifierId]
 */
export const useInitializeONECoreIdentifiers = ({ generateHwKey, generateSwKey }: IdentifiersInitializationConfig) => {
  const { core, organisationId } = useONECore();

  return useCallback(async () => {
    return await core
      .createOrganisation({ id: organisationId })
      .catch((e) => {
        if (e instanceof OneError && e.code === OneErrorCode.OrganisationAlreadyExists) {
          return;
        }
        throw e;
      })
      .then(() =>
        Promise.all([
          generateHwKey ? generateHwIdentifier(core, organisationId) : null,
          generateSwKey ? generateSwIdentifier(core, organisationId) : null,
        ]),
      )
      .catch((err) => {
        reportException(err, 'Failed to create base identifiers');
        throw err;
      });
  }, [core, organisationId, generateHwKey, generateSwKey]);
};
