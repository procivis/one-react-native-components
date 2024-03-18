import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FloatingButton from './floating-button';

const Basic: ComponentStory<typeof FloatingButton> = ({ style, ...args }) => {
  const insets = useSafeAreaInsets();
  const bottomRight = 'bottomRight' in args && args.bottomRight;
  return (
    <FloatingButton {...args} style={[{ marginVertical: bottomRight ? undefined : Math.max(24, insets.top) }, style]} />
  );
};

Basic.args = {
  icon: 'add',
  // @ts-ignore
  label: '',
  bottomRight: false,
};

export { Basic as FloatingButton };

export default {
  title: 'base/button/Floating Button',
  component: FloatingButton,
  argTypes: {
    icon: {
      options: ['add', 'edit', 'next'],
      control: { type: 'radio' },
    },
    onPress: { action: 'onPress' },
  },
  parameters: {
    noSafeArea: true,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=8%3A812&t=B35jjZXmlRldfysP-4',
    },
  },
} as ComponentMeta<typeof FloatingButton>;
