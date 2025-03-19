import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect } from 'react';
import { useCameraPermission } from 'react-native-vision-camera';

import QRCodeScannerScreen, { QRCodeScannerScreenProps } from './qr-code-scanner-screen';

const Render = (args: QRCodeScannerScreenProps) => {
  const { hasPermission, requestPermission } = useCameraPermission();
  useEffect(() => {
    if (!hasPermission) {
      requestPermission().catch(() => {});
    }
  }, [hasPermission, requestPermission]);

  return <QRCodeScannerScreen {...args} />;
};

const Basic: StoryObj<typeof QRCodeScannerScreen> = {
  args: {
    title: 'Scan QR Code to connect.',
  },
  render: Render,
}

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
    onQRCodeRead: { action: 'onQRCodeRead' },
  },
} as Meta<typeof QRCodeScannerScreen>;
