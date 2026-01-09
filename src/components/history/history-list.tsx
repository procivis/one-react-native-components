import { HistoryListItemBindingDto, HistoryListQueryBindingDto } from '@procivis/react-native-one-core';
import { useIsFocused } from '@react-navigation/native';
import React, { FC, useCallback, useMemo } from 'react';
import { Animated, SectionListProps, StyleSheet } from 'react-native';

import { ActivityIndicator, useAppColorScheme } from '../../ui-components';
import ListPageLoadingIndicator from '../../ui-components/list/list-page-loading-indicator';
import { concatTestID, useHistory } from '../../utils';
import { groupEntriesByDay, HistoryGroupByDaySection } from '../../utils/history';
import { HistoryListItemLabels, HistoryListItemView, HistoryListItemViewProps } from './history-list-item';
import { HistoryListSectionHeaderLabels, HistoryListSectionHeaderView } from './history-list-section-header';

export type HistoryListLabels = {
  sectionHeader: HistoryListSectionHeaderLabels;
  item: HistoryListItemLabels;
};

export interface HistoryListViewProps
  extends Omit<SectionListProps<HistoryListItemBindingDto, HistoryGroupByDaySection>, 'sections'> {
  // optional customization of item props
  getItemProps?: (item: HistoryListItemBindingDto) => Partial<HistoryListItemViewProps> | undefined;
  groupItems?: (entries: HistoryListItemBindingDto[]) => HistoryGroupByDaySection[];
  itemProps?: Partial<HistoryListItemViewProps>;
  labels: HistoryListLabels;
  // callback when empty list displayed
  onEmpty?: (empty: boolean) => void;
  query: Partial<HistoryListQueryBindingDto>;
}

export const HistoryListView: FC<HistoryListViewProps> = ({
  query,
  contentContainerStyle,
  getItemProps,
  groupItems = groupEntriesByDay,
  itemProps,
  labels,
  onEmpty,
  onScroll,
  ...props
}) => {
  const isFocused = useIsFocused();
  const colorScheme = useAppColorScheme();
  const {
    data: historyData,
    fetchNextPage: fetchNextHistoryPage,
    hasNextPage: hasNextHistoryPage,
    isLoading,
  } = useHistory(query);

  const history = useMemo(() => {
    const items = historyData?.pages
      .flat()
      .map((page) => page.values)
      .flat();
    if (!items) {
      return undefined;
    }
    if (historyData) {
      setImmediate(() => onEmpty?.(!items.length));
    }
    return groupItems(items);
  }, [historyData, onEmpty, groupItems]);

  const onEndReached = useCallback(() => {
    if (hasNextHistoryPage) {
      fetchNextHistoryPage().catch(() => {});
    }
  }, [fetchNextHistoryPage, hasNextHistoryPage]);

  if (!history) {
    return <ActivityIndicator animate={isFocused} />;
  }

  return (
    <Animated.SectionList<HistoryListItemBindingDto, HistoryGroupByDaySection>
      ListFooterComponent={
        isLoading ? <ListPageLoadingIndicator color={colorScheme.accent} style={styles.footer} /> : undefined
      }
      contentContainerStyle={[styles.listContent, contentContainerStyle]}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReached}
      onScroll={onScroll}
      renderItem={({ item, index, section }) => (
        <HistoryListItemView
          first={!index}
          item={item}
          labels={labels.item}
          last={index === section.data.length - 1}
          testID={concatTestID(props.testID, 'item', index.toString())}
          {...itemProps}
          {...getItemProps?.(item)}
        />
      )}
      renderSectionHeader={({ section }) => (
        <HistoryListSectionHeaderView
          date={section.date}
          firstYearEntry={section.firstYearEntry}
          labels={labels.sectionHeader}
          testID={concatTestID(props.testID, 'section')}
        />
      )}
      sections={history}
      stickySectionHeadersEnabled={false}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  footer: {
    marginVertical: 16,
  },
  listContent: {
    paddingHorizontal: 16,
  },
});
