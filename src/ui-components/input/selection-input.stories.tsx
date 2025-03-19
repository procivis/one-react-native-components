import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import SelectionInput, { SelectionInputProps } from './selection-input';

const Render = ({ ...args }: SelectionInputProps) => {
  const [selectedValue, setSelectedValue] = useState<string>();
  return (
    <SelectionInput
      {...args}
      selectedValue={selectedValue}
      onChange={(choice) => {
        setSelectedValue(choice.label);
        return false;
      }}
    />
  );
};

const Basic: StoryObj<typeof SelectionInput> = {
  args: {
    label: 'Label',
    values: [
      { label: 'Item1', value: 1 },
      { label: 'Item2', value: 2 },
      { label: 'Item3', value: 3, shortLabel: 'I3' },
    ],
    pickerTitle: 'Picker Title',
    pickerConfirmLabel: 'Select',
    pickerCancelLabel: 'Cancel',
    disabled: false,
    error: '',
    style: { margin: 24 },
  },
  render: Render,
};

export { Basic as SelectionInput };

export default {
  title: 'base/input/Selection Input',
  component: SelectionInput,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=4%3A127&t=if2gUkBSc85H9hWC-4',
    },
  },
} as Meta<typeof SelectionInput>;
