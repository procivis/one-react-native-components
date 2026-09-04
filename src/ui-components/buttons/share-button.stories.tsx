import type { Meta, StoryObj } from '@storybook/react';

import ShareButton from './share-button';

const Basic: StoryObj<typeof ShareButton> = {
  args: {
    title: 'qr-code-date.com',
  },
};

export { Basic as ShareButton };

export default {
  argTypes: {
    onPress: { action: 'onPress' },
  },
  component: ShareButton,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=4237-32033&node-type=frame&t=TJ4R3WHLQ1CsXNeT-0',
    },
  },
  title: 'base/button/Share Button',
} as Meta<typeof ShareButton>;
