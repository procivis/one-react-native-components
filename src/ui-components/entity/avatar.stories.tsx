import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { EntityTrustedIcon } from '../icons/entity';
import Avatar, { AvatarProps } from './avatar';

type Args = AvatarProps & {
  withStatusIcon: boolean;
  withImage: boolean;
};

const Render = ({ withStatusIcon, withImage, ...args }: Args) => {
  return (
    <Avatar
      {...args}
      avatar={withImage ? { imageSource: { uri: 'https://i.pravatar.cc/72' } } : undefined}
      statusIcon={withStatusIcon ? EntityTrustedIcon : undefined}
    />
  );
};

const Basic: StoryObj<Args> = {
  args: {
    placeholderText: 'A',
    withStatusIcon: true,
    withImage: true,
  },
  render: Render,
};

export { Basic as Avatar };

export default {
  title: 'component/entity/Avatar',
  component: Avatar,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=426-25581&mode=design&t=YI1oD2BfBie5HcvJ-0',
    },
  },
} as Meta<typeof Avatar>;
