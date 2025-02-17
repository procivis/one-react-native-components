import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import HoldButton from './hold-button';

const Basic: ComponentStory<typeof HoldButton> = (args) => <HoldButton {...args} />;

Basic.args = {
  title: 'Title',
  subtitlePrefix: 'subtitle prefix ',
  subtitleSuffix: 'suffix',
  disabled: false,
  style: { margin: 24 },
};

export { Basic as HoldButton };

export default {
  title: 'base/button/HoldButton',
  component: HoldButton,
  argTypes: {
    onFinished: { action: 'onFinished' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/cCmAyBQrQWCQZuDi85pJfe/Procivis-One-Wallet-Developments-2025?node-id=1-882',
    },
  },
} as ComponentMeta<typeof HoldButton>;
