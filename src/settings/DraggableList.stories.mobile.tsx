import type { ComponentMeta, Story } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Placeholder } from '../../storybook/placeholder';
import DraggableList, { DraggableListItemProps } from './DraggableList';

const styles = StyleSheet.create({
  iconPlaceholder: {
    height: '100%',
    width: '100%',
  },
});

interface Props {
  numItems: number;
}

const Basic: Story<Props> = ({ numItems }) => {
  const [data, setData] = useState<DraggableListItemProps[]>([]);
  useEffect(() => {
    setData(
      Array.from({ length: numItems }).map((_, key) => ({
        key,
        title: `Title${key}`,
        icon: {
          component: <Placeholder id={`Ico${key}`} style={styles.iconPlaceholder} />,
        },
      })),
    );
  }, [numItems]);
  return <DraggableList items={data} onOrderChange={setData} />;
};

Basic.args = {
  numItems: 3,
};

export { Basic as DraggableList };

export default {
  title: 'view/settings/Draggable List',
  component: DraggableList,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=188%3A9011&t=fRc40JZF3xJhNtiN-4',
    },
  },
} as ComponentMeta<typeof DraggableList>;
