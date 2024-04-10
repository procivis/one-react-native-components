import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Button } from './button';

const Basic: ComponentStory<typeof Button> = (args) => <Button {...args} />;

Basic.args = {
  title: 'Title',
  subtitle: '',
  disabled: false,
  style: { margin: 24 },
};

export { Basic as Button };

export default {
  title: 'base/button/Button',
  component: Button,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=419-18389',
    },
  },
} as ComponentMeta<typeof Button>;
