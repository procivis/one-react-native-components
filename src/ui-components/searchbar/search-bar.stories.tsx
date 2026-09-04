import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import SearchBar, { SearchBarProps } from './search-bar';

const Render = (args: Omit<SearchBarProps, 'searchPhrase' | 'onSearchPhraseChange'>) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  return <SearchBar {...args} onSearchPhraseChange={setSearchPhrase} searchPhrase={searchPhrase} />;
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
  argTypes: {
    onSearchPhraseChange: { control: { disable: true, type: undefined } },
    searchPhrase: { control: { disable: true, type: undefined } },
  },
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
  title: 'base/input/Search Bar',
} as Meta<typeof SearchBar>;
