import React, { useMemo } from 'react';
import { Platform, SectionList, SectionListProps, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useOnScrollHeaderState } from '../../utils/hooks/header/on-scroll-header-state';
import { useListContentInset } from '../../utils/hooks/list/list-content-inset';
import NavigationHeader, { NavigationHeaderProps } from '../header/navigation-header';
import ListTitleHeader from '../list/list-title-header';
import { useAppColorScheme } from '../theme/color-scheme-context';

export type SectionListScreenProps<ItemT, SectionT> = ViewProps & {
  header: Omit<NavigationHeaderProps, 'animate' | 'blurred' | 'style' | 'title' | 'titleVisible'> & {
    static?: boolean;
    title: string;
  };
  list: Omit<SectionListProps<ItemT, SectionT>, 'ListHeaderComponent' | 'onScroll'> & {
    header?: React.ComponentType<any> | React.ReactElement;
  };
  modalPresentation?: boolean;
};

const SectionListScreen = <ItemT, SectionT>({
  header,
  list: { contentContainerStyle, header: listHeader, stickySectionHeadersEnabled, ...listProps },
  modalPresentation,
  style,
  ...viewProps
}: SectionListScreenProps<ItemT, SectionT>) => {
  const colorScheme = useAppColorScheme();
  const { top } = useSafeAreaInsets();
  const contentInsetsStyle = useListContentInset({
    headerHeight: modalPresentation && Platform.OS === 'ios' ? 63 : 48,
    modalPresentation,
  });
  const { titleVisible, onScroll } = useOnScrollHeaderState();

  let headerPaddingStyle: ViewStyle | undefined;
  if (!modalPresentation || Platform.OS === 'android') {
    headerPaddingStyle = {
      paddingTop: top,
    };
  } else if (modalPresentation && !header.modalHandleVisible && Platform.OS === 'ios') {
    headerPaddingStyle = styles.modalHeaderWithoutHandle;
  }

  const headerView: React.ReactElement | undefined = useMemo(() => {
    if (!listHeader) {
      return undefined;
    }
    if (React.isValidElement(listHeader)) {
      return listHeader;
    } else {
      const HeaderComponent = listHeader as React.ComponentType<any>;
      return <HeaderComponent />;
    }
  }, [listHeader]);

  return (
    <View style={[styles.container, { backgroundColor: colorScheme.background }, style]} {...viewProps}>
      <SectionList<ItemT, SectionT>
        ListHeaderComponent={!header.static ? <View><ListTitleHeader title={header.title} />{headerView}</View> : headerView}
        contentContainerStyle={[contentInsetsStyle, contentContainerStyle]}
        onScroll={onScroll}
        scrollEventThrottle={100}
        stickySectionHeadersEnabled={stickySectionHeadersEnabled ?? false}
        {...listProps}
      />
      <NavigationHeader
        animate
        blurred
        style={[styles.header, headerPaddingStyle]}
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
  modalHeaderWithoutHandle: {
    paddingTop: 15,
  },
});

export default SectionListScreen;
