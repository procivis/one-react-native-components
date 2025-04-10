import { Claim, CredentialSchemaCodeType, CredentialSchemaLayoutProperties } from '@procivis/react-native-one-core';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Barcode, CarouselImage, CarouselImageType, Mrz, QrCode } from '../../ui-components/credential';
import { ImageOrComponent } from '../../ui-components/image';
import { isASCII } from '../string';
import { concatTestID } from '../testID';
import { findClaimByPath } from './credential';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
});

export const getCarouselImagesFromClaims = (
  claims: Claim[],
  layoutProperties?: CredentialSchemaLayoutProperties,
  testID?: string,
): CarouselImage[] => {
  const result: CarouselImage[] = [];

  if (!layoutProperties) {
    return result;
  }

  const { code, pictureAttribute } = layoutProperties;

  if (pictureAttribute) {
    const pictureClaim = findClaimByPath(pictureAttribute, claims);
    if (pictureClaim) {
      result.push({
        element: (
          <ImageOrComponent
            source={{ imageSource: { uri: pictureClaim.value as string } }}
            style={styles.container}
            testID={concatTestID(testID, CarouselImageType.Photo)}
          />
        ),
        type: CarouselImageType.Photo,
      });
    }
  }

  if (code) {
    const claim = findClaimByPath(code.attribute, claims);

    if (claim && typeof claim.value === 'number') {
      claim.value = String(claim.value);
    }

    if (!claim || typeof claim.value !== 'string') {
      return result;
    }

    if (code.type === CredentialSchemaCodeType.QR_CODE) {
      result.push({
        element: <QrCode content={claim.value} testID={concatTestID(testID, CarouselImageType.QrCode)} />,
        type: CarouselImageType.QrCode,
      });
    } else if (code.type === CredentialSchemaCodeType.BARCODE && isASCII(claim.value)) {
      result.push({
        element: <Barcode content={claim.value} testID={concatTestID(testID, CarouselImageType.Barcode)} />,
        type: CarouselImageType.Barcode,
      });
    } else if (code.type === CredentialSchemaCodeType.MRZ) {
      result.push({
        element: <Mrz content={claim.value} testID={concatTestID(testID, CarouselImageType.MRZ)} />,
        type: CarouselImageType.MRZ,
      });
    }
  }

  return result;
};
