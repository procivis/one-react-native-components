import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Placeholder } from '../../storybook/placeholder';
import FullWidthButton from './full-width-button';

const Basic: ComponentStory<typeof FullWidthButton> = (args) => (
  <View style={styles.container}>
    <Placeholder id="Content" style={styles.container} />
    <FullWidthButton {...args} />
  </View>
);

Basic.args = {
  children: 'Label',
};

export { Basic as FullWidthButton };

export default {
  title: 'base/button/Full Width Button',
  component: FullWidthButton,
  parameters: {
    noSafeArea: true,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=391%3A9393&t=B35jjZXmlRldfysP-4',
    },
  },
  argTypes: {
    onPress: { action: 'onPress' },
  },
} as ComponentMeta<typeof FullWidthButton>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
