import React, { forwardRef, useCallback } from 'react';
import { Insets, StyleProp, StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';

import { TouchableOpacity } from '../accessibility';
import { CloseIcon, SearchIcon } from '../icons';
import { useAppColorScheme } from '../theme';

export interface SearchBarProps extends TextInputProps {
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
  searchPhrase: string;
  onSearchPhraseChange: (searchPhrase: string) => void;
}

const hitSlop: Insets = { top: 10, left: 10, bottom: 10, right: 10 };

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=1143-40433&t=HY1KvobxOReLeC8Z-4
const SearchBar = forwardRef<TextInput, SearchBarProps>(
  ({ style, placeholder, searchPhrase, onSearchPhraseChange, ...textInputProps }, ref) => {
    const colorScheme = useAppColorScheme();

    const onClear = useCallback(() => {
      onSearchPhraseChange('');
    }, [onSearchPhraseChange]);

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colorScheme.white,
          },
          style,
        ]}>
        <SearchIcon color={colorScheme.text} style={styles.searchIcon} />
        <TextInput
          accessibilityRole="search"
          onChangeText={onSearchPhraseChange}
          placeholder={placeholder}
          placeholderTextColor={colorScheme.text}
          ref={ref}
          returnKeyType="search"
          style={[styles.textInput, { color: colorScheme.text }]}
          value={searchPhrase}
          {...textInputProps}
        />
        {searchPhrase && (
          <TouchableOpacity accessibilityRole="button" hitSlop={hitSlop} onPress={onClear} style={styles.clearButton}>
            <CloseIcon color={colorScheme.text} height={12} width={12} />
          </TouchableOpacity>
        )}
      </View>
    );
  },
);

SearchBar.displayName = 'SearchBar';

const styles = StyleSheet.create({
  clearButton: {
    marginLeft: 6,
    marginRight: 12,
  },
  container: {
    alignItems: 'center',
    borderRadius: 23,
    borderWidth: 0,
    flexDirection: 'row',
    height: 46,
  },
  searchIcon: {
    marginLeft: 8,
    marginRight: 6,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    height: 46,
    letterSpacing: 0.2,
    lineHeight: 18,
    paddingBottom: 2,
  },
});

export default SearchBar;