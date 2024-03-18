import React, { FunctionComponent, useCallback, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import FilterButton from '../buttons/filter-button';
import SearchBar from '../searchbar/search-bar';

export interface SearchAndFiltersHeaderProps {
  style?: StyleProp<ViewStyle>;
  placeholder: string;
  filterEnabled?: boolean;
  onOpenFilters?: () => void;
  onSearchPhraseChange: (searchPhrase: string | undefined) => void;
  testID?: string;
}

const SearchAndFiltersHeader: FunctionComponent<SearchAndFiltersHeaderProps> = ({
  style,
  placeholder,
  filterEnabled,
  onOpenFilters,
  onSearchPhraseChange,
  testID,
}) => {
  const [searchPhrase, setSearchPhrase] = useState<string>();

  const searchPhraseChangeHandler = useCallback(
    (updatedSearchPhrase: string) => {
      const newSearchPhrase = updatedSearchPhrase.length > 0 ? updatedSearchPhrase : undefined;
      setSearchPhrase(newSearchPhrase);
      onSearchPhraseChange(newSearchPhrase);
    },
    [onSearchPhraseChange],
  );

  return (
    <View style={[styles.searchAndFilters, style]} testID={testID}>
      <SearchBar
        searchPhrase={searchPhrase ?? ''}
        onSearchPhraseChange={searchPhraseChangeHandler}
        placeholder={placeholder}
        style={styles.searchBar}
        testID={testID ? `${testID}.search` : undefined}
      />
      {onOpenFilters && (
        <FilterButton
          style={styles.filterButton}
          enabled={filterEnabled}
          onPress={onOpenFilters}
          testID={testID ? `${testID}.filter` : undefined}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    marginLeft: 8,
  },
  searchAndFilters: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginTop: 24,
  },
  searchBar: {
    flex: 1,
  },
});

export default SearchAndFiltersHeader;
