import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Insets, StyleSheet } from 'react-native';
import { fn } from 'storybook/test';

import { Placeholder } from '../../../storybook/placeholder';
import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import DetailScreen, { DetailScreenProps } from './detail';

type Args = DetailScreenProps & {
  contentHeight?: number;
  onRightAction?: () => void;
};

const hitSlop: Insets = { bottom: 12, left: 24, right: 24, top: 8 };

const Render = ({ onRightAction, contentHeight, headerProps }: Args) => {
  return (
    <DetailScreen
      headerProps={{
        ...headerProps,
        rightButtons: [
          <TouchableOpacity hitSlop={hitSlop} key="R" onPress={onRightAction}>
            <Placeholder id="R" style={styles.rightButton} />
          </TouchableOpacity>,
        ],
      }}
    >
      <Placeholder
        id="Content"
        style={contentHeight ? { height: contentHeight } : styles.content}
      />
    </DetailScreen>
  );
};

const Basic: StoryObj<Args> = {
  args: {
    contentHeight: 0,
    headerProps: {
      onBack: fn(),
      title: 'Title',
    },
  },
  render: Render,
};

export { Basic as DetailScreen };

export default {
  argTypes: {
    onRightAction: { action: 'onRightAction' },
  },
  component: DetailScreen,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=466-138689',
    },
    noSafeArea: true,
  },
  title: 'view/Detail Screen',
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
