import type { ComponentMeta, Story } from '@storybook/react';
import React from 'react';

import SearchAndFiltersHeader, { SearchAndFiltersHeaderProps } from './search-filters-header';

const Basic: Story<
  Pick<SearchAndFiltersHeaderProps, 'placeholder' | 'filterEnabled'> & { filtersButtonVisible: boolean }
> = ({ filtersButtonVisible, ...args }) => {
  return (
    <SearchAndFiltersHeader
      onOpenFilters={filtersButtonVisible ? () => {} : undefined}
      onSearchPhraseChange={() => {}}
      {...args}
    />
  );
};

Basic.args = {
  placeholder: 'Search',
  filterEnabled: false,
  filtersButtonVisible: true,
};

export { Basic as SearchAndFiltersHeader };

export default {
  title: 'component/card-list/Search And Filters Header',
  component: SearchAndFiltersHeader,
} as ComponentMeta<typeof SearchAndFiltersHeader>;
