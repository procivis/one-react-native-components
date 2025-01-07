import { DidListItem, TrustEntity, TrustEntityRoleEnum, TrustEntityStateEnum } from '@procivis/react-native-one-core';
import React, { FC, ReactNode, useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import EntityCluster from '../../ui-components/entity/entity-cluster';
import { EntityTrustedIcon, HistoryStatusIcon, HistoryStatusIconType } from '../../ui-components/icons';
import { concatTestID, replaceBreakingHyphens } from '../../utils';
import { useTrustEntity } from '../../utils/hooks/core/trust-entity';

export type EntityDetailsLabels = {
  notTrusted: string;
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
  const trustEntity: TrustEntity | undefined = 'entity' in props ? props.entity : data;

  const trustEntityName = useMemo(() => {
    if (!trustEntity) {
      return labels.unknown;
    }
    return trustEntity.name;
  }, [labels, trustEntity]);

  const trustEntitySubline = useMemo(() => {
    if (!trustEntity) {
      return 'did' in props ? (props.did?.did ? replaceBreakingHyphens(props.did.did) : undefined) : undefined;
    }
    const trusted = trustEntity.role === TrustEntityRoleEnum.BOTH || trustEntity.role === role;
    if (!trusted) {
      return labels.notTrusted;
    }
    return undefined;
  }, [labels, props, role, trustEntity]);

  const trustEntityStatusIcon = useMemo(() => {
    if (!trustEntity) {
      return undefined;
    }
    if (
      trustEntity.state === TrustEntityStateEnum.REMOVED ||
      trustEntity.state === TrustEntityStateEnum.REMOVED_AND_WITHDRAWN
    ) {
      return (
        <HistoryStatusIcon type={HistoryStatusIconType.Error} testID={concatTestID(testID, 'statusIcon', 'unknown')} />
      );
    }
    const trustedForRole = trustEntity.role === TrustEntityRoleEnum.BOTH || trustEntity.role === role;
    if (trustEntity.state === TrustEntityStateEnum.WITHDRAWN || !trustedForRole) {
      return (
        <HistoryStatusIcon
          type={HistoryStatusIconType.Suspend}
          testID={concatTestID(testID, 'statusIcon', 'notTrusted')}
        />
      );
    }
    return <EntityTrustedIcon testID={concatTestID(testID, 'statusIcon', 'trusted')} />;
  }, [role, testID, trustEntity]);

  return (
    <>
      <EntityCluster
        avatar={
          trustEntity
            ? {
                avatar: trustEntity.logo ? { imageSource: { uri: trustEntity.logo } } : undefined,
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
