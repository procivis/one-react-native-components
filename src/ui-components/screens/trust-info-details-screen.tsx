import {
  TrustInformationDetailInfo,
  TrustResolutionResult,
} from '@procivis/react-native-one-core';
import React, { FC, useCallback, useState } from 'react';
import {
  Linking,
  SectionList,
  SectionListData,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';

import TrustInfo, {
  TrustInfoLabels,
} from '../../components/trust-info/trust-info';
import { concatTestID, nonEmptyFilter, reportException } from '../../utils';
import { TouchableOpacity } from '../accessibility';
import { BackButton } from '../buttons';
import { NavigationHeader } from '../header';
import { LinkIcon, MailIcon, PhoneIcon } from '../icons';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';

type TrustInfoDetailItem =
  | {
      identifier?: string;
      name?: string;
      result: TrustResolutionResult;
      type: 'trustInfo';
    }
  | {
      title: string;
      type: 'subsection';
    }
  | {
      action?: {
        icon: FC<SvgProps>;
        onPress: () => void;
      };
      title: string;
      type: 'item';
      value?: string;
    }
  | {
      email?: string;
      phone?: string;
      type: 'contact';
      website?: string;
    }
  | {
      type: 'expand';
    }
  | {
      type: 'collapse';
    };

type TrustInfoDetailSection = {
  title?: string;
};

export type TrustInfoDetailsScreenLabels = TrustInfoLabels & {
  collapse: string;
  country: string;
  email: string;
  errors: Record<string, string>;
  expand: string;
  identifier: string;
  isPublicSector: string;
  phone: string;
  privacyPolicy: string;
  serviceDescription: string;
  supervisoryAuthority: string;
  support: string;
  title: string;
  true: string;
  website: string;
};

type SeparatorProps = {
  dark?: boolean;
  leadingItem?: TrustInfoDetailItem;
};

const Separator: FC<SeparatorProps> = ({ dark, leadingItem }) => {
  const colorScheme = useAppColorScheme();
  if (
    leadingItem?.type === 'subsection' ||
    (leadingItem?.type === 'item' && !leadingItem?.value)
  ) {
    return <View style={styles.emptyItem} />;
  }
  return (
    <View
      style={{
        backgroundColor: dark ? colorScheme.background : colorScheme.white,
      }}
    >
      <View
        style={[styles.separator, { backgroundColor: colorScheme.grayDark }]}
      />
    </View>
  );
};

type ListButtonProps = {
  label: string;
  onPress: () => void;
  testID?: string;
};

const ListButton: FC<ListButtonProps> = ({ label, onPress, testID }) => {
  const colorScheme = useAppColorScheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        styles.lastItem,
        { backgroundColor: colorScheme.white },
      ]}
      testID={testID}
    >
      <Typography
        align="center"
        color={colorScheme.text}
        testID={concatTestID(testID, 'label')}
      >
        {label}
      </Typography>
    </TouchableOpacity>
  );
};

type ListItemProps = {
  action?: {
    icon: FC<SvgProps>;
    onPress: () => void;
  };
  dark?: boolean;
  testID?: string;
  title: string;
  value: string;
};

const ListItem: FC<ListItemProps> = ({
  action,
  dark,
  title,
  value,
  testID,
}) => {
  const colorScheme = useAppColorScheme();
  return (
    <View
      style={[
        styles.item,
        { backgroundColor: dark ? undefined : colorScheme.white },
      ]}
    >
      <View style={styles.itemLabels} testID={testID}>
        <Typography
          color={colorScheme.text}
          numberOfLines={1}
          preset="s/line-height-capped"
          style={styles.itemTitleLabel}
          testID={concatTestID(testID, 'title')}
        >
          {title}
        </Typography>
        <Typography
          color={colorScheme.text}
          preset="s/line-height-capped"
          testID={concatTestID(testID, 'value')}
        >
          {value}
        </Typography>
      </View>
      {action && (
        <TouchableOpacity
          onPress={action.onPress}
          style={[
            styles.actionButton,
            {
              backgroundColor: dark ? colorScheme.white : colorScheme.grayDark,
            },
          ]}
          testID={concatTestID(testID, 'action')}
        >
          <action.icon color={colorScheme.black} />
        </TouchableOpacity>
      )}
    </View>
  );
};

type ContactItemProps = {
  email?: string;
  labels: TrustInfoDetailsScreenLabels;
  onPress: (url: string) => () => void;
  phone?: string;
  testID?: string;
  website?: string;
};

const ContactItem: FC<ContactItemProps> = ({
  email,
  labels,
  onPress,
  phone,
  website,
  testID,
}) => {
  const colorScheme = useAppColorScheme();
  return (
    <View
      style={[
        styles.contactItemWrapper,
        { backgroundColor: colorScheme.white },
      ]}
    >
      <View
        style={[
          styles.contactItem,
          { backgroundColor: colorScheme.background },
        ]}
      >
        {website && (
          <ListItem
            action={{ icon: LinkIcon, onPress: onPress(website) }}
            dark
            testID={concatTestID(testID, 'website')}
            title={labels.website}
            value={website}
          />
        )}
        {website && (email || phone) && <Separator dark />}
        {email && (
          <ListItem
            action={{ icon: MailIcon, onPress: onPress(`mailto:${email}`) }}
            dark
            testID={concatTestID(testID, 'email')}
            title={labels.email}
            value={email}
          />
        )}
        {email && phone && <Separator dark />}
        {phone && (
          <ListItem
            action={{ icon: PhoneIcon, onPress: onPress(`tel:${phone}`) }}
            dark
            testID={concatTestID(testID, 'phone')}
            title={labels.phone}
            value={phone}
          />
        )}
      </View>
    </View>
  );
};

export type TrustInfoDetailsScreenProps = {
  countries: {
    display: Record<string, string>;
    value: string;
  }[];
  labels: TrustInfoDetailsScreenLabels;
  language: string;
  onClose: () => void;
  result: TrustResolutionResult;
  testID: string;
  translate: boolean;
  trustInformation?: TrustInformationDetailInfo;
};

const TrustInfoDetailsScreen: FC<TrustInfoDetailsScreenProps> = ({
  countries,
  labels,
  language,
  onClose,
  result,
  testID,
  translate,
  trustInformation,
}) => {
  const insets = useSafeAreaInsets();
  const colorScheme = useAppColorScheme();
  const [expanded, setExpanded] = useState(false);

  const linkHandler = useCallback(
    (url: string) => () => {
      Linking.openURL(url).catch((e) => {
        reportException(e, `Error opening contact link ${url}`);
      });
    },
    [],
  );

  const trustDetails = trustInformation?.value[0];

  let trustDetailsSection: TrustInfoDetailItem[] = [
    {
      identifier: trustDetails?.identifier,
      name: trustDetails?.name,
      result,
      type: 'trustInfo',
    },
  ];

  if (trustDetails) {
    const countryDisplay = countries.find(
      (c) => c.value === trustDetails.country,
    )?.display;
    const country = countryDisplay?.[language] ?? countryDisplay?.en;

    const baseInfo: TrustInfoDetailItem[] = [
      trustDetails.isPublicSector
        ? ({
            title: labels.isPublicSector,
            type: 'item',
            value: trustDetails.isPublicSector ? labels.true : undefined,
          } satisfies TrustInfoDetailItem)
        : undefined,
      {
        title: labels.serviceDescription,
        type: 'item',
        value: trustDetails.serviceDescription[0]?.[language],
      } satisfies TrustInfoDetailItem,
      trustDetails.infoUrl
        ? ({
            action: {
              icon: LinkIcon,
              onPress: linkHandler(trustDetails.infoUrl),
            },
            title: labels.website,
            type: 'item',
            value: trustDetails.infoUrl,
          } satisfies TrustInfoDetailItem)
        : undefined,
      trustDetails.privacyPolicyUrl
        ? ({
            action: {
              icon: LinkIcon,
              onPress: linkHandler(trustDetails.privacyPolicyUrl),
            },
            title: labels.privacyPolicy,
            type: 'item',
            value: trustDetails.privacyPolicyUrl,
          } satisfies TrustInfoDetailItem)
        : undefined,
    ].filter(nonEmptyFilter);

    const expandItem: TrustInfoDetailItem[] = !expanded
      ? [{ type: 'expand' }]
      : [];

    const supervisoryAuthority: TrustInfoDetailItem[] =
      trustDetails.supervisoryAuthority
        ? [
            {
              title: labels.supervisoryAuthority,
              type: 'subsection',
            },
            {
              email: trustDetails.supervisoryAuthority.email,
              phone: trustDetails.supervisoryAuthority.phone,
              type: 'contact',
              website: trustDetails.supervisoryAuthority.uri,
            },
          ]
        : [];

    const extraInfo: TrustInfoDetailItem[] = expanded
      ? [
          {
            title: labels.country,
            type: 'item',
            value: country,
          },
          {
            title: labels.identifier,
            type: 'item',
            value: trustDetails.identifier,
          },
          {
            title: labels.support,
            type: 'subsection',
          },
          {
            email: trustDetails.email,
            phone: trustDetails.phone,
            type: 'contact',
            website: trustDetails.supportUrl,
          },
          ...supervisoryAuthority,
          { type: 'collapse' },
        ]
      : [];

    trustDetailsSection = trustDetailsSection
      .concat(baseInfo)
      .concat(expandItem)
      .concat(extraInfo);
  }

  const intermediaryName: TrustInfoDetailItem[] = trustDetails?.intermediary
    ?.name
    ? [
        {
          identifier: trustDetails.intermediary.identifier,
          name: trustDetails.intermediary.name,
          result,
          type: 'trustInfo',
        },
      ]
    : [];

  const intermediarySection: TrustInfoDetailItem[] = trustDetails?.intermediary
    ? [
        ...intermediaryName,
        {
          title: labels.country,
          type: 'item',
          value: trustDetails.intermediary.country,
        },
        {
          title: labels.identifier,
          type: 'item',
          value: trustDetails.intermediary.identifier,
        },
        {
          title: labels.support,
          type: 'subsection',
        },
        {
          type: 'contact',
          ...trustDetails.intermediary,
        },
      ]
    : [];

  const sections: SectionListData<
    TrustInfoDetailItem,
    TrustInfoDetailSection
  >[] = [
    {
      ItemSeparatorComponent: Separator,
      data: trustDetailsSection,
    },
    intermediarySection.length
      ? {
          ItemSeparatorComponent: Separator,
          data: intermediarySection,
          title: 'Intermediary',
        }
      : undefined,
  ].filter(nonEmptyFilter);

  return (
    <View style={styles.container}>
      <NavigationHeader
        leftItem={
          <BackButton onPress={onClose} testID={concatTestID(testID, 'back')} />
        }
        style={{
          paddingTop: insets.top,
        }}
        title={labels.title}
      />
      <SectionList<TrustInfoDetailItem, TrustInfoDetailSection>
        contentContainerStyle={{ paddingBottom: insets.bottom }}
        renderItem={({ item, section }) => {
          switch (item.type) {
            case 'subsection':
              return (
                <View
                  style={[
                    styles.subsection,
                    { backgroundColor: colorScheme.white },
                  ]}
                  testID={concatTestID(testID, section.title)}
                >
                  <Typography color={colorScheme.text} preset="m/heading">
                    {item.title}
                  </Typography>
                </View>
              );
            case 'trustInfo':
              return (
                <View
                  style={[
                    styles.trustInfoItem,
                    styles.firstItem,
                    { backgroundColor: colorScheme.white },
                  ]}
                >
                  <TrustInfo
                    labels={labels}
                    language={language}
                    translate={translate}
                    trustInformation={item}
                  />
                </View>
              );
            case 'item':
              if (!item.value) {
                return <View style={styles.emptyItem} />;
              }
              return (
                <ListItem
                  {...item}
                  testID={concatTestID(testID, 'item')}
                  value={item.value}
                />
              );
            case 'contact':
              if (!item.website && !item.phone && !item.email) {
                return <View style={styles.emptyItem} />;
              }
              return (
                <ContactItem
                  labels={labels}
                  onPress={linkHandler}
                  testID={concatTestID(testID, 'contact')}
                  {...item}
                />
              );
            case 'expand':
              return (
                <ListButton
                  label={labels.expand}
                  onPress={() => setExpanded(true)}
                  testID={concatTestID(testID, 'expandButton')}
                />
              );
            case 'collapse':
              return (
                <ListButton
                  label={labels.collapse}
                  onPress={() => setExpanded(false)}
                  testID={concatTestID(testID, 'collapseButton')}
                />
              );
          }
        }}
        renderSectionHeader={({ section }) => {
          return section.title ? (
            <View
              style={styles.sectionHeaderContainer}
              testID={concatTestID(testID, section.title)}
            >
              <Typography
                color={colorScheme.text}
                preset="m/heading"
                style={styles.sectionHeaderText}
              >
                {section.title}
              </Typography>
            </View>
          ) : null;
        }}
        scrollEventThrottle={16}
        sections={sections}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        style={styles.list}
        testID={testID}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    alignItems: 'center',
    borderRadius: 19,
    flexShrink: 0,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  button: {
    height: 64,
    justifyContent: 'center',
    paddingBottom: 8,
    width: '100%',
  },
  contactItem: {
    borderRadius: 8,
  },
  contactItemWrapper: {
    padding: 12,
  },
  container: {
    flex: 1,
  },
  emptyItem: {
    height: 0,
  },
  firstItem: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    padding: 12,
  },
  itemLabels: {
    flex: 1,
    flexDirection: 'column',
  },
  itemTitleLabel: {
    opacity: 0.5,
  },
  lastItem: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  list: {
    marginHorizontal: 16,
  },
  sectionHeaderContainer: {
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 16,
  },
  sectionHeaderText: {
    opacity: 0.7,
    paddingHorizontal: 20,
  },
  separator: {
    height: 1,
    marginHorizontal: 12,
    opacity: 0.4,
  },
  subsection: {
    paddingBottom: 8,
    paddingHorizontal: 12,
    paddingTop: 22,
  },
  trustInfoItem: {
    flexDirection: 'column',
    gap: 8,
    padding: 8,
  },
});

export default TrustInfoDetailsScreen;
