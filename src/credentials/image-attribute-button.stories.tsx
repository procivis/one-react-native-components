import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import ImageAttributeButton from './image-attribute-button';

const Basic: ComponentStory<typeof ImageAttributeButton> = (args) => <ImageAttributeButton {...args} />;
Basic.args = {
  title: 'View image',
};

export { Basic as ImageAttributeButton };

export default {
  title: 'base/button/Image Attribute Button',
  component: ImageAttributeButton,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/aIHcwVfjAur4Vptsh4cjKt/Procivis-Wallet-%E2%80%93-Design?node-id=2647%3A525887',
    },
  },
} as ComponentMeta<typeof ImageAttributeButton>;
