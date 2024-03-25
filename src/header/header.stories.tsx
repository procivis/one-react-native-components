import type { ComponentMeta, Story } from '@storybook/react';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Placeholder } from '../../storybook/placeholder';
import { TouchableOpacity } from '../accessibility';
import Header, { HeaderProps } from './header';

type Args = HeaderProps & {
  withBackButton: boolean;
  withRightButton: boolean;
};

const Basic: Story<Args> = ({ onBack, withBackButton, withRightButton, ...args }) => {
  return (
    <Header
      {...args}
      onBack={withBackButton ? onBack : undefined}
      rightButton={
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
  withBackButton: false,
  withRightButton: true,
};

export { Basic as Header };

export default {
  title: 'component/header/Header',
  component: Header,
  argTypes: {
    onAction: { action: 'onAction' },
    onBack: { action: 'onBack' },
    onSearchPhraseChange: { action: 'onSearchPhraseChange' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=425-18624&t=KAAJ0oKY3xb6VNtA-4',
    },
  },
} as ComponentMeta<typeof Header>;

const styles = StyleSheet.create({
  rightButton: {
    height: 24,
    width: 24,
  },
});
