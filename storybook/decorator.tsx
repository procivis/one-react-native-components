import { NavigationContainer, NavigationRouteContext } from '@react-navigation/native';
import type { StoryContext } from '@storybook/react';
import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';

import { AccessibilityLanguageProvider } from '../src/ui-components/accessibility/accessibilityLanguage';
import { ColorSchemeProvider } from '../src/ui-components/theme';
import ColorSchemes from './colorScheme';

const getColorScheme = (context: StoryContext) => ColorSchemes[context.globals.colorScheme] ?? ColorSchemes.procivis;

export const withColorScheme = (Story: any, context: StoryContext) => {
  return (
    <ColorSchemeProvider colorScheme={getColorScheme(context)}>
      <Story {...context} />
    </ColorSchemeProvider>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
});

const mockRoute = {
  key: 'Story',
  name: 'Story',
  params: {},
};
export const withCommonLibs = (Story: () => JSX.Element) => {
  return (
    <AccessibilityLanguageProvider language="en">
      <GestureHandlerRootView style={styles.fullScreen}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <NavigationContainer independent={true}>
            <NavigationRouteContext.Provider value={mockRoute}>
              <Story />
            </NavigationRouteContext.Provider>
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </AccessibilityLanguageProvider>
  );
};

export const FullScreen = (Story: () => JSX.Element) => {
  const dimensions = useWindowDimensions();
  return (
    <View
      style={{
        width: dimensions.width,
        height: dimensions.height,
      }}>
      <Story />
    </View>
  );
};
