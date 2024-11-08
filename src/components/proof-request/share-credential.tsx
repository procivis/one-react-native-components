import {
  CredentialListItem,
  CredentialStateEnum,
  PresentationDefinitionField,
  PresentationDefinitionRequestedCredential,
} from '@procivis/react-native-one-core';
import React, { FunctionComponent, useMemo } from 'react';
import { ImageSourcePropType, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Button, ButtonType, CredentialDetailsCardListItem, Typography, useAppColorScheme } from '../../ui-components';
import { concatTestID } from '../../utils';
import { useCoreConfig } from '../../utils/hooks/core/core-config';
import { useCredentialDetail } from '../../utils/hooks/core/credentials';
import { getValidityState, ValidityState } from '../../utils/parsers/credential';
import { shareCredentialCardFromCredential, ShareCredentialCardLabels } from '../../utils/parsers/credential-sharing';

export type ShareCredentialLabels = ShareCredentialCardLabels & {
  revokedCredentialNotice: string;
  suspendedCredentialNotice: string;
  invalidCredentialNotice: string;
  multipleCredentialsNotice: string;
  multipleCredentialsSelect: string;
};

export const ShareCredential: FunctionComponent<{
  allCredentials: CredentialListItem[];
  credentialId: string;
  expanded?: boolean;
  labels: ShareCredentialLabels;
  lastItem?: boolean;
  onHeaderPress?: (_credentialId?: string) => void;
  onImagePreview: (title: string, image: ImageSourcePropType) => void;
  onSelectCredential?: () => void;
  onSelectField: (_id: PresentationDefinitionField['id'], _selected: boolean) => void;
  request: PresentationDefinitionRequestedCredential;
  selectedCredentialId?: CredentialListItem['id'];
  selectedFields?: Array<PresentationDefinitionField['id']>;
  style?: StyleProp<ViewStyle>;
  testID: string;
}> = ({
  allCredentials,
  credentialId,
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
  const { data: credential, isLoading } = useCredentialDetail(selectedCredentialId);
  const { data: config } = useCoreConfig();

  const selectionOptions = useMemo(
    () =>
      request.applicableCredentials.filter((applicableCredentialId) =>
        allCredentials.some(({ id, state }) => id === applicableCredentialId && state === CredentialStateEnum.ACCEPTED),
      ),
    [allCredentials, request],
  );
  const multipleCredentialsAvailable = selectionOptions.length > 1;

  const validityState = getValidityState(credential);

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
        <View
          style={[styles.notice, { backgroundColor: colorScheme.background }]}
          testID={concatTestID(testID, 'notice.revoked')}>
          <Typography align="center" color={colorScheme.text} preset="s/line-height-capped">
            {labels.revokedCredentialNotice}
          </Typography>
        </View>
      );
    }
    if (validityState === ValidityState.Suspended) {
      return (
        <View
          style={[styles.notice, { backgroundColor: colorScheme.background }]}
          testID={concatTestID(testID, 'notice.suspended')}>
          <Typography align="center" color={colorScheme.text} preset="s/line-height-capped">
            {labels.suspendedCredentialNotice}
          </Typography>
        </View>
      );
    }

    if (invalid) {
      return (
        <View
          style={[styles.notice, { backgroundColor: colorScheme.background }]}
          testID={concatTestID(testID, 'notice.invalid')}>
          <Typography align="center" color={colorScheme.text} preset="s/line-height-capped">
            {labels.invalidCredentialNotice}
          </Typography>
        </View>
      );
    }

    if (multipleCredentialsAvailable) {
      return (
        <View
          style={[styles.notice, { backgroundColor: colorScheme.background }]}
          testID={concatTestID(testID, 'notice.multiple')}>
          <Typography align="center" color={colorScheme.text} preset="s/line-height-capped">
            {labels.multipleCredentialsNotice}
          </Typography>
          <Button
            onPress={onSelectCredential}
            style={styles.noticeButton}
            testID={concatTestID(testID, 'notice.multiple.button')}
            title={labels.multipleCredentialsSelect}
            type={ButtonType.Secondary}
          />
        </View>
      );
    }
  }, [colorScheme, expanded, invalid, labels, multipleCredentialsAvailable, onSelectCredential, testID, validityState]);

  if (isLoading || !config) {
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
        credentialId,
        onHeaderPress,
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
  notice: {
    marginBottom: 22,
    marginHorizontal: 12,
    padding: 12,
  },
  noticeButton: {
    marginTop: 24,
    paddingVertical: 11,
  },
});
