import {
  Claim,
  CoreConfig,
  CredentialDetail,
  CredentialListItem,
  CredentialSchemaListItem,
  CredentialState,
  DataType,
  FormatFeature,
} from '@procivis/react-native-one-core';
import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

import {
  CredentialAttribute,
  CredentialAttributeValue,
  CredentialCardProps,
  CredentialDetailsCardProps,
  CredentialHeaderProps,
} from '../../ui-components/credential';
import { CredentialCardNotice } from '../../ui-components/credential/card/credential-card';
import { CredentialErrorIcon, CredentialNoticeWarningIcon, CredentialWarningIcon } from '../../ui-components/icons';
import { formatDateLocalized, formatDateTimeLocalized } from '../date';
import { concatTestID } from '../testID';
import { getCarouselImagesFromClaims } from './credential-images';

export enum ValidityState {
  Revoked = 'revoked',
  Suspended = 'suspended',
  Valid = 'valid',
}

export const getValidityState = (credential: CredentialListItem | undefined) => {
  if (credential?.state === CredentialState.REVOKED) {
    return ValidityState.Revoked;
  }
  if (credential?.state === CredentialState.SUSPENDED) {
    return ValidityState.Suspended;
  }
  return ValidityState.Valid;
};

export const supportsSelectiveDisclosure = (
  credential: CredentialListItem | undefined,
  config: CoreConfig | undefined,
) => {
  const formatConfig = credential && config?.format[credential.schema.format];
  return formatConfig
    ? Boolean(formatConfig.capabilities?.features?.includes(FormatFeature.SelectiveDisclosure))
    : undefined;
};

export const findClaimByPath = (path: string | undefined, claims: Claim[]): Claim | undefined => {
  if (!path) {
    return undefined;
  }

  const exactClaim = claims.find((claim) => claim.path === path);
  if (exactClaim) {
    return exactClaim;
  }

  const parentClaim = claims.find((claim) => path.startsWith(`${claim.path}/`));
  if (parentClaim && parentClaim.value.type_ === 'NESTED') {
    return findClaimByPath(path, parentClaim.value.value);
  }

  return undefined;
};

const formatCredentialDetail = (claim: Claim, config: CoreConfig, testID: string): string => {
  const attributeValue = detailsCardAttributeValueFromClaim(claim, config, testID);
  return attributeValue.value ?? '';
};

export const hasMsoValidityIssues = (credential: CredentialDetail): boolean => {
  const mdocMsoValidityIssue = Boolean(
    credential.mdocMsoValidity?.nextUpdate && new Date(credential.mdocMsoValidity.nextUpdate) < new Date(),
  );

  return mdocMsoValidityIssue;
};

export type CardHeaderLabels = {
  validityIssues: string;
  revoked: string;
  suspended: string;
  suspendedUntil: (date: string) => string;
};

const credentialDetailFromCredential = (
  credential: CredentialDetail,
  claims: Claim[] = [],
  config: CoreConfig,
  testID: string,
  labels: CardHeaderLabels,
): {
  credentialDetailPrimary?: string;
  credentialDetailSecondary?: string;
  credentialDetailErrorColor?: boolean;
  credentialDetailTestID?: string;
  statusIcon?: FC<SvgProps>;
} => {
  const { layoutProperties } = credential.schema;

  switch (credential.state) {
    case CredentialState.SUSPENDED:
      return {
        credentialDetailPrimary: credential.suspendEndDate
          ? labels.suspendedUntil(formatDateTimeLocalized(new Date(credential.suspendEndDate))!)
          : labels.suspended,
        credentialDetailTestID: concatTestID(testID, 'suspended'),
        statusIcon: CredentialWarningIcon,
      };
    case CredentialState.REVOKED:
      return {
        credentialDetailPrimary: labels.revoked,
        credentialDetailErrorColor: true,
        credentialDetailTestID: concatTestID(testID, 'revoked'),
        statusIcon: CredentialErrorIcon,
      };
  }

  if (hasMsoValidityIssues(credential)) {
    return {
      credentialDetailPrimary: labels.validityIssues,
      credentialDetailTestID: concatTestID(testID, 'validity-issue'),
      statusIcon: CredentialWarningIcon,
    };
  }

  let credentialDetailPrimary =
    formatDateTimeLocalized(new Date(credential.issuanceDate ?? credential.createdDate)) ?? '';
  let credentialDetailSecondary: string | undefined;

  const primary = findClaimByPath(layoutProperties?.primaryAttribute, claims);

  if (primary) {
    credentialDetailPrimary = formatCredentialDetail(primary, config, concatTestID(testID, 'primary'));
  }

  const secondary = findClaimByPath(layoutProperties?.secondaryAttribute, claims);

  if (secondary) {
    credentialDetailSecondary = formatCredentialDetail(secondary, config, concatTestID(testID, 'secondary'));
  }

  return {
    credentialDetailPrimary,
    credentialDetailSecondary,
    credentialDetailTestID: concatTestID(testID, 'detail'),
  };
};

export const cardHeaderFromCredential = (
  credential: CredentialDetail,
  claims: Claim[] = [],
  config: CoreConfig,
  testID: string,
  labels: CardHeaderLabels,
): Omit<CredentialHeaderProps, 'style'> => {
  const {
    credentialDetailPrimary,
    credentialDetailSecondary,
    credentialDetailErrorColor,
    credentialDetailTestID,
    statusIcon,
  } = credentialDetailFromCredential(credential, claims, config, testID, labels);
  const { layoutProperties } = credential.schema;

  return {
    color: layoutProperties?.logo?.backgroundColor,
    credentialDetailErrorColor,
    credentialDetailPrimary,
    credentialDetailSecondary,
    credentialDetailTestID,
    credentialName: credential.schema.name,
    icon: layoutProperties?.logo?.image
      ? {
          imageSource: {
            uri: layoutProperties.logo.image,
          },
        }
      : undefined,
    iconLabelColor: layoutProperties?.logo?.fontColor,
    statusIcon,
    testID,
  };
};

export type CardLabels = CardHeaderLabels & {
  validityIssuesNotice: string;
};

export const getCredentialCardPropsFromCredential = (
  credential: CredentialDetail,
  claims: Claim[] = [],
  config: CoreConfig,
  notice: CredentialCardNotice | undefined,
  testID: string,
  labels: CardLabels,
): Omit<CredentialCardProps, 'onHeaderPress' | 'style' | 'width'> => {
  const { layoutProperties } = credential.schema;

  if (hasMsoValidityIssues(credential)) {
    notice = {
      text: labels.validityIssuesNotice,
      noticeIcon: CredentialNoticeWarningIcon,
    };
  }

  const result: Omit<CredentialCardProps, 'onHeaderPress' | 'style' | 'width'> = {
    cardCarouselImages: getCarouselImagesFromClaims(claims, layoutProperties, concatTestID(testID, 'carousel')),
    cardImage: layoutProperties?.background?.image
      ? { imageSource: { uri: layoutProperties.background.image } }
      : undefined,
    color: layoutProperties?.background?.color,
    header: cardHeaderFromCredential(credential, claims, config, concatTestID(testID, 'header'), labels),
    testID,
    notice,
  };

  return result;
};

export const detailsCardAttributeFromClaim = (
  claim: Claim,
  config: CoreConfig,
  testID: string,
): CredentialAttribute => {
  const value = detailsCardAttributeValueFromClaim(claim, config, testID);
  return {
    id: claim.path,
    name: claim.path.split('/').pop(),
    path: claim.path,
    ...value,
  };
};

const detailsCardAttributeValueFromClaim = (
  claim: Claim,
  config: CoreConfig,
  testID: string,
): CredentialAttributeValue => {
  const typeConfig = config?.datatype[claim.schema.datatype];

  if (claim.schema.array) {
    return {
      values: ((claim.value.value as Claim[]) || []).map((arrayValue, index) => {
        return detailsCardAttributeFromClaim(arrayValue, config, concatTestID(testID, index.toString()));
      }),
    };
  } else {
    switch (typeConfig?.type) {
      case DataType.Object: {
        if (claim.value.type_ !== 'NESTED') {
          return { attributes: [] };
        }
        return {
          attributes: claim.value.value.map((nestedClaim, index) =>
            detailsCardAttributeFromClaim(nestedClaim, config, concatTestID(testID, index.toString())),
          ),
        };
      }
      case DataType.Date: {
        if (!claim.value.value) {
          // Don't try to parse empty values (which will return "Invalid Date")
          return { testID: testID, value: String(claim.value.value) };
        }
        const date = claim.value.value as string;
        return {
          testID: testID,
          value: formatDateLocalized(new Date(date)) ?? date,
        };
      }
      case DataType.Picture: // fallback
      case DataType.SwiyuPicture: {
        if (typeConfig.params?.showAs === 'IMAGE') {
          return { image: { uri: claim.value.value as string }, testID: testID };
        } else {
          return { testID: testID, value: claim.value.value as string };
        }
      }
      default:
        return { testID: testID, value: String(claim.value.value) };
    }
  }
};

export type CredentialDetailsCardPropsWithoutWidth = Omit<CredentialDetailsCardProps, 'expanded' | 'card'> & {
  card: Omit<CredentialCardProps, 'width'>;
};

export const detailsCardFromCredential = (
  credential: CredentialDetail,
  config: CoreConfig,
  testID: string,
  labels: CardLabels,
): CredentialDetailsCardPropsWithoutWidth => {
  return detailsCardFromCredentialWithClaims(credential, credential.claims, config, testID, labels);
};

export const detailsCardFromCredentialWithClaims = (
  credential: CredentialDetail,
  claims: Claim[],
  config: CoreConfig,
  testID: string,
  labels: CardLabels,
): CredentialDetailsCardPropsWithoutWidth => {
  const attributes: CredentialAttribute[] = claims.map((claim, index) =>
    detailsCardAttributeFromClaim(claim, config, concatTestID(testID, 'attribute', index.toString())),
  );

  const card = getCredentialCardPropsFromCredential(
    credential,
    claims,
    config,
    undefined,
    concatTestID(testID, 'card'),
    labels,
  );

  return {
    attributes,
    card,
  };
};

// Converts a flat list of attributes into a nested structure
// modifies the names to not include slashes
export const nestAttributes = (attributes: CredentialAttribute[]): CredentialAttribute[] => {
  const result: CredentialAttribute[] = [];

  for (const attribute of attributes) {
    const attributePath = attribute.path.split('/');
    if (attributePath.length === 0) {
      result.push(attribute);
    } else {
      const [first, ...rest] = attributePath;
      const parent = result.find((a) => a.name === first);
      if (parent) {
        insertAttributeInParent({ ...attribute, path: rest.join('/') }, parent);
      } else {
        result.push(nestAttributeInDummyParent(attribute));
      }
    }
  }

  return result;
};

// We nest the leaf node in a (one or more) nested object(s)
// to make sure the tree structure is correctly rendered in proof request screens.
const nestAttributeInDummyParent = (attribute: CredentialAttribute): CredentialAttribute => {
  const pathParts = attribute.path.split('/');
  const [first, ...rest] = pathParts;
  if (!rest.length) {
    return attribute;
  }

  // The dummy object is not selectable, and contains a placeholder ID
  // the user can't interact with it.
  if (attribute.listValue) {
    return {
      values: [nestAttributeInDummyParent({ ...attribute, path: rest.join('/') })],
      disabled: true,
      id: `${attribute.id}/${first}`,
      name: first,
      path: first,
    };
  } else {
    return {
      attributes: [nestAttributeInDummyParent({ ...attribute, path: rest.join('/') })],
      disabled: true,
      id: `${attribute.id}/${first}`,
      name: first,
      path: first,
    };
  }
};

// Recursively insert an attribute into an parent
// Will create nested parents if necessary
const insertAttributeInParent = (attribute: CredentialAttribute, parent: CredentialAttribute) => {
  const pathParts = attribute.path.split('/');
  const [first, ...rest] = pathParts;

  const nextParent = parent.attributes?.find((a) => a.name === first);

  if (!nextParent) {
    if (attribute.listValue) {
      parent.values?.push(nestAttributeInDummyParent(attribute));
    } else {
      parent.attributes?.push(nestAttributeInDummyParent(attribute));
    }
  } else {
    insertAttributeInParent({ ...attribute, path: rest.join('/') }, nextParent);
  }
};

function parseBase64Image(image: string | undefined) {
  return image ? '__BASE64IMAGE__' : '';
}

export function getCredentialSchemaWithoutImages<T extends CredentialSchemaListItem>(credentialSchema: T): T {
  return {
    ...credentialSchema,
    layoutProperties: {
      ...credentialSchema.layoutProperties,
      background: {
        ...credentialSchema.layoutProperties?.background,
        image: parseBase64Image(credentialSchema.layoutProperties?.background?.image),
      },
      logo: {
        ...credentialSchema.layoutProperties?.logo,
        image: parseBase64Image(credentialSchema.layoutProperties?.logo?.image),
      },
    },
  };
}
