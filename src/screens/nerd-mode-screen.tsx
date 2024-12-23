import React, { FunctionComponent, useState } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NerdModeItem, { NerdModeItemProps } from '..//nerd-view/nerd-mode-item';
import EntityCluster from '../entity/entity-cluster';
import NavigationHeader from '../header/navigation-header';
import { CloseIcon } from '../icons/icons';
import Typography from '../text/typography';
import { useAppColorScheme } from '../theme/color-scheme-context';
import ContrastingStatusBar from '../utils/contrasting-status-bar';
import { concatTestID } from '../utils/testID';

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

export type NerdModeSection = {
  data: Array<Omit<NerdModeItemProps, 'labels' | 'onCopyToClipboard'>>;
  title: string;
};

export type NerdModeScreenProps = {
  entityCluster?: {
    entityName: string;
  };
  labels: {
    expand: string;
    collapse: string;
  };
  onClose: () => void;
  onCopyToClipboard: (value: string) => void;
  sections: NerdModeSection[];
  testID: string;
  title: string;
};

const AnimatedSectionList = Animated.createAnimatedComponent(
  SectionList<Omit<NerdModeItemProps, 'labels' | 'onCopyToClipboard'>>,
);
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

  const lastElementsForSection = sections.reduce((acc, { title: sectionTitle, data }) => {
    const lastElement = data[data.length - 1];
    return { ...acc, [sectionTitle]: lastElement.attributeKey };
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
            <EntityCluster
              entityName={entityCluster?.entityName}
              style={[
                styles.entityCluster,
                {
                  backgroundColor: colorScheme.nerdView.background,
                },
              ]}
              testID={concatTestID(testID, 'entityCluster')}
              textColor={colorScheme.white}
            />
          ) : null
        }
        onScroll={onScroll}
        renderItem={({ item, section }) => (
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
        )}
        renderSectionHeader={({ section }) => {
          return (
            <View style={styles.sectionHeaderContainer} testID={concatTestID(testID, section.title)}>
              <Typography color={colorScheme.white} style={styles.sectionHeaderText}>
                {section.title}
              </Typography>
            </View>
          );
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

export default NerdModeScreen;
