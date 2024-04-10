import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import QRCodeScanner from './qr-code-scanner';

const Basic: ComponentStory<typeof QRCodeScanner> = (args) => {
  return <QRCodeScanner {...args} />;
};

Basic.args = {
  title: 'Scan QR Code to connect.',
};

export { Basic as QRCodeScanner };

export default {
  title: 'view/camera/QR Code Scanner',
  component: QRCodeScanner,
  parameters: {
    noSafeArea: true,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=651%3A22601&mode=design&t=NuPAMUrC62C0azQ4-1',
    },
  },
  argTypes: {
    onBarCodeRead: { action: 'onBarCodeRead' },
  },
} as ComponentMeta<typeof QRCodeScanner>;
