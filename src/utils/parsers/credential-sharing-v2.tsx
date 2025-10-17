import {
  Claim,
  Config,
  DataTypeEnum,
  FailureHint,
  PresentationDefinitionV2ClaimValue,
  PresentationDefinitionV2CredentialClaim,
  PresentationDefinitionV2CredentialDetail,
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
import { WUAState } from '../wallet-unit';
import {
  CredentialDetailsCardPropsWithoutWidth,
  detailsCardAttributeFromClaim,
  getCredentialCardPropsFromCredential,
  supportsSelectiveDisclosure,
} from '.';
import { ShareCredentialCardLabels, validityCheckedCardFromCredential } from './credential-sharing';

const v2ClaimValueToClaimValue = (value: PresentationDefinitionV2ClaimValue): string | number | boolean | Claim[] => {
  if (!Array.isArray(value)) {
    return value;
  }
  return value.map((c) => v2PresentationClaimToClaim(c));
};

const v2PresentationClaimToClaim = (claim: PresentationDefinitionV2CredentialClaim): Claim => {
  if (Array.isArray(claim.value)) {
    if (claim.schema.array) {
      return {
        array: claim.schema.array,
        dataType: claim.schema.datatype,
        id: claim.path,
        key: claim.path,
        value: v2ClaimValueToClaimValue(claim.value) as Claim[],
      };
    } else {
      return {
        array: claim.schema.array,
        dataType: DataTypeEnum.Object,
        id: claim.path,
        key: claim.path,
        value: v2ClaimValueToClaimValue(claim.value) as Claim[],
      };
    }
  }
  return {
    array: false,
    dataType: claim.schema.datatype,
    id: claim.path,
    key: claim.path,
    value: claim.value,
  };
};

const getAttributeSelectorStatus = (
  claim: PresentationDefinitionV2CredentialClaim,
  selected: boolean,
  force: boolean,
): SelectorStatus | undefined => {
  if (claim.required && selected) {
    return SelectorStatus.Required;
  }
  if (force && claim.value) {
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
  claim: PresentationDefinitionV2CredentialClaim,
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
  if (Array.isArray(claim.value)) {
    if (claim.schema.array) {
      return {
        ...credentialAttribute,
        attributes: undefined,
        image: undefined,
        value: undefined,
        values: claim.value.map((v) =>
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
        attributes: claim.value.map((v) =>
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
  failureHint: FailureHint['failureHint'] | undefined,
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
  credential: PresentationDefinitionV2CredentialDetail | undefined,
  failureHint: FailureHint['failureHint'] | undefined,
  expanded: boolean,
  multipleCredentialsAvailable: boolean,
  selectedFields: string[] | undefined,
  config: Config,
  wuaState: WUAState | undefined,
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
        wuaState,
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
  credential: PresentationDefinitionV2CredentialDetail,
  selected: boolean,
  multiple: boolean,
  config: Config,
  wuaState: WUAState | undefined,
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
    wuaState,
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

export const getV2CredentialClaimAllSubpaths = (claim: PresentationDefinitionV2CredentialClaim): string[] => {
  if (!Array.isArray(claim.value)) {
    return [claim.path];
  }
  return [claim.path, ...claim.value.flatMap(getV2CredentialClaimAllSubpaths)];
};

export const getV2CredentialAvailablePaths = (credential: PresentationDefinitionV2CredentialDetail): string[] => {
  return credential.claims.flatMap(getV2CredentialClaimAllSubpaths);
};
