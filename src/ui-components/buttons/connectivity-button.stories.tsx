import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import ConnectivityButton, { ConnectivityTransport } from './connectivity-button';

const Basic: ComponentStory<typeof ConnectivityButton> = (args) => <ConnectivityButton {...args} />;

Basic.args = {
  available: true,
  disabled: false,
  status: true,
  title: 'Connectivity message',
  transport: ConnectivityTransport.Internet,
};

export { Basic as ConnectivityButton };

export default {
  title: 'base/button/Connectivity Button',
  component: ConnectivityButton,
  argTypes: {
    transport: {
      options: [ConnectivityTransport.Internet, ConnectivityTransport.Bluetooth, ConnectivityTransport.All],
      control: { type: 'radio' },
    },
    onPress: { action: 'onPress' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=4237-32033&node-type=frame&t=TJ4R3WHLQ1CsXNeT-0',
    },
  },
} as ComponentMeta<typeof ConnectivityButton>;
