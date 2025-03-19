import type { Meta, StoryObj } from '@storybook/react';
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

const Render = ({ withBackButton, withRightButton, ...args }: Args) => {
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

const Basic: StoryObj<Args> = {
  args: {
    title: 'Title',
    modalHandleVisible: false,
    withBackButton: true,
    withRightButton: true,
  },
  render: Render,
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
} as Meta<typeof NavigationHeader>;

const styles = StyleSheet.create({
  rightButton: {
    height: 24,
    width: 24,
  },
});
