import { DidListItem, TrustEntityRoleEnum, TrustEntityStateEnum } from '@procivis/react-native-one-core';
import React, { FC, memo, useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import EntityCluster from '../../ui-components/entity/entity-cluster';
import { EntityTrustedIcon, HistoryStatusIcon, HistoryStatusIconType } from '../../ui-components/icons';
import { AttributesLabels, EntityLabels, EntityType } from '../../ui-components/screens/nerd-mode-screen';
import { useAppColorScheme } from '../../ui-components/theme/color-scheme-context';
import { replaceBreakingHyphens } from '../../utils';
import { useTrustEntity } from '../../utils/hooks/core/trust-entity';
import EntityAttributes from './entity-attributes';
import EntityButtons from './EntityButtons';

export type ContextRole = Exclude<TrustEntityRoleEnum, TrustEntityRoleEnum.BOTH>;

interface EntityDetailsWithButtonsProps {
  did?: DidListItem;
  entityLabels: EntityLabels;
  attributesLabels: AttributesLabels;
  style?: StyleProp<ViewStyle>;
  textColor?: string;
  testID?: string;
  role: ContextRole;
  onCopyToClipboard: (value: string) => void;
  entityType: EntityType;
}

const EntityDetailsWithButtons: FC<EntityDetailsWithButtonsProps> = ({
  did,
  entityLabels,
  attributesLabels,
  onCopyToClipboard,
  role,
  entityType,
  ...props
}) => {
  let { data: trustEntity } = useTrustEntity(did?.id);
  const colorScheme = useAppColorScheme();

  const trustEntityName = useMemo(() => {
    if (!trustEntity) {
      return role === TrustEntityRoleEnum.ISSUER ? entityLabels.unknownIssuer : entityLabels.unknownVerifier;
    }
    return trustEntity.name;
  }, [entityLabels, role, trustEntity]);

  const trustEntitySubline = useMemo(() => {
    if (!trustEntity) {
      return 'did' in props ? (did?.did ? replaceBreakingHyphens(did.did) : undefined) : undefined;
    }
    const trusted =
      trustEntity.state === TrustEntityStateEnum.ACTIVE &&
      (trustEntity.role === TrustEntityRoleEnum.BOTH || trustEntity.role === role);
    if (!trusted) {
      return entityLabels.notTrusted;
    }
    return undefined;
  }, [trustEntity, role, props, did, entityLabels]);

  const trustEntityStatusIcon = useMemo(() => {
    if (!trustEntity) {
      return undefined;
    }
    if (
      trustEntity.state === TrustEntityStateEnum.REMOVED ||
      trustEntity.state === TrustEntityStateEnum.REMOVED_AND_WITHDRAWN
    ) {
      return <HistoryStatusIcon type={HistoryStatusIconType.Error} />;
    }
    const trustedForRole = trustEntity.role === TrustEntityRoleEnum.BOTH || trustEntity.role === role;
    if (trustEntity.state === TrustEntityStateEnum.WITHDRAWN || !trustedForRole) {
      return <HistoryStatusIcon type={HistoryStatusIconType.Suspend} />;
    }
    return EntityTrustedIcon;
  }, [role, trustEntity]);

  return (
    <View style={{ backgroundColor: colorScheme.nerdView.background }}>
      <EntityCluster
        avatar={{
          avatar: trustEntity?.logo ? { imageSource: { uri: trustEntity.logo } } : undefined,
          placeholderText: trustEntity?.name.substring(0, 1),
          statusIcon: trustEntityStatusIcon,
        }}
        entityName={trustEntityName}
        subline={trustEntitySubline}
        sublineColor={colorScheme.success}
        {...props}
      />
      <EntityButtons entity={trustEntity} labels={entityLabels} />
      <EntityAttributes
        trustEntity={trustEntity!}
        labels={attributesLabels}
        onCopyToClipboard={onCopyToClipboard}
        entityType={entityType}
      />
    </View>
  );
};

export default memo(EntityDetailsWithButtons);
