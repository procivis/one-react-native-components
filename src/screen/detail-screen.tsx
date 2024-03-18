import React, { FunctionComponent, PropsWithChildren, useCallback, useState } from 'react';
import { LayoutChangeEvent, ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import DetailHeader, { DetailHeaderProps } from '../header/detail-header';
import { useAppColorScheme } from '../theme';
import ContrastingStatusBar from '../utils/contrasting-status-bar';
import { concatTestID } from '../utils/testID';

type ScrollViewProps = React.ComponentProps<typeof ScrollView>;
type ContentProps = {
  /** style of the entire content view, e.g: to specify background color */
  style?: StyleProp<ViewStyle>;
} & (
  | {
      staticContent?: false;
      scrollViewProps?: ScrollViewProps;
      /** style of the scrollable content, e.g: to adjust padding */
      contentStyle?: StyleProp<ViewStyle>;
    }
  | {
      /**
       * Use when the content contains a vertical scroll component
       * Note: The screen needs to maintain the bottom padding
       */
      staticContent: true;
    }
);
export type DetailScreenProps = DetailHeaderProps & ContentProps;

/**
 * Unified scrollable detail screen component
 *
 * Following the design: https://www.figma.com/file/lmgEMiodW9VjCHSFCsBKcC/Procivis-SSI%2B-%E2%80%93-App-(Base-File)?node-id=425%3A14934
 */
const DetailScreen: FunctionComponent<PropsWithChildren<DetailScreenProps>> = ({
  children,
  testID,
  style,
  ...props
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
      onAccessibilityEscape={props.onBack}
      style={[styles.container, { paddingTop: insets.top, backgroundColor: colorScheme.white }]}>
      <ContrastingStatusBar backgroundColor={colorScheme.white} />
      <DetailHeader testID={concatTestID(testID, 'header')} {...props} onLayout={headerLayoutHandler} />
      {contentHeight ? (
        props.staticContent ? (
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
            style={style}
            {...(props.scrollViewProps ?? {})}>
            <View
              style={[
                styles.contentWrapper,
                styles.scrollableContent,
                { paddingBottom: bottomPadding },
                props.contentStyle,
              ]}>
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
    paddingTop: 24,
  },
  scrollableContent: {
    flex: 1,
  },
  staticContent: {
    width: '100%',
  },
});

export default DetailScreen;
