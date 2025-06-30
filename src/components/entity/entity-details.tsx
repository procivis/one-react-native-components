import { IdentifierCertificateDetail, IdentifierListItem,TrustEntity, TrustEntityRoleEnum, TrustEntityStateEnum } from '@procivis/react-native-one-core';
import React, { FC, ReactNode, useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { AvatarProps } from '../../ui-components';
import EntityCluster from '../../ui-components/entity/entity-cluster';
import { EntityNotTrustedIcon, EntityTrustedIcon } from '../../ui-components/icons';
import { concatTestID, replaceBreakingHyphens, useIdentifierDetails } from '../../utils';
import { useTrustEntity } from '../../utils/hooks/core/trust-entity';

export type EntityDetailsLabels = {
  unknown: string;
};

export type EntityDetailsProps = {
  labels: EntityDetailsLabels;
  renderMore?: (trustEntity: TrustEntity) => ReactNode;
  role: Exclude<TrustEntityRoleEnum, TrustEntityRoleEnum.BOTH>;
  style?: StyleProp<ViewStyle>;
  sublineColor?: string;
  textColor?: string;
  testID?: string;
} & (
    | {
      identifier?: IdentifierListItem;
    }
    | {
      entity: TrustEntity;
    }
  );

const getCertificateCommonName = (certificate: IdentifierCertificateDetail): string | undefined => {
  return certificate.x509Attributes.subject.split(', ').find((s) => s.startsWith('CN'))?.split('=')?.pop();
}

const EntityDetails: FC<EntityDetailsProps> = ({ labels, renderMore, role, style, testID, sublineColor, textColor, ...props }) => {
  const { data, isLoading: isLoadingTrustEntity } = useTrustEntity('identifier' in props ? props.identifier?.id : undefined);
  const trustEntity: TrustEntity | undefined = 'entity' in props ? props.entity : data ?? undefined;
  const { data: identifierDetail, isLoading: isLoadingIdentifier } = useIdentifierDetails('identifier' in props ? props.identifier?.id : undefined);

  const trusted =
    trustEntity &&
    trustEntity.state === TrustEntityStateEnum.ACTIVE &&
    (trustEntity.role === TrustEntityRoleEnum.BOTH || trustEntity.role === role);

  const isLoading = isLoadingIdentifier || isLoadingTrustEntity;

  const avatarProps: AvatarProps | undefined = useMemo(() => {
    if (isLoading) {
      return undefined;
    }

    const avatar = trusted && identifierDetail?.type === 'DID' && trustEntity.logo ? { imageSource: { uri: trustEntity.logo } } : undefined;

    const placeholderText = identifierDetail?.type === 'CERTIFICATE' && identifierDetail.certificates?.[0] ? getCertificateCommonName(identifierDetail.certificates[0])?.substring(0, 1) : 'D';

    const statusIcon = trusted ? 
      <EntityTrustedIcon testID={concatTestID(testID, 'statusIcon', 'trusted')} /> :
      <EntityNotTrustedIcon testID={concatTestID(testID, 'statusIcon', 'notTrusted')} />;

    if (trustEntity) {
      return {
        avatar,
        placeholderText: trusted && identifierDetail?.type === 'DID' ? trustEntity.name.substring(0, 1) : placeholderText,
        statusIcon,
        testID: concatTestID(testID, 'avatar'),
      };
    }

    return {
      placeholderText,
      statusIcon,
    }
  }, [trustEntity, trusted, identifierDetail, isLoading, testID]);

  const trustEntityName = useMemo(() => {
    if (isLoading) {
      return '';
    }
    if (identifierDetail?.type === 'CERTIFICATE' && identifierDetail.certificates?.[0]) {
      const commonName = getCertificateCommonName(identifierDetail.certificates[0]);
      if (commonName) {
        return commonName;
      }
    }
    if (trustEntity) {
      return trustEntity.name;
    }
    if (identifierDetail?.did?.did) {
      return replaceBreakingHyphens(identifierDetail.did.did);
    }

    return labels.unknown;
  }, [labels.unknown, trustEntity, identifierDetail, isLoading]);

  return (
    <>
      <EntityCluster
        avatar={avatarProps}
        entityName={trustEntityName}
        style={style}
        testID={testID}
        textColor={textColor}
        sublineColor={sublineColor}
        isLoading={isLoading}
      />
      {trustEntity && renderMore && renderMore(trustEntity)}
    </>
  );
};

export default EntityDetails;
