import {
  ClaimBindingDto,
  Config,
  CredentialDetailBindingDto,
  PresentationDefinitionFieldBindingDto,
  PresentationDefinitionRequestedCredentialBindingDto,
} from '@procivis/react-native-one-core';
import React from 'react';

import {
  CredentialAttribute,
  CredentialCardProps,
  CredentialHeaderProps,
  Selector,
  SelectorStatus,
} from '../../ui-components/credential';
import { CredentialCardNotice } from '../../ui-components/credential/card/credential-card';
import { CredentialNoticeWarningIcon, CredentialWarningIcon, RequiredAttributeIcon } from '../../ui-components/icons';
import { concatTestID } from '../testID';
import {
  CardLabels,
  CredentialDetailsCardPropsWithoutWidth,
  detailsCardAttributeFromClaim,
  getCredentialCardPropsFromCredential,
  getValidityState,
  nestAttributes,
  supportsSelectiveDisclosure,
  ValidityState,
} from './credential';

export const validityCheckedCardFromCredential = (
  credential: CredentialDetailBindingDto,
  invalidLVVC: boolean,
  expanded: boolean,
  multipleCredentialsAvailable: boolean,
  config: Config,
  notice: CredentialCardNotice | undefined,
  testID: string,
  labels: ShareCredentialCardLabels,
): Omit<CredentialCardProps, 'onHeaderPress' | 'style' | 'testID' | 'width'> => {
  let credentialHeaderDetail:
    | Pick<
        CredentialHeaderProps,
        | 'credentialDetailPrimary'
        | 'credentialDetailSecondary'
        | 'credentialDetailErrorColor'
        | 'credentialDetailTestID'
        | 'statusIcon'
      >
    | undefined;
  if (invalidLVVC) {
    credentialHeaderDetail = {
      credentialDetailErrorColor: true,
      credentialDetailPrimary: labels.revoked,
      credentialDetailTestID: concatTestID(testID, 'header.invalid'),
    };
  } else if (!expanded && multipleCredentialsAvailable) {
    credentialHeaderDetail = {
      credentialDetailPrimary: labels.multipleCredentials,
      credentialDetailTestID: concatTestID(testID, 'header.multiple'),
      statusIcon: CredentialWarningIcon,
    };
  }

  const card = getCredentialCardPropsFromCredential(credential, credential.claims, config, notice, testID, labels);
  return {
    ...card,
    header: {
      ...card.header,
      ...credentialHeaderDetail,
    },
  };
};

export const missingCredentialCardFromRequest = (
  request: PresentationDefinitionRequestedCredentialBindingDto,
  notice: CredentialCardNotice | undefined,
  testID: string,
  labels: ShareCredentialCardLabels,
): Omit<CredentialCardProps, 'onHeaderPress' | 'style' | 'width'> => {
  return {
    cardImage: undefined,
    color: undefined,
    testID,
    header: {
      credentialDetailErrorColor: true,
      credentialDetailPrimary: labels.missingCredential,
      credentialDetailTestID: concatTestID(testID, 'header.missing'),
      credentialName: request.name ?? request.id,
      statusIcon: CredentialWarningIcon,
    },
    ...notice,
  };
};

interface DisplayedAttribute {
  claim?: FlatClaim;
  field?: PresentationDefinitionFieldBindingDto;
  id: string;
  selected?: boolean;
  status: SelectorStatus;
}

const getAttributeSelectorStatus = (
  field: PresentationDefinitionFieldBindingDto,
  validityState: ValidityState,
  credential?: CredentialDetailBindingDto,
  claim?: ClaimBindingDto,
  selected?: boolean,
): SelectorStatus => {
  if (!credential || validityState !== ValidityState.Valid) {
    return SelectorStatus.Rejected;
  }
  if (field.required) {
    if (claim) {
      return SelectorStatus.Required;
    } else {
      return SelectorStatus.Rejected;
    }
  }
  if (!claim) {
    return SelectorStatus.Disabled;
  }
  return selected ? SelectorStatus.SelectedCheckmark : SelectorStatus.Empty;
};

type FlatClaim = ClaimBindingDto & {
  isArrayElement?: boolean;
};

// Returns a spread list of all claims with their full JSON path as key, including all intermediate objects
const spreadClaims = (claims: ClaimBindingDto[]): FlatClaim[] => {
  return claims.reduce((acc, claim) => {
    const result = [claim];
    if (claim.value.type_ === 'NESTED') {
      const nestedClaimsWithPath: FlatClaim[] = claim.value.value.map((c) => ({
        ...c,
        isArrayElement: claim.schema.array && claim.path.split('/').pop() !== claim.schema.key,
      }));
      result.push(...spreadClaims(nestedClaimsWithPath));
    }
    return [...acc, ...result];
  }, [] as FlatClaim[]);
};

const getDisplayedAttributes = (
  request: PresentationDefinitionRequestedCredentialBindingDto,
  validityState: ValidityState,
  credential?: CredentialDetailBindingDto,
  selectiveDisclosureSupported?: boolean,
  selectedFields?: string[],
): DisplayedAttribute[] => {
  const claims = credential ? spreadClaims(credential.claims) : undefined;
  const isApplicable = credential ? request.applicableCredentials.includes(credential.id) : false;

  let fields = request.fields;
  if (credential) {
    const fieldsWithNoKeyMapping = request.fields
      .filter((field) => !(credential.id in field.keyMap))
      .filter((field) => !isApplicable || !field.required);
    const fullyNestedFields = getFullyNestedFields(request.fields, credential.id);

    fields = [...fieldsWithNoKeyMapping, ...fullyNestedFields];
  }

  return fields.map((field) => {
    const selected = !field.required && selectedFields?.includes(field.id);
    const claim = credential
      ? claims?.find(({ path }) => {
          return path === field.keyMap[credential.id];
        })
      : undefined;
    const status =
      selectiveDisclosureSupported === false
        ? SelectorStatus.Required
        : getAttributeSelectorStatus(field, validityState, credential, claim, selected);
    return { claim, field, id: field.id, selected, status };
  });
};

const getFullyNestedFields = (
  fields: PresentationDefinitionRequestedCredentialBindingDto['fields'],
  credentialId: CredentialDetailBindingDto['id'],
) => {
  const allKeys = fields.filter((field) => credentialId in field.keyMap).map((field) => field.keyMap[credentialId]);

  return fields
    .map((field) => ({ field, key: field.keyMap[credentialId] }))
    .filter(({ key }) => key && allKeys.every((k) => !k.startsWith(`${key}/`)))
    .map(({ field }) => field);
};

export const shareCredentialCardAttributeFromClaim = (
  id: string,
  config: Config,
  testID: string,
  labels: ShareCredentialCardLabels,
  claim?: FlatClaim,
  field?: PresentationDefinitionFieldBindingDto,
): CredentialAttribute => {
  if (claim) {
    return {
      ...detailsCardAttributeFromClaim(claim, config, testID),
      id,
      path: claim.path,
      listValue: claim.isArrayElement,
    };
  }
  return {
    id,
    name: field?.name?.split('/').pop() ?? id,
    path: field?.name ?? id,
    value: labels.missingAttribute,
    valueErrorColor: true,
  };
};

// Will propagate the attribute status (right accessory + selected?) for all nested attributes
// Note: This function MUTATES the input attribute
const setStatusForNestedObjectOrArrayFields = (
  attribute: CredentialAttribute,
  status?: SelectorStatus,
  disabled?: boolean,
) => {
  const accessory = status && <Selector status={status} />;
  const isObject = attribute.attributes && attribute.attributes.length > 0;
  const isArray = attribute.values && attribute.values.length > 0;

  // If the attribute is not an object or array, we update the attribute and return
  if (!isObject && !isArray) {
    attribute.rightAccessory = accessory;
    attribute.disabled = disabled;
    return attribute;
  }

  // The object can be optional (tappable radio-checkmark), or required (checkmark)
  if (status === SelectorStatus.SelectedCheckmark || status === SelectorStatus.Empty) {
    // If it's a selectable object, the accessory is rendered next to the object title,
    // The nested attributes have no accessory, and can not be selected
    attribute.rightAccessory = accessory;
    setStatusForNestedObjectOrArrayFields(attribute, undefined, true);
  } else {
    const nested = attribute.attributes ?? attribute.values;
    // If the object is required / rejected, the accessory is rendered next to each nested attribute (except other object titles)
    // all fields are disabled
    for (const nestedAttribute of nested) {
      setStatusForNestedObjectOrArrayFields(nestedAttribute, status, true);
    }
  }
};

export type ShareCredentialCardLabels = CardLabels & {
  selectiveDisclosureNotice: string;
  missingAttribute: string;
  missingCredential: string;
  multipleCredentials: string;
};

export const shareCredentialCardFromCredential = (
  credential: CredentialDetailBindingDto | undefined,
  invalidLVVC: boolean,
  expanded: boolean,
  multipleCredentialsAvailable: boolean,
  request: PresentationDefinitionRequestedCredentialBindingDto,
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
          text: labels.selectiveDisclosureNotice,
          noticeIcon: CredentialNoticeWarningIcon,
        }
      : undefined;
  const cardTestId = concatTestID(testID, 'card');
  const card = credential
    ? validityCheckedCardFromCredential(
        credential,
        invalidLVVC,
        expanded,
        multipleCredentialsAvailable,
        config,
        notice,
        cardTestId,
        labels,
      )
    : missingCredentialCardFromRequest(request, notice, cardTestId, labels);
  const validityState = getValidityState(credential ? { ...credential, issuer: credential.issuer?.id } : undefined);
  const displayedAttributes = getDisplayedAttributes(
    request,
    validityState,
    credential,
    selectiveDisclosureSupported,
    selectedFields,
  );

  const attributes: CredentialAttribute[] = displayedAttributes.map(({ claim, field, id, selected, status }, index) => {
    const disabled = !credential || !field || field.required || !claim;
    const attribute: CredentialAttribute = {
      ...shareCredentialCardAttributeFromClaim(
        id,
        config,
        concatTestID(testID, 'attribute', `${index}`),
        labels,
        claim,
        field,
      ),
      selected,
    };

    setStatusForNestedObjectOrArrayFields(attribute, status, disabled);
    return attribute;
  });
  return {
    attributes: nestAttributes(attributes),
    card,
  };
};

export const selectCredentialCardAttributeFromClaim = (
  id: string,
  config: Config,
  testID: string,
  labels: ShareCredentialCardLabels,
  claim?: FlatClaim,
  field?: PresentationDefinitionFieldBindingDto,
): CredentialAttribute => {
  const attribute = shareCredentialCardAttributeFromClaim(id, config, testID, labels, claim, field);
  if (!claim) {
    return attribute;
  }
  return {
    ...attribute,
    rightAccessory: RequiredAttributeIcon,
  };
};

export const selectCredentialCardFromCredential = (
  credential: CredentialDetailBindingDto,
  selected: boolean,
  request: PresentationDefinitionRequestedCredentialBindingDto,
  config: Config,
  testID: string,
  labels: ShareCredentialCardLabels,
): CredentialDetailsCardPropsWithoutWidth => {
  const selectiveDisclosureSupported = supportsSelectiveDisclosure(
    credential ? { ...credential, issuer: credential.issuer?.id } : undefined,
    config,
  );
  const rightAccessory = <Selector status={selected ? SelectorStatus.SelectedRadio : SelectorStatus.Empty} />;
  const notice: CredentialCardNotice | undefined =
    selectiveDisclosureSupported === false
      ? {
          text: labels.selectiveDisclosureNotice,
          noticeIcon: CredentialNoticeWarningIcon,
        }
      : undefined;
  const { header, ...cardProps } = getCredentialCardPropsFromCredential(
    credential,
    credential.claims,
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
  const attributes: CredentialAttribute[] = getFullyNestedFields(request.fields, credential.id).map((field) => {
    const claim = spreadClaims(credential.claims).find(({ path }) => {
      return path === field.keyMap[credential.id];
    });

    const attribute = selectCredentialCardAttributeFromClaim(field.id, config, testID, labels, claim, field);
    return {
      ...attribute,
      rightAccessory: (
        <Selector status={field.required && !claim ? SelectorStatus.Rejected : SelectorStatus.Required} />
      ),
    };
  });
  return {
    attributes: nestAttributes(attributes),
    card,
  };
};
