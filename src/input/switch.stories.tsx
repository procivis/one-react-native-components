import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useEffect, useState } from 'react';

import Switch from './switch';

const Basic: ComponentStory<typeof Switch> = ({ value, ...args }) => {
  const [val, setVal] = useState(value);
  useEffect(() => setVal(value), [value]);
  return <Switch {...args} value={val} onChange={setVal} />;
};

Basic.args = {
  value: true,
  disabled: false,
  style: { margin: 24 },
};

export { Basic as Switch };

export default {
  title: 'base/input/Switch',
  component: Switch,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=8%3A744&t=xeivYJN0RLNSObzn-4',
    },
  },
} as ComponentMeta<typeof Switch>;
