import type { ComponentMeta, Story } from '@storybook/react';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Placeholder } from '../../storybook/placeholder';
import type { ImageOrComponentSource } from '../image';
import ListItem, { ListItemProps } from './list-item';

const styles = StyleSheet.create({
  icon: {
    height: 48,
    width: 48,
  },
  rightAccessory: {
    height: 24,
    width: 24,
  },
});

const statusPlaceholder: ImageOrComponentSource = {
  component: <Placeholder id="s" />,
};

const iconPlaceholder: ImageOrComponentSource = {
  component: <Placeholder id="Icon" style={styles.icon} />,
};

type StoryProps = Omit<ListItemProps, 'icon' | 'status' | 'rightAccessory'> & {
  icon: boolean;
  status: string;
  badge: string;
  rightAccessory: boolean;
  leftPartPressable: boolean;
};

const Basic: Story<StoryProps> = ({ status, badge, icon, rightAccessory, leftPartPressable, ...args }) => {
  return (
    <ListItem
      {...args}
      status={status || badge ? { text: status, badge, icon: statusPlaceholder } : undefined}
      icon={icon ? iconPlaceholder : undefined}
      rightAccessory={rightAccessory ? <Placeholder id="R" style={styles.rightAccessory} /> : undefined}
      onPress={leftPartPressable ? () => null : undefined}
    />
  );
};

Basic.args = {
  title: 'Title',
  subtitle: 'Subtitle',
  status: 'Status',
  badge: 'Badge',
  icon: true,
  disabled: false,
  rightAccessory: true,
  leftPartPressable: false,
};

export { Basic as ListItem };

export default {
  title: 'base/List Item',
  component: ListItem,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=20%3A2142&t=vdx4ihqvavKjkcvb-4',
    },
  },
} as ComponentMeta<typeof ListItem>;
