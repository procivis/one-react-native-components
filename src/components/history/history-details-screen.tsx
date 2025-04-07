import {
  Claim,
  ClaimValue,
  DataTypeEnum,
  HistoryActionEnum,
  HistoryEntityTypeEnum,
  HistoryListItem,
  ProofInputClaim,
  TrustEntityRoleEnum,
} from '@procivis/react-native-one-core';
import React, { FC, useMemo } from 'react';
import { ImageSourcePropType } from 'react-native';

import { ColorScheme, useAppColorScheme } from '../../ui-components';
import {
  HistoryDetailsLabels,
  HistoryDetailsView,
  HistoryDetailsViewProps,
} from '../../ui-components/history/history-details';
import { capitalizeFirstLetter, formatDateTimeLocalized, useCredentialDetail, useProofDetail } from '../../utils';
import { nonEmptyFilter } from '../../utils/filtering';
import { EntityDetailsLabels } from '../entity';
import { HistoryListItemLabels } from './history-list-item';
import { getHistoryItemActionIcon } from './history-list-item-icon';

const getStatusTextColor = (action: HistoryActionEnum, colorScheme: Readonly<ColorScheme>) => {
  switch (action) {
    case HistoryActionEnum.DEACTIVATED:
    case HistoryActionEnum.DELETED:
    case HistoryActionEnum.REJECTED:
    case HistoryActionEnum.REVOKED:
    case HistoryActionEnum.ERRORED:
      return colorScheme.errorText;
    case HistoryActionEnum.SUSPENDED:
    case HistoryActionEnum.OFFERED:
    case HistoryActionEnum.PENDING:
    case HistoryActionEnum.REQUESTED:
      return colorScheme.text;
    default:
      return colorScheme.successText;
  }
};

const claimFromProofInputClaim = (input: ProofInputClaim): Claim | undefined => {
  const value = claimValueFromProofInputClaim(input);
  if (!value) {
    return undefined;
  }
  return {
    ...value,
    id: input.schema.id,
    key: input.schema.key,
  };
};

const claimValueFromProofInputClaim = ({ schema, value }: ProofInputClaim): ClaimValue | undefined => {
  if (!value) {
    return undefined;
  }

  if (Array.isArray(value)) {
    const values = value.map(claimFromProofInputClaim).filter(nonEmptyFilter);
    return schema.dataType === (DataTypeEnum.Object as string)
      ? {
          array: schema.array,
          dataType: DataTypeEnum.Object,
          value: values,
        }
      : {
          array: true,
          dataType: schema.dataType,
          value: values,
        };
  }

  return {
    array: false,
    dataType: schema.dataType,
    value,
  };
};

export type HistoryDetailsScreenLabels = HistoryDetailsLabels & {
  item: HistoryListItemLabels;
  issuerEntity: EntityDetailsLabels;
  verifierEntity: EntityDetailsLabels;
};

export type HistoryDetailsScreenProps = {
  item: HistoryListItem;
  labels: HistoryDetailsScreenLabels;
  onBackPressed: () => void;
  onInfoPressed?: () => void;
  onImagePreview: (title: string, image: ImageSourcePropType) => void;
  testID?: string;
};

export const HistoryDetailsScreen: FC<HistoryDetailsScreenProps> = ({
  item,
  labels,
  onBackPressed,
  onInfoPressed,
  onImagePreview,
  testID = 'HistoryDetailScreen',
}) => {
  const colorScheme = useAppColorScheme();

  const { data: issuedCredential } = useCredentialDetail(
    item.entityType === HistoryEntityTypeEnum.CREDENTIAL ? item.entityId : undefined,
  );
  const { data: proof } = useProofDetail(item.entityType === HistoryEntityTypeEnum.PROOF ? item.entityId : undefined);

  const actionValueColor = getStatusTextColor(item.action, colorScheme);

  const dataHeader: HistoryDetailsViewProps['data']['header'] = useMemo(() => {
    if (issuedCredential?.issuerDid) {
      return {
        entity: {
          did: issuedCredential.issuerDid,
          labels: labels.issuerEntity,
          role: TrustEntityRoleEnum.ISSUER,
          testID: 'EntityDetail',
        },
      };
    } else if (proof?.verifierDid) {
      return {
        entity: {
          did: proof.verifierDid,
          labels: labels.verifierEntity,
          role: TrustEntityRoleEnum.VERIFIER,
          testID: 'EntityDetail',
        },
      };
    }
  }, [issuedCredential?.issuerDid, labels.issuerEntity, labels.verifierEntity, proof?.verifierDid]);

  const assets: HistoryDetailsViewProps['assets'] = useMemo(() => {
    if (issuedCredential) {
      return {
        credentialsDetails: [
          {
            credentialId: issuedCredential.id,
          },
        ],
      };
    } else if (proof) {
      const proofCredentials = (proof.proofInputs ?? [])
        .map(({ claims, credential }) => {
          if (!credential) {
            return undefined;
          }
          return {
            ...credential,
            claims: claims.map(claimFromProofInputClaim).filter(nonEmptyFilter),
          };
        })
        .filter(nonEmptyFilter);
      return {
        credentialsDetails: proofCredentials.map((credential) => ({
          claims: credential.claims,
          credentialId: credential.id,
        })),
      };
    }
  }, [issuedCredential, proof]);

  return (
    <HistoryDetailsView
      assets={assets}
      data={{
        header: dataHeader,
        date: formatDateTimeLocalized(new Date(item.createdDate)) ?? '',
        action: {
          icon: getHistoryItemActionIcon(item.action),
          label: capitalizeFirstLetter(labels.item.actions[item.action]),
          color: actionValueColor,
        },
      }}
      labels={labels}
      onBackPressed={onBackPressed}
      onInfoPressed={onInfoPressed}
      onImagePreview={onImagePreview}
      testID={testID}
    />
  );
};
