import { IdentifierListItem, TrustEntityRoleEnum, TrustEntityStateEnum } from '@procivis/react-native-one-core';
import React, { FC, memo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { AttributesLabels, EntityLabels, EntityType } from '../../ui-components/screens/nerd-mode-screen';
import { useAppColorScheme } from '../../ui-components/theme/color-scheme-context';
import { concatTestID, useIdentifierDetails } from '../../utils';
import { useTrustEntity } from '../../utils/hooks/core/trust-entity';
import EntityAttributes from './entity-attributes';
import EntityDetails from './entity-details';
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

  return (
    <View style={{ backgroundColor: colorScheme.nerdView.background }}>
      <EntityDetails
        identifier={identifier}
        labels={{
          unknown: role === TrustEntityRoleEnum.ISSUER ? entityLabels.unknownIssuer : entityLabels.unknownVerifier,
        }}
        role={role}
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
