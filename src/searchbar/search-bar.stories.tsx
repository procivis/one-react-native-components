import type { ComponentMeta, Story } from '@storybook/react';
import React, { useState } from 'react';

import { theme } from '../theme';
import SearchBar, { SearchBarProps } from './search-bar';

const Basic: Story<Omit<SearchBarProps, 'searchPhrase' | 'onSearchPhraseChange'>> = (args) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  return <SearchBar {...args} searchPhrase={searchPhrase} onSearchPhraseChange={setSearchPhrase} />;
};

Basic.args = {
  placeholder: 'Search',
  style: { margin: theme.paddingM },
};

export { Basic as SearchBar };

export default {
  title: 'base/input/Search Bar',
  component: SearchBar,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=446%3A9443&t=TEBDGdEv632ktThZ-4',
    },
  },
  argTypes: {
    searchPhrase: { control: { type: null } },
    onSearchPhraseChange: { control: { type: null } },
  },
} as ComponentMeta<typeof SearchBar>;
