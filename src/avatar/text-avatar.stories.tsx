import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import TextAvatar from './text-avatar';

const Basic: ComponentStory<typeof TextAvatar> = (args) => {
  return <TextAvatar {...args} />;
};

Basic.args = {
  produceInitials: true,
  text: 'Test Text A S',
  shape: 'circle',
};

export { Basic as TextAvatar };

export default {
  title: 'component/avatar/Text Avatar',
  component: TextAvatar,
  argTypes: {
    shape: {
      options: ['circle', 'rect'],
      control: { type: 'radio' },
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/baolhE7fB2BMdCN5RVjusX/App-Feature-Library?node-id=1255-44744&t=aXMUJJW3GQqJr3Pi-0',
    },
  },
} as ComponentMeta<typeof TextAvatar>;
