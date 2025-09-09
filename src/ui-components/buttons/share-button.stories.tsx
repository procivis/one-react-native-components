import type { Meta, StoryObj } from '@storybook/react';

import ShareButton from './share-button';

const Basic: StoryObj<typeof ShareButton> = {
  args: {
    title: 'qr-code-date.com',
  },
};

export { Basic as ShareButton };

export default {
  title: 'base/button/Share Button',
  component: ShareButton,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=4237-32033&node-type=frame&t=TJ4R3WHLQ1CsXNeT-0',
    },
  },
} as Meta<typeof ShareButton>;
