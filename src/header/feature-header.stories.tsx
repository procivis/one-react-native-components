import type { ComponentMeta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Placeholder } from '../../storybook/placeholder';
import { TouchableOpacity } from '../accessibility';
import { HorizontalTabBar } from '../tabbar';
import FeatureHeader, { FeatureHeaderProps } from './feature-header';

interface Args extends FeatureHeaderProps {
  withRightButton?: boolean;
  withTabs?: boolean;
}

const Basic: Story<Args> = ({ withRightButton, withTabs, ...args }) => {
  const [selectedTab, setSelectedTab] = useState<React.Key>(1);
  return (
    <FeatureHeader
      {...args}
      rightButton={
        withRightButton ? (
          <TouchableOpacity>
            <Placeholder id="R" style={styles.rightButton} />
          </TouchableOpacity>
        ) : undefined
      }>
      {withTabs ? (
        <HorizontalTabBar
          values={[
            {
              key: 1,
              label: 'Tab 1',
            },
            {
              key: 2,
              label: 'Tab 2',
            },
          ]}
          selectedKey={selectedTab}
          onSelected={setSelectedTab}
        />
      ) : null}
    </FeatureHeader>
  );
};

Basic.args = {
  title: 'Title',
  withRightButton: false,
  withTabs: false,
};

export { Basic as FeatureHeader };

export default {
  title: 'component/header/Feature Header',
  component: FeatureHeader,
  argTypes: {
    onBack: { action: 'onBack' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=9-1783&t=HqvTPGjK9LbFbzBW-4',
    },
  },
} as ComponentMeta<typeof FeatureHeader>;

const styles = StyleSheet.create({
  rightButton: {
    height: 24,
    width: 24,
  },
});
