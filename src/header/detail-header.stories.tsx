import type { ComponentMeta, Story } from '@storybook/react';
import React from 'react';
import { Insets, StyleSheet } from 'react-native';

import { Placeholder } from '../../storybook/placeholder';
import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import { BackButtonIcon } from '../buttons/back-button';
import DetailHeader from './detail-header';

interface Args {
  title: string;
  backIcon?: BackButtonIcon;
  withRightButton?: boolean;
  onRightAction?: () => void;
  onBack: () => void;
}

const hitSlop: Insets = { top: 8, bottom: 12, left: 24, right: 24 };

const Basic: Story<Args> = ({ withRightButton, onRightAction, ...args }) => {
  return (
    <DetailHeader
      {...args}
      rightButton={
        withRightButton ? (
          <TouchableOpacity onPress={onRightAction} hitSlop={hitSlop}>
            <Placeholder id="R" style={styles.rightButton} />
          </TouchableOpacity>
        ) : undefined
      }
    />
  );
};

Basic.args = {
  title: 'Title',
  withRightButton: false,
  backIcon: BackButtonIcon.Back,
};

export { Basic as DetailHeader };

export default {
  title: 'component/header/Detail Header',
  component: DetailHeader,
  argTypes: {
    backIcon: {
      options: [BackButtonIcon.Back, BackButtonIcon.Close],
      control: { type: 'radio' },
    },
    onBack: { action: 'onBack' },
    onRightAction: { action: 'onRightAction' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=9%3A1968',
    },
  },
} as ComponentMeta<typeof DetailHeader>;

const styles = StyleSheet.create({
  rightButton: {
    height: 24,
    width: 24,
  },
});
