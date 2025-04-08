import React, { ComponentType, FC, ReactElement, useEffect, useMemo } from 'react';
import { ColorValue, ImageSourcePropType, StyleSheet, View } from 'react-native';

import { CredentialDetails, CredentialDetailsProps, EntityDetails, EntityDetailsProps } from '../../components';
import { HeaderInfoButton } from '../../components/navigation/header-buttons';
import { CardLabels, concatTestID, useCredentialListExpandedCard } from '../../utils';
import { BackButton } from '../buttons';
import {
  CredentialDetailsCardListItem,
  CredentialDetailsCardListItemProps,
  CredentialHeader,
  CredentialHeaderProps,
} from '../credential';
import { ScrollViewScreen } from '../screens';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';
import DataItem from './data-item';
import { TouchableOpacity } from '../accessibility';
import { NextIcon } from '../icons';

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

type CredentialDetails = Omit<
  CredentialDetailsProps,
  'expanded' | 'labels' | 'lastItem' | 'onHeaderPress' | 'onImagePreview'
>;

type CredentialCard = Omit<
  CredentialDetailsCardListItemProps,
  'expanded' | 'labels' | 'lastItem' | 'onHeaderPress' | 'onImagePreview'
>;

export type HistoryDetailsViewProps = {
  assets?: {
    header?: CredentialHeaderProps & {
      onPressed?: () => void;
    };
    cards?: (
      | {
          credentialDetails: CredentialDetails;
        }
      | {
          credentialCard: CredentialCard;
        }
    )[];
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
  headerButton?: ReactElement;
  labels: HistoryDetailsLabels;
  onBackPressed: () => void;
  onInfoPressed?: () => void;
  onImagePreview: (title: string, image: ImageSourcePropType) => void;
  testID: string;
};

export const HistoryDetailsView: FC<HistoryDetailsViewProps> = ({
  assets,
  data,
  headerButton,
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
    if (assets?.cards && assets.cards.length > 0) {
      let id =
        'credentialDetails' in assets.cards[0]
          ? assets.cards[0].credentialDetails.credentialId
          : assets.cards[0].credentialCard.card.credentialId;
      if (id) {
        setInitialCredential(id);
      }
    }
  }, [assets?.cards, setInitialCredential]);

  const moreInfoHeaderButton = useMemo(() => {
    if (headerButton) {
      return headerButton;
    }

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
  }, [headerButton, labels.infoButtonAccessibility, onInfoPressed, testID]);

  return (
    <ScrollViewScreen
      header={{
        leftItem: <BackButton onPress={onBackPressed} testID={concatTestID(testID, 'header', 'back')} />,
        rightItem: moreInfoHeaderButton,
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
            blur={false}
            style={[styles.header, { borderColor: colorScheme.background }, data.header.credentialHeader.style]}
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
      
      {assets?.header && (
        <TouchableOpacity disabled={!assets.header.onPressed} onPress={assets.header.onPressed}>
          <CredentialHeader
            {...assets.header}
            accessory={assets.header.onPressed ? <NextIcon color={colorScheme.text} /> : undefined}
            blur={false}
            style={[styles.assetsHeader, assets.header.style]} />
        </TouchableOpacity>
      )}
      {assets?.cards?.map((props, index, { length }) => {
        if ('credentialDetails' in props) {
          return (
            <View key={props.credentialDetails.credentialId} style={styles.credential}>
              <CredentialDetails
                {...props.credentialDetails}
                expanded={expandedCredential === props.credentialDetails.credentialId}
                labels={labels.credentialCard}
                lastItem={index === length - 1}
                onHeaderPress={onHeaderPress}
                onImagePreview={onImagePreview}
              />
            </View>
          );
        } else {
          const itemProps = {
            ...props.credentialCard,
            card: {
              ...props.credentialCard.card,
              onHeaderPress,
            }
          };
          return (
            <View key={index.toString()} style={styles.credential}>
              <CredentialDetailsCardListItem
                {...itemProps}
                expanded={expandedCredential === props.credentialCard.card.credentialId}
                lastItem={index === length - 1}
                onImagePreview={onImagePreview}
              />
            </View>
          );
        }
      })}
    </ScrollViewScreen>
  );
};

const styles = StyleSheet.create({
  assetsHeader: {
    borderRadius: 8,
  },
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
  header: {
    borderBottomWidth: 1,
    marginTop: -8,
    paddingBottom: 12,
    paddingHorizontal: 0,
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
