import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import ImagePreviewScreen from './image-preview-screen';

const profileImage = require('../../storybook/assets/profile-image.png');

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
      url: 'https://www.figma.com/file/aIHcwVfjAur4Vptsh4cjKt/Procivis-Wallet-%E2%80%93-Design?node-id=2663%3A528072&t=twEwMBkCQ1cTDihN-4',
    },
  },
} as ComponentMeta<typeof ImagePreviewScreen>;
