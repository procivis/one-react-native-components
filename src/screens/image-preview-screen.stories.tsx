import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import ImagePreviewScreen from './image-preview-screen';

const profileImage = require('../../storybook/assets/ProfileImage.png');

const Basic: ComponentStory<typeof ImagePreviewScreen> = ({ ...args }) => {
  return <ImagePreviewScreen {...args} image={profileImage} />;
};

Basic.args = {
  title: 'Title',
};

export { Basic as ImagePreviewScreen };

export default {
  title: 'feature/Image Preview Screen',
  component: ImagePreviewScreen,
  parameters: {
    noSafeArea: true,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=493-79444&m=dev',
    },
  },
} as ComponentMeta<typeof ImagePreviewScreen>;
