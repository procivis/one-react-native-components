import type { Meta,StoryObj } from '@storybook/react';
import React from 'react';

import ImagePreviewScreen, { ImagePreviewScreenProps } from './image-preview-screen';

const profileImage = require('../../../storybook/assets/ProfileImage.png');

const Render = ({ ...args }: ImagePreviewScreenProps) => {
  return <ImagePreviewScreen {...args} image={profileImage} />;
};

const Basic: StoryObj<typeof ImagePreviewScreen> = {
  args: {
    title: 'Title',
  },
  render: Render,
};

export { Basic as ImagePreviewScreen };

export default {
  title: 'screen/Image Preview Screen',
  component: ImagePreviewScreen,
  parameters: {
    noSafeArea: true,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=493-79444&m=dev',
    },
  },
} as Meta<typeof ImagePreviewScreen>;
