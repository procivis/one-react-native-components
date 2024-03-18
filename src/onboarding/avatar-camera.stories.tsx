import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import AvatarCamera from './avatar-camera';

const Basic: ComponentStory<typeof AvatarCamera> = (args) => {
  return <AvatarCamera {...args} />;
};

Basic.args = {
  title: 'Title',
  androidCameraPermissionOptions: {
    title: 'Permission to use camera',
    message: 'We need your permission to use your camera',
  },
};

export { Basic as AvatarCamera };

export default {
  title: 'view/camera/Avatar Camera',
  component: AvatarCamera,
  parameters: {
    noSafeArea: true,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=37%3A4406&t=if2gUkBSc85H9hWC-4',
    },
  },
  argTypes: {
    onPictureCaptured: { action: 'onPictureCaptured' },
  },
} as ComponentMeta<typeof AvatarCamera>;
