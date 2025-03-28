import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import RadioGroup, { RadioGroupProps } from './radio-group';

const Render = ({ ...args }: RadioGroupProps) => {
  const [selectedItem, setSelectedItem] = useState<React.Key>();
  return <RadioGroup {...args} selectedItem={selectedItem} onSelected={({ key }) => setSelectedItem(key)} />;
};

const Basic: StoryObj<typeof RadioGroup> = {
  args: {
    items: [
      { label: 'Item1', key: 1 },
      { label: 'Item2', key: 2 },
      { label: 'Item3', key: 3 },
    ],
    style: { margin: 24 },
  },
  render: Render,
};

export { Basic as RadioGroup };

export default {
  title: 'base/input/Radio Group',
  component: RadioGroup,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=8-614',
    },
  },
} as Meta<typeof RadioGroup>;
