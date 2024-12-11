import { TrustEntity, TrustEntityStateEnum } from '@procivis/react-native-one-core';
import React, { FC, memo } from 'react';
import { View } from 'react-native';

import { NerdModeItem } from '../../ui-components/nerd-view';
import { AttributesLabels, EntityType } from '../../ui-components/screens/nerd-mode-screen';
import { addElementIf } from '../../utils/array';

interface EntityAttributesProps {
  trustEntity?: TrustEntity;
  labels: AttributesLabels;
  onCopyToClipboard: (value: string) => void;
  entityType: EntityType;
}

const EntityAttributes: FC<EntityAttributesProps> = ({ trustEntity, labels, entityType, onCopyToClipboard }) => {
  const didId = trustEntity?.did?.did || '';
  const didSections = didId.split(':') ?? [];
  const identifier = didSections.pop();
  const didMethod = didSections.length ? didSections.join(':') + ':' : '';

  const attributes = [
    ...addElementIf(Boolean(trustEntity?.state === TrustEntityStateEnum.ACTIVE), {
      attributeKey: labels.trustRegistry,
      highlightedText: trustEntity?.trustAnchor.name,
      testID: 'trustRegistry',
    }),
    ...addElementIf(Boolean(didId), {
      attributeKey: entityType === EntityType.CredentialEntity ? labels.issuerDid : labels.entityDid,
      attributeText: identifier,
      canBeCopied: true,
      highlightedText: didMethod,
      testID: 'issuerDID',
    }),
    ...addElementIf(Boolean(trustEntity?.role), {
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
