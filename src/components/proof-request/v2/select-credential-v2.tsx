import { CredentialListItem, PresentationDefinitionV2CredentialDetail } from '@procivis/react-native-one-core';
import React, { FC, useCallback, useMemo } from 'react';
import { Dimensions, ImageSourcePropType } from 'react-native';

import { CredentialDetailsCardListItem } from '../../../ui-components';
import { ShareCredentialCardLabels, useCoreConfig } from '../../../utils';
import { selectCredentialCardFromV2Credential } from '../../../utils/parsers/credential-sharing-v2';

export const SelectCredentialV2: FC<{
  credential: PresentationDefinitionV2CredentialDetail;
  labels: ShareCredentialCardLabels;
  lastItem: boolean;
  multiple: boolean;
  onImagePreview: (title: string, image: ImageSourcePropType) => void;
  onSelected?: (credentialId: CredentialListItem['id'], selected: boolean) => void;
  selected: boolean;
  testID: string;
}> = ({ credential, labels, lastItem, multiple, onImagePreview, onSelected, selected, testID }) => {
  const { data: config } = useCoreConfig();
  const cardWidth = useMemo(() => Dimensions.get('window').width - 32, []);

  const onHeaderPress = useCallback(() => {
    onSelected?.(credential.id, !selected);
  }, [credential.id, onSelected, selected]);

  if (!credential || !config) {
    return null;
  }

  const { card, attributes } = selectCredentialCardFromV2Credential(
    credential,
    selected,
    multiple,
    config,
    testID,
    labels,
  );

  return (
    <CredentialDetailsCardListItem
      attributes={attributes}
      card={{
        ...card,
        onHeaderPress,
        width: cardWidth,
      }}
      expanded={selected}
      lastItem={lastItem}
      onImagePreview={onImagePreview}
    />
  );
};
