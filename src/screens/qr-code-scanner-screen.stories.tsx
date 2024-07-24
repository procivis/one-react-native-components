import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import QRCodeScannerScreen from './qr-code-scanner-screen';

const Basic: ComponentStory<typeof QRCodeScannerScreen> = (args) => {
  return <QRCodeScannerScreen {...args} />;
};

Basic.args = {
  title: 'Scan QR Code to connect.',
};

export { Basic as QRCodeScannerScreen };

export default {
  title: 'screen/QR Code Scanner Screen',
  component: QRCodeScannerScreen,
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
} as ComponentMeta<typeof QRCodeScannerScreen>;
