import { CredentialListItemBindingDto } from '@procivis/react-native-one-core';
import React, { FC } from 'react';
import { ImageSourcePropType, View } from 'react-native';

import { useCredentialListExpandedCard } from '../../utils/hooks/credential-card/credential-card-expanding';
import { CardLabels } from '../../utils/parsers/credential';
import { CredentialDetails } from '../credential/credential';

interface PreviewCredentialsProps {
  credentials: CredentialListItemBindingDto[] | undefined;
  labels: CardLabels;
  onImagePreview: (title: string, image: ImageSourcePropType) => void;
}

export const PreviewCredentials: FC<PreviewCredentialsProps> = ({ credentials, labels, onImagePreview }) => {
  const { expandedCredential, onHeaderPress } = useCredentialListExpandedCard();

  if (!credentials || credentials.length === 0) {
    return null;
  }

  return (
    <View>
      {credentials.map((credential, index, { length }) => (
        <View key={credential.id}>
          <CredentialDetails
            credentialId={credential.id}
            expanded={expandedCredential === credential.id}
            labels={labels}
            lastItem={index === length - 1}
            onHeaderPress={onHeaderPress}
            onImagePreview={onImagePreview}
          />
        </View>
      ))}
    </View>
  );
};
