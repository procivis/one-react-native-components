import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { theme } from '../theme';
import BackButton, { BackButtonIcon } from './back-button';

const Basic: ComponentStory<typeof BackButton> = (args) => <BackButton {...args} />;

Basic.args = {
  type: 'default',
  icon: BackButtonIcon.Back,
  style: { margin: theme.padding },
};

export { Basic as BackButton };

export default {
  title: 'base/button/Back Button',
  component: BackButton,
  argTypes: {
    type: {
      options: ['white', 'default'],
      control: { type: 'radio' },
    },
    icon: {
      options: [BackButtonIcon.Back, BackButtonIcon.Close],
      control: { type: 'radio' },
    },
    onPress: { action: 'onPress' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/S3WwgTMHuqxAsfu5zElCzq/App-Icon-Library-(Design)?node-id=22%3A6&t=7Ztkis8OuBv3jUSS-4',
    },
  },
} as ComponentMeta<typeof BackButton>;
