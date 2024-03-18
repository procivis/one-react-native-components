import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { theme } from '../theme';
import Checkbox, { CheckboxAlignment } from './checkbox';

const Basic: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args} />;
Basic.args = {
  alignment: CheckboxAlignment.top,
  text: 'Example text\non multiple\nlines',
  value: true,
  disabled: false,
  style: { margin: theme.padding },
};

export { Basic as Checkbox };

export default {
  title: 'base/input/Checkbox',
  component: Checkbox,
  argTypes: {
    alignment: {
      options: [CheckboxAlignment.top, CheckboxAlignment.centered],
      control: { type: 'radio' },
    },
    onValueChanged: { action: 'onValueChanged' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=34%3A2266&t=h6IOH7IquQkteXya-4',
    },
  },
} as ComponentMeta<typeof Checkbox>;
