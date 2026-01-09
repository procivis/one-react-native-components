import {
  CredentialDetailBindingDto,
  CredentialListItemBindingDto,
  CredentialStateBindingEnum,
  PresentationDefinitionFieldBindingDto,
  PresentationDefinitionRequestedCredentialBindingDto,
} from '@procivis/react-native-one-core';
import React, { FunctionComponent, useMemo } from 'react';
import { Dimensions, ImageSourcePropType, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { CredentialDetailsCardListItem, useAppColorScheme } from '../../../ui-components';
import { concatTestID } from '../../../utils';
import { useCoreConfig } from '../../../utils/hooks/core/core-config';
import { getValidityState, ValidityState } from '../../../utils/parsers/credential';
import {
  shareCredentialCardFromCredential,
  ShareCredentialCardLabels,
} from '../../../utils/parsers/credential-sharing';
import { SelectShareCredentialCardNotice } from '../select-share-credential-card-notice';
import { ShareCredentialCardNotice } from '../share-credential-card-notice';

export type ShareCredentialLabels = ShareCredentialCardLabels & {
  invalidCredentialNotice: string;
  multipleCredentialsNotice: string;
  multipleCredentialsSelect: string;
  revokedCredentialNotice: string;
  suspendedCredentialNotice: string;
};

export const ShareCredential: FunctionComponent<{
  allCredentials: CredentialDetailBindingDto[];
  expanded?: boolean;
  labels: ShareCredentialLabels;
  lastItem?: boolean;
  onHeaderPress?: (_credentialId?: string) => void;
  onImagePreview: (title: string, image: ImageSourcePropType) => void;
  onSelectCredential?: () => void;
  onSelectField: (_id: PresentationDefinitionFieldBindingDto['id'], _selected: boolean) => void;
  request: PresentationDefinitionRequestedCredentialBindingDto;
  selectedCredentialId?: CredentialListItemBindingDto['id'];
  selectedFields?: Array<PresentationDefinitionFieldBindingDto['id']>;
  style?: StyleProp<ViewStyle>;
  testID: string;
}> = ({
  allCredentials,
  expanded,
  labels,
  lastItem,
  onHeaderPress,
  onImagePreview,
  onSelectCredential,
  onSelectField,
  request,
  selectedCredentialId,
  selectedFields,
  style,
  testID,
}) => {
  const colorScheme = useAppColorScheme();
  const credential = allCredentials.find((c) => c.id === selectedCredentialId);
  const { data: config } = useCoreConfig();
  const cardWidth = useMemo(() => Dimensions.get('window').width - 32, []);

  const selectionOptions = useMemo(
    () =>
      request.applicableCredentials.filter((applicableCredentialId) =>
        allCredentials.some(
          ({ id, state }) => id === applicableCredentialId && state === CredentialStateBindingEnum.ACCEPTED,
        ),
      ),
    [allCredentials, request],
  );
  const multipleCredentialsAvailable = selectionOptions.length > 1;

  const validityState = getValidityState(
    credential
      ? {
          ...credential,
          issuer: credential?.issuer?.id,
        }
      : undefined,
  );

  const invalid = useMemo(() => {
    if (!credential?.lvvcIssuanceDate || !request.validityCredentialNbf) {
      return false;
    }
    return new Date(credential.lvvcIssuanceDate) < new Date(request.validityCredentialNbf);
  }, [credential, request]);

  const footer = useMemo(() => {
    if (!expanded) {
      return;
    }
    if (validityState === ValidityState.Revoked) {
      return (
        <ShareCredentialCardNotice
          testID={concatTestID(testID, 'notice.revoked')}
          text={labels.revokedCredentialNotice}
        />
      );
    }
    if (validityState === ValidityState.Suspended) {
      return (
        <ShareCredentialCardNotice
          testID={concatTestID(testID, 'notice.suspended')}
          text={labels.suspendedCredentialNotice}
        />
      );
    }

    if (invalid) {
      return (
        <ShareCredentialCardNotice
          testID={concatTestID(testID, 'notice.invalid')}
          text={labels.invalidCredentialNotice}
        />
      );
    }

    if (multipleCredentialsAvailable) {
      return (
        <SelectShareCredentialCardNotice
          buttonTitle={labels.multipleCredentialsSelect}
          onPress={onSelectCredential}
          testID={concatTestID(testID, 'notice.multiple')}
          text={labels.multipleCredentialsNotice}
        />
      );
    }
  }, [expanded, invalid, labels, multipleCredentialsAvailable, onSelectCredential, testID, validityState]);

  if (!config) {
    return null;
  }

  const { card, attributes } = shareCredentialCardFromCredential(
    credential,
    invalid,
    Boolean(expanded),
    multipleCredentialsAvailable,
    request,
    selectedFields,
    config,
    testID,
    labels,
  );

  return (
    <CredentialDetailsCardListItem
      attributes={attributes}
      card={{
        ...card,
        credentialId: request.id,
        onHeaderPress,
        width: cardWidth,
      }}
      expanded={expanded}
      footer={footer}
      lastItem={lastItem}
      onAttributeSelected={onSelectField}
      onImagePreview={onImagePreview}
      style={[styles.credential, { borderColor: colorScheme.background }, style]}
      testID={testID}
    />
  );
};

const styles = StyleSheet.create({
  credential: {
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
  },
});
