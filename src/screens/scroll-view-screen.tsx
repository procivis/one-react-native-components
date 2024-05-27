import React, { FC, PropsWithChildren } from 'react';
import { Platform, ScrollView, ScrollViewProps, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NavigationHeader, { NavigationHeaderProps } from '../header/navigation-header';
import ListTitleHeader from '../list/list-title-header';
import { useAppColorScheme } from '../theme/color-scheme-context';
import { useOnScrollHeaderState } from '../utils/hooks/header/on-scroll-header-state';
import { useListContentInset } from '../utils/hooks/list/list-content-inset';
import { concatTestID } from '../utils/testID';

export type ScrollViewScreenProps = ViewProps & {
  header: Omit<NavigationHeaderProps, 'animate' | 'blurred' | 'style' | 'title' | 'titleVisible'> & {
    static?: boolean;
    title: string;
  };
  modalPresentation?: boolean;
  scrollView?: Omit<ScrollViewProps, 'onScroll'>;
};

const ScrollViewScreen: FC<PropsWithChildren<ScrollViewScreenProps>> = ({
  children,
  header,
  modalPresentation,
  scrollView,
  style,
  testID,
  ...viewProps
}) => {
  const colorScheme = useAppColorScheme();
  const { top } = useSafeAreaInsets();
  const contentInsetsStyle = useListContentInset({
    additionalBottomPadding: 24,
    headerHeight: modalPresentation && Platform.OS === 'ios' ? 63 : 48,
    modalPresentation,
  });
  const { titleVisible, onScroll } = useOnScrollHeaderState();
  const { contentContainerStyle, ...scrollViewProps } = scrollView ?? {};

  const safeAreaPaddingStyle: ViewStyle | undefined =
    !modalPresentation || Platform.OS === 'android'
      ? {
          paddingTop: top,
        }
      : undefined;

  return (
    <View style={[styles.container, { backgroundColor: colorScheme.background }, style]} testID={testID} {...viewProps}>
      <ScrollView
        contentContainerStyle={[styles.contentContainer, contentInsetsStyle, contentContainerStyle]}
        onScroll={onScroll}
        scrollEventThrottle={100}
        {...scrollViewProps}>
        <View style={styles.content} testID={concatTestID(testID, 'content')}>
          {!header.static && <ListTitleHeader title={header.title} />}
          {children}
        </View>
      </ScrollView>
      <NavigationHeader
        animate
        blurred
        style={[styles.header, safeAreaPaddingStyle]}
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
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  header: {
    position: 'absolute',
    width: '100%',
  },
});

export default ScrollViewScreen;
