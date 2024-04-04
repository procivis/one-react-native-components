import type { ComponentMeta, Story } from '@storybook/react';
import React from 'react';

import { EntityTrustedIcon } from '../icons/entity';
import Avatar, { AvatarProps } from './avatar';

type Args = AvatarProps & {
  withStatusIcon: boolean;
  withImage: boolean;
};

const Basic: Story<Args> = ({ withStatusIcon, withImage, ...args }) => {
  return (
    <Avatar
      {...args}
      avatar={withImage ? { imageSource: { uri: 'https://i.pravatar.cc/72' } } : undefined}
      statusIcon={withStatusIcon ? EntityTrustedIcon : undefined}
    />
  );
};

Basic.args = {
  placeholderText: 'A',
  withStatusIcon: true,
  withImage: true,
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
} as ComponentMeta<typeof Avatar>;
