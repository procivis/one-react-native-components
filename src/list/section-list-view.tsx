import React, { FunctionComponent } from 'react';
import { AccessibilityProps, SectionList, SectionListProps, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { useAppColorScheme } from '../theme';
import { ListSectionProps, renderListItem, renderListSectionHeader } from './common-list';
import EmptyListView, { EmptyListViewProps } from './empty-list';
import type { ListItemProps } from './list-item';
import type { ListSectionHeaderProps } from './list-section-header';

export interface SectionListViewProps extends AccessibilityProps {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: SectionListProps<ListItemProps>['contentContainerStyle'];
  listHeader?: SectionListProps<ListItemProps>['ListHeaderComponent'];
  listHeaderStyle?: SectionListProps<ListItemProps>['ListHeaderComponentStyle'];
  listFooter?: SectionListProps<ListItemProps>['ListFooterComponent'];
  listFooterStyle?: SectionListProps<ListItemProps>['ListFooterComponentStyle'];
  sections: SectionListProps<ListItemProps, ListSectionHeaderProps>['sections'];
  stickySectionHeadersEnabled?: SectionListProps<ListItemProps, ListSectionHeaderProps>['stickySectionHeadersEnabled'];
  showsVerticalScrollIndicator?: SectionListProps<ListItemProps>['showsVerticalScrollIndicator'];
  emptyListView?: EmptyListViewProps;
  staticContent?: boolean;
  onEndReachedThreshold?: SectionListProps<ListItemProps>['onEndReachedThreshold'];
  onEndReached?: SectionListProps<ListItemProps>['onEndReached'];
  onItemSelected?: (item: ListItemProps, section: number, index: number) => void;
}

const SectionListView: FunctionComponent<SectionListViewProps> = ({
  testID,
  style,
  contentContainerStyle,
  sections,
  emptyListView,
  listHeader,
  listHeaderStyle,
  listFooter,
  listFooterStyle,
  staticContent,
  stickySectionHeadersEnabled = false,
  showsVerticalScrollIndicator = false,
  onEndReachedThreshold,
  onEndReached,
  onItemSelected,
  ...accessibilityProps
}) => {
  const colorScheme = useAppColorScheme();

  const emptyView = emptyListView ? <EmptyListView {...emptyListView} /> : undefined;

  return (
    <SectionList<ListItemProps, ListSectionProps>
      testID={testID}
      style={[styles.list, { backgroundColor: colorScheme.white }, style]}
      contentContainerStyle={[styles.content, contentContainerStyle]}
      scrollEnabled={!staticContent}
      {...accessibilityProps}
      ListHeaderComponent={listHeader}
      ListHeaderComponentStyle={listHeaderStyle}
      ListFooterComponent={listFooter}
      ListFooterComponentStyle={listFooterStyle}
      ListEmptyComponent={emptyView}
      sections={sections.map((section, index) => ({ ...section, index }))}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      renderSectionHeader={renderListSectionHeader}
      renderItem={renderListItem(onItemSelected)}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      stickySectionHeadersEnabled={stickySectionHeadersEnabled}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    marginBottom: 8,
  },
  list: {
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
});

export default SectionListView;
