import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import SelectionInput, { SelectionInputProps } from './selection-input';

const Render = ({ ...args }: SelectionInputProps) => {
  const [selectedValue, setSelectedValue] = useState<string>();
  return (
    <SelectionInput
      {...args}
      onChange={(choice) => {
        setSelectedValue(choice.label);
        return false;
      }}
      selectedValue={selectedValue}
    />
  );
};

const Basic: StoryObj<typeof SelectionInput> = {
  args: {
    disabled: false,
    error: '',
    label: 'Label',
    pickerCancelLabel: 'Cancel',
    pickerConfirmLabel: 'Select',
    pickerTitle: 'Picker Title',
    style: { margin: 24 },
    values: [
      { label: 'Item1', value: 1 },
      { label: 'Item2', value: 2 },
      { label: 'Item3', shortLabel: 'I3', value: 3 },
    ],
  },
  render: Render,
};

export { Basic as SelectionInput };

export default {
  component: SelectionInput,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=4%3A127&t=if2gUkBSc85H9hWC-4',
    },
  },
  title: 'base/input/Selection Input',
} as Meta<typeof SelectionInput>;
