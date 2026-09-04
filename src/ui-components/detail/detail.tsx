import React, { FunctionComponent, PropsWithChildren, useCallback, useState } from 'react';
import { LayoutChangeEvent, ScrollView, ScrollViewProps, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { concatTestID } from '../../utils/testID';
import { Header, HeaderProps } from '../header';
import { useAppColorScheme } from '../theme';

type StaticContentProps = {
  staticContent: true;
};

type DynamicContentProps = {
  scrollViewProps?: ScrollViewProps;
  staticContent?: false;
};

export type DetailScreenProps = {
  contentStyle?: StyleProp<ViewStyle>;
  headerProps: HeaderProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
} & (StaticContentProps | DynamicContentProps);

const DetailScreen: FunctionComponent<PropsWithChildren<DetailScreenProps>> = ({
  children,
  staticContent,
  contentStyle,
  testID,
  style,
  headerProps,
}) => {
  const colorScheme = useAppColorScheme();
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 24);

  const [layoutHeight, setLayoutHeight] = useState<number>(0);
  const layoutHandler = useCallback((event: LayoutChangeEvent) => {
    setLayoutHeight(event.nativeEvent.layout.height);
  }, []);

  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const headerLayoutHandler = useCallback((event: LayoutChangeEvent) => {
    setHeaderHeight(event.nativeEvent.layout.height);
  }, []);

  const contentHeight = layoutHeight && headerHeight ? layoutHeight - headerHeight - insets.top : undefined;

  return (
    <View
      onAccessibilityEscape={() => {}}
      onLayout={layoutHandler}
      style={[styles.container, { backgroundColor: colorScheme.background, paddingTop: insets.top }]}
      testID={testID}>
      <Header onLayout={headerLayoutHandler} {...headerProps} />
      {contentHeight ? (
        staticContent ? (
          <View
            style={[styles.contentWrapper, styles.staticContent, { height: contentHeight }, style]}
            testID={concatTestID(testID, 'content')}>
            {children}
          </View>
        ) : (
          <ScrollView
            alwaysBounceVertical={false}
            contentContainerStyle={{ minHeight: contentHeight }}
            showsVerticalScrollIndicator={false}
            style={style}
            testID={concatTestID(testID, 'content')}>
            <View
              style={[styles.contentWrapper, styles.scrollableContent, { paddingBottom: bottomPadding }, contentStyle]}>
              {children}
            </View>
          </ScrollView>
        )
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  contentWrapper: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  scrollableContent: {
    flex: 1,
  },
  staticContent: {
    width: '100%',
  },
});

export default DetailScreen;
