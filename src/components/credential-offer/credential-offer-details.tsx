import { ClaimSchema } from '@procivis/react-native-one-core';
import React, { FC, useMemo } from 'react';
import { Dimensions, ImageSourcePropType, StyleSheet } from 'react-native';

import { CredentialAttribute, CredentialDetailsCardListItem,Selector, SelectorStatus } from '../../ui-components';
import { CardLabels, concatTestID, detailsCardFromCredential,useCoreConfig, useCredentialDetail, useCredentialSchemaDetail } from '../../utils';

const getDummyAttributes = (
  claimSchemas: ClaimSchema[],
): CredentialAttribute[] =>
  claimSchemas.map((schema) => ({
    attributes: [],
    id: schema.id,
    name: schema.key,
    path: schema.key,
  }));

export type OfferCardLabels = CardLabels & {
  less: string;
  more: string;
  showAll: string;
  showLess: string;
}

export interface CredentialOfferDetailsProps {
  credentialId: string;
  hideHeaderAccessory?: boolean;
  labels: OfferCardLabels;
  language?: string;
  lastItem?: boolean;
  onHeaderPress?: (credentialId?: string) => void;
  onImagePreview: (title: string, image: ImageSourcePropType) => void;
  selected?: boolean;
}

export const CredentialOfferDetails: FC<CredentialOfferDetailsProps> = ({
  credentialId,
  hideHeaderAccessory,
  labels,
  language,
  lastItem,
  onHeaderPress,
  onImagePreview,
  selected = false,
}) => {
  const { data: credential } = useCredentialDetail(credentialId);
  const { data: credentialSchema } = useCredentialSchemaDetail(
    credential?.schema.id,
  );
  const { data: config } = useCoreConfig();
  const cardWidth = useMemo(() => Dimensions.get('window').width - 32, []);

  const testID = concatTestID('Credential.credential', credential?.id);
  
  const { card, attributes } =
    credential && config
      ? detailsCardFromCredential(
          credential,
          config,
          `${testID}.detail`,
          labels,
          language,
        )
      : { attributes: [], card: undefined };

  const displayedAttributes = useMemo(() => {
    if (attributes && attributes.length) {
      return attributes;
    }
    return credentialSchema ? getDummyAttributes(credentialSchema.claims) : [];
  }, [attributes, credentialSchema]);

  if (!credential || !config || !card) {
    return null;
  }

  if (!hideHeaderAccessory) {
    card.header.accessory = <Selector status={selected ? SelectorStatus.SelectedCheckmark : SelectorStatus.Empty} />;
  }

  return (
    <CredentialDetailsCardListItem
      attributes={displayedAttributes}
      card={{
        ...card,
        credentialId,
        onHeaderPress,
        width: cardWidth,
      }}
      expanded={selected}
      lastItem={lastItem}
      lessLabel={labels.more}
      moreLabel={labels.less}
      onImagePreview={onImagePreview}
      showAllButtonLabel={labels.showAll}
      showLessButtonLabel={labels.showLess}
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
