import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import * as profileImage from '../../../storybook/assets/ProfileImage.png';
import ImagePreviewScreen, {
  ImagePreviewScreenProps,
} from './image-preview-screen';

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
  component: ImagePreviewScreen,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=493-79444&m=dev',
    },
    noSafeArea: true,
  },
  title: 'screen/Image Preview Screen',
} as Meta<typeof ImagePreviewScreen>;
