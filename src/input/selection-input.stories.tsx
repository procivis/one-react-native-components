import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import SelectionInput from './selection-input';

const Basic: ComponentStory<typeof SelectionInput> = ({ ...args }) => {
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

Basic.args = {
  label: 'Label',
  values: [{ label: 'Item1' }, { label: 'Item2' }, { label: 'Item3', shortLabel: 'I3' }],
  pickerTitle: 'Picker Title',
  pickerConfirmLabel: 'Select',
  pickerCancelLabel: 'Cancel',
  disabled: false,
  error: '',
  style: { margin: 24 },
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
} as ComponentMeta<typeof SelectionInput>;
