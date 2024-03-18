import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { LanguageIcon } from '../../storybook/assets/LanguageIcon';
import { theme } from '../theme';
import HistoryItem from './HistoryItem';

const Basic: ComponentStory<typeof HistoryItem> = (args) => (
  <HistoryItem {...args} icon={<LanguageIcon width={48} height={48} />} />
);

Basic.args = {
  title: 'Car Rental Demo',
  details: 'Connected 10.10.2022, 12:35',
  containerStyles: { paddingHorizontal: theme.padding },
};

export { Basic as HistoryItem };

export default {
  title: 'feature/history/History Item',
  component: HistoryItem,
  argTypes: {
    onPress: { action: 'onPress' },
    icon: {
      description: 'History icon',
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/baolhE7fB2BMdCN5RVjusX/App-Feature-Library?node-id=799%3A33091&t=4rEYLRFcPw4dJ3GW-4',
    },
  },
} as ComponentMeta<typeof HistoryItem>;
