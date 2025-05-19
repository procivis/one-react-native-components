import { IdentifierListItem,TrustEntity, TrustEntityRoleEnum, TrustEntityStateEnum } from '@procivis/react-native-one-core';
import React, { FC, ReactNode, useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

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
  testID?: string;
} & (
    | {
      identifier?: IdentifierListItem;
    }
    | {
      entity: TrustEntity;
    }
  );

const EntityDetails: FC<EntityDetailsProps> = ({ labels, renderMore, role, style, testID, ...props }) => {
  const { data } = useTrustEntity('identifier' in props ? props.identifier?.id : undefined);
  const trustEntity: TrustEntity | undefined = 'entity' in props ? props.entity : data ?? undefined;
  const { data: identifierDetail } = useIdentifierDetails('identifier' in props ? props.identifier?.id : undefined);

  const trusted =
    trustEntity &&
    trustEntity.state === TrustEntityStateEnum.ACTIVE &&
    (trustEntity.role === TrustEntityRoleEnum.BOTH || trustEntity.role === role);

  const trustEntityName = useMemo(() => {
    if (!trusted) {
      if (identifierDetail?.did?.did) {
        return replaceBreakingHyphens(identifierDetail.did.did);
      }
      return labels.unknown;
    }
    return trustEntity.name;
  }, [labels.unknown, trustEntity, trusted, identifierDetail]);

  const trustEntityStatusIcon = useMemo(() => {
    if (!trusted) {
      return <EntityNotTrustedIcon testID={concatTestID(testID, 'statusIcon', 'notTrusted')} />;
    }
    return <EntityTrustedIcon testID={concatTestID(testID, 'statusIcon', 'trusted')} />;
  }, [testID, trusted]);

  return (
    <>
      <EntityCluster
        avatar={
          trustEntity
            ? {
              avatar: trusted && trustEntity.logo ? { imageSource: { uri: trustEntity.logo } } : undefined,
              placeholderText: trusted ? trustEntity.name.substring(0, 1) : "U",
              statusIcon: trustEntityStatusIcon,
              testID: concatTestID(testID, 'avatar'),
            }
            : {
              statusIcon: trustEntityStatusIcon,
              placeholderText: "U",
            }
        }
        entityName={trustEntityName}
        style={style}
        testID={testID}
      />
      {trustEntity && renderMore && renderMore(trustEntity)}
    </>
  );
};

export default EntityDetails;
