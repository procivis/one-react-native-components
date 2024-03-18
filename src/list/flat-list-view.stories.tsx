import type { ComponentMeta, Story } from '@storybook/react';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import profileImage from '../../storybook/assets/profile-image.png';
import { Placeholder } from '../../storybook/placeholder';
import type { ImageOrComponentSource } from '../image';
import FlatListView, { FlatListViewProps } from './flat-list-view';
import type { ListItemProps } from './list-item';

const styles = StyleSheet.create({
  icon: {
    height: 64,
    width: 64,
  },
});

const iconPlaceholder: ImageOrComponentSource = {
  component: <Placeholder id="Empty" style={styles.icon} />,
};

const Basic: Story<Omit<FlatListViewProps, 'items' | 'emptyListIcon'> & { numItems: number; emptyIcon: boolean }> = ({
  numItems = 0,
  emptyIcon,
  ...args
}) => {
  const items = useMemo<ListItemProps[]>(
    () =>
      Array.from({ length: numItems }).map((_, index) => ({
        title: `Title ${index + 1}`,
        subtitle: `Subtitle ${index + 1}`,
        icon: { imageSource: profileImage },
      })),
    [numItems],
  );
  return <FlatListView {...args} items={items} emptyListIcon={emptyIcon ? iconPlaceholder : undefined} />;
};

Basic.args = {
  numItems: 3,
  title: 'Title',
  emptyIcon: false,
  emptyListTitle: 'EmptyListTitle',
  emptyListSubtitle: 'EmptyListSubtitle',
};

export { Basic as FlatListView };

export default {
  title: 'component/card-list/Flat List View',
  component: FlatListView,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=35%3A9695&t=if2gUkBSc85H9hWC-4',
    },
  },
} as ComponentMeta<typeof FlatListView>;
