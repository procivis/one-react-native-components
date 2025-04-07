import { Claim, ClaimValue, DataTypeEnum, ProofInputClaim } from '@procivis/react-native-one-core';
import React, { ComponentType, FC, ReactElement, useEffect, useMemo } from 'react';
import { ColorValue, ImageSourcePropType, StyleSheet, View } from 'react-native';

import { CredentialDetails, CredentialDetailsProps, EntityDetails, EntityDetailsProps } from '../../components';
import { HeaderInfoButton } from '../../components/navigation/header-buttons';
import { CardLabels, concatTestID, useCredentialListExpandedCard } from '../../utils';
import { nonEmptyFilter } from '../../utils/filtering';
import { BackButton } from '../buttons';
import { CredentialHeader, CredentialHeaderProps } from '../credential';
import { ScrollViewScreen } from '../screens';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';
import DataItem from './data-item';

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

export type HistoryDetailsLabels = {
  credentialCard: CardLabels;
  data: {
    date: string;
    action: string;
  };
  infoButtonAccessibility?: string;
  relatedAssets: string;
  title: string;
};

export type HistoryDetailsViewProps = {
  assets?: {
    credentialHeader?: CredentialHeaderProps;
    credentialsDetails?: Omit<
      CredentialDetailsProps,
      'expanded' | 'labels' | 'lastItem' | 'onHeaderPress' | 'onImagePreview'
    >[];
  };
  data: {
    header?:
      | {
          entity: EntityDetailsProps;
        }
      | {
          credentialHeader: CredentialHeaderProps;
        };
    date: string;
    action: {
      icon: ComponentType<any> | ReactElement;
      label: string;
      color: ColorValue;
    };
  };
  labels: HistoryDetailsLabels;
  onBackPressed: () => void;
  onInfoPressed?: () => void;
  onImagePreview: (title: string, image: ImageSourcePropType) => void;
  testID: string;
};

export const HistoryDetailsView: FC<HistoryDetailsViewProps> = ({
  assets,
  data,
  labels,
  onBackPressed,
  onInfoPressed,
  onImagePreview,
  testID,
}) => {
  const colorScheme = useAppColorScheme();
  const { expandedCredential, onHeaderPress, setInitialCredential } = useCredentialListExpandedCard();

  // Expand the first credential
  useEffect(() => {
    if (assets?.credentialsDetails && assets.credentialsDetails.length > 0) {
      setInitialCredential(assets.credentialsDetails[0].credentialId);
    }
  }, [assets?.credentialsDetails, setInitialCredential]);

  const moreInfoIcon = useMemo(() => {
    if (!onInfoPressed) {
      return undefined;
    }

    return (
      <HeaderInfoButton
        onPress={onInfoPressed}
        testID={concatTestID(testID, 'header', 'info')}
        accessibilityLabel={labels.infoButtonAccessibility ?? ''}
      />
    );
  }, [labels.infoButtonAccessibility, onInfoPressed, testID]);

  return (
    <ScrollViewScreen
      header={{
        leftItem: <BackButton onPress={onBackPressed} testID={concatTestID(testID, 'header', 'back')} />,
        rightItem: moreInfoIcon,
        static: true,
        title: labels.title,
      }}
      scrollView={{
        style: styles.content,
      }}
      testID={testID}>
      <View style={[styles.section, { backgroundColor: colorScheme.white }]}>
        {data.header && 'entity' in data.header && (
          <EntityDetails
            {...data.header.entity}
            style={[styles.entity, { borderColor: colorScheme.background }, data.header.entity.style]}
          />
        )}
        {data.header && 'credentialHeader' in data.header && (
          <CredentialHeader
            {...data.header.credentialHeader}
            style={[styles.entity, { borderColor: colorScheme.background }, data.header.credentialHeader.style]}
          />
        )}
        <DataItem attribute={labels.data.date} value={data.date} />
        <DataItem
          attribute={labels.data.action}
          last
          value={data.action.label}
          valueColor={data.action.color}
          valueIcon={data.action.icon}
        />
      </View>

      <Typography color={colorScheme.text} preset="m" style={styles.sectionHeader}>
        {labels.relatedAssets}
      </Typography>
      {assets?.credentialHeader && (
        <CredentialHeader {...assets.credentialHeader} style={[assets.credentialHeader.style]} />
      )}
      {assets?.credentialsDetails?.map((props, index, { length }) => (
        <View key={props.credentialId} style={styles.credential}>
          <CredentialDetails
            {...props}
            expanded={expandedCredential === props.credentialId}
            labels={labels.credentialCard}
            lastItem={index === length - 1}
            onHeaderPress={onHeaderPress}
            onImagePreview={onImagePreview}
          />
        </View>
      ))}
    </ScrollViewScreen>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  credential: {
    marginBottom: 4,
  },
  entity: {
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  section: {
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
  },
  sectionHeader: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
});
