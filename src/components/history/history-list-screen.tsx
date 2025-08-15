import { HistoryListItem, HistoryListQuery } from '@procivis/react-native-one-core';
import { debounce } from 'lodash';
import React, { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import {
  BackButton,
  FilterButton,
  FoldableHeader,
  NavigationHeader,
  Typography,
  useAppColorScheme,
} from '../../ui-components';
import { concatTestID, groupEntriesByDay, HistoryGroupByDaySection, useListContentInset } from '../../utils';
import { HistoryListLabels, HistoryListView } from './history-list';
import { HistoryListItemViewProps } from './history-list-item';

export type HistoryListScreenLabels = {
  emptyTitle: string;
  emptySubtitle: string;
  list: HistoryListLabels;
  title: string;
  search: string;
};

export type HistoryListScreenProps = {
  groupItems?: (entries: HistoryListItem[]) => HistoryGroupByDaySection[];
  itemInfoLabelMode?: HistoryListItemViewProps['infoLabelMode'];
  labels: HistoryListScreenLabels;
  onBackPressed: () => void;
  onHistoryItemPressed: (historyItem: HistoryListItem) => void;
  onOpenFilter?: () => void;
  onSearchPhraseChange: (searchPhrase: string | undefined) => void;
  queryParams: Partial<HistoryListQuery>;
  testID?: string;
};

export const HistoryListScreen: FC<PropsWithChildren<HistoryListScreenProps>> = ({
  children,
  groupItems = groupEntriesByDay,
  itemInfoLabelMode = 'entity',
  labels,
  onBackPressed,
  onHistoryItemPressed,
  onOpenFilter,
  onSearchPhraseChange,
  queryParams,
  testID = 'HistoryScreen',
}) => {
  const colorScheme = useAppColorScheme();
  const [empty, setEmpty] = useState<boolean>(false);
  const [scrollOffset] = useState(() => new Animated.Value(0));

  const [searchPhrase, setSearchPhrase] = useState<string>('');
  const searchBarVisible = !empty || Boolean(queryParams.search?.text);

  const handleSearchPhraseChange = useMemo(() => debounce(onSearchPhraseChange, 500), [onSearchPhraseChange]);
  useEffect(() => {
    handleSearchPhraseChange(searchPhrase || undefined);
  }, [searchPhrase, handleSearchPhraseChange]);

  const headerHeight = searchBarVisible ? 112 : 70;

  const insets = useListContentInset({
    additionalBottomPadding: 24,
    headerHeight,
  });

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colorScheme.background,
        },
      ]}
      testID={testID}>
      {empty && (
        <View
          style={[
            styles.emptyNotice,
            {
              backgroundColor: colorScheme.white,
              marginTop: insets.paddingTop,
            },
          ]}>
          <Typography align="center" color={colorScheme.text} preset="s">
            {labels.emptyTitle}
          </Typography>
          <Typography align="center" color={colorScheme.text} preset="s/line-height-small" style={styles.shaded}>
            {labels.emptySubtitle}
          </Typography>
        </View>
      )}
      <HistoryListView
        contentContainerStyle={insets}
        groupItems={groupItems}
        itemProps={{ infoLabelMode: itemInfoLabelMode, onPress: onHistoryItemPressed }}
        onEmpty={setEmpty}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollOffset } } }], {
          useNativeDriver: true,
        })}
        query={queryParams}
        testID={concatTestID(testID, 'list')}
        labels={labels.list}
      />
      {children}
      <FoldableHeader
        header={
          <NavigationHeader
            backgroundColor={'transparent'}
            leftItem={<BackButton onPress={onBackPressed} testID={concatTestID(testID, 'back')} />}
            title={labels.title}
          />
        }
        scrollOffset={scrollOffset}
        searchBar={
          !searchBarVisible
            ? undefined
            : {
                rightButtons: onOpenFilter
                  ? [
                      <FilterButton
                        active={Boolean(queryParams.credentialSchemaId)}
                        onPress={onOpenFilter}
                        testID={concatTestID(testID, 'filter')}
                      />,
                    ]
                  : undefined,
                rightButtonAlwaysVisible: true,
                searchBarProps: {
                  onSearchPhraseChange: setSearchPhrase,
                  placeholder: labels.search,
                  searchPhrase,
                  testID: concatTestID(testID, 'search'),
                },
              }
        }
        staticHeader={!searchBarVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyNotice: {
    borderRadius: 12,
    marginHorizontal: 16,
    paddingBottom: 20,
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  shaded: {
    opacity: 0.7,
  },
});
