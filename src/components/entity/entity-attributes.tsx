import { GetTrustEntityResponseBindingDto } from '@procivis/react-native-one-core';
import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { NerdModeItem } from '../../ui-components/nerd-view';
import { AttributesLabels, EntityType } from '../../ui-components/screens/nerd-mode-screen';
import { addElementIf } from '../../utils/array';

interface EntityAttributesProps {
  certificate?: string;
  did?: string;
  trustEntity?: GetTrustEntityResponseBindingDto;
  trusted: boolean;
  labels: AttributesLabels;
  onCopyToClipboard: (value: string) => void;
  entityType: EntityType;
  testID?: string;
}

const EntityAttributes: FC<EntityAttributesProps> = ({
  certificate,
  did,
  trustEntity,
  trusted,
  labels,
  entityType,
  testID,
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
    ...addElementIf(Boolean(certificate), {
      attributeKey: entityType === EntityType.CredentialEntity ? labels.issuerIdentifier : labels.entityIdentifier,
      attributeText: certificate,
      canBeCopied: true,
      testID: 'issuerCertificate',
    }),
    ...addElementIf(trusted && Boolean(trustEntity?.role), {
      attributeKey: labels.role,
      highlightedText: trustEntity?.role,
      testID: 'role',
    }),
  ];
  return (
    <View style={styles.wrapper}>
      {attributes.map((attribute) => (
        <NerdModeItem
          key={attribute.attributeKey}
          {...attribute}
          labels={labels}
          onCopyToClipboard={onCopyToClipboard}
          testID={testID}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
});

export default memo(EntityAttributes);
