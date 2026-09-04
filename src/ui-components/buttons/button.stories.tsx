import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

const Basic: StoryObj<typeof Button> = {
  args: {
    disabled: false,
    style: { margin: 24 },
    subtitle: '',
    title: 'Title',
  },
};

export { Basic as Button };

export default {
  argTypes: {
    onPress: { action: 'onPress' },
  },
  component: Button,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=419-18389',
    },
  },
  title: 'base/button/Button',
} as Meta<typeof Button>;
