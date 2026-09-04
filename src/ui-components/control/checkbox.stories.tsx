import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './checkbox';

const Basic: StoryObj<typeof Checkbox> = {
  args: {
    disabled: false,
    text: 'Example text\non multiple\nlines',
    value: true,
  },
};

export { Basic as Checkbox };

export default {
  argTypes: {
    onValueChanged: { action: 'onValueChanged' },
  },
  component: Checkbox,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=621-21936&mode=dev',
    },
  },
  title: 'base/control/Checkbox',
} as Meta<typeof Checkbox>;
