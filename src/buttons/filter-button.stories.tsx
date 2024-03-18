import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import FilterButton from './filter-button';

const Basic: ComponentStory<typeof FilterButton> = (args) => {
  return <FilterButton {...args} />;
};

Basic.args = {};

export { Basic as FilterButton };

export default {
  title: 'base/button/Filter Button',
  component: FilterButton,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  parameters: {
    noSafeArea: true,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?type=design&node-id=2147-7808&mode=design&t=FxjLEVOjqp9aQTlP-4',
    },
  },
} as ComponentMeta<typeof FilterButton>;
