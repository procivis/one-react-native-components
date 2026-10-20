import type { Meta, StoryObj } from '@storybook/react';

import ConnectivityButton, {
  ConnectivityTransport,
} from './connectivity-button';

const Basic: StoryObj<typeof ConnectivityButton> = {
  args: {
    available: true,
    disabled: false,
    status: true,
    title: 'Connectivity message',
    transport: ConnectivityTransport.Internet,
  },
};

export { Basic as ConnectivityButton };

export default {
  argTypes: {
    onPress: { action: 'onPress' },
    transport: {
      control: { type: 'radio' },
      options: [
        ConnectivityTransport.Internet,
        ConnectivityTransport.Bluetooth,
        ConnectivityTransport.All,
      ],
    },
  },
  component: ConnectivityButton,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=4237-32033&node-type=frame&t=TJ4R3WHLQ1CsXNeT-0',
    },
  },
  title: 'base/button/Connectivity Button',
} as Meta<typeof ConnectivityButton>;
