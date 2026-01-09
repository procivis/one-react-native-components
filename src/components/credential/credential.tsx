import { ClaimBindingDto } from '@procivis/react-native-one-core';
import React, { FC, useMemo } from 'react';
import { Dimensions, ImageSourcePropType, StyleSheet } from 'react-native';

import { CredentialDetailsCardListItem, CredentialHeaderProps } from '../../ui-components/credential/card';
import { concatTestID } from '../../utils';
import { useCoreConfig } from '../../utils/hooks/core/core-config';
import { useCredentialDetail } from '../../utils/hooks/core/credentials';
import { CardLabels, detailsCardFromCredentialWithClaims } from '../../utils/parsers/credential';

export interface CredentialDetailsProps {
  claims?: ClaimBindingDto[];
  credentialId: string;
  expanded?: boolean;
  headerAccessory?: CredentialHeaderProps['accessory'];
  labels: CardLabels;
  lastItem?: boolean;
  onHeaderPress?: (credentialId?: string) => void;
  onImagePreview: (title: string, image: ImageSourcePropType) => void;
}

export const CredentialDetails: FC<CredentialDetailsProps> = ({
  claims,
  credentialId,
  expanded = false,
  labels,
  lastItem,
  onHeaderPress,
  onImagePreview,
  headerAccessory,
}) => {
  const { data: credential } = useCredentialDetail(credentialId);
  const { data: config } = useCoreConfig();
  const cardWidth = useMemo(() => Dimensions.get('window').width - 32, []);

  if (!credential || !config) {
    return null;
  }
  const testID = concatTestID('Credential.credential', credential.id);

  const { card, attributes } = detailsCardFromCredentialWithClaims(
    credential,
    claims ?? credential.claims,
    config,
    testID,
    labels,
  );
  if (headerAccessory) {
    card.header.accessory = headerAccessory;
  }

  return (
    <CredentialDetailsCardListItem
      attributes={attributes}
      card={{
        ...card,
        credentialId,
        onHeaderPress,
        width: cardWidth,
      }}
      expanded={expanded}
      lastItem={lastItem}
      onImagePreview={onImagePreview}
      style={styles.credential}
      testID={testID}
    />
  );
};

const styles = StyleSheet.create({
  credential: {
    marginBottom: 8,
  },
});
