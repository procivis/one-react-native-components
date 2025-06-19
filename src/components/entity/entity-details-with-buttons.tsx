import { IdentifierListItem, TrustEntityRoleEnum, TrustEntityStateEnum } from '@procivis/react-native-one-core';
import React, { FC, memo, useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import EntityCluster from '../../ui-components/entity/entity-cluster';
import { EntityNotTrustedIcon, EntityTrustedIcon } from '../../ui-components/icons';
import { AttributesLabels, EntityLabels, EntityType } from '../../ui-components/screens/nerd-mode-screen';
import { useAppColorScheme } from '../../ui-components/theme/color-scheme-context';
import { concatTestID, replaceBreakingHyphens, useIdentifierDetails } from '../../utils';
import { useTrustEntity } from '../../utils/hooks/core/trust-entity';
import EntityAttributes from './entity-attributes';
import EntityButtons from './EntityButtons';

export type ContextRole = Exclude<TrustEntityRoleEnum, TrustEntityRoleEnum.BOTH>;

interface EntityDetailsWithButtonsProps {
  identifier?: IdentifierListItem;
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
  identifier,
  entityLabels,
  attributesLabels,
  onCopyToClipboard,
  role,
  entityType,
  testID,
  ...props
}) => {
  let { data } = useTrustEntity(identifier?.id);
  let { data: identifierDetail } = useIdentifierDetails(identifier?.id);
  const trustEntity = data ?? undefined;

  const colorScheme = useAppColorScheme();

  const trusted = Boolean(
    trustEntity &&
    trustEntity.state === TrustEntityStateEnum.ACTIVE &&
    (trustEntity.role === TrustEntityRoleEnum.BOTH || trustEntity.role === role),
  );

  const trustEntityName = useMemo(() => {
    if (!trustEntity || !trusted) {
      if (identifierDetail?.did) {
        return replaceBreakingHyphens(identifierDetail.did.did);
      }
      if (identifierDetail?.certificates?.length) {
        return identifierDetail.certificates[0].name;
      }

      return role === TrustEntityRoleEnum.ISSUER ? entityLabels.unknownIssuer : entityLabels.unknownVerifier;
    }
    return trustEntity.name;
  }, [entityLabels, role, trustEntity, trusted, identifierDetail]);

  const trustEntitySubline = useMemo(() => {
    if (!trusted) {
      return undefined;
    }

    return `${entityLabels.trusted} • ${trustEntity?.trustAnchor.name}`;
  }, [trustEntity, trusted, entityLabels.trusted]);

  const trustEntityStatusIcon = useMemo(() => {
    if (!trusted) {
      return <EntityNotTrustedIcon testID={concatTestID(testID, 'statusIcon', 'notTrusted')} />;
    }
    return <EntityTrustedIcon testID={concatTestID(testID, 'statusIcon', 'trusted')} />;
  }, [testID, trusted]);

  return (
    <View style={{ backgroundColor: colorScheme.nerdView.background }}>
      <EntityCluster
        avatar={{
          avatar: trusted && trustEntity?.logo ? { imageSource: { uri: trustEntity.logo } } : undefined,
          placeholderText: trusted ? trustEntity?.name.substring(0, 1) : "U",
          statusIcon: trustEntityStatusIcon,
          testID: concatTestID(testID, 'avatar'),
        }}
        entityName={trustEntityName}
        subline={trustEntitySubline}
        sublineColor={trusted ? colorScheme.success : colorScheme.white}
        testID={testID}
        {...props}
      />
      {trusted && <EntityButtons entity={trustEntity} labels={entityLabels} testID={concatTestID(testID, 'links')} />}
      <EntityAttributes
        certificate={identifierDetail?.certificates?.[0]?.chain}
        did={identifierDetail?.did?.did}
        trustEntity={trustEntity}
        trusted={trusted}
        labels={attributesLabels}
        onCopyToClipboard={onCopyToClipboard}
        entityType={entityType}
      />
    </View>
  );
};

export default memo(EntityDetailsWithButtons);
