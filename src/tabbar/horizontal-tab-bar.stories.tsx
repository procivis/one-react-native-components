import type { ComponentMeta, Story } from '@storybook/react';
import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import HorizontalTabBar, { HorizontalTabBarProps, HorizontalTabBarTab } from './horizontal-tab-bar';

type Args = Omit<HorizontalTabBarProps, 'values' | 'onSelected' | 'selectedKey'> & {
  tabs: Array<{ label: string; badge?: number }>;
};

const Basic: Story<Args> = ({ tabs, ...args }) => {
  const [selectedKey, setSelectedKey] = useState<React.Key>(1);
  const onSelected = useCallback((key: React.Key) => setSelectedKey(key), []);
  const values = useMemo(
    () =>
      tabs.map<HorizontalTabBarTab>(({ label, badge }, index) => ({
        key: index + 1,
        label,
        badge,
      })),
    [tabs],
  );
  return (
    <View>
      <HorizontalTabBar {...args} values={values} selectedKey={selectedKey} onSelected={onSelected} />
    </View>
  );
};

Basic.args = {
  tabs: [
    { label: 'A' },
    { label: 'B longer', badge: 22 },
    { label: 'C very very very long', badge: 1 },
    { label: 'D' },
    { label: 'E' },
  ],
};

export { Basic as HorizontalTabBar };

export default {
  title: 'base/tab/Horizontal Tab Bar',
  component: HorizontalTabBar,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=22-1235&t=Z18L89ievIUQrZCI-4',
    },
  },
} as ComponentMeta<typeof HorizontalTabBar>;
