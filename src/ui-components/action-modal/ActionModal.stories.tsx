import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { View } from 'react-native';

import { Button } from '../buttons';
import { Typography } from '../text';
import ActionModal from './ActionModal';

const Render = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onPress={() => setVisible(true)} title="Show modal" />
      <ActionModal visible={visible}>
        <View>
          <Typography color={'white'}>Example text in modal</Typography>
          <Button onPress={() => setVisible(false)} title="Hide modal" />
        </View>
      </ActionModal>
    </>
  );
};

const Basic: StoryObj = {
  render: Render,
};

export { Basic as ActionModal };

export default {
  component: ActionModal,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=391-9097&t=WhKthlRU5MCuUWfw-0',
    },
  },
  title: 'base/Action Modal',
} as Meta<typeof ActionModal>;
