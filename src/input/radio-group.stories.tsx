import type { ComponentMeta, Story } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import RadioGroup, { RadioGroupItem } from './radio-group';

interface Props {
  title: string;
  numItems: number;
  multiselect?: boolean;
  staticContent?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Basic: Story<Props> = ({ numItems, ...args }) => {
  const [selectedItems, setSelectedItems] = useState<React.Key[]>([0]);
  const [items, setItems] = useState<RadioGroupItem[]>([]);
  useEffect(() => {
    setItems(
      Array.from({ length: numItems }).map((_, index) => ({
        key: index,
        label: `Item ${index + 1}`,
      })),
    );
  }, [numItems]);

  return (
    <RadioGroup
      {...args}
      items={items}
      selectedItems={selectedItems}
      onSelected={(choice) =>
        setSelectedItems((old) => {
          if (args.multiselect) {
            return [...old, choice.key];
          }
          return [choice.key];
        })
      }
      onDeselected={(choice) =>
        setSelectedItems((old) => {
          if (args.multiselect) {
            return old.filter((value) => value !== choice.key);
          }
          return [choice.key];
        })
      }
    />
  );
};

Basic.args = {
  title: 'Title',
  numItems: 3,
  multiselect: false,
  staticContent: true,
  style: { margin: 24 },
};

export { Basic as RadioGroup };

export default {
  title: 'base/input/Radio Group',
  component: RadioGroup,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=8%3A614&t=xcd1oJ8QZp46EeIJ-4',
    },
  },
} as ComponentMeta<typeof RadioGroup>;
