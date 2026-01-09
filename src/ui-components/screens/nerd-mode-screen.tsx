import { GetIdentifierListItemBindingDto } from '@procivis/react-native-one-core';
import React, { FunctionComponent, useState } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import EntityDetailsWithButtons, { ContextRole } from '../../components/entity/entity-details-with-buttons';
import ContrastingStatusBar from '../../utils/contrasting-status-bar';
import { concatTestID } from '../../utils/testID';
import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import SectionEntityCluster from '../entity/entity-cluster';
import NavigationHeader from '../header/navigation-header';
import { CloseIcon } from '../icons/icons';
import NerdModeItem, { NerdModeItemProps } from '../nerd-view/nerd-mode-item';
import Typography from '../text/typography';
import { useAppColorScheme } from '../theme/color-scheme-context';

export interface EntityLabels {
  trusted: string;
  unknownIssuer: string;
  unknownVerifier: string;
  visitWebsite: string;
  termsAndServices: string;
  privacyPolicy: string;
}

export interface AttributesLabels {
  trustRegistry: string;
  issuerIdentifier: string;
  entityIdentifier: string;
  role: string;
  expand: string;
  collapse: string;
}

interface SectionEntityCluster {
  identifier?: GetIdentifierListItemBindingDto;
  subline?: string;
  entityLabels: EntityLabels;
  role: ContextRole;
  testID?: string;
}

type SectionAttribute = Omit<NerdModeItemProps, 'labels' | 'onCopyToClipboard'>;

type NerdModeSectionItem = SectionAttribute | SectionEntityCluster;

export type NerdModeSection = {
  data: NerdModeSectionItem[];
  title?: string;
};

export type NerdModeScreenProps = {
  entityCluster?: SectionEntityCluster;
  labels: AttributesLabels;
  onClose: () => void;
  onCopyToClipboard: (value: string) => void;
  sections: NerdModeSection[];
  testID: string;
  title: string;
};

export enum EntityType {
  CredentialEntity,
  ProofEntity,
}

function isSectionEntityCluster(item: NerdModeSectionItem): item is SectionEntityCluster {
  return (item as SectionEntityCluster).identifier !== undefined;
}

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList<NerdModeSectionItem>);

const NerdModeScreen: FunctionComponent<NerdModeScreenProps> = ({
  sections,
  labels,
  onClose,
  onCopyToClipboard,
  entityCluster,
  testID,
  title,
}) => {
  const insets = useSafeAreaInsets();
  const colorScheme = useAppColorScheme();
  const scrollOffset = useSharedValue(0);
  const [expandedAttributes, setExpandedAttributes] = useState(0);

  // This is a bit of a hack. It's used to notify attributes that another attribute has been expanded
  // which will allow them to update their scroll offset accordingly.
  const onExpand = (expanded: boolean) => {
    setExpandedAttributes((prev) => (expanded ? prev + 1 : prev - 1));
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      scrollOffset.value = contentOffset.y;
    },
  });

  const lastElementsForSection = sections.reduce((acc, { title: sectionTitle = '', data }) => {
    const lastElement = data[data.length - 1];
    return {
      ...acc,
      [sectionTitle]: lastElement && !isSectionEntityCluster(lastElement) ? lastElement.attributeKey : '',
    };
  }, {} as Record<string, string>);

  return (
    <>
      <ContrastingStatusBar backgroundColor={colorScheme.nerdView.background} />
      <NavigationHeader
        leftItem={
          <TouchableOpacity onPress={onClose} testID={concatTestID(testID, 'closeIcon')}>
            <CloseIcon color={colorScheme.white} />
          </TouchableOpacity>
        }
        style={{
          backgroundColor: colorScheme.nerdView.background,
          paddingTop: insets.top,
        }}
        title={title}
        titleColor={colorScheme.white}
      />
      <AnimatedSectionList
        ListHeaderComponent={
          entityCluster ? (
            <EntityDetailsWithButtons
              {...entityCluster}
              entityType={EntityType.ProofEntity}
              entityLabels={entityCluster.entityLabels}
              attributesLabels={labels}
              style={[
                styles.entityCluster,
                {
                  backgroundColor: colorScheme.nerdView.background,
                },
              ]}
              onCopyToClipboard={onCopyToClipboard}
              testID={entityCluster.testID ?? concatTestID(testID, 'entityCluster')}
              textColor={colorScheme.white}
            />
          ) : null
        }
        onScroll={onScroll}
        renderItem={({ item, section, index }) => {
          if (isSectionEntityCluster(item)) {
            return (
              <EntityDetailsWithButtons
                {...item}
                entityType={EntityType.CredentialEntity}
                entityLabels={item!.entityLabels}
                attributesLabels={labels}
                style={[
                  styles.entityCluster,
                  {
                    backgroundColor: colorScheme.nerdView.background,
                  },
                ]}
                onCopyToClipboard={onCopyToClipboard}
                testID={item.testID ?? concatTestID(testID, 'sectionEntityCluster', index.toString())}
                textColor={colorScheme.white}
              />
            );
          } else {
            return (
              <NerdModeItem
                {...item}
                expandedAttributes={expandedAttributes}
                labels={labels}
                last={lastElementsForSection[section.title] === item.attributeKey}
                onCopyToClipboard={onCopyToClipboard}
                onExpand={onExpand}
                scrollOffset={scrollOffset}
                testID={concatTestID(testID, item.testID)}
              />
            );
          }
        }}
        renderSectionHeader={({ section }) => {
          return section.title ? (
            <View style={styles.sectionHeaderContainer} testID={concatTestID(testID, section.title)}>
              <Typography color={colorScheme.white} style={styles.sectionHeaderText}>
                {section.title}
              </Typography>
            </View>
          ) : null;
        }}
        scrollEventThrottle={16}
        sections={sections}
        stickySectionHeadersEnabled={false}
        style={{ backgroundColor: colorScheme.nerdView.background }}
        testID={testID}
      />
    </>
  );
};

const styles = StyleSheet.create({
  entityCluster: {
    paddingHorizontal: 24,
    paddingVertical: 20,
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
});

export default NerdModeScreen;
