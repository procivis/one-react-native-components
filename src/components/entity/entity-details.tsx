import { DidListItem, TrustEntity, TrustEntityRoleEnum, TrustEntityStateEnum } from '@procivis/react-native-one-core';
import React, { FC, ReactNode, useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import EntityCluster from '../../ui-components/entity/entity-cluster';
import { EntityTrustedIcon } from '../../ui-components/icons';
import { concatTestID, replaceBreakingHyphens } from '../../utils';
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
      did?: DidListItem;
    }
  | {
      entity: TrustEntity;
    }
);

const EntityDetails: FC<EntityDetailsProps> = ({ labels, renderMore, role, style, testID, ...props }) => {
  const { data } = useTrustEntity('did' in props ? props.did?.id : undefined);
  const trustEntity: TrustEntity | undefined = 'entity' in props ? props.entity : data ?? undefined;

  const trusted =
    trustEntity &&
    trustEntity.state === TrustEntityStateEnum.ACTIVE &&
    (trustEntity.role === TrustEntityRoleEnum.BOTH || trustEntity.role === role);

  const trustEntityName = useMemo(() => {
    if (!trusted) {
      return labels.unknown;
    }
    return trustEntity.name;
  }, [labels.unknown, trustEntity, trusted]);

  const trustEntitySubline = useMemo(() => {
    if (!trustEntity) {
      return 'did' in props ? (props.did?.did ? replaceBreakingHyphens(props.did.did) : undefined) : undefined;
    }
    if (!trusted) {
      return replaceBreakingHyphens(trustEntity.did.did);
    }
    return undefined;
  }, [props, trustEntity, trusted]);

  const trustEntityStatusIcon = useMemo(() => {
    if (!trusted) {
      return undefined;
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
                placeholderText: trustEntity.name.substring(0, 1),
                statusIcon: trustEntityStatusIcon,
                testID: concatTestID(testID, 'avatar'),
              }
            : undefined
        }
        entityName={trustEntityName}
        style={style}
        subline={trustEntitySubline}
        testID={testID}
      />
      {trustEntity && renderMore && renderMore(trustEntity)}
    </>
  );
};

export default EntityDetails;
