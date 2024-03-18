import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useCallback, useState } from 'react';

import Input, { InputAccessory } from './text-input';

const Basic: ComponentStory<typeof Input> = ({ value, accessory, onAccessoryPress, ...args }) => {
  const [val, setValue] = useState(value);
  const accessoryPress = useCallback(() => {
    if (accessory === InputAccessory.Clear) {
      setValue('');
    }
    onAccessoryPress?.();
  }, [accessory, onAccessoryPress]);
  return (
    <Input value={val} accessory={accessory} onChangeText={setValue} onAccessoryPress={accessoryPress} {...args} />
  );
};

Basic.args = {
  label: 'Label',
  value: 'Text',
  accessory: InputAccessory.Clear,
  accessoryAccessibilityLabel: 'clear',
  disabled: false,
  error: '',
  placeholder: '',
  returnKeyType: 'next',
  style: { margin: 24 },
};

export { Basic as Input };

export default {
  title: 'base/input/Input',
  component: Input,
  argTypes: {
    accessory: {
      options: [InputAccessory.Clear, InputAccessory.Dropdown],
      control: { type: 'radio' },
    },
    returnKeyType: {
      options: ['done', 'go', 'next', 'search', 'send'],
      control: { type: 'select' },
    },
    onAccessoryPress: { action: 'onAccessoryPress' },
    onSubmit: { action: 'onSubmit' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=3%3A824&t=r7HhHF1rsNLmOBL2-4',
    },
  },
} as ComponentMeta<typeof Input>;
