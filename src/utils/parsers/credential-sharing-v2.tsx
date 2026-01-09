import {
  ClaimBindingDto,
  ClaimValueBindingDto,
  Config,
  CredentialQueryFailureHintResponseBindingDto,
  PresentationDefinitionV2ClaimBindingDto,
  PresentationDefinitionV2ClaimValueBindingDto,
  PresentationDefinitionV2CredentialDetailBindingDto,
} from '@procivis/react-native-one-core';
import React from 'react';

import {
  CredentialAttribute,
  CredentialCardNotice,
  CredentialCardProps,
  CredentialNoticeWarningIcon,
  CredentialWarningIcon,
  Selector,
  SelectorStatus,
} from '../../ui-components';
import { concatTestID } from '../testID';
import {
  CredentialDetailsCardPropsWithoutWidth,
  detailsCardAttributeFromClaim,
  getCredentialCardPropsFromCredential,
  supportsSelectiveDisclosure,
} from '.';
import { ShareCredentialCardLabels, validityCheckedCardFromCredential } from './credential-sharing';

const v2ClaimValueToClaimValue = (value: PresentationDefinitionV2ClaimValueBindingDto): ClaimValueBindingDto => {
  if (value.type_ !== 'NESTED') {
    return value;
  }
  return {
    type_: 'NESTED',
    value: value.value.map((c) => v2PresentationClaimToClaim(c)),
  };
};

const v2PresentationClaimToClaim = (claim: PresentationDefinitionV2ClaimBindingDto): ClaimBindingDto => {
  return {
    schema: claim.schema,
    path: claim.path,
    value: v2ClaimValueToClaimValue(claim.value),
  };
};

const getAttributeSelectorStatus = (
  claim: PresentationDefinitionV2ClaimBindingDto,
  selected: boolean,
  force: boolean,
): SelectorStatus | undefined => {
  if (claim.required && selected) {
    return SelectorStatus.Required;
  }
  if (force) {
    return SelectorStatus.Required;
  }
  if (claim.userSelection) {
    if (selected) {
      return SelectorStatus.SelectedCheckmark;
    } else {
      return SelectorStatus.Empty;
    }
  }
};

export const shareCredentialCardAttributeFromV2Claim = (
  claim: PresentationDefinitionV2ClaimBindingDto,
  selection: string[] | undefined,
  parentShared: boolean,
  parentUserSelected: boolean,
  config: Config,
  testID: string,
  nested?: boolean,
  listValue?: boolean,
): CredentialAttribute => {
  const attributeShared =
    Boolean(selection?.some((path) => path.startsWith(claim.path))) || (parentShared && claim.required);
  const userSelected = parentUserSelected || Boolean(selection?.includes(claim.path));
  const selected = !claim.required && attributeShared;
  const status = selection
    ? getAttributeSelectorStatus(claim, attributeShared, parentUserSelected || (attributeShared && !userSelected))
    : undefined;
  const attribute = detailsCardAttributeFromClaim(v2PresentationClaimToClaim(claim), config, testID);
  const disabledStatus = [SelectorStatus.Disabled, SelectorStatus.Rejected, SelectorStatus.Required];
  const disabled = attribute.disabled || !status || disabledStatus.includes(status);
  const credentialAttribute: CredentialAttribute = {
    ...attribute,
    disabled,
    id: claim.path,
    listValue,
    nested,
    path: claim.path,
    rightAccessory: status && <Selector status={status} />,
    selected,
    testID,
  };
  if (claim.value.type_ === 'NESTED') {
    if (claim.schema.array) {
      return {
        ...credentialAttribute,
        attributes: undefined,
        image: undefined,
        value: undefined,
        values: claim.value.value.map((v) =>
          shareCredentialCardAttributeFromV2Claim(
            v,
            selection,
            attributeShared,
            userSelected,
            config,
            testID,
            true,
            false,
          ),
        ),
      };
    } else if (claim.schema.datatype === 'OBJECT') {
      return {
        ...credentialAttribute,
        attributes: claim.value.value.map((v) =>
          shareCredentialCardAttributeFromV2Claim(v, selection, attributeShared, userSelected, config, testID, true),
        ),
        image: undefined,
        value: undefined,
        valueErrorColor: undefined,
        values: undefined,
      };
    }
  }
  return credentialAttribute;
};

export const missingCredentialCardFromFailureHint = (
  failureHint: CredentialQueryFailureHintResponseBindingDto | undefined,
  notice: CredentialCardNotice | undefined,
  testID: string,
  labels: ShareCredentialCardLabels,
): Omit<CredentialCardProps, 'onHeaderPress' | 'style' | 'width'> => {
  return {
    cardImage: undefined,
    color: undefined,
    header: {
      credentialDetailErrorColor: true,
      credentialDetailPrimary: labels.missingCredential,
      credentialDetailTestID: concatTestID(testID, 'header.missing'),
      credentialName: failureHint?.credentialSchema?.name ?? '',
      statusIcon: CredentialWarningIcon,
    },
    testID,
    ...notice,
  };
};

export const shareCredentialCardFromV2PresentationCredential = (
  credential: PresentationDefinitionV2CredentialDetailBindingDto | undefined,
  failureHint: CredentialQueryFailureHintResponseBindingDto | undefined,
  expanded: boolean,
  multipleCredentialsAvailable: boolean,
  selectedFields: string[] | undefined,
  config: Config,
  testID: string,
  labels: ShareCredentialCardLabels,
): CredentialDetailsCardPropsWithoutWidth => {
  const selectiveDisclosureSupported = supportsSelectiveDisclosure(
    credential ? { ...credential, issuer: credential.issuer?.id } : undefined,
    config,
  );
  const notice: CredentialCardNotice | undefined =
    selectiveDisclosureSupported === false
      ? {
          noticeIcon: CredentialNoticeWarningIcon,
          text: labels.selectiveDisclosureNotice,
        }
      : undefined;
  const cardTestId = concatTestID(testID, 'card');
  const card = credential
    ? validityCheckedCardFromCredential(
        {
          ...credential,
          claims: [],
        },
        false,
        expanded,
        multipleCredentialsAvailable,
        config,
        notice,
        cardTestId,
        labels,
      )
    : missingCredentialCardFromFailureHint(failureHint, notice, cardTestId, labels);

  return {
    attributes:
      credential?.claims.map((v) =>
        shareCredentialCardAttributeFromV2Claim(v, selectedFields ?? [], true, false, config, testID),
      ) ?? [],
    card,
  };
};

export const selectCredentialCardFromV2Credential = (
  credential: PresentationDefinitionV2CredentialDetailBindingDto,
  selected: boolean,
  multiple: boolean,
  config: Config,
  testID: string,
  labels: ShareCredentialCardLabels,
): CredentialDetailsCardPropsWithoutWidth => {
  const selectiveDisclosureSupported = supportsSelectiveDisclosure(
    credential ? { ...credential, issuer: credential.issuer?.id } : undefined,
    config,
  );
  const selectedStatus = multiple ? SelectorStatus.SelectedCheckmark : SelectorStatus.SelectedRadio;
  const rightAccessory = <Selector status={selected ? selectedStatus : SelectorStatus.Empty} />;
  const notice: CredentialCardNotice | undefined =
    selectiveDisclosureSupported === false
      ? {
          noticeIcon: CredentialNoticeWarningIcon,
          text: labels.selectiveDisclosureNotice,
        }
      : undefined;
  const { header, ...cardProps } = getCredentialCardPropsFromCredential(
    {
      ...credential,
      claims: credential.claims.map(v2PresentationClaimToClaim),
    },
    credential.claims.map(v2PresentationClaimToClaim),
    config,
    notice,
    testID,
    labels,
  );
  const card = {
    header: {
      ...header,
      accessory: rightAccessory,
    },
    ...cardProps,
  };
  return {
    attributes:
      credential?.claims.map((v) =>
        shareCredentialCardAttributeFromV2Claim(v, undefined, false, false, config, testID),
      ) ?? [],
    card,
  };
};

export const getV2CredentialClaimAllSubpaths = (claim: PresentationDefinitionV2ClaimBindingDto): string[] => {
  if (claim.value.type_ !== 'NESTED') {
    return [claim.path];
  }
  return [claim.path, ...claim.value.value.flatMap(getV2CredentialClaimAllSubpaths)];
};

export const getV2CredentialAvailablePaths = (
  credential: PresentationDefinitionV2CredentialDetailBindingDto,
): string[] => {
  return credential.claims.flatMap(getV2CredentialClaimAllSubpaths);
};
