import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Pagination from './pagination';

const Basic: ComponentStory<typeof Pagination> = (args) => {
  return <Pagination {...args} />;
};

Basic.args = {
  currentPage: 0,
  totalPages: 4,
  style: { margin: 24 },
};

export { Basic as Pagination };

export default {
  title: 'base/Pagination',
  component: Pagination,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=33%3A2694&t=tlt31POsy24BTOgJ-4',
    },
  },
} as ComponentMeta<typeof Pagination>;
