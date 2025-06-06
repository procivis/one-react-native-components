import {
  Claim,
  Config,
  CredentialDetail,
  CredentialListItem,
  CredentialSchema,
  CredentialStateEnum,
  DataTypeEnum,
  FormatFeatureEnum,
} from '@procivis/react-native-one-core';

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
  if (credential?.state === CredentialStateEnum.REVOKED) {
    return ValidityState.Revoked;
  }
  if (credential?.state === CredentialStateEnum.SUSPENDED) {
    return ValidityState.Suspended;
  }
  return ValidityState.Valid;
};

export const supportsSelectiveDisclosure = (credential: CredentialListItem | undefined, config: Config | undefined) => {
  const formatConfig = credential && config?.format[credential.schema.format];
  return formatConfig
    ? Boolean(formatConfig.capabilities?.features?.includes(FormatFeatureEnum.SelectiveDisclosure))
    : undefined;
};

const findClaimByPathParts = (path: string[], claims?: Claim[]): Claim | undefined => {
  if (!claims?.length) {
    return undefined;
  }
  const [first, second, ...rest] = path;
  const claim = claims.find((c) => c.key === first);
  if (claim === undefined || second === undefined || claim.dataType !== DataTypeEnum.Object) {
    return claim;
  }

  return findClaimByPathParts([`${first}/${second}`, ...rest], claim.value as Claim[]);
};

export const findClaimByPath = (path: string | undefined, claims: Claim[] | undefined) =>
  path ? findClaimByPathParts(path.split('/'), claims) : undefined;

const formatCredentialDetail = (claim: Claim, config: Config, testID: string): string => {
  const attributeValue = detailsCardAttributeValueFromClaim(claim, config, testID);
  return attributeValue.value ?? '';
};

export const hasMsoValidityIssues = (credential: CredentialDetail): boolean => {
  const mdocMsoValidity: { nextUpdate: string } | undefined =
    'mdocMsoValidity' in credential ? (credential.mdocMsoValidity as { nextUpdate: string }) : undefined;

  const mdocMsoValidityIssue = Boolean(
    mdocMsoValidity?.nextUpdate && new Date(mdocMsoValidity.nextUpdate) < new Date(),
  );

  return mdocMsoValidityIssue;
};

export type CardHeaderLabels = {
  validityIssues: string;
  revoked: string;
  suspended: string;
  suspendedUntil: (date: string) => string;
};

export const cardHeaderFromCredential = (
  credential: CredentialDetail,
  claims: Claim[] = [],
  config: Config,
  testID: string,
  labels: CardHeaderLabels,
): Omit<CredentialHeaderProps, 'style'> => {
  let credentialDetailPrimary = formatDateTimeLocalized(new Date(credential.issuanceDate)) ?? '';

  let credentialDetailSecondary: string | undefined;
  let credentialDetailErrorColor: boolean | undefined;
  let credentialDetailTestID: string | undefined;
  let statusIcon;

  const { layoutProperties } = credential.schema;

  switch (credential.state) {
    case CredentialStateEnum.SUSPENDED:
      credentialDetailPrimary = credential.suspendEndDate
        ? labels.suspendedUntil(formatDateTimeLocalized(new Date(credential.suspendEndDate))!)
        : labels.suspended;
      credentialDetailTestID = concatTestID(testID, 'suspended');
      statusIcon = CredentialWarningIcon;
      break;
    case CredentialStateEnum.REVOKED:
      credentialDetailPrimary = labels.revoked;
      credentialDetailErrorColor = true;
      credentialDetailTestID = concatTestID(testID, 'revoked');
      statusIcon = CredentialErrorIcon;
      break;
    default: {
      if (hasMsoValidityIssues(credential)) {
        credentialDetailPrimary = labels.validityIssues;
        credentialDetailTestID = concatTestID(testID, 'validity-issue');
        statusIcon = CredentialWarningIcon;
      } else {
        const primary = findClaimByPath(layoutProperties?.primaryAttribute, claims);

        if (primary) {
          credentialDetailPrimary = formatCredentialDetail(primary, config, concatTestID(testID, 'primary'));
        }

        const secondary = findClaimByPath(layoutProperties?.secondaryAttribute, claims);

        if (secondary) {
          credentialDetailSecondary = formatCredentialDetail(secondary, config, concatTestID(testID, 'secondary'));
        }

        credentialDetailTestID = concatTestID(testID, 'detail');
      }
      break;
    }
  }
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
  config: Config,
  notice: CredentialCardNotice | undefined,
  testID: string,
  labels: CardLabels,
): Omit<CredentialCardProps, 'onHeaderPress' | 'style'> => {
  const { layoutProperties } = credential.schema;

  if (hasMsoValidityIssues(credential)) {
    notice = {
      text: labels.validityIssuesNotice,
      noticeIcon: CredentialNoticeWarningIcon,
    };
  }

  const result: Omit<CredentialCardProps, 'onHeaderPress' | 'style'> = {
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

export const detailsCardAttributeFromClaim = (claim: Claim, config: Config, testID: string): CredentialAttribute => {
  const value = detailsCardAttributeValueFromClaim(claim, config, testID);
  return {
    id: claim.id,
    name: claim.key.split('/').pop(),
    path: claim.key,
    ...value,
  };
};

const detailsCardAttributeValueFromClaim = (claim: Claim, config: Config, testID: string): CredentialAttributeValue => {
  const typeConfig = config?.datatype[claim.dataType];

  if (claim.array) {
    return {
      values: (claim.value || []).map((arrayValue, index) => {
        return detailsCardAttributeFromClaim(
          {
            ...arrayValue,
            id: `${arrayValue.id}/${index}`,
          },
          config,
          concatTestID(testID, index.toString()),
        );
      }),
    };
  } else {
    switch (typeConfig?.type) {
      case DataTypeEnum.Object: {
        if (!Array.isArray(claim.value)) {
          return { attributes: [] };
        }
        return {
          attributes: (claim.value as Claim[]).map((nestedClaim, index) =>
            detailsCardAttributeFromClaim(nestedClaim, config, concatTestID(testID, index.toString())),
          ),
        };
      }
      case DataTypeEnum.Date: {
        if (!claim.value) {
          // Don't try to parse empty values (which will return "Invalid Date")
          return { testID: testID, value: String(claim.value) };
        }
        const date = claim.value as string;
        return {
          testID: testID,
          value: formatDateLocalized(new Date(date)) ?? date,
        };
      }
      case DataTypeEnum.File: {
        if (typeConfig.params?.showAs === 'IMAGE') {
          return { image: { uri: claim.value as string }, testID: testID };
        } else {
          return { testID: testID, value: claim.value as string };
        }
      }
      default:
        return { testID: testID, value: String(claim.value) };
    }
  }
};

export const detailsCardFromCredential = (
  credential: CredentialDetail,
  config: Config,
  testID: string,
  labels: CardLabels,
): Omit<CredentialDetailsCardProps, 'expanded'> => {
  return detailsCardFromCredentialWithClaims(credential, credential.claims, config, testID, labels);
};

export const detailsCardFromCredentialWithClaims = (
  credential: CredentialDetail,
  claims: Claim[],
  config: Config,
  testID: string,
  labels: CardLabels,
): Omit<CredentialDetailsCardProps, 'expanded'> => {
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
        insertAttributeInObject({ ...attribute, path: rest.join('/') }, parent);
      } else {
        result.push(nestAttributeInDummyObject(attribute));
      }
    }
  }

  return result;
};

// We nest the leaf node in a (one or more) nested object(s)
// to make sure the tree structure is correctly rendered in proof request screens.
const nestAttributeInDummyObject = (attribute: CredentialAttribute): CredentialAttribute => {
  const pathParts = attribute.path.split('/');
  const [first, ...rest] = pathParts;
  if (!rest.length) {
    return attribute;
  }

  // The dummy object is not selectable, and contains a placeholder ID
  // the user can't interact with it.
  return {
    attributes: [nestAttributeInDummyObject({ ...attribute, path: rest.join('/') })],
    disabled: true,
    id: `${attribute.id}/${first}`,
    name: first,
    path: attribute.path,
  };
};

// Recursively insert an attribute into an object
// Will create nested objects if necessary
const insertAttributeInObject = (attribute: CredentialAttribute, object: CredentialAttribute) => {
  const pathParts = attribute.path.split('/');
  const [first, ...rest] = pathParts;

  const nextParent = object.attributes?.find((a) => a.name === first);

  if (!nextParent) {
    object.attributes?.push(nestAttributeInDummyObject(attribute));
  } else {
    insertAttributeInObject({ ...attribute, path: rest.join('/') }, nextParent);
  }
};

function parseBase64Image(image: string | undefined) {
  return image ? '__BASE64IMAGE__' : '';
}

export function getCredentialSchemaWithoutImages(credentialSchema: CredentialSchema) {
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
