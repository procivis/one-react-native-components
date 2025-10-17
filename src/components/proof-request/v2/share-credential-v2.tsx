import {
  CredentialListItem,
  PresentationDefinitionV2CredentialClaim,
  PresentationDefinitionV2CredentialQuery,
} from '@procivis/react-native-one-core';
import React, { FunctionComponent, useCallback, useMemo } from 'react';
import { Dimensions, ImageSourcePropType, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { CredentialDetailsCardListItem, useAppColorScheme } from '../../../ui-components';
import {
  concatTestID,
  getValidityState,
  useCoreConfig,
  useWalletUnitAttestation,
  ValidityState,
  walletUnitAttestationState,
} from '../../../utils';
import { shareCredentialCardFromV2PresentationCredential } from '../../../utils/parsers/credential-sharing-v2';
import { SelectShareCredentialCardNotice } from '../select-share-credential-card-notice';
import { ShareCredentialCardNotice } from '../share-credential-card-notice';
import { ShareCredentialLabels } from '../v1';

export type ShareCredentialV2Props = {
  credentialQuery: PresentationDefinitionV2CredentialQuery;
  credentialRequestId: string;
  expanded?: boolean;
  grouped?: boolean;
  headerAccessory?: React.ComponentType<any> | React.ReactElement;
  labels: ShareCredentialLabels;
  lastItem?: boolean;
  onHeaderPress?: (_credentialId?: string) => void;
  onImagePreview: (title: string, image: ImageSourcePropType) => void;
  onSelectCredential?: () => void;
  onSelectField: (
    credentialId: CredentialListItem['id'],
    fieldPath: PresentationDefinitionV2CredentialClaim['path'],
    selected: boolean,
  ) => void;
  selectedCredentialId?: CredentialListItem['id'];
  selectedFields?: Array<PresentationDefinitionV2CredentialClaim['path']>;
  style?: StyleProp<ViewStyle>;
  testID: string;
};

export const GroupedShareCredentialV2Padding = 4;

export const ShareCredentialV2: FunctionComponent<ShareCredentialV2Props> = ({
  credentialQuery,
  credentialRequestId,
  expanded,
  grouped,
  headerAccessory,
  labels,
  lastItem,
  onHeaderPress,
  onImagePreview,
  onSelectCredential,
  onSelectField,
  selectedCredentialId,
  selectedFields,
  style,
  testID,
}) => {
  const colorScheme = useAppColorScheme();
  const applicableCredentials =
    'applicableCredentials' in credentialQuery ? credentialQuery.applicableCredentials : undefined;
  const failureHint = 'failureHint' in credentialQuery ? credentialQuery.failureHint : undefined;
  const credential = applicableCredentials?.find((c) => c.id === selectedCredentialId) ?? applicableCredentials?.[0];
  const { data: config } = useCoreConfig();
  const { data: walletUnitAttestation, isLoading: isLoadingWUA } = useWalletUnitAttestation();
  const cardWidth = useMemo(
    () => Dimensions.get('window').width - 32 - (grouped ? GroupedShareCredentialV2Padding * 2 : 0),
    [grouped],
  );

  const multipleCredentialsAvailable = Boolean(applicableCredentials?.length && applicableCredentials.length > 1);

  const validityState = getValidityState(
    credential
      ? {
          ...credential,
          issuer: credential?.issuer?.id,
        }
      : undefined,
  );

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

    if (failureHint?.reason === 'VALIDITY') {
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
  }, [
    expanded,
    failureHint?.reason,
    labels.invalidCredentialNotice,
    labels.multipleCredentialsNotice,
    labels.multipleCredentialsSelect,
    labels.revokedCredentialNotice,
    labels.suspendedCredentialNotice,
    multipleCredentialsAvailable,
    onSelectCredential,
    testID,
    validityState,
  ]);

  const onAttributeSelected = useCallback(
    (fieldPath: PresentationDefinitionV2CredentialClaim['path'], selected: boolean) => {
      if (!selectedCredentialId) {
        return;
      }
      onSelectField(selectedCredentialId, fieldPath, selected);
    },
    [onSelectField, selectedCredentialId],
  );

  if (!config || isLoadingWUA) {
    return null;
  }

  const {
    card: { header, ...card },
    attributes,
  } = shareCredentialCardFromV2PresentationCredential(
    credential,
    failureHint,
    Boolean(expanded),
    multipleCredentialsAvailable,
    selectedFields,
    config,
    walletUnitAttestationState(walletUnitAttestation),
    testID,
    labels,
  );

  if (headerAccessory) {
    header.accessory = headerAccessory;
  }

  return (
    <CredentialDetailsCardListItem
      attributes={attributes}
      card={{
        ...card,
        credentialId: credentialRequestId,
        header,
        onHeaderPress,
        width: cardWidth,
      }}
      expanded={expanded}
      footer={footer}
      lastItem={lastItem}
      onAttributeSelected={onAttributeSelected}
      onImagePreview={onImagePreview}
      style={[
        styles.credential,
        grouped ? styles.groupedCredential : styles.bordered,
        { borderColor: colorScheme.background },
        style,
      ]}
      testID={testID}
    />
  );
};

const styles = StyleSheet.create({
  bordered: {
    borderWidth: 1,
  },
  credential: {
    borderRadius: 10,
    marginBottom: 8,
  },
  groupedCredential: {
    marginHorizontal: GroupedShareCredentialV2Padding,
  },
});
