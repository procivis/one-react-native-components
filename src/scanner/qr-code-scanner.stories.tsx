import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import QRCodeScanner from './qr-code-scanner';

const Basic: ComponentStory<typeof QRCodeScanner> = (args) => {
  return <QRCodeScanner {...args} />;
};

Basic.args = {
  title: 'Title',
  description: 'Description',
  androidCameraPermissionOptions: {
    title: 'Permission to use camera',
    message: 'We need your permission to use your camera',
  },
};

export { Basic as QRCodeScanner };

export default {
  title: 'view/camera/QR Code Scanner',
  component: QRCodeScanner,
  parameters: {
    noSafeArea: true,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=66%3A4700&t=if2gUkBSc85H9hWC-4',
    },
  },
  argTypes: {
    onBarCodeRead: { action: 'onBarCodeRead' },
  },
} as ComponentMeta<typeof QRCodeScanner>;
