import React, { FC, ReactNode } from 'react';
import { ColorValue, Insets, StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

import { BackButton } from '../buttons';
import { SearchBar, SearchBarProps } from '../searchbar';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';
import { concatTestID } from '../utils';

export type HeaderProps = ViewProps & {
  onBack?: () => void;
  onSearchPhraseChange?: SearchBarProps['onSearchPhraseChange'];
  rightButton?: ReactNode;
  searchPhrase?: SearchBarProps['searchPhrase'];
  style?: StyleProp<ViewStyle>;
  text: {
    searchPlaceholder?: string;
  };
  textColor?: ColorValue;
  title: ReactNode;
};

const backButtonHitSlop: Insets = { top: 8, bottom: 12, left: 24, right: 24 };

/**
 * Unified screen header
 *
 * Following the design: https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=425-18624&t=HY1KvobxOReLeC8Z-4
 */
const Header: FC<HeaderProps> = ({
  onBack,
  onSearchPhraseChange,
  rightButton,
  searchPhrase,
  style,
  testID,
  text,
  textColor,
  title,
  ...viewProps
}) => {
  const colorScheme = useAppColorScheme();

  return (
    <View style={[styles.container, style]} testID={testID} {...viewProps}>
      {onBack && (
        <View style={styles.backButtonWrapper}>
          {onBack && <BackButton hitSlop={backButtonHitSlop} onPress={onBack} testID={concatTestID(testID, 'back')} />}
          <View />
          {rightButton}
        </View>
      )}

      <View style={styles.titleWrapper}>
        {typeof title === 'string' ? (
          <Typography
            accessibilityRole="header"
            color={textColor ?? colorScheme.text}
            preset="l"
            style={styles.title}
            testID={concatTestID(testID, 'title')}>
            {title}
          </Typography>
        ) : (
          title
        )}

        {!onBack && <View style={styles.rightButtonWrapper}>{rightButton}</View>}
      </View>

      {onSearchPhraseChange && (
        <View style={styles.searchBarWrapper}>
          <SearchBar
            onSearchPhraseChange={onSearchPhraseChange}
            placeholder={text?.searchPlaceholder}
            searchPhrase={searchPhrase ?? ''}
            testID={concatTestID(testID, 'search')}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 38,
    paddingHorizontal: 24,
    paddingTop: 16,
    width: '100%',
  },
  container: {
    marginBottom: 24,
    width: '100%',
  },
  rightButtonWrapper: {
    paddingTop: 6,
  },
  searchBarWrapper: {
    marginTop: 12,
    paddingHorizontal: 24,
  },
  title: {
    flex: 1,
    paddingTop: 6,
  },
  titleWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 10,
    width: '100%',
  },
});

export default Header;
