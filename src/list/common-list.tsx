import React from 'react';
import type { SectionListProps } from 'react-native';

import type { ListItemProps } from './list-item';
import ListSectionHeader, { ListSectionHeaderProps } from './list-section-header';
import WrappedListItem from './wrapped-list-item';

export type ListSectionProps = ListSectionHeaderProps & {
  index: number;
};

export const renderListSectionHeader: SectionListProps<ListItemProps, ListSectionProps>['renderSectionHeader'] = (
  info,
) => {
  return info.section.title ? (
    <ListSectionHeader title={info.section.title} titleStyle={info.section.titleStyle} />
  ) : null;
};

export const renderListItem = (onItemSelected?: (item: ListItemProps, section: number, index: number) => void) => {
  const render: SectionListProps<ListItemProps, ListSectionProps>['renderItem'] = (info) => {
    return (
      <WrappedListItem
        onSectionItemSelected={onItemSelected}
        section={info.section.index}
        index={info.index}
        {...info.item}
      />
    );
  };
  return render;
};
