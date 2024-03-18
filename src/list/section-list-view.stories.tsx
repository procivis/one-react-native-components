import type { ComponentMeta, Story } from '@storybook/react';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import profileImage from '../../storybook/assets/profile-image.png';
import { Placeholder } from '../../storybook/placeholder';
import type { ImageOrComponentSource } from '../image';
import type { EmptyListViewProps } from './empty-list';
import type { ListItemProps } from './list-item';
import SectionListView, { SectionListViewProps } from './section-list-view';

const styles = StyleSheet.create({
  icon: {
    height: 64,
    width: 64,
  },
});

const iconPlaceholder: ImageOrComponentSource = {
  component: <Placeholder id="Empty" style={styles.icon} />,
};

const Basic: Story<
  Omit<SectionListViewProps, 'items' | 'emptyListIcon'> & {
    numSections: number;
    numItems: number;
    emptyIcon: boolean;
    emptyListView: EmptyListViewProps;
  }
> = ({ numSections = 0, numItems = 0, emptyIcon, emptyListView, ...args }) => {
  const sections = useMemo<SectionListViewProps['sections']>(
    () =>
      Array.from({ length: numSections }).map((_, sectionIndex) => {
        const items: ListItemProps[] = Array.from({ length: numItems }).map((_, index) => ({
          title: `Title ${index + 1}`,
          subtitle: `Subtitle ${index + 1}`,
          icon: { imageSource: profileImage },
        }));
        return {
          data: items,
          title: `Section ${sectionIndex}`,
        };
      }),
    [numItems, numSections],
  );
  return (
    <SectionListView
      {...args}
      sections={sections}
      emptyListView={{ ...emptyListView, icon: emptyIcon ? iconPlaceholder : undefined }}
      onItemSelected={console.log}
      onEndReached={() => console.log('end reached')}
    />
  );
};

Basic.args = {
  numSections: 4,
  numItems: 6,
  emptyIcon: false,
  emptyListView: {
    title: 'EmptyListTitle',
    subtitle: 'EmptyListSubtitle',
  },
};

export { Basic as SectionListView };

export default {
  title: 'component/card-list/Section List View',
  component: SectionListView,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=35%3A9695&t=if2gUkBSc85H9hWC-4',
    },
  },
} as ComponentMeta<typeof SectionListView>;
