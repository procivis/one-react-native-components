import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useState } from 'react';

import { Switch, SwitchProps } from './switch';

const Render = ({ value, ...args }: SwitchProps) => {
  const [val, setVal] = useState(value);
  useEffect(() => setVal(value), [value]);
  return <Switch {...args} onChange={setVal} value={val} />;
};

const Basic: StoryObj<typeof Switch> = {
  args: {
    disabled: false,
    style: { margin: 24 },
    value: true,
  },
  render: Render,
};

export { Basic as Switch };

export default {
  component: Switch,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=8%3A744&t=xeivYJN0RLNSObzn-4',
    },
  },
  title: 'base/control/Switch',
} as Meta<typeof Switch>;
