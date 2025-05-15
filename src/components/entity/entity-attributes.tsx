import { TrustEntity } from '@procivis/react-native-one-core';
import React, { FC, memo } from 'react';
import { View } from 'react-native';

import { NerdModeItem } from '../../ui-components/nerd-view';
import { AttributesLabels, EntityType } from '../../ui-components/screens/nerd-mode-screen';
import { addElementIf } from '../../utils/array';

interface EntityAttributesProps {
  did?: string;
  trustEntity?: TrustEntity;
  trusted: boolean;
  labels: AttributesLabels;
  onCopyToClipboard: (value: string) => void;
  entityType: EntityType;
}

const EntityAttributes: FC<EntityAttributesProps> = ({
  did,
  trustEntity,
  trusted,
  labels,
  entityType,
  onCopyToClipboard,
}) => {
  const didSections = did?.split(':') ?? [];
  const identifier = didSections.pop();
  const didMethod = didSections.length ? didSections.join(':') + ':' : '';

  const attributes = [
    ...addElementIf(trusted, {
      attributeKey: labels.trustRegistry,
      highlightedText: trustEntity?.trustAnchor.name,
      testID: 'trustRegistry',
    }),
    ...addElementIf(Boolean(did), {
      attributeKey: entityType === EntityType.CredentialEntity ? labels.issuerIdentifier : labels.entityIdentifier,
      attributeText: identifier,
      canBeCopied: true,
      highlightedText: didMethod,
      testID: 'issuerDID',
    }),
    ...addElementIf(trusted && Boolean(trustEntity?.role), {
      attributeKey: labels.role,
      highlightedText: trustEntity?.role,
      testID: 'role',
    }),
  ];
  return (
    <View>
      {attributes.map((attribute) => (
        <NerdModeItem
          key={attribute.attributeKey}
          {...attribute}
          labels={labels}
          onCopyToClipboard={onCopyToClipboard}
        />
      ))}
    </View>
  );
};

export default memo(EntityAttributes);
