import type { ComponentMeta, Story } from '@storybook/react';
import React from 'react';
import { Insets, StyleSheet } from 'react-native';

import { Placeholder } from '../../storybook/placeholder';
import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import DetailScreen, { DetailScreenProps } from './detail';

type Args = DetailScreenProps & {
  contentHeight?: number;
  onRightAction?: () => void;
};

const hitSlop: Insets = { top: 8, bottom: 12, left: 24, right: 24 };

const Basic: Story<Args> = ({ onRightAction, contentHeight = 0, headerProps }) => {
  return (
    <DetailScreen
      headerProps={{
        ...headerProps,
        rightButton: (
          <TouchableOpacity onPress={onRightAction} hitSlop={hitSlop}>
            <Placeholder id="R" style={styles.rightButton} />
          </TouchableOpacity>
        ),
      }}>
      <Placeholder id="Content" style={[contentHeight ? { height: contentHeight } : styles.content]} />
    </DetailScreen>
  );
};

Basic.args = {
  headerProps: {
    title: 'Title',
    onBack: () => {},
    onSearchPhraseChange: () => {},
    text: {},
  },
};

export { Basic as DetailScreen };

export default {
  title: 'view/Detail Screen',
  component: DetailScreen,
  parameters: {
    noSafeArea: true,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=466%3A138689&mode=design&t=czk2mSWI4Dlg1qYp-1',
    },
  },
  argTypes: {
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
