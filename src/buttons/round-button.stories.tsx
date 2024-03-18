import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ClearIcon } from '../icon/icon';
import { theme } from '../theme';
import RoundButton from './round-button';

const Basic: ComponentStory<typeof RoundButton> = (args) => <RoundButton {...args} />;

Basic.args = {
  type: 'default',
  icon: ClearIcon,
  style: { margin: theme.padding },
};

export { Basic as RoundButton };

export default {
  title: 'base/button/Round Button',
  component: RoundButton,
  argTypes: {
    type: {
      options: ['white', 'default'],
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
} as ComponentMeta<typeof RoundButton>;
