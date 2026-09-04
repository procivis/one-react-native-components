import type { Meta, StoryObj } from '@storybook/react';

import { CloseIcon } from '../icons';
import GhostButton from './ghost-button';

const Basic: StoryObj<typeof GhostButton> = {
  args: {
    icon: CloseIcon,
    style: { margin: 24 },
  },
};

export { Basic as GhostButton };

export default {
  argTypes: {
    onPress: { action: 'onPress' },
  },
  component: GhostButton,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=425-18650&t=KAAJ0oKY3xb6VNtA-4',
    },
  },
  title: 'base/button/Ghost Button',
} as Meta<typeof GhostButton>;
