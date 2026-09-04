import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { fn } from 'storybook/test';

import RadioGroup, { RadioGroupProps } from './radio-group';

const Render = ({ ...args }: RadioGroupProps) => {
  const [selectedItem, setSelectedItem] = useState<React.Key>();
  return <RadioGroup {...args} onSelected={({ key }) => setSelectedItem(key)} selectedItem={selectedItem} />;
};

const Basic: StoryObj<typeof RadioGroup> = {
  args: {
    items: [
      { key: 1, label: 'Item1' },
      { key: 2, label: 'Item2' },
      { key: 3, label: 'Item3' },
    ],
     
    onGetItemAccessibilityLabel: fn(),
    style: { margin: 24 },
  },
  render: Render,
};

export { Basic as RadioGroup };

export default {
  component: RadioGroup,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=8-614',
    },
  },
  title: 'base/input/Radio Group',
} as Meta<typeof RadioGroup>;
