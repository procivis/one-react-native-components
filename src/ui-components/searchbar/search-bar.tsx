import React, { FC, forwardRef, useCallback } from 'react';
import {
  Insets,
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputInstance,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import { concatTestID } from '../../utils';
import { TouchableOpacity } from '../accessibility';
import { CloseIcon, SearchIcon } from '../icons';
import font from '../text/font';
import { useAppColorScheme } from '../theme';

export interface SearchBarProps extends TextInputProps {
  onSearchPhraseChange: (searchPhrase: string) => void;
  placeholder?: string;
  searchPhrase: string;
  style?: StyleProp<ViewStyle>;
}

const hitSlop: Insets = { bottom: 10, left: 10, right: 10, top: 10 };

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=1143-40433&t=HY1KvobxOReLeC8Z-4
const SearchBar: FC<SearchBarProps> = forwardRef<
  TextInputInstance,
  SearchBarProps
>(
  (
    {
      style,
      placeholder,
      searchPhrase,
      onSearchPhraseChange,
      testID,
      ...textInputProps
    },
    ref,
  ) => {
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
        ]}
      >
        <SearchIcon color={colorScheme.text} style={styles.searchIcon} />
        <TextInput
          accessibilityRole="search"
          onChangeText={onSearchPhraseChange}
          placeholder={placeholder}
          placeholderTextColor={colorScheme.text}
          ref={ref}
          returnKeyType="search"
          style={[styles.textInput, { color: colorScheme.text }]}
          testID={testID}
          value={searchPhrase}
          {...textInputProps}
        />
        {searchPhrase ? (
          <TouchableOpacity
            accessibilityRole="button"
            hitSlop={hitSlop}
            onPress={onClear}
            style={styles.clearButton}
            testID={concatTestID(testID, 'clear')}
          >
            <CloseIcon color={colorScheme.text} height={12} width={12} />
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
    marginRight: 16,
  },
  container: {
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 0,
    flexDirection: 'row',
    height: 40,
  },
  searchIcon: {
    marginLeft: 8,
    marginRight: 6,
  },
  textInput: {
    ...font.regular,
    flex: 1,
    fontSize: 14,
    height: 40,
    letterSpacing: 0.2,
    lineHeight: 18,
    paddingBottom: Platform.OS === 'ios' ? 2 : undefined,
  },
});

export default SearchBar;
