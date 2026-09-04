import type { Meta, StoryObj } from '@storybook/react';

import HoldButton from './hold-button';

const Basic: StoryObj<typeof HoldButton> = {
  args: {
    disabled: false,
    style: { margin: 24 },
    subtitlePrefix: 'subtitle prefix ',
    subtitleSuffix: 'suffix',
    title: 'Title',
  },
};

export { Basic as HoldButton };

export default {
  argTypes: {
    onFinished: { action: 'onFinished' },
  },
  component: HoldButton,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/cCmAyBQrQWCQZuDi85pJfe/Procivis-One-Wallet-Developments-2025?node-id=1-882',
    },
  },
  title: 'base/button/HoldButton',
} as Meta<typeof HoldButton>;
