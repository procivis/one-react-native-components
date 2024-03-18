import type { ComponentMeta, Story } from '@storybook/react';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Placeholder } from '../../storybook/placeholder';
import { theme } from '../theme';
import HorizontalTabSwitch, { HorizontalTabSwitchProps, HorizontalTabSwitchTab } from './horizontal-tab-switch';

type Args = Omit<HorizontalTabSwitchProps, 'values' | 'onSelected' | 'selectedKey'> & { tabs: string[] };

const Basic: Story<Args> = (args) => {
  const [selectedKey, setSelectedKey] = useState<React.Key>(1);
  const onSelected = useCallback((key: React.Key) => setSelectedKey(key), []);
  const values = args.tabs.map<HorizontalTabSwitchTab>((label, index) => ({
    key: index + 1,
    label,
    iconComponent: () => <Placeholder id={String(index + 1)} style={styles.iconPlaceholder} />,
    accessibilityValue: { text: `${index + 1} of ${args.tabs.length}` },
  }));
  return (
    <View style={styles.wrapper}>
      <HorizontalTabSwitch {...args} values={values} selectedKey={selectedKey} onSelected={onSelected} />
    </View>
  );
};

Basic.args = {
  tabs: ['A', 'B-longer', 'C'],
  style: { margin: theme.paddingM },
};

export { Basic as HorizontalTabSwitch };

export default {
  title: 'base/tab/Horizontal Tab Switch',
  component: HorizontalTabSwitch,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=22%3A1527&t=TEBDGdEv632ktThZ-4',
    },
  },
} as ComponentMeta<typeof HorizontalTabSwitch>;

const styles = StyleSheet.create({
  iconPlaceholder: {
    height: '100%',
    width: '100%',
  },
  wrapper: {
    alignItems: 'flex-start',
    flex: 1,
  },
});
