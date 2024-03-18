import type { ComponentMeta, Story } from '@storybook/react';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { Placeholder } from '../../storybook/placeholder';
import { TouchableOpacity } from '../accessibility';
import Header, { HeaderProps } from './header';

type Args = Omit<HeaderProps, 'rightButton' | 'actionButtons'> & {
  numActions?: number;
  withBackButton?: boolean;
  withRightButton?: boolean;
  onAction: (index: number) => void;
};

const Basic: Story<Args> = ({ numActions = 0, withBackButton, withRightButton, onAction, onBack, ...args }) => {
  const additionalButtons = useMemo(
    () =>
      withRightButton
        ? {
            rightButton: (
              <TouchableOpacity>
                <Placeholder id="R" style={styles.rightButton} />
              </TouchableOpacity>
            ),
          }
        : {
            actionButtons: Array.from({ length: numActions }).map((_, index) => ({
              key: String(index),
              onPress: () => onAction(index + 1),
              content: () => <Placeholder id={String(index + 1)} style={styles.actionPlaceholder} />,
            })),
          },
    [numActions, onAction, withRightButton],
  );

  return <Header {...args} onBack={withBackButton ? onBack : undefined} {...additionalButtons} />;
};

Basic.args = {
  title: 'Title',
  description: 'description',
  withBackButton: false,
  withRightButton: false,
  numActions: 0,
};

export { Basic as Header };

export default {
  title: 'component/header/Header',
  component: Header,
  argTypes: {
    onBack: { action: 'onBack' },
    onAction: { action: 'onAction' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=9%3A1677',
    },
  },
} as ComponentMeta<typeof Header>;

const styles = StyleSheet.create({
  actionPlaceholder: {
    height: '100%',
    width: '100%',
  },
  rightButton: {
    height: 24,
    width: 24,
  },
});
