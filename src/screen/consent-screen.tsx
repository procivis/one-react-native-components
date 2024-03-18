import React, { FunctionComponent, ReactNode, useCallback, useState } from 'react';
import { Insets, LayoutChangeEvent, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackButton, Button, Checkbox, CheckboxProps } from '../buttons';
import { ImageOrComponent, ImageOrComponentSource } from '../image';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';
import ContrastingStatusBar from '../utils/contrasting-status-bar';

export interface ConsentScreenButton {
  testID?: string;
  title: string;
  onPress: () => void;
}

export interface ConsentScreenProps {
  testID?: string;
  title: string;
  illustration: ImageOrComponentSource;
  description: string;
  onBack?: () => void;
  /** The button placed on the top-right */
  rightAccessory?: ReactNode;
  /** Optional additional checkbox */
  checkbox?: CheckboxProps;
  /** The first button is treated as primary */
  buttons: ConsentScreenButton[];
}

const backButtonHitSlop: Insets = { top: 8, bottom: 12, left: 24, right: 12 };

/**
 * Feature Tutorial screen component
 *
 * Following the design: https://www.figma.com/file/baolhE7fB2BMdCN5RVjusX/App-Feature-Library?node-id=1757-50151&t=LrbaMkqDZcJcNx2E-4
 */
const ConsentScreen: FunctionComponent<ConsentScreenProps> = ({
  title,
  illustration,
  description,
  onBack,
  rightAccessory,
  checkbox,
  buttons,
  testID,
}) => {
  const colorScheme = useAppColorScheme();
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();

  const [layoutHeight, setLayoutHeight] = useState<number>(0);
  const layoutHandler = useCallback((event: LayoutChangeEvent) => {
    setLayoutHeight(event.nativeEvent.layout.height);
  }, []);

  const contentHeight = layoutHeight - insets.top;
  const bottomPadding = Math.max(insets.bottom, 12);

  return (
    <View
      testID={testID}
      onLayout={layoutHandler}
      onAccessibilityEscape={onBack}
      style={[styles.container, { paddingTop: insets.top, backgroundColor: colorScheme.white }]}>
      <ContrastingStatusBar backgroundColor={colorScheme.white} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        contentContainerStyle={{ minHeight: contentHeight, paddingBottom: bottomPadding }}>
        <View style={styles.header}>
          {onBack && <BackButton onPress={onBack} hitSlop={backButtonHitSlop} />}
          {rightAccessory}
        </View>
        <View style={styles.content}>
          <Typography
            color={colorScheme.text}
            bold={true}
            size="h1"
            accessibilityRole="header"
            style={styles.title}
            align="center">
            {title}
          </Typography>
          <View style={styles.middle}>
            <ImageOrComponent source={illustration} style={[styles.illustration, { width: screenWidth }]} />
            <Typography color={colorScheme.text} align="center" style={styles.description}>
              {description}
            </Typography>
          </View>
          <View>
            {checkbox ? <Checkbox style={styles.checkbox} {...checkbox} /> : null}
            {buttons.map((button, index) => (
              <Button
                style={index > 0 ? styles.additionalButton : undefined}
                key={index}
                testID={button.testID}
                type={index ? 'light' : 'default'}
                onPress={button.onPress}>
                {button.title}
              </Button>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  additionalButton: {
    marginTop: 16,
  },
  checkbox: {
    marginBottom: 12,
  },
  container: {
    height: '100%',
    width: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  description: {
    marginTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 38,
    paddingHorizontal: 24,
    paddingTop: 8,
    width: '100%',
  },
  illustration: {
    alignItems: 'center',
    height: 288,
  },
  middle: {
    alignItems: 'center',
    marginVertical: 12,
  },
  title: {
    marginBottom: 24,
    marginTop: 6,
  },
});

export default ConsentScreen;
