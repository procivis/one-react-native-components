import type { ComponentMeta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { View } from 'react-native';

import { Button } from '../buttons';
import { Typography } from '../text';
import { theme } from '../theme';
import ActionModal from './ActionModal';

const Basic: Story = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onPress={() => setVisible(true)}>Show modal</Button>
      <ActionModal visible={visible}>
        <View style={{ padding: theme.padding }}>
          <Typography>Example text in modal</Typography>
          <Button type="light" onPress={() => setVisible(false)}>
            Hide modal
          </Button>
        </View>
      </ActionModal>
    </>
  );
};

export { Basic as ActionModal };

export default {
  title: 'base/Action Modal',
  component: ActionModal,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Gd0Tj0234hxtl3HMcCJThW/App-Component-Library-(Design)?node-id=391-9097&t=WhKthlRU5MCuUWfw-0',
    },
  },
} as ComponentMeta<typeof ActionModal>;
