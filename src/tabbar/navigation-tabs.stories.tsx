import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';
import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { StyleSheet } from 'react-native';

import { LanguageIcon } from '../../storybook/assets/LanguageIcon';
import { Placeholder } from '../../storybook/placeholder';
import navigationTabsDecorator, { NavigationTabsLayoutVariant } from './navigation-tabs';

const Tab = createBottomTabNavigator();

const Content = () => {
  const { content } = useRoute().params as any;
  return <Placeholder id={`Content ${content}`} style={styles.placeholder} />;
};

const Icon = (props: { color: string }) => <LanguageIcon color={props.color} />;

export const Navigation: Story = ({ numTabs, variant }) => (
  <Tab.Navigator
    screenOptions={{ headerShown: false, tabBarIcon: Icon }}
    tabBar={navigationTabsDecorator(variant)}
    backBehavior="initialRoute"
    initialRouteName="1">
    {Array.from({ length: numTabs || 1 }).map((_, index) => (
      <Tab.Screen
        key={index}
        name={String(index + 1)}
        options={{
          tabBarLabel: `Tab ${index + 1}`,
        }}
        component={Content}
        initialParams={{ content: index + 1 }}
      />
    ))}
  </Tab.Navigator>
);

Navigation.args = {
  variant: NavigationTabsLayoutVariant.Floating,
  numTabs: 3,
};

export default {
  title: 'component/Navigation',
  argTypes: {
    variant: {
      options: [NavigationTabsLayoutVariant.Floating, NavigationTabsLayoutVariant.Static],
      control: { type: 'radio' },
    },
  },
  parameters: {
    noSafeArea: true,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=9%3A544&t=SFRanLubte7Spc4k-4',
    },
  },
} as Meta;

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
  },
});
