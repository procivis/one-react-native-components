import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Insets, StyleSheet } from 'react-native';

import { Placeholder } from '../../../storybook/placeholder';
import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import DetailScreen, { DetailScreenProps } from './detail';

type Args = DetailScreenProps & {
  contentHeight?: number;
  onRightAction?: () => void;
};

const hitSlop: Insets = { top: 8, bottom: 12, left: 24, right: 24 };

const Render = ({ onRightAction, contentHeight, headerProps }: Args) => {
  return (
    <DetailScreen
      headerProps={{
        ...headerProps,
        rightButtons: [
          <TouchableOpacity onPress={onRightAction} hitSlop={hitSlop}>
            <Placeholder id="R" style={styles.rightButton} />
          </TouchableOpacity>,
        ],
      }}>
      <Placeholder id="Content" style={[contentHeight ? { height: contentHeight } : styles.content]} />
    </DetailScreen>
  );
};

const Basic: StoryObj<Args> = {
  args: {
    headerProps: {
      title: 'Title',
      onBack: () => {},
    },
    contentHeight: 0,
  },
  render: Render,
};

export { Basic as DetailScreen };

export default {
  title: 'view/Detail Screen',
  component: DetailScreen,
  parameters: {
    noSafeArea: true,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=466-138689',
    },
  },
  argTypes: {
    onRightAction: { action: 'onRightAction' },
  },
} as Meta<typeof DetailScreen>;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  rightButton: {
    height: 24,
    width: 24,
  },
});
