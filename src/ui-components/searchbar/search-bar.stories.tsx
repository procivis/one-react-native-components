import type { ComponentMeta, Story } from '@storybook/react';
import React, { useState } from 'react';

import SearchBar, { SearchBarProps } from './search-bar';

const Basic: Story<Omit<SearchBarProps, 'searchPhrase' | 'onSearchPhraseChange'>> = (args) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  return <SearchBar {...args} searchPhrase={searchPhrase} onSearchPhraseChange={setSearchPhrase} />;
};

Basic.args = {
  placeholder: 'Search',
  style: { margin: 24 },
};

export { Basic as SearchBar };

export default {
  title: 'base/input/Search Bar',
  component: SearchBar,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=1143-40433&t=KAAJ0oKY3xb6VNtA-4',
    },
  },
  argTypes: {
    searchPhrase: { control: { type: null } },
    onSearchPhraseChange: { control: { type: null } },
  },
} as ComponentMeta<typeof SearchBar>;
