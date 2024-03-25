import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { CloseIcon } from '../icons';
import GhostButton from './ghost-button';

const Basic: ComponentStory<typeof GhostButton> = (args) => <GhostButton {...args} />;

Basic.args = {
  icon: CloseIcon,
  style: { margin: 24 },
};

export { Basic as GhostButton };

export default {
  title: 'base/button/Ghost Button',
  component: GhostButton,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=425-18650&t=KAAJ0oKY3xb6VNtA-4',
    },
  },
} as ComponentMeta<typeof GhostButton>;
