import { ONECore, OneError } from '@procivis/react-native-one-core';
import { useCallback } from 'react';

import { reportException } from '../../reporting';
import { useONECore } from './core-context';
import { OneErrorCode } from './error-code';

export const SW_DID_NAME_PREFIX = 'holder-did-sw-key';
export const HW_DID_NAME_PREFIX = 'holder-did-hw-key';

const generateHwDid = async (core: ONECore, organisationId: string) => {
  const hwKeyId = await core
    .generateKey({
      keyParams: {},
      keyType: 'ES256',
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
    return core.createDid({
      didMethod: 'KEY',
      keys: {
        assertionMethod: [hwKeyId],
        authentication: [hwKeyId],
        capabilityDelegation: [hwKeyId],
        capabilityInvocation: [hwKeyId],
        keyAgreement: [hwKeyId],
      },
      name: HW_DID_NAME_PREFIX,
      organisationId,
      params: {},
    });
  }

  return null;
};

const generateSwDid = async (core: ONECore, organisationId: string) => {
  const swKeyId = await core.generateKey({
    keyParams: {},
    keyType: 'EDDSA',
    name: 'holder-key-sw',
    organisationId,
    storageParams: {},
    storageType: 'INTERNAL',
  });

  return core.createDid({
    didMethod: 'KEY',
    keys: {
      assertionMethod: [swKeyId],
      authentication: [swKeyId],
      capabilityDelegation: [swKeyId],
      capabilityInvocation: [swKeyId],
      keyAgreement: [swKeyId],
    },
    name: SW_DID_NAME_PREFIX,
    organisationId,
    params: {},
  });
};

// create base local identifiers in the wallet
export const useInitializeONECoreIdentifiers = () => {
  const { core, organisationId } = useONECore();

  return useCallback(async () => {
    return await core
      .createOrganisation(organisationId)
      .catch((e) => {
        if (e instanceof OneError && e.code === OneErrorCode.OrganisationAlreadyExists) {
          return;
        }
        throw e;
      })
      .then(() => Promise.all([generateHwDid(core, organisationId), generateSwDid(core, organisationId)]))
      .catch((err) => {
        reportException(err, 'Failed to create base identifiers');
        throw err;
      });
  }, [core, organisationId]);
};
