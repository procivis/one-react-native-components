import type { ComponentMeta, Story } from '@storybook/react';
import React from 'react';
import { Insets, StyleSheet } from 'react-native';

import { Placeholder } from '../../storybook/placeholder';
import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import { BackButtonIcon } from '../buttons';
import DetailScreen, { DetailScreenProps } from './detail-screen';

type Args = DetailScreenProps & {
  withRightButton?: boolean;
  contentHeight?: number;
  onRightAction?: () => void;
};

const hitSlop: Insets = { top: 8, bottom: 12, left: 24, right: 24 };

const Basic: Story<Args> = ({ withRightButton, onRightAction, contentHeight = 0, ...args }) => {
  return (
    <DetailScreen
      {...args}
      rightButton={
        withRightButton ? (
          <TouchableOpacity onPress={onRightAction} hitSlop={hitSlop}>
            <Placeholder id="R" style={styles.rightButton} />
          </TouchableOpacity>
        ) : undefined
      }>
      <Placeholder id="Content" style={[contentHeight ? { height: contentHeight } : styles.content]} />
    </DetailScreen>
  );
};

Basic.args = {
  title: 'Title',
  backIcon: BackButtonIcon.Back,
  withRightButton: false,
  staticContent: false,
  contentHeight: 0,
};

export { Basic as DetailScreen };

export default {
  title: 'view/Detail Screen',
  component: DetailScreen,
  parameters: {
    noSafeArea: true,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=57%3A3529&t=TEBDGdEv632ktThZ-4',
    },
  },
  argTypes: {
    backIcon: {
      options: [BackButtonIcon.Back, BackButtonIcon.Close],
      control: { type: 'radio' },
    },
    onBack: { action: 'onBack' },
    onRightAction: { action: 'onRightAction' },
  },
} as ComponentMeta<typeof DetailScreen>;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  rightButton: {
    height: 24,
    width: 24,
  },
});
