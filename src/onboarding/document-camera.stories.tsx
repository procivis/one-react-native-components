import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import DocumentCamera from './document-camera';

const Basic: ComponentStory<typeof DocumentCamera> = (args) => {
  return <DocumentCamera {...args} />;
};

Basic.args = {
  title: 'Title',
  androidCameraPermissionOptions: {
    title: 'Permission to use camera',
    message: 'We need your permission to use your camera',
  },
};

export { Basic as DocumentCamera };

export default {
  title: 'view/camera/Document Camera',
  component: DocumentCamera,
  parameters: {
    noSafeArea: true,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=1010-10251&t=k7pvr7Ck2z6bju8b-4',
    },
  },
  argTypes: {
    onPictureCaptured: { action: 'onPictureCaptured' },
  },
} as ComponentMeta<typeof DocumentCamera>;
