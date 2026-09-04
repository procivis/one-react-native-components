import type { Meta, StoryObj } from '@storybook/react';

import BackButton, { BackButtonIcon } from './back-button';

const Basic: StoryObj<typeof BackButton> = {
  args: {
    icon: BackButtonIcon.Back,
    style: { margin: 24 },
  },
};

export { Basic as BackButton };

export default {
  argTypes: {
    icon: {
      control: { type: 'radio' },
      options: [BackButtonIcon.Back, BackButtonIcon.Close],
    },
    onPress: { action: 'onPress' },
  },
  component: BackButton,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=425-18650&t=KAAJ0oKY3xb6VNtA-4',
    },
  },
  title: 'base/button/Back Button',
} as Meta<typeof BackButton>;
