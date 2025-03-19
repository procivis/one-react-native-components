import type { Meta,StoryObj } from '@storybook/react';
import React, { useEffect, useState } from 'react';

import { Switch, SwitchProps } from './switch';

const Render = ({ value, ...args }: SwitchProps) => {
  const [val, setVal] = useState(value);
  useEffect(() => setVal(value), [value]);
  return <Switch {...args} value={val} onChange={setVal} />;
};

const Basic: StoryObj<typeof Switch> = {
  args: {
    value: true,
    disabled: false,
    style: { margin: 24 },
  },
  render: Render,
};

export { Basic as Switch };

export default {
  title: 'base/control/Switch',
  component: Switch,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=8%3A744&t=xeivYJN0RLNSObzn-4',
    },
  },
} as Meta<typeof Switch>;
