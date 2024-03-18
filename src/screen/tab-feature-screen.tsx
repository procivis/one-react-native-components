import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  FlatListProps,
  LayoutChangeEvent,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FeatureHeader, FeatureHeaderProps } from '../header';
import { HorizontalTabBar, HorizontalTabBarTab } from '../tabbar';
import { useAppColorScheme } from '../theme';
import ContrastingStatusBar from '../utils/contrasting-status-bar';
import { concatTestID } from '../utils/testID';

export interface TabFeatureScreenTab extends HorizontalTabBarTab {
  content: React.ComponentType;
  contentStyle?: StyleProp<ViewStyle>;
}

export interface TabFeatureScreenProps extends Omit<FeatureHeaderProps, 'children'> {
  tabs: TabFeatureScreenTab[];
  selectedTab: React.Key;
  onSelected: (key: React.Key, value: TabFeatureScreenTab, index: number) => void;
  ListEmptyComponent?: FlatListProps<TabFeatureScreenTab>['ListEmptyComponent'];
}

/**
 * Unified feature screen with header tabs
 *
 * Following the design: https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=172-15542&t=FbF9TvlM1MM9y1gR-4
 */
const TabFeatureScreen: FunctionComponent<TabFeatureScreenProps> = ({
  tabs,
  selectedTab,
  onSelected,
  onBack,
  style,
  testID,
  ListEmptyComponent,
  ...headerProps
}) => {
  const insets = useSafeAreaInsets();
  const colorScheme = useAppColorScheme();
  const { width: screenWidth } = useWindowDimensions();

  const pagesView = useRef<FlatList<TabFeatureScreenTab>>(null);

  const [layoutHeight, setLayoutHeight] = useState<number>();
  const layoutHandler = useCallback((event: LayoutChangeEvent) => {
    setLayoutHeight(event.nativeEvent.layout.height);
  }, []);

  const [headerHeight, setHeaderHeight] = useState<number>();
  const onHeaderLayout = useCallback((event: LayoutChangeEvent) => {
    setHeaderHeight(event.nativeEvent.layout.height);
  }, []);

  const contentHeight = layoutHeight && headerHeight ? layoutHeight - headerHeight - insets.top : undefined;

  const selectedIndex = tabs.findIndex(({ key }) => key === selectedTab);
  const renderItem = useCallback<ListRenderItem<TabFeatureScreenTab>>(
    ({ item: { contentStyle, content: Content, ...tabProps }, index }) => (
      <View
        testID={concatTestID(testID, 'tabScreen', tabProps.testID)}
        accessibilityElementsHidden={index !== selectedIndex}
        style={[{ width: screenWidth, height: contentHeight }, contentStyle]}>
        <Content />
      </View>
    ),
    [contentHeight, screenWidth, selectedIndex, testID],
  );

  const handleSelected = useCallback(
    (key: React.Key, _, index: number) => onSelected(key, tabs[index], index),
    [onSelected, tabs],
  );

  const manualScrollInProgress = useRef<boolean>(false);
  const onScrollBeginDrag = useCallback(() => {
    manualScrollInProgress.current = true;
  }, []);

  const indexScrolledTo = useRef<number>();
  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      // disable during auto-scroll, only react to manual scrolling
      if (!manualScrollInProgress.current) {
        return;
      }

      const position = Math.floor(0.5 + event.nativeEvent.contentOffset.x / screenWidth);
      const index = Math.min(Math.max(0, position), tabs.length - 1);
      const tab = tabs[index];

      if (indexScrolledTo.current !== index) {
        indexScrolledTo.current = index;
        onSelected(tab.key, tab, index);
      }
    },
    [onSelected, screenWidth, tabs],
  );

  // when changing the selected tab, auto-scroll to the selected page
  useEffect(() => {
    if (selectedIndex !== -1 && selectedIndex !== indexScrolledTo.current) {
      indexScrolledTo.current = selectedIndex;
      manualScrollInProgress.current = false;
      pagesView.current?.scrollToIndex({
        animated: true,
        index: selectedIndex,
      });
    }
  }, [selectedIndex]);

  return (
    <View
      testID={testID}
      onAccessibilityEscape={onBack}
      onLayout={layoutHandler}
      style={[styles.container, { paddingTop: insets.top, backgroundColor: colorScheme.accent }, style]}>
      <ContrastingStatusBar backgroundColor={colorScheme.accent} />
      <FeatureHeader onBack={onBack} {...headerProps} onLayout={onHeaderLayout}>
        <HorizontalTabBar
          testID={concatTestID(testID, 'tabs')}
          values={tabs}
          selectedKey={selectedTab}
          onSelected={handleSelected}
        />
      </FeatureHeader>
      {contentHeight ? (
        <FlatList<TabFeatureScreenTab>
          ref={pagesView}
          data={tabs}
          extraData={selectedIndex}
          style={[styles.content, { backgroundColor: colorScheme.background, height: contentHeight }]}
          contentContainerStyle={tabs.length ? undefined : styles.contentContainer}
          horizontal={true}
          ListEmptyComponent={ListEmptyComponent}
          pagingEnabled={true}
          getItemLayout={(_, index) => ({ length: screenWidth, offset: screenWidth * index, index })}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          onScroll={onScroll}
          scrollEventThrottle={200}
          onScrollBeginDrag={onScrollBeginDrag}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    height: '100%',
    width: '100%',
  },
});

export default TabFeatureScreen;
