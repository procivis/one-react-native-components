import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { theme } from '../theme';
import Button from './button';

const Basic: ComponentStory<typeof Button> = (args) => <Button {...args} />;

Basic.args = {
  children: 'Button label',
  type: 'default',
  disabled: false,
  style: { margin: theme.padding },
};

export { Basic as Button };

export default {
  title: 'base/button',
  component: Button,
  argTypes: {
    type: {
      options: ['default', 'light', 'lightBorderless'],
      control: { type: 'radio' },
    },
    onPress: { action: 'onPress' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=3%3A72&t=B35jjZXmlRldfysP-4',
    },
  },
} as ComponentMeta<typeof Button>;
