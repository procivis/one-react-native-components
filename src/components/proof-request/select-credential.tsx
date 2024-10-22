import { PresentationDefinitionRequestedCredential } from '@procivis/react-native-one-core';
import React, { FC } from 'react';
import { ImageSourcePropType } from 'react-native';

import { CredentialDetailsCardListItem } from '../../ui-components';
import { useCoreConfig } from '../../utils/hooks/core/core-config';
import { useCredentialDetail } from '../../utils/hooks/core/credentials';
import { selectCredentialCardFromCredential, ShareCredentialCardLabels } from '../../utils/parsers/credential-sharing';

export const SelectCredential: FC<{
  credentialId: string;
  labels: ShareCredentialCardLabels;
  lastItem: boolean;
  onImagePreview: (title: string, image: ImageSourcePropType) => void;
  onPress?: () => void;
  request: PresentationDefinitionRequestedCredential;
  selected: boolean;
  testID: string;
}> = ({ credentialId, labels, lastItem, onImagePreview, onPress, request, selected, testID }) => {
  const { data: credential } = useCredentialDetail(credentialId);
  const { data: config } = useCoreConfig();

  if (!credential || !config) {
    return null;
  }

  const { card, attributes } = selectCredentialCardFromCredential(
    credential,
    selected,
    request,
    config,
    testID,
    labels,
  );

  return (
    <CredentialDetailsCardListItem
      attributes={attributes}
      card={{
        ...card,
        onHeaderPress: onPress,
      }}
      expanded={selected}
      lastItem={lastItem}
      onImagePreview={onImagePreview}
    />
  );
};
