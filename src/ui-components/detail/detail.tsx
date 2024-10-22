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
  staticContent?: false;
  scrollViewProps?: ScrollViewProps;
};

export type DetailScreenProps = {
  testID?: string;
  headerProps: HeaderProps;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
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
      testID={testID}
      onLayout={layoutHandler}
      onAccessibilityEscape={() => {}}
      style={[styles.container, { paddingTop: insets.top, backgroundColor: colorScheme.background }]}>
      <Header onLayout={headerLayoutHandler} {...headerProps} />
      {contentHeight ? (
        staticContent ? (
          <View
            testID={concatTestID(testID, 'content')}
            style={[styles.contentWrapper, styles.staticContent, { height: contentHeight }, style]}>
            {children}
          </View>
        ) : (
          <ScrollView
            testID={concatTestID(testID, 'content')}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            contentContainerStyle={{ minHeight: contentHeight }}
            style={style}>
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
