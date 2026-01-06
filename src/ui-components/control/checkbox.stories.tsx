import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './checkbox';

const Basic: StoryObj<typeof Checkbox> = {
  args: {
    text: 'Example text\non multiple\nlines',
    value: true,
    disabled: false,
  },
};

export { Basic as Checkbox };

export default {
  title: 'base/control/Checkbox',
  component: Checkbox,
  argTypes: {
    onValueChanged: { action: 'onValueChanged' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=621-21936&mode=dev',
    },
  },
} as Meta<typeof Checkbox>;
