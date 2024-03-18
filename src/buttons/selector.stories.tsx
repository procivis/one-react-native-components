import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { theme } from '../theme';
import Selector, { SelectorStatus } from './selector';

const Basic: ComponentStory<typeof Selector> = (args) => <Selector {...args} />;
Basic.args = {
  status: SelectorStatus.SelectedCheck,
  style: { margin: theme.padding },
};

export { Basic as Selector };

export default {
  title: 'icon/action/Selector',
  component: Selector,
  argTypes: {
    status: {
      options: [
        SelectorStatus.Unselected,
        SelectorStatus.SelectedRadio,
        SelectorStatus.SelectedCheck,
        SelectorStatus.LockedSelected,
        SelectorStatus.Disabled,
        SelectorStatus.LockedInvalid,
        SelectorStatus.Invalid,
      ],
      control: { type: 'radio' },
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/S3WwgTMHuqxAsfu5zElCzq/App-Icon-Library-(Design)?node-id=9%3A9',
    },
  },
} as ComponentMeta<typeof Selector>;
