import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { theme } from '../theme';
import { Pins } from './pins';

const Basic: ComponentStory<typeof Pins> = (args) => <Pins {...args} />;

Basic.args = {
  enteredLength: 1,
  maxLength: 6,
  style: { padding: theme.padding },
};

export { Basic as Pins };

export default {
  title: 'base/pin/Pins',
  component: Pins,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=44%3A3067&t=if2gUkBSc85H9hWC-4',
    },
  },
} as ComponentMeta<typeof Pins>;
