import React, { forwardRef, useCallback, useState } from 'react';
import { Insets, StyleProp, StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';

import { TouchableOpacity } from '../accessibility';
import { ClearIcon, SearchIcon } from '../icon/icon';
import { font, useAppColorScheme } from '../theme';

export interface SearchBarProps extends TextInputProps {
  style?: StyleProp<ViewStyle>;
  placeholder: string;
  searchPhrase: string;
  onSearchPhraseChange: (searchPhrase: string) => void;
}

const hitSlop: Insets = { top: 10, left: 10, bottom: 10, right: 10 };

// https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=446%3A9443&t=TEBDGdEv632ktThZ-4
const SearchBar = forwardRef<TextInput, SearchBarProps>(
  ({ style, placeholder, searchPhrase, onSearchPhraseChange, ...textInputProps }, ref) => {
    const colorScheme = useAppColorScheme();
    const [focused, setFocused] = useState(false);

    const onClear = useCallback(() => {
      onSearchPhraseChange('');
    }, [onSearchPhraseChange]);

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colorScheme.white,
            borderColor: focused || searchPhrase ? colorScheme.black : colorScheme.lighterGrey,
          },
          style,
        ]}>
        <SearchIcon color={colorScheme.text} style={styles.searchIcon} />
        <TextInput
          ref={ref}
          accessibilityRole="search"
          returnKeyType="search"
          style={[styles.textInput, { color: colorScheme.text }]}
          placeholderTextColor={colorScheme.textSecondary}
          placeholder={placeholder}
          value={searchPhrase}
          onChangeText={onSearchPhraseChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...textInputProps}
        />
        {searchPhrase ? (
          <TouchableOpacity style={styles.clearButton} accessibilityRole="button" onPress={onClear} hitSlop={hitSlop}>
            <ClearIcon />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  },
);

SearchBar.displayName = 'SearchBar';

const styles = StyleSheet.create({
  clearButton: {
    marginLeft: 6,
    marginRight: 8,
  },
  container: {
    alignItems: 'center',
    borderRadius: 23,
    borderWidth: 1,
    flexDirection: 'row',
    height: 46,
  },
  searchIcon: {
    marginLeft: 8,
    marginRight: 6,
  },
  textInput: {
    flex: 1,
    height: 46,
    ...font.normal,
    fontSize: 14,
    letterSpacing: 0.2,
    lineHeight: 18,
    paddingBottom: 2,
  },
});

export default SearchBar;
