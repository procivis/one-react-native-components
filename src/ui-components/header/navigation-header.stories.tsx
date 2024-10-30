import type { ComponentMeta, Story } from '@storybook/react';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Placeholder } from '../../../storybook/placeholder';
import { TouchableOpacity } from '../accessibility';
import { BackButton } from '../buttons';
import NavigationHeader, { NavigationHeaderProps } from './navigation-header';

type Args = NavigationHeaderProps & {
  withBackButton: boolean;
  withRightButton: boolean;
};

const Basic: Story<Args> = ({ withBackButton, withRightButton, ...args }) => {
  return (
    <NavigationHeader
      {...args}
      leftItem={withBackButton ? BackButton : undefined}
      rightItem={
        withRightButton ? (
          <TouchableOpacity>
            <Placeholder id="R" style={styles.rightButton} />
          </TouchableOpacity>
        ) : undefined
      }
    />
  );
};

Basic.args = {
  title: 'Title',
  modalHandleVisible: false,
  withBackButton: true,
  withRightButton: true,
};

export { Basic as NavigationHeader };

export default {
  title: 'component/header/NavigationHeader',
  component: NavigationHeader,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=425-18624&mode=design&t=29eTMhPYwNIK3rK3-0',
    },
  },
} as ComponentMeta<typeof NavigationHeader>;

const styles = StyleSheet.create({
  rightButton: {
    height: 24,
    width: 24,
  },
});
