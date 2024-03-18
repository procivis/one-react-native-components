import type { ComponentMeta, Story } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Placeholder } from '../../storybook/placeholder';
import TabFeatureScreen, { TabFeatureScreenProps, TabFeatureScreenTab } from './tab-feature-screen';

interface Args extends Omit<TabFeatureScreenProps, 'selectedTab' | 'onSelected' | 'tabs'> {
  numTabs: number;
}

const Basic: Story<Args> = ({ numTabs = 0, ...args }) => {
  const tabs = useMemo(
    () =>
      Array.from({ length: numTabs }).map<TabFeatureScreenTab>((_, index) => ({
        key: index + 1,
        label: `Tab ${index + 1}`,
        content: () => <Placeholder id={`Content ${index + 1}`} style={styles.content} />,
      })),
    [numTabs],
  );

  const [selectedTab, setSelectedTab] = useState<React.Key>(1);
  return (
    <TabFeatureScreen
      tabs={tabs}
      selectedTab={selectedTab}
      onSelected={setSelectedTab}
      ListEmptyComponent={() => <Placeholder id="List Empty" style={styles.content} />}
      {...args}
    />
  );
};

Basic.args = {
  title: 'Title',
  numTabs: 2,
};

export { Basic as TabFeatureScreen };

export default {
  title: 'view/Tab Feature Screen',
  component: TabFeatureScreen,
  parameters: {
    noSafeArea: true,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=172-15542&t=FbF9TvlM1MM9y1gR-4',
    },
  },
} as ComponentMeta<typeof TabFeatureScreen>;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
