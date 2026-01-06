import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import SearchBar, { SearchBarProps } from './search-bar';

const Render = (args: Omit<SearchBarProps, 'searchPhrase' | 'onSearchPhraseChange'>) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  return <SearchBar {...args} searchPhrase={searchPhrase} onSearchPhraseChange={setSearchPhrase} />;
};

const Basic: StoryObj<Omit<SearchBarProps, 'searchPhrase' | 'onSearchPhraseChange'>> = {
  args: {
    placeholder: 'Search',
    style: { margin: 24 },
  },
  render: Render,
};

export { Basic as SearchBar };

export default {
  title: 'base/input/Search Bar',
  component: SearchBar,
  parameters: {
    controls: {
      exclude: ['searchPhrase', 'onSearchPhraseChange'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=1143-40433&t=KAAJ0oKY3xb6VNtA-4',
    },
  },
  argTypes: {
    searchPhrase: { control: { type: undefined, disable: true } },
    onSearchPhraseChange: { control: { type: undefined, disable: true } },
  },
} as Meta<typeof SearchBar>;
