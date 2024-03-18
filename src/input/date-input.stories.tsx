import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import DateInput from './date-input';

const Basic: ComponentStory<typeof DateInput> = ({ value, ...args }) => {
  const [val, setValue] = useState<Date | undefined>(value);
  return (
    <DateInput
      {...args}
      value={val}
      onChange={(date) => {
        setValue(date);
        return false;
      }}
    />
  );
};

Basic.args = {
  label: 'Label',
  pickerTitle: 'Picker Title',
  pickerConfirmLabel: 'Select',
  pickerCancelLabel: 'Cancel',
  disabled: false,
  error: '',
  style: { margin: 24 },
};

export { Basic as DateInput };

export default {
  title: 'base/input/Date Input',
  component: DateInput,
  argTypes: {
    value: { control: 'date' },
    maximumDate: { control: 'date' },
    minimumDate: { control: 'date' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=4%3A127&t=if2gUkBSc85H9hWC-4',
    },
  },
} as ComponentMeta<typeof DateInput>;
