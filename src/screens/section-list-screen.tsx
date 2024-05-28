import React from 'react';
import { SectionList, SectionListProps, StyleSheet, View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NavigationHeader, { NavigationHeaderProps } from '../header/navigation-header';
import ListTitleHeader from '../list/list-title-header';
import { useAppColorScheme } from '../theme/color-scheme-context';
import { useOnScrollHeaderState } from '../utils/hooks/header/on-scroll-header-state';
import { useListContentInset } from '../utils/hooks/list/list-content-inset';

export type SectionListScreenProps<ItemT, SectionT> = ViewProps & {
  header: Omit<NavigationHeaderProps, 'animate' | 'blurred' | 'style' | 'title' | 'titleVisible'> & {
    static?: boolean;
    title: string;
  };
  list: Omit<SectionListProps<ItemT, SectionT>, 'ListHeaderComponent' | 'onScroll'>;
};

const SectionListScreen = <ItemT, SectionT>({
  header,
  list: { contentContainerStyle, stickySectionHeadersEnabled, ...listProps },
  style,
  ...viewProps
}: SectionListScreenProps<ItemT, SectionT>) => {
  const colorScheme = useAppColorScheme();
  const safeAreaInsets = useSafeAreaInsets();
  const contentInsetsStyle = useListContentInset();
  const { titleVisible, onScroll } = useOnScrollHeaderState();

  return (
    <View style={[styles.container, { backgroundColor: colorScheme.background }, style]} {...viewProps}>
      <SectionList<ItemT, SectionT>
        ListHeaderComponent={!header.static ? <ListTitleHeader title={header.title} /> : undefined}
        contentContainerStyle={[contentInsetsStyle, contentContainerStyle]}
        onScroll={onScroll}
        scrollEventThrottle={100}
        stickySectionHeadersEnabled={stickySectionHeadersEnabled ?? false}
        {...listProps}
      />
      <NavigationHeader
        animate
        blurred
        style={[styles.header, { paddingTop: safeAreaInsets.top }]}
        titleVisible={header.static || titleVisible}
        {...header}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    width: '100%',
  },
});

export default SectionListScreen;
